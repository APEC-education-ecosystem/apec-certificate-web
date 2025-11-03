import { useSolana } from "@/components/solana-provider";
import { useMutation } from "@tanstack/react-query";
import {
  address,
  appendTransactionMessageInstructions,
  compileTransaction,
  createNoopSigner,
  createTransactionMessage,
  getAddressEncoder,
  getProgramDerivedAddress,
  getTransactionEncoder,
  getU64Encoder,
  pipe,
  setTransactionMessageFeePayer,
  setTransactionMessageLifetimeUsingBlockhash,
  type Address,
  type Instruction,
  type ReadonlyUint8Array,
} from "@solana/kit";
import {
  APEC_CERT_PROGRAM_ADDRESS,
  getClaimCertInstruction,
  getCreateCertProofInstruction,
  getCreateCourseInstruction,
  getInitProviderInstruction,
} from "@apec-learning/program-sdk";
import { useSignAndSendTransaction } from "@privy-io/react-auth/solana";
import bs58 from "bs58";
import { usePrivy } from "@privy-io/react-auth";
import { useTransactionToast } from "./use-transaction-toast";
import { getProviderByCreator, insertProvider } from "@/server/provider";
import {
  getCourseById,
  insertCertificateToCourse,
  insertCourse,
  updateCertificate,
} from "@/server/course";
import { getMerkleProof, getMerkleRoot } from "@/utils/merkle-tree";
import type { CertificateItem, MyId } from "@/lib/types";
import {
  TOKEN_2022_PROGRAM_ADDRESS,
  findAssociatedTokenPda,
} from "@solana-program/token-2022";

export const useApecProgram = () => {
  const { ready: privyReady } = usePrivy();
  const { rpc, chain, wallet } = useSolana();
  const { showSuccess, showError, showLoading, hideToast } =
    useTransactionToast();

  const { signAndSendTransaction } = useSignAndSendTransaction();

  const getEncodedTransaction = async (
    instructions: Instruction[]
  ): Promise<ReadonlyUint8Array> => {
    const { value: latestBlockhash } = await rpc.getLatestBlockhash().send();

    // Create transaction
    const transaction = pipe(
      createTransactionMessage({ version: 0 }),
      (tx) => setTransactionMessageFeePayer(address(wallet.address), tx),
      (tx) => setTransactionMessageLifetimeUsingBlockhash(latestBlockhash, tx),
      (tx) => appendTransactionMessageInstructions(instructions, tx),
      (tx) => compileTransaction(tx)
    );

    return getTransactionEncoder().encode(transaction);
  };

  const initProvider = useMutation({
    mutationKey: ["init-provider"],
    mutationFn: async (args: {
      id: number;
      fullName: string;
      shortName: string;
      address: string;
      country: string;
      description: string;
    }) => {
      let loadingToastId: string | number | undefined;

      if (!wallet) {
        showError({ errorMessage: "No wallet connected" });
        return { success: false, error: "No wallet connected" };
      }

      try {
        // Show loading toast
        loadingToastId = showLoading("Registering provider on blockchain...");

        const [provider, _] = await getProviderAddress(args.id);

        const initProviderInstruction = getInitProviderInstruction({
          authority: createNoopSigner(address(wallet.address)),
          id: args.id,
          shortName: args.shortName,
          provider,
        });

        const encodedTransaction = await getEncodedTransaction([
          initProviderInstruction,
        ]);

        const signedTransaction = await signAndSendTransaction({
          transaction: new Uint8Array(encodedTransaction),
          wallet,
          chain,
        });

        const signature = bs58.encode(signedTransaction.signature);

        // Dismiss loading toast and show success
        if (loadingToastId) {
          hideToast(loadingToastId);
        }

        showSuccess({
          signature,
          successMessage: "Provider registered successfully!",
        });

        const { success } = await insertProvider({
          ...args,
          id: args.id.toString(),
          creator: wallet.address.toString(),
          txHash: signature,
        });

        return { success, signature };
      } catch (error) {
        // Dismiss loading toast and show error
        if (loadingToastId) {
          hideToast(loadingToastId);
        }

        const errorMessage =
          error instanceof Error
            ? `Provider registration failed: ${error.message}`
            : "Provider registration failed. Please try again.";

        showError({ errorMessage });

        return { success: false, error };
      }
    },
  });

  const createCourse = useMutation({
    mutationKey: ["create-course"],
    mutationFn: async (args: {
      id: number;
      fullName: string;
      shortName: string;
      description: string;
    }) => {
      let loadingToastId: string | number | undefined;

      if (!wallet) {
        showError({ errorMessage: "No wallet connected" });
        return { success: false, error: "No wallet connected" };
      }

      try {
        // Show loading toast
        loadingToastId = showLoading("Creating course on blockchain...");

        const providerRecord = await getProviderByCreator(wallet.address);

        if (!providerRecord) {
          return {
            success: false,
            error: "No provider found for the current wallet",
          };
        }

        const [provider] = await getProviderAddress(providerRecord.id);

        const [course] = await getCourseAddress(provider, args.id);

        const createCourseInstruction = getCreateCourseInstruction({
          authority: createNoopSigner(address(wallet.address)),
          id: args.id,
          shortName: args.shortName,
          course,
          provider,
        });

        const encodedTransaction = await getEncodedTransaction([
          createCourseInstruction,
        ]);

        const signedTransaction = await signAndSendTransaction({
          transaction: new Uint8Array(encodedTransaction),
          wallet,
          chain,
        });

        const signature = bs58.encode(signedTransaction.signature);

        const { success } = await insertCourse({
          ...args,
          id: args.id.toString(),
          name: args.fullName,
          providerId: providerRecord.id,
          creator: wallet.address.toString(),
          txHash: signature,
        });

        // Dismiss loading toast and show success
        if (loadingToastId) {
          hideToast(loadingToastId);
        }

        showSuccess({
          signature,
          successMessage: "Course created successfully!",
        });

        return { success, signature };
      } catch (error) {
        // Dismiss loading toast and show error
        if (loadingToastId) {
          hideToast(loadingToastId);
        }

        const errorMessage =
          error instanceof Error
            ? `Course creation failed: ${error.message}`
            : "Course creation failed. Please try again.";

        showError({ errorMessage });

        return { success: false, error };
      }
    },
  });

  const updateCertificateProof = useMutation({
    mutationKey: ["update-certificate"],
    mutationFn: async (args: {
      courseId: number;
      certList: CertificateItem[];
    }) => {
      let loadingToastId: string | number | undefined;

      if (!wallet) {
        showError({ errorMessage: "No wallet connected" });
        return { success: false, error: "No wallet connected" };
      }

      try {
        // Show loading toast
        loadingToastId = showLoading("Updating certificate on blockchain...");

        const providerRecord = await getProviderByCreator(wallet.address);

        if (!providerRecord) {
          return {
            success: false,
            error: "No provider found for the current wallet",
          };
        }

        const [providerAddress] = await getProviderAddress(providerRecord.id);
        const [courseAddress] = await getCourseAddress(
          providerAddress,
          args.courseId
        );

        const merkleTreeRoot: Uint8Array = getMerkleRoot(
          args.certList.map(
            (x) =>
              new Uint8Array(getAddressEncoder().encode(address(x.address)))
          )
        );

        console.log("Merkle Tree Root:", merkleTreeRoot);

        const [certProofAddress] = await getCertProofAddress(
          providerAddress,
          courseAddress
        );

        const updateCertificateInstruction = getCreateCertProofInstruction({
          authority: createNoopSigner(address(wallet.address)),
          course: courseAddress,
          provider: providerAddress,
          root: merkleTreeRoot,
          certProof: certProofAddress,
          total: args.certList.length,
        });

        const encodedTransaction = await getEncodedTransaction([
          updateCertificateInstruction,
        ]);

        const signedTransaction = await signAndSendTransaction({
          transaction: new Uint8Array(encodedTransaction),
          wallet,
          chain,
        });

        const signature = bs58.encode(signedTransaction.signature);

        // Dismiss loading toast and show success
        if (loadingToastId) {
          hideToast(loadingToastId);
        }

        showSuccess({
          signature,
          successMessage: "Certificate updated successfully!",
        });

        const { success } = await insertCertificateToCourse(
          wallet.address.toString(),
          args.courseId.toString(),
          args.certList
        );

        return { success, signature };
      } catch (error) {
        // Dismiss loading toast and show error
        if (loadingToastId) {
          hideToast(loadingToastId);
        }

        const errorMessage =
          error instanceof Error
            ? `Certificate update failed: ${error.message}`
            : "Certificate update failed. Please try again.";

        showError({ errorMessage });

        return { success: false, error };
      }
    },
  });

  const claimCertificate = (
    courseId: number,
    certId: number,
    claimer: string
  ) =>
    useMutation({
      mutationKey: ["claim-certificate", courseId, certId, claimer],
      mutationFn: async () => {
        let loadingToastId: string | number | undefined;

        if (!wallet) {
          showError({ errorMessage: "No wallet connected" });
          return { success: false, error: "No wallet connected" };
        }

        try {
          // Show loading toast
          loadingToastId = showLoading("Claiming certificate on blockchain...");

          const courseRecord = await getCourseById(courseId.toString());

          if (!courseRecord) {
            return {
              success: false,
              error: "No course found for the given course ID",
            };
          }

          const [providerAddress] = await getProviderAddress(
            courseRecord.providerId
          );

          const [courseAddress] = await getCourseAddress(
            providerAddress,
            courseRecord.id
          );

          const [certificateAddress] = await getCertificateAddress(
            providerAddress,
            courseAddress,
            address(claimer)
          );

          const [claimerTokenAccount] = await findAssociatedTokenPda({
            mint: certificateAddress,
            owner: address(claimer),
            tokenProgram: TOKEN_2022_PROGRAM_ADDRESS,
          });

          const [certProofAddress] = await getCertProofAddress(
            providerAddress,
            courseAddress
          );

          const certList = courseRecord.certificates.map(
            (x) => new Uint8Array(getAddressEncoder().encode(address(x.wallet)))
          );
          const proof = getMerkleProof(
            certList,
            new Uint8Array(getAddressEncoder().encode(address(claimer)))
          );

          const claimCertificateInstruction = getClaimCertInstruction({
            payer: createNoopSigner(address(wallet.address)),
            claimer: address(claimer),
            course: courseAddress,
            provider: providerAddress,
            tokenProgram: TOKEN_2022_PROGRAM_ADDRESS,
            name: courseRecord.name,
            uri: `${process.env.NEXT_PUBLIC_BASE_URL}/metadata/${certificateAddress}.json`,
            certMint: certificateAddress,
            claimerTokenAccount,
            certProof: certProofAddress,
            proof,
          });

          const encodedTransaction = await getEncodedTransaction([
            claimCertificateInstruction,
          ]);

          const signedTransaction = await signAndSendTransaction({
            transaction: new Uint8Array(encodedTransaction),
            wallet,
            chain,
          });

          const signature = bs58.encode(signedTransaction.signature);

          // Dismiss loading toast and show success
          if (loadingToastId) {
            hideToast(loadingToastId);
          }

          showSuccess({
            signature,
            successMessage: "Certificate claimed successfully!",
          });

          const { success } = await updateCertificate(
            courseId.toString(),
            certId,
            certificateAddress,
            signature
          );

          return { success, signature };
        } catch (error) {
          // Dismiss loading toast and show error
          if (loadingToastId) {
            hideToast(loadingToastId);
          }

          const errorMessage =
            error instanceof Error
              ? `Certificate claim failed: ${error.message}`
              : "Certificate claim failed. Please try again.";

          showError({ errorMessage });

          return { success: false, error };
        }
      },
    });

  const getProviderAddress = async (id: MyId) => {
    return getProgramDerivedAddress({
      programAddress: APEC_CERT_PROGRAM_ADDRESS,
      seeds: ["provider", getU64Encoder().encode(BigInt(id))],
    });
  };

  const getCourseAddress = async (providerAddress: Address, courseId: MyId) => {
    return getProgramDerivedAddress({
      programAddress: APEC_CERT_PROGRAM_ADDRESS,
      seeds: [
        "course",
        getAddressEncoder().encode(providerAddress),
        getU64Encoder().encode(BigInt(courseId)),
      ],
    });
  };

  const getCertProofAddress = async (
    providerAddress: Address,
    courseAddress: Address
  ) => {
    return getProgramDerivedAddress({
      programAddress: APEC_CERT_PROGRAM_ADDRESS,
      seeds: [
        "cert_proof",
        getAddressEncoder().encode(providerAddress),
        getAddressEncoder().encode(courseAddress),
      ],
    });
  };

  const getCertificateAddress = async (
    providerAddress: Address,
    courseAddress: Address,
    claimer: Address
  ) => {
    return getProgramDerivedAddress({
      programAddress: APEC_CERT_PROGRAM_ADDRESS,
      seeds: [
        "certificate",
        getAddressEncoder().encode(providerAddress),
        getAddressEncoder().encode(courseAddress),
        getAddressEncoder().encode(claimer),
      ],
    });
  };

  if (!privyReady) {
    throw new Error("Privy not ready");
  }
  return {
    initProvider,
    createCourse,
    getProviderAddress,
    getCourseAddress,
    updateCertificateProof,
    getCertificateAddress,
    claimCertificate,
  };
};

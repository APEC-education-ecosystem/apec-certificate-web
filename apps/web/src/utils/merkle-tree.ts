import { MerkleTree } from "merkletreejs";
import { keccak_256 } from "@noble/hashes/sha3";

export const getMerkleTree = (data: Uint8Array[]): MerkleTree => {
  return new MerkleTree(data.map(keccak_256), keccak_256, {
    sortPairs: true,
  });
};

export const getMerkleRoot = (data: Uint8Array[]): Uint8Array => {
  return getMerkleTree(data).getRoot();
};

export const getMerkleProof = (
  data: Uint8Array[],
  leaf: Uint8Array,
  index?: number
): Uint8Array[] => {
  return getMerkleTree(data)
    .getProof(Buffer.from(keccak_256(leaf)), index)
    .map((proofItem) => proofItem.data);
};

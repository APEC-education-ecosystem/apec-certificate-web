"use client";
import { Button } from "@/components/ui/button";
import { revalidateApp } from "@/server/revalidate-data";
import { useLogin } from "@privy-io/react-auth";
import { usePathname, useRouter } from "next/navigation";

const LoginButton = () => {
  const router = useRouter();
  const pathName = usePathname();
  let { login } = useLogin({
    onComplete: async ({
      user,
      isNewUser,
      wasAlreadyAuthenticated,
      loginMethod,
      loginAccount,
    }) => {
      console.log("Login complete:", {
        user,
        isNewUser,
        wasAlreadyAuthenticated,
        loginMethod,
        loginAccount,
      });
      if (pathName !== "/") {
        await revalidateApp("/app");
        router.replace("/app");
      } else {
        await revalidateApp("/");
      }
    },
    onError: (error) => {
      console.error("Login error:", error);
    },
  });

  return <Button onClick={() => login()}>Login</Button>;
};

export default LoginButton;

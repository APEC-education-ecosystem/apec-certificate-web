"use client";
import { Button } from "@/components/ui/button";
import { revalidateApp } from "@/server/revalidate-data";
import { useLogin } from "@privy-io/react-auth";
import { Loader2 } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

const LoginButton = () => {
  const router = useRouter();
  const pathName = usePathname();
  const [isLoading, setIsLoading] = useState(true);
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
      setIsLoading(false);
      if (pathName !== "/") {
        await revalidateApp("/app");
        router.replace("/app");
      } else {
        await revalidateApp("/");
      }
    },
    onError: (error) => {
      console.error("Login error:", error);
      setIsLoading(false);
    },
  });

  if (isLoading) {
    return (
      <Button size={"icon"} variant={"ghost"}>
        <Loader2 className="animate-spin" />
      </Button>
    );
  }

  return <Button onClick={() => login()}>Login</Button>;
};

export default LoginButton;

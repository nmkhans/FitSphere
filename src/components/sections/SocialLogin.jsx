"use client";
import React, { useEffect } from "react";
import { Button } from "../ui/button";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import toast from "react-hot-toast";

export default function SocialLogin() {
  const session = useSession();
  const router = useRouter();
  const handleSocialLogin = (providerName) => {
    signIn(providerName);
  };
  useEffect(() => {
    if (session?.status === "authenticated") {
      router.push("/");
      toast.success("You successfully logged in!", {
        icon: '🎉',
        duration: 3000,
      });
    }
  }, [session?.status]);

  return (
    <div className="flex items-center justify-center gap-4">
      <Button onClick={() => handleSocialLogin("google")}>
        SignIn with Google
      </Button>
      <Button onClick={() => handleSocialLogin("github")}>
        SignIn with Github
      </Button>
    </div>
  );
}

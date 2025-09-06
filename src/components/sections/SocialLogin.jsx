"use client";
import React, { useEffect } from "react";
import { Button } from "../ui/button";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

export default function SocialLogin() {
  const session = useSession();
  const router = useRouter();
  const handleSocialLogin = (providerName) => {
    signIn(providerName);
  };
  useEffect(() => {
    if (session?.status === "authenticated") {
      router.push("/");
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "You successfully Logged In",
        showConfirmButton: false,
        timer: 1500,
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

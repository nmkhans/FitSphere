"use client";

import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { signIn } from "next-auth/react";
import { EyeOff } from "lucide-react";
import { Eye } from "lucide-react";
import { useState } from "react";
import { Separator } from "@/components/ui/separator";
import SocialLogin from "@/components/sections/SocialLogin";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    // try {
    //   const response = await signIn("credentials", {
    //     email,
    //     password,
    //     redirect: false,
    //   });
    //   if (response.ok) {
    //     router.push("/");
    //     form.reset();
    //     Swal.fire({
    //       position: "top-end",
    //       icon: "success",
    //       title: "You Successfully Logged In",
    //       showConfirmButton: false,
    //       timer: 1500,
    //     });
    //   } else {
    //     Swal.fire({
    //       icon: "error",
    //       title: "Oops...",
    //       text: "Something went wrong!",
    //     });
    //   }
    // } catch (error) {
    //   console.log(error);
    //   Swal.fire({
    //     icon: "error",
    //     title: "Oops...",
    //     text: "Something went wrong!",
    //   });
    // }
    try {
      const response = await signIn("credentials", {
        email,
        password,
        callbackUrl: "/",
        redirect: false,
      });
      if (response?.ok) {
        router.push("/");
        form.reset();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "You Successfully Logged In",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader>
          <h2 className="text-2xl font-semibold text-center">
            Login to fitPro
          </h2>
        </CardHeader>

        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="Enter Your Email"
              />
            </div>

            <div className="space-y-2 relative">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter Your Password"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-2 top-7.5 text-muted-foreground"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            <Button className="w-full mt-4 cursor-pointer" type="submit">
              Login
            </Button>
            <Separator />
            <SocialLogin />
          </CardContent>
        </form>

        <CardFooter className="text-sm text-muted-foreground text-center">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="text-primary underline ml-1">
            Sign up
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;

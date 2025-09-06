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
import Swal from "sweetalert2";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import registerUser from "../actions/auth/registerUser";
import { Separator } from "@/components/ui/separator";
import SocialLogin from "@/components/sections/SocialLogin";
import { useRouter } from "next/navigation";

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    try {
      const response = await registerUser({ name, email, password });

      if (response?.success) {
        router.push("/login");
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "You successfully registered",
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
            Create Your Account
          </h2>
        </CardHeader>

        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                name="name"
                type="text"
                placeholder="Enter Your Name"
              />
            </div>

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
                minLength={6}
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

            <Button className="w-full mt-4 cursor-pointer">Register</Button>
            <Separator />
            <SocialLogin />
          </CardContent>
        </form>

        <CardFooter className="text-sm text-muted-foreground text-center">
          Already have an account?{" "}
          <Link href="/login" className="text-primary underline ml-1">
            Login
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}

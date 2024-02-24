"use client";
import { FaGoogle } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
const SignInModal = ({ label }: { label: string }) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return <Button>{label}</Button>;
  }

  return (
    <div>
      <Dialog>
        <DialogTrigger>
          <Button>{label}</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Welcome to Teamify</DialogTitle>
            <DialogDescription>
              Sign in to leverage the whole app
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div
              onClick={() => signIn("google")}
              className="w-full flex items-center justify-center gap-4 bg-rose-700 rounded-md text-white hover:bg-rose-600 transition p-4"
            >
              <FaGoogle />
              <p>Sign In With Google</p>
            </div>
            <div
              onClick={() => signIn("facebook")}
              className="flex items-center justify-center gap-4 bg-blue-700 rounded-md p-4 text-white hover:bg-blue-600 transition"
            >
              <FaFacebook />
              <p>Sign In With Facebook</p>
            </div>
            <div
              onClick={() => signIn("github")}
              className="flex items-center justify-center gap-4 bg-black rounded-md p-4 text-white hover:bg-black/80 transition"
            >
              <FaGithub />
              <p>Sign In With Github</p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SignInModal;

'use client'
import React from "react";
import { IoIosLogOut } from "react-icons/io";
import { Button } from "../ui/button";
import { signOut } from "next-auth/react";

const Logout = () => {
  return (
    <Button
      onClick={() => signOut({ callbackUrl: "/" })}
      size={"sm"}
      variant={'destructive'}
      className="flex gap-2 items-center"
    >
      <IoIosLogOut />
      Exit
    </Button>
  );
};

export default Logout;

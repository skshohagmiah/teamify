import React from "react";
import Logo from "./Logo";
import SignInModal from "../modal/SignInModal";

const Header = () => {
  return (
    <header className="bg-white shadow-md p-2 sticky top-0 left-0 right-0 z-50">
      <div className="max-w-screen-2xl mx-auto flex items-center justify-between">
        <Logo />
        <SignInModal label="Sign In"/>
      </div>
    </header>
  );
};

export default Header;

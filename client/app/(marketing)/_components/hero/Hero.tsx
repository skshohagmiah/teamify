import Image from "next/image";
import React from "react";
import SignInModal from "../modal/SignInModal";

const Hero = () => {
  return (
    <section className="bg-gradient-to-b from-white/80  to-gray-100 ">
      <div className="flex items-center flex-wrap flex-col-reverse md:flex-row max-w-screen-2xl mx-auto p-2  md:h-screen">
        <div className="md:basis-[50%] text-center">
          <h1 className="text-2xl md:text-4xl font-bold leading-snug ">
            <span className="text-blue-600">Teamify</span>, Your Remote Team
            Collaboration Hub
          </h1>
          <p className="p-4 text-sm font-light">
            Teamify is an all-in-one platform designed to empower remote teams
            to collaborate seamlessly, communicate effectively, and achieve
            their goals together. With features like real-time chat, video
            conferencing, task management, project tracking, and more, Teamify
            helps you stay connected, organized, and productive, no matter where
            you are in the world.
          </p>
          <div>
            <SignInModal label="Sign In For Free" />
          </div>
        </div>
        <div className="md:basis-[50%] relative w-[100%] h-[20rem] md:h-[30rem]">
          <Image src={"/hero.png"} alt="hero image" fill />
        </div>
      </div>
    </section>
  );
};

export default Hero;

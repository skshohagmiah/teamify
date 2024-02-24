import Image from "next/image";
import React from "react";

const Features = () => {
  return (
    <section className="max-w-screen-2xl mx-auto p-2 text-center">
      <h2 className="text-2xl md:text-3xl font-semibold m-4">
        What Features We Offers
      </h2>
      <div className="flex items-center flex-wrap lg:flex-nowrap mt-4 lg:m-8">
        <div className="relative w-[100%] h-[20rem] shrink-0 lg:shrink">
          <Image src={"/calling.jpg"} alt="calling image" fill />
        </div>
        <div>
          <h3 className="text-2xl font-medium mb-1">RealTime messaging and audio video Call</h3>
          <p className="text-sm p-2">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse eius,
            ex fugit possimus nam impedit magnam eveniet officiis
            exercitationem, sed corrupti vero enim unde! Eius omnis tempore
            asperiores dolores error?
          </p>
        </div>
      </div>

      <div className="flex items-center flex-wrap-reverse lg:flex-nowrap mt-4 lg:m-8">
        <div>
          <h3 className="text-2xl font-medium mb-1">Tasks assignment Task deadlines And more</h3>
          <p className="text-sm p-2">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse eius,
            ex fugit possimus nam impedit magnam eveniet officiis
            exercitationem, sed corrupti vero enim unde! Eius omnis tempore
            asperiores dolores error?
          </p>
        </div>
        <div className="relative w-[100%] h-[20rem] shrink-0 lg:shrink">
          <Image src={"/tasks.webp"} alt="calling image" fill />
        </div>
      </div>
    </section>
  );
};

export default Features;

import Image from "next/image";
import React from "react";
import calling from '@/public/calling.jpg'
import tasks from '@/public/tasks.webp'

const Features = () => {
  return (
    <section className="max-w-screen-2xl mx-auto p-2 text-center">
      <h2 className="text-2xl md:text-3xl font-semibold m-4">
        What Features We Offers
      </h2>
      <div className="flex items-center gap-6 flex-wrap lg:flex-nowrap mt-4 lg:m-8">
        <div className="relative w-[100%] h-[20rem] shrink-0 lg:shrink">
          <Image src={calling} alt="calling image" fill className="object-cover" />
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

      <div className="flex items-center gap-6 flex-wrap-reverse lg:flex-nowrap mt-4 lg:m-8">
        <div>
          <h3 className="text-2xl font-medium mb-1">Tasks assignment, Task Tracking And more</h3>
          <p className="text-sm p-2">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse eius,
            ex fugit possimus nam impedit magnam eveniet officiis
            exercitationem, sed corrupti vero enim unde! Eius omnis tempore
            asperiores dolores error?
          </p>
        </div>
        <div className="relative w-[100%] h-[20rem] shrink-0 lg:shrink">
          <Image src={tasks} alt="calling image" fill className="object-cover"/>
        </div>
      </div>
    </section>
  );
};

export default Features;

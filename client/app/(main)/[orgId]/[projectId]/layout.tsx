import React from "react";
import ProjectSidebar from "./_components/sidebar/Sidebar";
import MobileHeader from "./_components/header/MobileHeader";

const ProjectIdLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col md:flex-row max-w-screen-2xl mx-auto w-full ">
        <div className="hidden md:block">
        <ProjectSidebar />
        </div>
        <div className="md:hidden">
          <MobileHeader />
        </div>
        {children}
    </div>
  );
};

export default ProjectIdLayout;

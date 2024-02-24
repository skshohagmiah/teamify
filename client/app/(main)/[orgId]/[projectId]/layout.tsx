import React from "react";
import ProjectSidebar from "./_components/sidebar/Sidebar";

const ProjectIdLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex  max-w-screen-2xl mx-auto w-full ">
        <ProjectSidebar />
        {children}
    </div>
  );
};

export default ProjectIdLayout;

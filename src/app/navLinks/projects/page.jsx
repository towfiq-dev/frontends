import ProjectsPageClient from "./ProjectsPageClient";
import { getAllProjects } from "@/components/lib/getPortfolioData";

const ProjectsPage = async () => {
  const allProjects = await getAllProjects();
  return <ProjectsPageClient allProjects={allProjects} />;
};

export default ProjectsPage;

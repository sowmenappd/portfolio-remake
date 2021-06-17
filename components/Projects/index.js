import React, { useContext } from "react";

import ProjectsContext from "../../Projects.Context";
import Footer from "../Footer";
import ProjectCard from "./ProjectCard";
import styles from "./Projects.module.css";

const Projects = () => {
  const projects = useContext(ProjectsContext).sort(
    (a, b) => new Date(b.document.data.date) - new Date(a.document.data.date)
  );

  return (
    <>
      <div className={styles.workContainer}>
        <h1 className={styles.title}>Projects I've worked on</h1>
        <div style={styles.projectTypeTabs}></div>
        <div className={styles.workList}>
          {projects &&
            projects.map((p, i) => (
              <ProjectCard key={p.slug} index={i} {...p} />
            ))}
        </div>
      </div>
      <Footer noBorder />
    </>
  );
};

export default Projects;

import { useEffect, useState } from "react";
import MarqueeModule from "react-fast-marquee";
import { getProjects } from "../services/supabaseService";

import project1 from "../assets/images/projects/project1.png";
import project2 from "../assets/images/projects/project2.png";
import project3 from "../assets/images/projects/project3.png";
import project4 from "../assets/images/projects/project4.png";

const Marquee = MarqueeModule.default;

const fallbackProjects = [
  {
    id: "fallback-1",
    title: "Project 1",
    image_url: project1,
  },
  {
    id: "fallback-2",
    title: "Project 2",
    image_url: project2,
  },
  {
    id: "fallback-3",
    title: "Project 3",
    image_url: project3,
  },
  {
    id: "fallback-4",
    title: "Project 4",
    image_url: project4,
  },
];

const MarqueeAnimation = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await getProjects();

        const validProjects =
          data?.filter((project) => project.image_url) || [];

        if (validProjects.length > 0) {
          setProjects(validProjects);
        } else {
          setProjects(fallbackProjects);
        }
      } catch (error) {
        console.error("Error get marquee projects:", error);
        setProjects(fallbackProjects);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (loading) {
    return null;
  }

  return (
    <Marquee speed={35} direction="left" autoFill className="py-3">
      <div className="flex items-center gap-2 px-4">
        {projects.map((project) => (
          <img
            key={project.id}
            src={project.image_url}
            alt={project.title}
            className="w-[350px] rounded-3xl"
          />
        ))}
      </div>
    </Marquee>
  );
};

export default MarqueeAnimation;

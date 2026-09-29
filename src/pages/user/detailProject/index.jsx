import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getProjectBySlug } from "../../../services/supabaseService";
import { useNavigate } from "react-router-dom";
const DetailProject = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProject = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getProjectBySlug(slug);

        setProject(data);
      } catch (error) {
        console.error("Error get project detail:", error);
        setError("Project tidak ditemukan.");
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [slug]);

  if (loading) {
    return (
      <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-white/70 backdrop-blur-sm">
        <div class="three-body">
          <div class="three-body__dot"></div>
          <div class="three-body__dot"></div>
          <div class="three-body__dot"></div>
        </div>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div>
        <p>{error || "Project tidak ditemukan."}</p>

        <Link to="/projects">Back to Projects</Link>
      </div>
    );
  }

  return (
    <>
      <section className="px-6 sm:px-20 lg:px-20  2xl:px-40 py-10">
        <button
          className="border flex items-center text-sm lg:text-base gap-2 px-6 py-2.5 bg-hitam text-white rounded-full  hover:-translate-y-0.5 hover:shadow-md duration-300 cursor-pointer"
          onClick={() => navigate(-1)}
        >
          <i class="bi bi-arrow-left"></i> Kembali
        </button>
        <div className="mx-auto flex flex-col mt-10  gap-6 items-center justify-center text-center">
          <span className="text-lg lg:text-xl text-amber-800 font-medium ">
            Project Details
          </span>
          <h2 className="max-w-3xl font-semibold text-xl lg:text-3xl">
            {project.title}
          </h2>
        </div>
        <div className="xl:max-w-3xl w-full mx-auto shrink-0 mt-10">
          {project.image_url && (
            <img
              className="w-full h-full rounded-2xl shadow-xl"
              src={project.image_url}
              alt={project.title}
            />
          )}
        </div>

        <div className="mt-20 flex flex-col-reverse lg:flex-row gap-10 lg:gap-28 items-start">
          <div className="max-w-sm flex flex-col gap-2  w-full shrink-0">
            <div className="flex flex-col">
              <span className="font-medium">Event</span>
              <span className=" font-medium text-[#6c6c6c]">
                {project.subtitle}
              </span>
            </div>
            <div className="flex flex-col">
              <span className="font-medium">Tahun</span>
              <span className="whitespace-nowrap font-medium text-[#6c6c6c]">
                {project.year}
              </span>
            </div>

            <div className="flex flex-col">
              <span className="font-medium">Kategori</span>
              <span className="whitespace-nowrap font-medium text-[#6c6c6c]">
                {project.category}
              </span>
            </div>

            <div className="flex flex-col">
              <span className="font-medium">Software</span>
              <span className="whitespace-nowrap font-medium text-[#6c6c6c]">
                {project.software}
              </span>
            </div>
          </div>
          <div>
            <span className="font-semibold text-lg lg:text-2xl">
              About the Project
            </span>
            <div className="mt-3">
              {project.bullets?.length > 0 && (
                <ul className="text-[#6c6c6c] font-medium">
                  {project.bullets.map((bullet, index) => (
                    <li className="mt-2" key={index}>
                      {bullet}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default DetailProject;

import { useState } from "react";
import useProjects from "./hooks/useProjects";
import AddProjectModal from "./addProject";
import DetailProject from "./detailProject";
import UpdateProject from "./updateProject";
import DeleteProject from "./deleteProject";
const DataProject = () => {
  const { projects, tableScrollRef, trackRef, thumbRef, getProjects } =
    useProjects();
  const [showModal, setShowModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [actionModal, setActionModal] = useState(null);
  const [activeCategory, setActiveCategory] = useState("Data Analysis");
  const filteredProjects = projects.filter(
    (project) => project.category === activeCategory,
  );
  return (
    <div className="w-full p-6 bg-white rounded-xl">
      <div className="flex flex-col gap-4">
        <span className="font-medium">List Projects</span>

        <div className="flex  items-start lg:items-center justify-between">
          <div className="flex flex-wrap items-start lg:items-center gap-3">
            <button
              onClick={() => setActiveCategory("Data Analysis")}
              className={
                activeCategory === "Data Analysis"
                  ? "px-3 py-2 text-sm text-white rounded-lg bg-linear-to-r from-biru to-hijau hover:-translate-y-0.5 hover:shadow-md cursor-pointer duration-300"
                  : "btn-gradient-border px-3 py-2 text-sm rounded-lg w-fit text-white hover:-translate-y-0.5 hover:shadow-md duration-300 cursor-pointer"
              }
            >
              {activeCategory === "Data Analysis" ? (
                "Data Analysis"
              ) : (
                <span className="bg-linear-to-r from-biru to-hijau bg-clip-text text-transparent">
                  Data Analysis
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveCategory("Dashboard")}
              className={
                activeCategory === "Dashboard"
                  ? "px-3 py-2 text-sm text-white rounded-lg bg-linear-to-r from-biru to-hijau hover:-translate-y-0.5 hover:shadow-md duration-300 cursor-pointer"
                  : "btn-gradient-border px-3 py-2 text-sm rounded-lg w-fit text-white hover:-translate-y-0.5 hover:shadow-md duration-300 cursor-pointer"
              }
            >
              {activeCategory === "Dashboard" ? (
                "Dashboard"
              ) : (
                <span className="bg-linear-to-r from-biru to-hijau bg-clip-text text-transparent">
                  Dashboard
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveCategory("Infographics")}
              className={
                activeCategory === "Infographics"
                  ? "px-3 py-2 text-sm text-white rounded-lg bg-linear-to-r from-biru to-hijau hover:shadow-md hover:-translate-y-0.5 duration-300 cursor-pointer"
                  : "btn-gradient-border px-3 py-2 text-sm rounded-lg w-fit text-white hover:-translate-y-0.5 hover:shadow-md duration-300 cursor-pointer"
              }
            >
              {activeCategory === "Infographics" ? (
                "Infographics"
              ) : (
                <span className="bg-linear-to-r from-biru to-hijau bg-clip-text text-transparent">
                  Infographics
                </span>
              )}
            </button>
          </div>

          <button
            onClick={() => setShowModal(true)}
            className="hidden lg:block bg-linear-to-r from-biru to-hijau text-white flex items-center gap-2 px-3 py-2 text-sm rounded-lg w-fit hover:-translate-y-0.5 hover:shadow-lg duration-300 cursor-pointer"
          >
            <span className="">Add New Project</span>+
          </button>

          <button
            onClick={() => setShowModal(true)}
            className="block lg:hidden bg-linear-to-r from-biru to-hijau text-white flex items-center gap-2 px-3 py-2 text-sm rounded-lg w-fit hover:-translate-y-0.5 hover:shadow-lg duration-300 cursor-pointer"
          >
            <span className="">+</span>
          </button>
        </div>
      </div>

      <div
        id="tableScroll"
        ref={tableScrollRef}
        className="mt-4 overflow-x-auto scrollbar-hide "
      >
        <table className="w-full min-w-[1200px] mb-10 ">
          <thead className=" text-sm text-left">
            <tr className="text-[#6c6c6c]">
              <th className="py-3 pr-3 font-normal">Category</th>
              <th className="p-3 font-normal">Title</th>
              <th className="p-3 font-normal">Subtitle</th>
              <th className="p-3 font-normal">Year</th>
              <th className="p-3 font-normal">Description</th>
              <th className="p-3 font-normal">Tools</th>
              <th className="p-3 font-normal">Image</th>

              {/* Header titik tiga */}
              <th className="sticky right-0  bg-white p-3 w-12 ">
                <span className="bg-linear-to-r from-biru to-hijau bg-clip-text text-transparent">
                  Action
                </span>
              </th>
            </tr>
          </thead>

          <tbody>
            {filteredProjects.map((project) => (
              <tr key={project.id} className="border-b border-black/20 text-sm">
                <td className="py-3 pr-3 max-w-[150px]">
                  <div className="truncate">{project.category}</div>
                </td>

                <td className="p-3 max-w-[180px]">
                  <div className="truncate">{project.title}</div>
                </td>

                <td className="p-3 max-w-[180px]">
                  <div className="truncate">{project.subtitle}</div>
                </td>

                <td className="p-3 max-w-[100px]">
                  <div className="truncate">{project.year}</div>
                </td>

                <td className="p-3 max-w-[250px]">
                  <div className="truncate">{project.bullets}</div>
                </td>

                <td className="p-3 max-w-[180px]">
                  <div className="truncate">{project.software}</div>
                </td>

                <td className="p-3">
                  {project.image_url && (
                    <img
                      src={project.image_url}
                      alt={project.title}
                      className="w-full h-6 object-cover rounded"
                    />
                  )}
                </td>

                <td className="sticky  right-0 bg-white flex items-center gap-3 p-3 w-full text-center">
                  <div className="action-dropdown flex items-center space-x-3">
                    <button
                      onClick={() => {
                        setSelectedProject(project);
                        setActionModal("detail");
                      }}
                      className="text-xl leading-none border border-green-500 w-5 h-5 flex justify-center items-center rounded-sm bg-green-500/10 hover:shadow-md hover:bg-green-500/15 cursor-pointer duration-300"
                    >
                      <i class="bi bi-eye text-sm  text-green-500 leading-none"></i>
                    </button>

                    <button
                      onClick={() => {
                        setSelectedProject(project);
                        setActionModal("edit");
                      }}
                      className="text-xl leading-none  border  border-biru w-5 h-5 flex justify-center items-center rounded-sm bg-biru/10 hover:shadow-md hover:bg-biru/15 cursor-pointer duration-300"
                    >
                      <i class="bi bi-pencil-square text-sm leading-none text-biru "></i>
                    </button>

                    <button
                      onClick={() => {
                        setSelectedProject(project);
                        setActionModal("delete");
                      }}
                      className="text-xl leading-none border  border-red-500 w-5 h-5 flex justify-center items-center rounded-sm bg-red-500/10 hover:shadow-md hover:bg-red-500/15 cursor-pointer duration-300"
                    >
                      <i class="bi bi-trash3 text-sm leading-none text-red-500"></i>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div
        ref={trackRef}
        className="h-2 w:-[100px] lg:w-[400px] mx-auto mt-4 bg-[#ECECEC] rounded-full relative cursor-pointer"
      >
        <div
          ref={thumbRef}
          className="absolute top-0 left-0 h-2 min-w-[40px] rounded-full bg-linear-to-r from-biru to-hijau cursor-grab"
        />
      </div>

      {showModal && (
        <AddProjectModal
          onClose={() => setShowModal(false)}
          onSuccess={() => {
            setShowModal(false);
            getProjects();
          }}
        />
      )}

      {actionModal === "detail" && selectedProject && (
        <DetailProject
          project={selectedProject}
          onClose={() => {
            setActionModal(null);
            setSelectedProject(null);
          }}
        />
      )}

      {actionModal === "edit" && selectedProject && (
        <UpdateProject
          project={selectedProject}
          onClose={() => {
            setActionModal(null);
            setSelectedProject(null);
          }}
          onSuccess={() => {
            setActionModal(null);
            setSelectedProject(null);
            getProjects();
          }}
        />
      )}

      {actionModal === "delete" && selectedProject && (
        <DeleteProject
          project={selectedProject}
          onClose={() => {
            setActionModal(null);
            setSelectedProject(null);
          }}
          onSuccess={() => {
            setActionModal(null);
            setSelectedProject(null);
            getProjects();
          }}
        />
      )}
    </div>
  );
};

export default DataProject;

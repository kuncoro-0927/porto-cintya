import { useState } from "react";
import useProjects from "./hooks/useProjects";
import AddProjectModal from "./addProject";
const DataProject = () => {
  const { projects, tableScrollRef, trackRef, thumbRef, getProjects } =
    useProjects();
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="w-full p-6 bg-white rounded-xl">
      <div className="flex flex-col gap-4">
        <span className="font-medium">List Projects</span>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button className="px-3 py-2 text-sm text-white rounded-lg bg-linear-to-r from-biru to-hijau w-fit">
              Data Analysis
            </button>

            <button className="btn-gradient-border px-3 py-2 text-sm rounded-lg w-fit">
              <span className="bg-linear-to-r from-biru to-hijau bg-clip-text text-transparent">
                Dashboard
              </span>
            </button>

            <button className="btn-gradient-border px-3 py-2 text-sm rounded-lg w-fit">
              <span className="bg-linear-to-r from-biru to-hijau bg-clip-text text-transparent">
                Infographics
              </span>
            </button>
          </div>

          <button
            onClick={() => setShowModal(true)}
            className="bg-linear-to-r from-biru to-hijau text-white flex items-center gap-2 px-3 py-2 text-sm rounded-lg w-fit hover:-translate-y-0.5 hover:shadow-lg duration-300 cursor-pointer"
          >
            <span className="">Add New Project</span>+
          </button>
        </div>
      </div>

      <div
        id="tableScroll"
        ref={tableScrollRef}
        className="mt-4 overflow-x-auto scrollbar-hide"
      >
        <table className="w-full min-w-[1200px] mb-10">
          <thead className=" text-sm text-left">
            <tr className="text-[#6c6c6c]">
              <th className="py-3 pr-3 font-normal">Category</th>
              <th className="p-3 font-normal">Title</th>
              <th className="p-3 font-normal">Subtitle</th>
              <th className="p-3 font-normal">Year</th>
              <th className="p-3 font-normal">Event</th>
              <th className="p-3 font-normal">Description 1</th>
              <th className="p-3 font-normal">Description 2</th>
              <th className="p-3 font-normal">Tools</th>
              <th className="p-3 font-normal">Image</th>

              {/* Header titik tiga */}
              <th className="sticky right-0 bg-white p-3 w-12"></th>
            </tr>
          </thead>

          <tbody>
            {projects.map((project) => (
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

                <td className="p-3 max-w-[180px]">
                  <div className="truncate">{project.event}</div>
                </td>

                <td className="p-3 max-w-[250px]">
                  <div className="truncate">{project.description_1}</div>
                </td>

                <td className="p-3 max-w-[250px]">
                  <div className="truncate">{project.description_2}</div>
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

                <td className="sticky right-0 bg-white p-3 w-12 text-center">
                  <button className="text-xl leading-none">⋮</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div
        ref={trackRef}
        className="h-2 w-[400px] mx-auto mt-4 bg-[#ECECEC] rounded-full relative cursor-pointer"
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
    </div>
  );
};

export default DataProject;

import { useState } from "react";
import useWorkExperiences from "./hooks/useWorkExperiences";
import AddWorkExperienceModal from "./addWorkExperience";
import UpdateWorkExperience from "./updateWorkExperience";
import DetailWorkExperience from "./detailWorkExperience";
import DeleteWorkExperience from "./deleteWorkExperience";

const DataWorkExperiences = () => {
  const {
    workExperiences,
    getWorkExperiences,
    tableScrollRef,
    trackRef,
    thumbRef,
  } = useWorkExperiences();
  const [showModal, setShowModal] = useState(false);
  const [selectedWorkExperience, setSelectedWorkExperience] = useState(null);
  const [actionModal, setActionModal] = useState(null);

  return (
    <div className="w-full p-6 bg-white rounded-xl">
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <span className="font-medium">List Work Experiences</span>
          <button
            onClick={() => setShowModal(true)}
            className="bg-linear-to-r from-biru to-hijau text-white flex items-center gap-2 px-3 py-2 text-sm rounded-lg w-fit hover:-translate-y-0.5 hover:shadow-lg duration-300 cursor-pointer"
          >
            <span className="">Add New Experience</span>+
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
              <th className="p-3 font-normal">Role</th>
              <th className="p-3 font-normal">Company</th>
              <th className="p-3 font-normal">Periode</th>
              <th className="p-3 font-normal">Job Description</th>
              <th className="p-3 font-normal">Logo Company</th>

              {/* Header titik tiga */}
              <th className="sticky right-0  bg-white p-3 w-12 ">
                <span className="bg-linear-to-r from-biru to-hijau bg-clip-text text-transparent">
                  Action
                </span>
              </th>
            </tr>
          </thead>

          <tbody>
            {workExperiences.map((workExperience) => (
              <tr
                key={workExperience.id}
                className="border-b border-black/20 text-sm"
              >
                <td className="py-3 pr-3 max-w-[150px]">
                  <div className="truncate">{workExperience.category}</div>
                </td>

                <td className="p-3 max-w-[180px]">
                  <div className="truncate">{workExperience.role}</div>
                </td>

                <td className="p-3 max-w-[180px]">
                  <div className="truncate">{workExperience.company}</div>
                </td>

                <td className="p-3 max-w-[100px]">
                  <div className="truncate">{workExperience.period}</div>
                </td>

                <td className="p-3 max-w-[250px]">
                  <div className="truncate">{workExperience.bullets}</div>
                </td>

                <td className="p-3">
                  {workExperience.logo_url && (
                    <div className="h-6 w-full shrink-0">
                      {" "}
                      <img
                        src={workExperience.logo_url}
                        alt={workExperience.company}
                        className="w-auto h-full object-cover rounded"
                      />
                    </div>
                  )}
                </td>

                <td className="sticky  right-0 bg-white flex items-center gap-3 p-3 w-full text-center">
                  <div className="action-dropdown flex items-center space-x-3">
                    <button
                      onClick={() => {
                        setSelectedWorkExperience(workExperience);
                        setActionModal("detail");
                      }}
                      className="text-xl leading-none border border-green-500 w-5 h-5 flex justify-center items-center rounded-sm bg-green-500/10 hover:shadow-md hover:bg-green-500/15 cursor-pointer duration-300"
                    >
                      <i class="bi bi-eye text-sm  text-green-500 leading-none"></i>
                    </button>

                    <button
                      onClick={() => {
                        setSelectedWorkExperience(workExperience);
                        setActionModal("edit");
                      }}
                      className="text-xl leading-none  border  border-biru w-5 h-5 flex justify-center items-center rounded-sm bg-biru/10 hover:shadow-md hover:bg-biru/15 cursor-pointer duration-300"
                    >
                      <i class="bi bi-pencil-square text-sm leading-none text-biru "></i>
                    </button>

                    <button
                      onClick={() => {
                        setSelectedWorkExperience(workExperience);
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
        className="h-2 w-[400px] mx-auto mt-4 bg-[#ECECEC] rounded-full relative cursor-pointer"
      >
        <div
          ref={thumbRef}
          className="absolute top-0 left-0 h-2 min-w-[40px] rounded-full bg-linear-to-r from-biru to-hijau cursor-grab"
        />
      </div>

      {showModal && (
        <AddWorkExperienceModal
          onClose={() => setShowModal(false)}
          onSuccess={() => {
            setShowModal(false);
            getWorkExperiences();
          }}
        />
      )}

      {actionModal === "detail" && selectedWorkExperience && (
        <DetailWorkExperience
          workExperience={selectedWorkExperience}
          onClose={() => {
            setActionModal(null);
            setSelectedWorkExperience(null);
          }}
        />
      )}

      {actionModal === "edit" && selectedWorkExperience && (
        <UpdateWorkExperience
          workExperience={selectedWorkExperience}
          onClose={() => {
            setActionModal(null);
            setSelectedWorkExperience(null);
          }}
          onSuccess={() => {
            setActionModal(null);
            setSelectedWorkExperience(null);
            getWorkExperiences();
          }}
        />
      )}

      {actionModal === "delete" && selectedWorkExperience && (
        <DeleteWorkExperience
          workExperience={selectedWorkExperience}
          onClose={() => {
            setActionModal(null);
            setSelectedWorkExperience(null);
          }}
          onSuccess={() => {
            setActionModal(null);
            setSelectedWorkExperience(null);
            getWorkExperiences();
          }}
        />
      )}
    </div>
  );
};

export default DataWorkExperiences;

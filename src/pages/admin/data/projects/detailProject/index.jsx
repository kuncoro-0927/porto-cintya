const DetailProject = ({ onClose, project }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-5">
      <div className="w-full max-w-xl max-h-[90vh] overflow-y-auto bg-white rounded-2xl p-6 scrollbar-hide">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-semibold">Detail Project</h2>

          <button
            onClick={onClose}
            className="text-2xl text-gray-400 hover:text-black cursor-pointer"
          >
            ×
          </button>
        </div>

        <div className="flex flex-col gap-6 text-sm ">
          <p className="bg-linear-to-r font-medium from-biru to-hijau bg-clip-text text-transparent">
            Category: <br />{" "}
            <span className="text-[#6c6c6c] font-normal">
              {project.category}
            </span>
          </p>
          <p className="bg-linear-to-r font-medium from-biru to-hijau bg-clip-text text-transparent">
            Title: <br />
            <span className="text-[#6c6c6c] font-normal">{project.title}</span>
          </p>
          <p className="bg-linear-to-r font-medium from-biru to-hijau bg-clip-text text-transparent">
            Subtitle: <br />
            <span className="text-[#6c6c6c] font-normal">
              {project.subtitle}
            </span>
          </p>
          <p className="bg-linear-to-r font-medium from-biru to-hijau bg-clip-text text-transparent">
            Year: <br />
            <span className="text-[#6c6c6c] font-normal"> {project.year}</span>
          </p>
          <div>
            <p className="bg-linear-to-r font-medium from-biru to-hijau bg-clip-text text-transparent">
              Description:
            </p>

            <ul className="mt-2 list-disc pl-5 text-[#6c6c6c] font-normal space-y-2">
              {project.bullets?.map((bullet, index) => (
                <li key={index}>{bullet}</li>
              ))}
            </ul>
          </div>
          <p className="bg-linear-to-r font-medium from-biru to-hijau bg-clip-text text-transparent">
            Description Lanjutan (Opsional): <br />
            <span className="text-[#6c6c6c] font-normal">
              {project.description_2 || "Tidak ada"}
            </span>
          </p>
          <p className="bg-linear-to-r font-medium from-biru to-hijau bg-clip-text text-transparent">
            Software: <br />
            <span className="text-[#6c6c6c] font-normal">
              {project.software}
            </span>
          </p>

          <div className="flex flex-col gap-2 max-w-[300px]">
            <p className="bg-linear-to-r font-medium from-biru to-hijau bg-clip-text text-transparent">
              Image:
            </p>

            {project.image_url && (
              <img src={project.image_url} alt={project.title} />
            )}
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-10">
          {" "}
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm rounded-lg bg-gray-100 text-[#6c6c6c] cursor-pointer hover:-translate-y-0.5 hover:shadow-md duration-300"
          >
            tutup
          </button>
        </div>
      </div>
    </div>
  );
};

export default DetailProject;

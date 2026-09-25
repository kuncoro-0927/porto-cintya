import { useState } from "react";
import { supabase } from "../../../../../lib/supabaseClient";
const DeleteWorkExperience = ({ workExperience, onClose, onSuccess }) => {
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    setDeleting(true);

    try {
      const { error } = await supabase
        .from("work_experiences")
        .delete()
        .eq("id", workExperience.id);

      if (error) {
        throw error;
      }

      onSuccess();
    } catch (error) {
      console.error(error);
      alert(error.message);
    } finally {
      setDeleting(false);
    }
  };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-5">
      <div className="w-full max-w-md max-h-[90vh] overflow-y-auto bg-white rounded-2xl p-6 scrollbar-hide">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-semibold">Hapus Project</h2>

          <button
            onClick={onClose}
            className="text-2xl text-gray-400 hover:text-black cursor-pointer"
          >
            ×
          </button>
        </div>

        <div className="">
          <p className=" font-medium text-sm text-left flex flex-col gap-1 justify-center">
            yakin con enih mau dihapus? <br />
            <span className="text-[#6c6c6c] font-normal text-sm">
             yauda sih kl mau dihps, tp gbs dibalikin lgi, mks
            </span>
          </p>

          <div className="flex items-center text-sm justify-end mt-6 gap-3">
            <button
              className="bg-gray-100 text-[#6c6c6c] px-4 py-2 rounded-md hover:-translate-y-0.5 hover:shadow-md duration-300 cursor-pointer"
              onClick={onClose}
            >
              gjd hps
            </button>

            <button
              onClick={handleDelete}
              disabled={deleting}
              className="bg-red-500 px-4 py-2 rounded-md text-white hover:-translate-y-0.5 hover:shadow-md duration-300 cursor-pointer"
            >
              {deleting ? "ngehapus..." : "hapus"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteWorkExperience;

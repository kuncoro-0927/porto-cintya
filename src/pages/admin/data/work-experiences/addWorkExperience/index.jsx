import { useState } from "react";
import { supabase } from "../../../../../lib/supabaseClient";
import { toast } from "react-toastify";
const AddWorkExperienceModal = ({ onClose, onSuccess }) => {
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [uploading, setUploading] = useState(false);

  const [form, setForm] = useState({
    category: "",
    role: "",
    company: "",
    period: "",
    start_date: "",
    end_date: "",
    bullets: "",
    image_url: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!imageFile) {
      toast.error("PILIH GAMBAR DULU KOCAK");
      return;
    }

    if (imageFile && imageFile.size > 100 * 1024) {
      toast.error("GAMBAR MAX 100 KB AJA KOCAK");
      return;
    }

    setUploading(true);

    try {
      const fileExt = imageFile.name.split(".").pop();
      const fileName = `${Date.now()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from("work-experiences")
        .upload(fileName, imageFile);

      if (uploadError) {
        throw uploadError;
      }

      const bullets = form.bullets
        .split("\n")
        .map((item) => item.trim())
        .filter(Boolean);

      const { data: publicUrlData } = supabase.storage
        .from("work-experiences")
        .getPublicUrl(fileName);

      const imageUrl = publicUrlData.publicUrl;

      const { error } = await supabase.from("work_experiences").insert([
        {
          category: form.category,
          role: form.role,
          company: form.company,
          start_date: form.start_date,
          end_date: form.end_date,
          bullets: bullets,
          logo_url: imageUrl,
        },
      ]);

      if (error) {
        throw error;
      }

      onSuccess();
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    } finally {
      setUploading(false);
      toast.success("slmt, udah nambah y. mks");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-5">
      <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white rounded-2xl p-6 scrollbar-hide">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-semibold">Tambah Pengalaman</h2>

          <button
            onClick={onClose}
            className="text-2xl text-gray-400 hover:text-black cursor-pointer"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="category"
              className="text-sm font-medium text-gray-700"
            >
              Category
            </label>

            <input
              id="category"
              name="category"
              placeholder="Contoh: Internship or Contract"
              value={form.category}
              onChange={handleChange}
              required
              aria-describedby="title-info"
              className="rounded-lg text-sm border border-gray-300 px-4 py-3 outline-none
      focus:border-transparent
      focus:[background:linear-gradient(white,white)_padding-box,linear-gradient(to_right,var(--color-biru),var(--color-hijau))_border-box]"
            />

            <p id="category-info" className="text-xs text-gray-500">
              jenis pengalaman ya ini
            </p>
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="role" className="text-sm font-medium text-gray-700">
              Role
            </label>

            <input
              id="role"
              name="role"
              required
              placeholder="Contoh: Payment System Policy & Oversight (TIKSPPUR)"
              value={form.role}
              onChange={handleChange}
              aria-describedby="role-info"
              className="rounded-lg text-sm border border-gray-300 px-4 py-3 outline-none
      focus:border-transparent
      focus:[background:linear-gradient(white,white)_padding-box,linear-gradient(to_right,var(--color-biru),var(--color-hijau))_border-box]"
            />

            <p id="role-info" className="text-xs text-gray-500">
              kalo ini posisi, jadi apa gtu gatau
            </p>
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="company" className="text-sm font-medium">
              Company
            </label>

            <input
              name="company"
              placeholder="Contoh: KPw Bank Indonesia Provinsi Jawa Tengah"
              value={form.company}
              onChange={handleChange}
              required
              aria-describedby="company-info"
              className="rounded-lg text-sm border border-gray-300 px-4 py-3 outline-none
      focus:border-transparent
      focus:[background:linear-gradient(white,white)_padding-box,linear-gradient(to_right,var(--color-biru),var(--color-hijau))_border-box]"
            />

            <p id="company-info" className="text-xs text-gray-500">
              yang ini nama perusahaannya
            </p>
          </div>

          {/* <div className="flex flex-col gap-1.5">
            <label htmlFor="title" className="text-sm font-medium">
              Periode
            </label>

            <input
              name="period"
              placeholder="Contoh: April - May 2025"
              value={form.period}
              onChange={handleChange}
              aria-describedby="period-info"
              className="rounded-lg text-sm border border-gray-300 px-4 py-3 outline-none
      focus:border-transparent
      focus:[background:linear-gradient(white,white)_padding-box,linear-gradient(to_right,var(--color-biru),var(--color-hijau))_border-box]"
            />

            <p id="period-info" className="text-xs text-gray-500">
              tau lah ya ini apaan
            </p>
          </div> */}

          <div className="flex items-center gap-3 w-full">
            <div className="flex flex-col gap-1.5 w-full">
              <label htmlFor="start_date" className="text-sm font-medium">
                Tanggal Mulai
              </label>

              <input
                id="start_date"
                name="start_date"
                type="date"
                value={form.start_date}
                onChange={handleChange}
                className="rounded-lg text-sm border border-gray-300 px-4 py-3 outline-none
      focus:border-transparent
      focus:[background:linear-gradient(white,white)_padding-box,linear-gradient(to_right,var(--color-biru),var(--color-hijau))_border-box]"
                required
              />
              <p id="company-info" className="text-xs text-gray-500">
                tgl mulai km bekerja
              </p>
            </div>

            <div className="flex flex-col gap-1.5 w-full">
              <label htmlFor="end_date" className="text-sm font-medium">
                Tanggal Selesai
              </label>

              <input
                id="end_date"
                name="end_date"
                type="date"
                value={form.end_date}
                onChange={handleChange}
                className="rounded-lg text-sm border border-gray-300 px-4 py-3 outline-none
      focus:border-transparent
      focus:[background:linear-gradient(white,white)_padding-box,linear-gradient(to_right,var(--color-biru),var(--color-hijau))_border-box]"
                required
              />
              <p id="company-info" className="text-xs text-gray-500">
                tgl selesai km bekerja
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="bullets" className="text-sm font-medium">
              Job Description
            </label>

            <textarea
              name="bullets"
              placeholder={`Contoh:
Job Description 1: Validated and structured data for 30+ MSMEs during Business Matching UMKM Gayeng 2025.
Job Description2: Identified high-potential destinations for QRIS Jelajah Indonesia 2025.`}
              value={form.bullets}
              onChange={handleChange}
              rows="6"
              required
              aria-describedby="description-01-info"
              className="rounded-lg text-sm border border-gray-300 px-4 py-3 outline-none
      focus:border-transparent
      focus:[background:linear-gradient(white,white)_padding-box,linear-gradient(to_right,var(--color-biru),var(--color-hijau))_border-box]"
            />

            <p id="bullets-info" className="text-xs text-gray-500">
              ini penting nih, kl job nya banyak, tolong beda baris y, mks (pake
              enter! biar beda baris)
            </p>
          </div>

          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="image"
              className="text-sm font-medium text-gray-700"
            >
              Logo Company
            </label>

            <input
              id="image"
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files[0];

                if (!file) return;

                setImageFile(file);
                setImagePreview(URL.createObjectURL(file));
              }}
              className="rounded-lg border border-gray-300 px-4 py-3 text-sm"
            />

            <p id="title-info" className="text-xs  text-gray-500">
              logo tempat km mengabdi - max 100kb aja ya hhh
            </p>

            {imagePreview && (
              <div className="mt-2 overflow-hidden rounded-lg border border-gray-200 w-full max-w-20  mx-auto h-full">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
              </div>
            )}
          </div>

          <div className="col-span-2 flex justify-end gap-3 mt-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg text-sm text-[#6c6c6c] bg-gray-100 cursor-pointer hover:-translate-y-0.5 hover:shadow-md duration-300"
            >
              gjd tambah
            </button>

            <button
              type="submit"
              disabled={uploading}
              className="px-4 py-2 text-sm rounded-lg bg-linear-to-r from-biru to-hijau text-white disabled:opacity-50 cursor-pointer hover:-translate-y-0.5 hover:shadow-md duration-300"
            >
              {uploading ? "nambah..." : "tambah"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddWorkExperienceModal;

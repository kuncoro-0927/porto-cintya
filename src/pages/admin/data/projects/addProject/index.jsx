import { useState } from "react";
import { supabase } from "../../../../../lib/supabaseClient";
const AddProjectModal = ({ onClose, onSuccess }) => {
  const [imageFile, setImageFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [form, setForm] = useState({
    category: "",
    title: "",
    slug: "",
    subtitle: "",
    year: "",
    event: "",
    description_1: "",
    description_2: "",
    software: "",
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
      alert("Pilih gambar terlebih dahulu");
      return;
    }

    setUploading(true);

    try {
      const fileExt = imageFile.name.split(".").pop();
      const fileName = `${Date.now()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from("projects")
        .upload(fileName, imageFile);

      if (uploadError) {
        throw uploadError;
      }

      const { data: publicUrlData } = supabase.storage
        .from("projects")
        .getPublicUrl(fileName);

      const imageUrl = publicUrlData.publicUrl;

      const { error } = await supabase.from("projects").insert([
        {
          ...form,
          image_url: imageUrl,
        },
      ]);

      if (error) {
        throw error;
      }

      onSuccess();
    } catch (error) {
      console.error(error);
      alert(error.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-5">
      <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white rounded-2xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">Add Project</h2>

          <button
            onClick={onClose}
            className="text-2xl text-gray-400 hover:text-black"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            className="border rounded-lg px-4 py-3 bg-white"
            required
          >
            <option value="" disabled>
              Select Category
            </option>

            <option value="Data Analysis">Data Analysis</option>

            <option value="Dashboard">Dashboard</option>

            <option value="Infographics">Infographics</option>
          </select>

          <input
            name="title"
            placeholder="Title"
            value={form.title}
            onChange={handleChange}
            className="border rounded-lg px-4 py-3"
            required
          />

          <input
            name="slug"
            placeholder="Slug"
            value={form.slug}
            onChange={handleChange}
            className="border rounded-lg px-4 py-3"
          />

          <input
            name="subtitle"
            placeholder="Subtitle"
            value={form.subtitle}
            onChange={handleChange}
            className="border rounded-lg px-4 py-3"
          />

          <input
            name="year"
            placeholder="Year"
            value={form.year}
            onChange={handleChange}
            className="border rounded-lg px-4 py-3"
          />

          <input
            name="event"
            placeholder="Event"
            value={form.event}
            onChange={handleChange}
            className="border rounded-lg px-4 py-3"
          />

          <input
            name="software"
            placeholder="Software"
            value={form.software}
            onChange={handleChange}
            className="border rounded-lg px-4 py-3 col-span-2"
          />

          <textarea
            name="description_1"
            placeholder="Description 1"
            value={form.description_1}
            onChange={handleChange}
            className="border rounded-lg px-4 py-3 col-span-2"
            rows="4"
          />

          <textarea
            name="description_2"
            placeholder="Description 2"
            value={form.description_2}
            onChange={handleChange}
            className="border rounded-lg px-4 py-3 col-span-2"
            rows="4"
          />

          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImageFile(e.target.files[0])}
            className="border rounded-lg px-4 py-3 col-span-2"
          />

          <div className="col-span-2 flex justify-end gap-3 mt-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-3 rounded-lg bg-gray-100"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={uploading}
              className="px-5 py-3 rounded-lg bg-black text-white disabled:opacity-50"
            >
              {uploading ? "Uploading..." : "Add Project"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProjectModal;

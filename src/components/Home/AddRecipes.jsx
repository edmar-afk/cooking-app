import React, { useState } from "react";
import { Modal, Box } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import api from "../../assets/api";

function AddRecipes({ onUploadSuccess }) {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    name: "",
    description: "",
    serve: "",
    category: "",
    image: null,
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFile = (e) => {
    setForm({ ...form, image: e.target.files[0] });
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("description", form.description);
    formData.append("title", form.description);
    formData.append("serve", form.serve);
    formData.append("category", form.category);
    formData.append("image", form.image);

    const res = await api.post("/api/upload-food/", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    console.log("Uploaded Food Item:", res.data);
    setOpen(false);

    if (onUploadSuccess) onUploadSuccess(); // <-- refresh foods
  };

  return (
    <div>
      <p
        onClick={() => setOpen(true)}
        className="text-blue-500 mb-0.5 text-xs font-bold flex flex-row items-center gap-1 cursor-pointer"
      >
        <AddCircleIcon className="mt-0.5" /> Add Recipe
      </p>

      <Modal open={open} onClose={() => setOpen(false)}>
        <Box
          className="bg-white rounded-xl p-6 shadow-xl"
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 380,
            maxHeight: "85vh",
            overflowY: "auto",
          }}
        >
          <h2 className="text-xl font-bold mb-4 text-gray-800">Add Recipe</h2>

          <form className="space-y-4">
            <div>
              <label className="font-semibold text-gray-700 text-sm">
                Name
              </label>
              <input
                type="text"
                name="name"
                placeholder="Adobong Baki"
                value={form.name}
                onChange={handleChange}
                className="w-full mt-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            <div>
              <label className="font-semibold text-gray-700 text-sm">
                Description
              </label>
              <textarea
                name="description"
                placeholder="Adobong Crispy Baki nga lami kaayo"
                rows="3"
                value={form.description}
                onChange={handleChange}
                className="w-full mt-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none resize-none"
              ></textarea>
            </div>

            <div>
              <label className="font-semibold text-gray-700 text-sm">
                Serve (Person)
              </label>
              <input
                type="number"
                name="serve"
                placeholder="1-2, 3, 4, 10"
                value={form.serve}
                onChange={handleChange}
                className="w-full mt-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            <div>
              <label className="font-semibold text-gray-700 text-sm">
                Category
              </label>
              <select
                name="category"
                value={form.category}
                onChange={handleChange}
                className="w-full mt-1 px-3 py-2 border rounded-lg bg-white focus:ring-2 focus:ring-blue-500 outline-none"
              >
                <option value="">Select Category</option>
                <option value="Chicken">Chicken</option>
                <option value="Pork">Pork</option>
                <option value="Beef">Beef</option>
                <option value="Seafood">Seafood</option>
                <option value="Vegetable">Vegetable</option>
                <option value="Noodles">Noodles</option>
                <option value="Snacks">Snacks</option>
              </select>
            </div>

            <div>
              <label className="font-semibold text-gray-700 text-sm">
                Food Image
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleFile}
                className="w-full mt-1"
              />
            </div>

            <button
              type="button"
              onClick={handleSubmit}
              className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              Submit
            </button>

            <button
              type="button"
              onClick={() => setOpen(false)}
              className="w-full bg-red-500 text-white py-2 rounded-lg font-semibold hover:bg-red-600 transition"
            >
              Close
            </button>
          </form>
        </Box>
      </Modal>
    </div>
  );
}

export default AddRecipes;

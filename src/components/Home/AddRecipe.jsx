import React, { useState } from "react";
import { Modal, Box } from "@mui/material";
import api from "../../assets/api";

function AddRecipe({ foodItemId, onSuccess  }) {
  const [open, setOpen] = useState(false);
  const [recipes, setRecipes] = useState("");
  const [instruction, setInstruction] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("recipes", recipes);
    formData.append("instruction", instruction);

    await api.post(`/api/fooditems/${foodItemId}/recipes/`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    setOpen(false);
    setRecipes("");
    setInstruction("");

    if (onSuccess) onSuccess(); // <-- notify parent
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="px-4 py-2 mt-8 bg-blue-600 text-white rounded-lg"
      >
        Add Recipe
      </button>

      <Modal open={open} onClose={() => setOpen(false)}>
        <Box className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-xl w-[95%] shadow-xl">
          <h2 className="text-xl font-bold mb-4">Add food name and its description</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Recipes</label>
              <textarea
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
                placeholder={`Onions 1/2\nPotato 2pcs\ncarrots 3 slices`}
                value={recipes}
                onChange={(e) => setRecipes(e.target.value)}
                rows={8}
                required
              ></textarea>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Instruction
              </label>
              <textarea
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
                placeholder={`Step 1: Washed Onions\nStep 2: Washed Potatoes\nStep 3: Slice them ALL`}
                value={instruction}
                onChange={(e) => setInstruction(e.target.value)}
                rows={8}
                required
              ></textarea>
            </div>

            <div className="flex justify-end space-x-3 pt-3">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="px-4 py-2 bg-gray-300 rounded-lg"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="px-4 py-2 bg-green-600 text-white rounded-lg"
              >
                Save
              </button>
            </div>
          </form>
        </Box>
      </Modal>
    </>
  );
}

export default AddRecipe;

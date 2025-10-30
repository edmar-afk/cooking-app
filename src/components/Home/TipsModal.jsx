import React from "react";
import Drawer from "@mui/material/Drawer";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

function TipsModal({ open, onClose, title, description, image }) {
  return (
    <Drawer
      anchor="bottom"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          borderTopLeftRadius: 18,
          borderTopRightRadius: 18,
          p: 3,
        },
      }}
    >
      <div className="flex flex-col items-center text-center">
        <img src={image} alt="" className="w-16 mb-2" />
        <Typography variant="h6" fontWeight="bold">
          {title}
        </Typography>
        <Typography sx={{ mt: 1 }}>{description}</Typography>
      </div>
    </Drawer>
  );
}

export default TipsModal;

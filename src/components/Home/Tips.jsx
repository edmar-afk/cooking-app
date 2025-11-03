import React, { useState } from "react";
import TipsModal from "./TipsModal";
import tipsLists from "./tipsLists";

function Tips() {
  const [open, setOpen] = useState(false);
  const [selectedTip, setSelectedTip] = useState({});

  const handleOpen = (tip) => {
    setSelectedTip(tip);
    setOpen(true);
  };

  return (
    <>
      <div className="mt-8">
        <h1 className="font-bold">Healthy Tips</h1>

        <div className="flex flex-row mt-4 gap-4">
          <div className="p-5 w-full rounded-md relative overflow-hidden custom-bg-orange custom-text-white cursor-pointer">
            <svg
              className="absolute bottom-0 left-0 mb-8"
              viewBox="0 0 375 283"
              fill="none"
              style={{ transform: "scale(1.5)", opacity: 0.1 }}
            >
              <rect
                x="159.52"
                y="175"
                width="152"
                height="152"
                rx="8"
                transform="rotate(-45 159.52 175)"
                fill="white"
              />
              <rect
                y="107.48"
                width="152"
                height="152"
                rx="8"
                transform="rotate(-45 0 107.48)"
                fill="white"
              />
            </svg>
            <p className="font-extrabold">{tipsLists[0].title}</p>
            <p className="text-xs mt-2">{tipsLists[0].description}</p>
          </div>
        </div>

        <div className="flex flex-row flex-wrap mt-12 justify-evenly">
          {tipsLists.slice(1).map((tip, index) => (
            <div
              key={index}
              onClick={() => handleOpen(tip)}
              className="flex flex-col w-[100px] items-center mb-8 cursor-pointer"
            >
              <img src={tip.image} className="w-12 " alt="" />
              <p className="text-center font-semibold text-xs mt-2">
                {tip.title}
              </p>
            </div>
          ))}
        </div>
      </div>

      <TipsModal
        open={open}
        onClose={() => setOpen(false)}
        title={selectedTip.title}
        description={selectedTip.description}
        image={selectedTip.image}
      />
    </>
  );
}

export default Tips;

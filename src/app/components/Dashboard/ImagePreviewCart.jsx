import React from "react";

const ImagePreviewCart = ({ imgURL, callback }) => {
  return (
    <div
      className="w-full h-72 bg-cover"
      style={{
        backgroundImage: `url(${imgURL})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <div className="text-right mr-2">
        <button size="icon" className="mt-2 btn btn-circle" onClick={callback}>
          X
        </button>
      </div>
    </div>
  );
};

export default ImagePreviewCart;

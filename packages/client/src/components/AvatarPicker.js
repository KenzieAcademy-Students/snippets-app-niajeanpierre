import React from "react";
import { useState } from "react";

const ChooseAvatar = ({ avatars, presentAvatar, handlePresentAvatar }) => {
  
  return (
    <div>
      {avatars.map((avatar, index) => (
        <img
          key={index}
          src={avatar}
          alt={`Avatar ${index}`}
          style={{
            border: presentAvatar === index ? "4px double yellow" : "none",
            cursor: "pointer",
            margin: "10px",
            width: "25%",
          }}
          onClick={() => {
            handlePresentAvatar(index, avatar);
          }}
        />
      ))}
    </div>
  );
};

export default ChooseAvatar;

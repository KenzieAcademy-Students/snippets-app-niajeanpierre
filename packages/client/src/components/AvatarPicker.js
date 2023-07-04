import React from "react";
import FileUploader from "components/FileUploader";

const ChooseAvatar = ({ 
  avatars,
  presentAvatar,
  handlePresentAvatar,
  // profileImage,
  setProfileImage,
  // imgs,
  // profileImageSelector
 }) => {
  
  return (
    <div>
      {avatars.map((avatar, index) => (
        <img
          key={index}
          src={"/" + avatar}
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
      <FileUploader setProfileImage={setProfileImage} />
    </div>
  );
};

export default ChooseAvatar;

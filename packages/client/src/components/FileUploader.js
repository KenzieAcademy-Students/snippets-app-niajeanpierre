import axios from "axios";

function FileUploader({ setProfileImage }) {
  const handleImageUpload = async (e) => {
    e.preventDefault();
    const [file] = e.target.files;
    if (file) {
      const formData = new FormData();
      FormData.append("file", file);
      try {
        const response = await axios.post("/api/upload", formData);
        const fileURL = response.data.filePath;
        console.log(fileURL);
        setProfileImage(`/images/${file.name}`);
      } catch (error) {}
    }
  }

  return (
    <div>
      <input
      type="file"
      name="name"
      onChange={handleImageUpload}
      >
      </input>
    </div>
  );
}

export default FileUploader
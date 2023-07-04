import Router from "express";
import path from "path";
import express from "express";


const router = express.Router();

router.post("/", (req, res) => {
  console.log("Houston we have a problem");
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send("No uploads were founds.")
  }

  const fileUploaded = req.files.file;
  const pathUpload = path.join(
    __dirname + "../../public/images",
    fileUploaded.name
  );
  fileUploaded.mv(pathUpload, (err) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ error: "file failed to save" })
    }
  });

  res.json({ filePath: pathUpload });
});

module.exports = router;
const express = require("express");
const app = express();
const path = require("path");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const { mergePdf } = require("./merge");

const port = 3000;

app.use("/static", express.static("public"));

// respond with "hello world" when a GET request is made to the homepage
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "templates/index.html"));
});

app.post("/merge", upload.array("pdfs", 2), async (req, res, next) => {
  console.log(req.files);
  let d = await mergePdf(
    path.join(__dirname, req.files[0].path),
    path.join(__dirname, req.files[1].path)
  );
  //   res.send({ data: req.files });
  res.redirect(`http://localhost:3000/static/${d}.pdf`);
});

app.listen(port, () => {
  console.log(`server on ${port}`);
});

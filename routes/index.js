let express = require("express"),
  multer = require("multer"),
  mongoose = require("mongoose"),
  uuidv4 = require("uuid/v4"),
  router = express.Router();
const DIR = "./public/";
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, DIR);
  },
  filename: (req, file, cb) => {
    const fileName = file.originalname.toLowerCase().split(" ").join("-");
    cb(null, uuidv4() + "-" + fileName);
  },
});
var upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/jpeg"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error("Only .png, .jpg and .jpeg format allowed!"));
    }
  },
});
// User model
let Image = require("../models/Image");
router.post("/image", upload.single("image"), (req, res, next) => {
  const url = req.protocol + "://" + req.get("host");
  const user = new Image({
    _id: new mongoose.Types.ObjectId(),
    image: url + "/public/" + req.file.filename,
  });
  user
    .save()
    .then((result) => {
      res.status(201).json({
        message: "Image registered successfully!",
        imageCreated: {
          _id: result._id,
        },
      });
    })
    .catch((err) => {
      console.log(err),
        res.status(500).json({
          error: err,
        });
    });
});
router.get("/", (req, res, next) => {
  Image.find().then((data) => {
    res.status(200).json({
      message: "Images list retrieved successfully!",
      images: data,
    });
  });
});

router.get("/one", (req, res, next) => {
  const { id } = req.query;
  Image.findById(id).then((data) => {
    res.status(200).json({
      message: "Image retrieved successfully!",
      image: data,
    });
  });
});
module.exports = router;

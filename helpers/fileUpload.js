const multer = require("multer");

const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public');
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split("/")[1];
    cb(null, `images/admin-${file.fieldname}-${Date.now()}.${ext}`);
  },
});

const multerFilter = (req, file, cb) => {
  if (['jpg', 'JPG', 'png', 'PNG', 'jpeg', 'JPEG', 'svg', 'SVG'].includes(file.mimetype.split("/")[1])) {
    cb(null, true);
  } else {
    cb(new Error("Not supported file type!!"), false);
  }
};

exports.upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

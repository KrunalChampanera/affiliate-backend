const router  = require("express").Router();
const multer  = require("multer");
const {
  getBlogs,
  getBlog,
  createBlog,
  updateBlog,
  deleteBlog,
} = require("../controllers/blogController");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

router.get("/",      getBlogs);
router.get("/:id",   getBlog);
router.post("/",     upload.single("image"), createBlog);
// router.put("/:id",   upload.single("image"), updateBlog);
router.delete("/:id", deleteBlog);

router.put("/:id", (req, res, next) => {
  console.log("=== PUT HIT ===", req.params.id)
  console.log("=== BODY ===", req.body)
  next()
}, upload.single("image"), updateBlog);

module.exports = router;
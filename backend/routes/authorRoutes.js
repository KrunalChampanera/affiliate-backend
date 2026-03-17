const router  = require("express").Router()
const multer  = require("multer")
const {
  getAuthors,
  getAuthor,
  createAuthor,
  updateAuthor,
  deleteAuthor,
} = require("../controllers/authorController")

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename:    (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
})
const upload = multer({ storage })

router.get("/",       getAuthors)
router.get("/:id",    getAuthor)
router.post("/",      upload.single("image"), createAuthor)
router.put("/:id",    upload.single("image"), updateAuthor)
router.delete("/:id", deleteAuthor)

module.exports = router
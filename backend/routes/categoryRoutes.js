const router = require("express").Router();
const auth = require("../middlewares/authMiddleware");
const admin = require("../middlewares/adminMiddleware");

const {
  createCategory,
  getCategories,
  updateCategory,
  deleteCategory,
  getSingleCategory
} = require("../controllers/categoryController");

router.get("/", getCategories);

router.get("/active", async (req, res) => {
  try {
    const { Category } = require("../models");

    const categories = await Category.findAll({
      where: { status: true },
      order: [["createdAt", "DESC"]]
    });

    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/:id", getSingleCategory);

router.post("/", auth, admin, createCategory);

router.put("/:id", auth, admin, updateCategory);

router.patch("/:id/status", auth, admin, async (req, res) => {
  try {
    const { Category } = require("../models");
    const { id } = req.params;
    const { status } = req.body;

    const category = await Category.findByPk(id);

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    await category.update({ status });

    res.json({ message: "Status updated", category });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete("/:id", auth, admin, deleteCategory);

module.exports = router;
const { Category } = require("../models");
const { Op } = require("sequelize");
const slugify = require("slugify");

exports.createCategory = async (req, res) => {
  try {
    const { name, status } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({ message: "Category name is required" });
    }

    const slug = slugify(name, { lower: true, strict: true });

    const exists = await Category.findOne({ where: { slug } });

    if (exists) {
      return res.status(400).json({ message: "Category already exists" });
    }

    const category = await Category.create({
      name: name.trim(),
      slug,
      status: status !== undefined ? status : true
    });

    res.status(201).json(category);

  } catch (error) {
    console.error("CREATE CATEGORY ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};


exports.getCategories = async (req, res) => {
  try {
    let { search = "", status, page = 1, limit = 10 } = req.query;

    page = parseInt(page);
    limit = parseInt(limit);

    if (isNaN(page) || page < 1) page = 1;
    if (isNaN(limit) || limit < 1) limit = 10;

    const where = {};

    if (search.trim()) {
      where.name = {
        [Op.like]: `%${search.trim()}%`
      };
    }

    if (status !== undefined && status !== "") {
      where.status = status === "true";
    }

    const offset = (page - 1) * limit;

    const { count, rows } = await Category.findAndCountAll({
      where,
      limit,
      offset,
      order: [["createdAt", "DESC"]]
    });

    res.json({
      total: count,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      categories: rows
    });

  } catch (error) {
    console.error("GET CATEGORY ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};


exports.getSingleCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const category = await Category.findByPk(id);

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.json(category);

  } catch (error) {
    console.error("GET SINGLE CATEGORY ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};


exports.updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, status } = req.body;

    const category = await Category.findByPk(id);

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    const updatedData = {};

    if (name && name.trim()) {
      const slug = slugify(name, { lower: true, strict: true });

      const existingSlug = await Category.findOne({ where: { slug } });

      if (existingSlug && existingSlug.id !== category.id) {
        return res.status(400).json({ message: "Category name already exists" });
      }

      updatedData.name = name.trim();
      updatedData.slug = slug;
    }

    if (status !== undefined) {
      updatedData.status = status;
    }

    await category.update(updatedData);

    res.json({
      message: "Category updated successfully",
      category
    });

  } catch (error) {
    console.error("UPDATE CATEGORY ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};


exports.deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const category = await Category.findByPk(id);

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    await category.destroy();

    res.json({ message: "Category deleted successfully" });

  } catch (error) {
    console.error("DELETE CATEGORY ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};
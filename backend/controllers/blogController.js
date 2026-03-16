const { Blog, Category } = require("../models")

// ── GET all blogs ─────────────────────────────────────────────
exports.getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.findAll({
      order: [["createdAt", "DESC"]],
      include: [
        {
          model:      Category,
          as:         "Category",
          attributes: ["id", "name"],
          required:   false,
        }
      ],
    })
    res.json(blogs)
  } catch (error) {
    console.error("getBlogs error:", error.message)
    res.status(500).json({ error: error.message })
  }
}

// ── GET single blog ───────────────────────────────────────────
exports.getBlog = async (req, res) => {
  try {
    const blog = await Blog.findByPk(req.params.id, {
      include: [
        {
          model:      Category,
          as:         "Category",
          attributes: ["id", "name"],
          required:   false,
        }
      ],
    })
    if (!blog) return res.status(404).json({ message: "Blog not found" })
    res.json(blog)
  } catch (error) {
    console.error("getBlog error:", error.message)
    res.status(500).json({ error: error.message })
  }
}

// ── CREATE blog ───────────────────────────────────────────────
exports.createBlog = async (req, res) => {
  try {
    const { title, description, author, CategoryId, showInBlogPage } = req.body

    const blog = await Blog.create({
      title,
      description,
      author,
      image:          req.file ? req.file.filename : null,
      CategoryId:     CategoryId ? parseInt(CategoryId) : null,
      showInBlogPage: showInBlogPage === "1"   ||
                      showInBlogPage === "true" ||
                      showInBlogPage === true,
    })

    const result = await Blog.findByPk(blog.id, {
      include: [{ model: Category, as: "Category", attributes: ["id", "name"], required: false }],
    })

    res.status(201).json(result)
  } catch (error) {
    console.error("createBlog error:", error.message)
    res.status(500).json({ error: error.message })
  }
}

// ── UPDATE blog ───────────────────────────────────────────────
exports.updateBlog = async (req, res) => {
  try {
      console.log("UPDATE BODY:", req.body)  // ← ADD THIS
    console.log("UPDATE FILE:", req.file)
    const blog = await Blog.findByPk(req.params.id)
    if (!blog) return res.status(404).json({ message: "Blog not found" })

    const { title, description, author, CategoryId, showInBlogPage } = req.body
    const image = req.file ? req.file.filename : blog.image

    await blog.update({
      title:       title       ?? blog.title,
      description: description ?? blog.description,
      author:      author      ?? blog.author,
      image,
      CategoryId: CategoryId !== undefined
        ? (CategoryId === "" || CategoryId === null ? null : parseInt(CategoryId))
        : blog.CategoryId,
      showInBlogPage: showInBlogPage !== undefined
        ? (showInBlogPage === "1" || showInBlogPage === "true" || showInBlogPage === true)
        : blog.showInBlogPage,
    })

    const result = await Blog.findByPk(blog.id, {
      include: [{ model: Category, as: "Category", attributes: ["id", "name"], required: false }],
    })

    res.json(result)
  } catch (error) {
    console.error("updateBlog error:", error.message)
    res.status(500).json({ error: error.message })
  }
}

// ── DELETE blog ───────────────────────────────────────────────
exports.deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findByPk(req.params.id)
    if (!blog) return res.status(404).json({ message: "Blog not found" })
    await blog.destroy()
    res.json({ message: "Blog deleted" })
  } catch (error) {
    console.error("deleteBlog error:", error.message)
    res.status(500).json({ error: error.message })
  }
}
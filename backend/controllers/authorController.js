const { Author, Blog } = require("../models")

// ── GET all authors ───────────────────────────────────────────
exports.getAuthors = async (req, res) => {
  try {
    const authors = await Author.findAll({
      order: [["createdAt", "DESC"]],
    })
    res.json(authors)
  } catch (error) {
    console.error("getAuthors error:", error.message)
    res.status(500).json({ error: error.message })
  }
}

// ── GET single author + their blogs ──────────────────────────
exports.getAuthor = async (req, res) => {
  try {
    const author = await Author.findByPk(req.params.id)
    if (!author) return res.status(404).json({ message: "Author not found" })

    // Get blogs by this author's name
    const blogs = await Blog.findAll({
      where: { author: author.name },
      order: [["createdAt", "DESC"]],
    })

    res.json({ author, blogs })
  } catch (error) {
    console.error("getAuthor error:", error.message)
    res.status(500).json({ error: error.message })
  }
}

// ── CREATE author ─────────────────────────────────────────────
exports.createAuthor = async (req, res) => {
  try {
    const { name, email, bio, role, isActive } = req.body

    const author = await Author.create({
      name,
      email,
      bio,
      role:     role     || "Author",
      isActive: isActive !== undefined ? isActive === "true" || isActive === true : true,
      image:    req.file ? req.file.filename : null,
    })

    res.status(201).json(author)
  } catch (error) {
    console.error("createAuthor error:", error.message)
    res.status(500).json({ error: error.message })
  }
}

// ── UPDATE author ─────────────────────────────────────────────
exports.updateAuthor = async (req, res) => {
  try {
    const author = await Author.findByPk(req.params.id)
    if (!author) return res.status(404).json({ message: "Author not found" })

    const { name, email, bio, role, isActive } = req.body
    const image = req.file ? req.file.filename : author.image

    await author.update({
      name:     name     ?? author.name,
      email:    email    ?? author.email,
      bio:      bio      ?? author.bio,
      role:     role     ?? author.role,
      image,
      isActive: isActive !== undefined
        ? (isActive === "true" || isActive === true)
        : author.isActive,
    })

    res.json(author)
  } catch (error) {
    console.error("updateAuthor error:", error.message)
    res.status(500).json({ error: error.message })
  }
}

// ── DELETE author ─────────────────────────────────────────────
exports.deleteAuthor = async (req, res) => {
  try {
    const author = await Author.findByPk(req.params.id)
    if (!author) return res.status(404).json({ message: "Author not found" })
    await author.destroy()
    res.json({ message: "Author deleted" })
  } catch (error) {
    console.error("deleteAuthor error:", error.message)
    res.status(500).json({ error: error.message })
  }
}
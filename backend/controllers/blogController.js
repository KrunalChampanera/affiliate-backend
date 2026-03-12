const Blog = require("../models/Blog");

exports.getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.findAll({
      order: [["createdAt", "DESC"]]
    });
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createBlog = async (req, res) => {
  try {
    const { title, description, author } = req.body;

    const blog = await Blog.create({
      title,
      description,
      author,
      image: req.file ? req.file.filename : null
    });

    res.json(blog);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateBlog = async (req,res)=>{
const blog = await Blog.findByPk(req.params.id);

if(!blog) return res.status(404).json({message:"Blog not found"});

const image = req.file ? req.file.filename : blog.image;

await blog.update({
title:req.body.title,
description:req.body.description,
author:req.body.author,
image
});

res.json(blog);
};

exports.deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findByPk(req.params.id);

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    await blog.destroy();

    res.json({ message: "Blog deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getBlog = async (req, res) => {
  try {
    const blog = await Blog.findByPk(req.params.id);
    res.json(blog);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const { Banner } = require("../models");
const { Op } = require("sequelize");

exports.createBanner = async (req, res) => {
  try {
    const { title, subtitle, buttonText, backgroundColor, position } = req.body;

    const banner = await Banner.create({
      title,
      subtitle,
      buttonText,
      backgroundColor,
      position,
      image: req.file ? req.file.filename : null
    });

    res.status(201).json(banner);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAllBanners = async (req, res) => {
  try {
    const banners = await Banner.findAll({
      order: [["createdAt", "DESC"]]
    });

    res.json(banners);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getTopDealBanners = async (req, res) => {
  try {
    const banners = await Banner.findAll({
      where: {
        position: {
          [Op.in]: ["top-deal-1", "top-deal-2"]
        }
      },
      order: [["createdAt", "DESC"]]
    });

    res.json(banners);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateBanner = async (req, res) => {
  try {
    const banner = await Banner.findByPk(req.params.id);

    if (!banner) {
      return res.status(404).json({ message: "Banner not found" });
    }

    await banner.update({
      title: req.body.title,
      subtitle: req.body.subtitle,
      buttonText: req.body.buttonText,
      backgroundColor: req.body.backgroundColor,
      position: req.body.position,
      image: req.file ? req.file.filename : banner.image
    });

    res.json(banner);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteBanner = async (req, res) => {
  try {
    const banner = await Banner.findByPk(req.params.id);

    if (!banner) {
      return res.status(404).json({ message: "Banner not found" });
    }

    await banner.destroy();

    res.json({ message: "Banner deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
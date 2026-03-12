// const { Product, Category } = require("../models");
// const { Op } = require("sequelize");

// exports.createProduct = async (req, res) => {
//   try {
//     const {
//       title,
//       description,
//       price,
//       rating,
//       CategoryId,
//       isTopDeal,
//       isPopular,
//       isNew
//     } = req.body;

//     if (!title || !price || !CategoryId || CategoryId === "") {
//       return res.status(400).json({
//         message: "Title, Price and Category are required"
//       });
//     }

//     const product = await Product.create({
//       title: title.trim(),
//       description,
//       price: parseFloat(price),
//       rating: rating ? parseFloat(rating) : 0,
//       isTopDeal: isTopDeal === "true" || isTopDeal === true,
//       isPopular: isPopular === "true" || isPopular === true,
//       isNew: isNew === "true" || isNew === true,
//       CategoryId: parseInt(CategoryId),
//       image: req.file ? req.file.filename : null
//     });

//     res.status(201).json(product);

//   } catch (error) {
//     console.error("CREATE PRODUCT ERROR:", error);
//     res.status(500).json({ message: error.message });
//   }
// };

// s

// exports.getAllProducts = async (req, res) => {
//   try {
//     const { category, popular, topDeal } = req.query;

//     let whereCondition = {};

//     if (popular === "true") {
//       whereCondition.isPopular = true;
//     }

//     if (topDeal === "true") {
//       whereCondition.isTopDeal = true;
//     }

//     const products = await Product.findAll({
//       where: whereCondition,
//       include: [
//         {
//           model: Category,
//           attributes: ["id", "name"]
//         }
//       ],
//       order: [["createdAt", "DESC"]]
//     });

//     let filteredProducts = products;

//     if (category) {
//       filteredProducts = products.filter(
//         (p) =>
//           p.Category &&
//           p.Category.name.toLowerCase() === category.toLowerCase()
//       );
//     }

//     res.json(filteredProducts);

//   } catch (error) {
//     console.error("GET PRODUCTS ERROR:", error);
//     res.status(500).json({ message: error.message });
//   }
// };



// exports.getTopDealProducts = async (req, res) => {
//   try {
//     const products = await Product.findAll({
//       where: { isTopDeal: true },
//       include: [
//         {
//           model: Category,
//           attributes: ["id", "name"]
//         }
//       ],
//       order: [["createdAt", "DESC"]]
//     });

//     res.json(products);

//   } catch (error) {
//     console.error("TOP DEAL ERROR:", error);
//     res.status(500).json({ message: error.message });
//   }
// };




// exports.getPopularProducts = async (req, res) => {
//   try {
//     const products = await Product.findAll({
//       where: { isPopular: true },
//       include: [
//         {
//           model: Category,
//           attributes: ["id", "name"]
//         }
//       ],
//       order: [["createdAt", "DESC"]]
//     });

//     res.json(products);

//   } catch (error) {
//     console.error("POPULAR PRODUCT ERROR:", error);
//     res.status(500).json({ message: error.message });
//   }
// };




// exports.getSingleProduct = async (req, res) => {
//   try {
//     const product = await Product.findByPk(req.params.id, {
//       include: [
//         {
//           model: Category,
//           attributes: ["id", "name"]
//         }
//       ]
//     });

//     if (!product) {
//       return res.status(404).json({ message: "Product not found" });
//     }

//     res.json(product);

//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };



// exports.updateProduct = async (req, res) => {
//   try {
//     const product = await Product.findByPk(req.params.id);

//     if (!product) {
//       return res.status(404).json({ message: "Product not found" });
//     }

//     await product.update({
//       title: req.body.title || product.title,
//       description: req.body.description || product.description,
//       price: req.body.price
//         ? parseFloat(req.body.price)
//         : product.price,
//       rating: req.body.rating
//         ? parseFloat(req.body.rating)
//         : product.rating,
//       isTopDeal:
//         req.body.isTopDeal === "true" ||
//         req.body.isTopDeal === true,
//       isPopular:
//         req.body.isPopular === "true" ||
//         req.body.isPopular === true,
//       isNew:
//         req.body.isNew === "true" ||
//         req.body.isNew === true,
//       CategoryId:
//         req.body.CategoryId && req.body.CategoryId !== ""
//           ? parseInt(req.body.CategoryId)
//           : product.CategoryId,
//       image: req.file
//         ? req.file.filename
//         : product.image
//     });

//     res.json(product);

//   } catch (error) {
//     console.error("UPDATE PRODUCT ERROR:", error);
//     res.status(500).json({ message: error.message });
//   }
// };



// exports.deleteProduct = async (req, res) => {
//   try {
//     const product = await Product.findByPk(req.params.id);

//     if (!product) {
//       return res.status(404).json({ message: "Product not found" });
//     }

//     await product.destroy();

//     res.json({ message: "Product deleted successfully" });

//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

const { Product, Category } = require("../models")

exports.createProduct = async (req, res) => {
  try {

    const {
      title,
      description,
      price,
      rating,
      CategoryId,
      isTopDeal,
      isPopular,
      isNew
    } = req.body

    if (!title || !price || !CategoryId) {
      return res.status(400).json({
        message: "Title, Price and Category are required"
      })
    }

    const product = await Product.create({
      title: title.trim(),
      description,
      price: parseFloat(price),
      rating: rating ? parseFloat(rating) : 0,
      isTopDeal: isTopDeal === "true" || isTopDeal === true,
      isPopular: isPopular === "true" || isPopular === true,
      isNew: isNew === "true" || isNew === true,
      CategoryId: parseInt(CategoryId),
      image: req.file ? req.file.filename : null
    })

    res.status(201).json(product)

  } catch (error) {

    console.error("CREATE PRODUCT ERROR:", error)
    res.status(500).json({ message: error.message })

  }
}

exports.getAllProducts = async (req, res) => {

  try {

    const products = await Product.findAll({
      include: [
        {
          model: Category,
          attributes: ["id", "name"]
        }
      ],
      order: [["createdAt", "DESC"]]
    })

    res.json(products)

  } catch (error) {

    console.error("GET PRODUCTS ERROR:", error)
    res.status(500).json({ message: error.message })

  }

}

exports.getTopDealProducts = async (req, res) => {

  try {

    const products = await Product.findAll({
      where: { isTopDeal: true },
      include: [
        {
          model: Category,
          attributes: ["id", "name"]
        }
      ]
    })

    res.json(products)

  } catch (error) {

    res.status(500).json({ message: error.message })

  }

}

exports.getPopularProducts = async (req, res) => {

  try {

    const products = await Product.findAll({
      where: { isPopular: true },
      include: [
        {
          model: Category,
          attributes: ["id", "name"]
        }
      ]
    })

    res.json(products)

  } catch (error) {

    res.status(500).json({ message: error.message })

  }

}

exports.getSingleProduct = async (req, res) => {

  try {

    const product = await Product.findByPk(req.params.id, {
      include: [
        {
          model: Category,
          attributes: ["id", "name"]
        }
      ]
    })

    if (!product) {
      return res.status(404).json({ message: "Product not found" })
    }

    res.json(product)

  } catch (error) {

    console.error("GET SINGLE PRODUCT ERROR:", error)
    res.status(500).json({ message: error.message })

  }

}

exports.updateProduct = async (req, res) => {

  try {

    const product = await Product.findByPk(req.params.id)

    if (!product) {
      return res.status(404).json({ message: "Product not found" })
    }

    await product.update({
      title: req.body.title || product.title,
      description: req.body.description || product.description,
      price: req.body.price
        ? parseFloat(req.body.price)
        : product.price,
      rating: req.body.rating
        ? parseFloat(req.body.rating)
        : product.rating,
      isTopDeal:
        req.body.isTopDeal === "true" ||
        req.body.isTopDeal === true,
      isPopular:
        req.body.isPopular === "true" ||
        req.body.isPopular === true,
      isNew:
        req.body.isNew === "true" ||
        req.body.isNew === true,
      CategoryId:
        req.body.CategoryId
          ? parseInt(req.body.CategoryId)
          : product.CategoryId,
      image: req.file
        ? req.file.filename
        : product.image
    })

    res.json(product)

  } catch (error) {

    console.error("UPDATE PRODUCT ERROR:", error)
    res.status(500).json({ message: error.message })

  }

}

exports.deleteProduct = async (req, res) => {

  try {

    const product = await Product.findByPk(req.params.id)

    if (!product) {
      return res.status(404).json({ message: "Product not found" })
    }

    await product.destroy()

    res.json({ message: "Product deleted successfully" })

  } catch (error) {

    res.status(500).json({ message: error.message })

  }

}
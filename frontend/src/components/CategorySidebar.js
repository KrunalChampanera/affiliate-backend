import { useState } from "react"
import categories from "../data/categories"
import { FaChevronDown } from "react-icons/fa"

const CategorySidebar = () => {
  const [open, setOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState(null)

  return (
    <div className="position-relative">

      <button
        className="btn w-100 text-white fw-semibold d-flex justify-content-between align-items-center"
        style={{ backgroundColor: "#ff3c2f", borderRadius: 0 }}
        onClick={() => setOpen(!open)}
      >
        Category
        <FaChevronDown />
      </button>

      {open && (
        <div
          className="bg-white shadow position-absolute w-100"
          style={{
            zIndex: 999,
            maxHeight: "500px",
            overflowY: "auto"
          }}
        >
          {categories.map((cat, index) => (
            <div
              key={index}
              className="d-flex align-items-center px-3 py-2 category-item"
              onMouseEnter={() => setActiveIndex(index)}
              onMouseLeave={() => setActiveIndex(null)}
              style={{
                cursor: "pointer",
                backgroundColor:
                  activeIndex === index ? "#ffe5e2" : "white"
              }}
            >
              <span
                className="me-2"
                style={{
                  width: 14,
                  height: 14,
                  borderRadius: "50%",
                  border: "2px solid #ff3c2f",
                  display: "inline-block"
                }}
              ></span>
              {cat}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default CategorySidebar;
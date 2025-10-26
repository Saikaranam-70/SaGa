import React, { useEffect, useState } from "react";
import "./AdminProductPanel.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdminProductPanel = () => {
  const adminId = localStorage.getItem("adminId"); // current admin id
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(null);

  const [product, setProduct] = useState({
    name: "",
    brand: "",
    price: "",
    category: "",
    subCategory: "",
    discount: "",
    description: "",
    stock: "",
    attributes: [],
    adminId: adminId || "",
  });

  // Fetch products added by this admin
  const fetchProducts = () => {
    fetch("http://localhost:8080/product/getAllProducts")
      .then((res) => res.json())
      .then((data) => {
        const adminProducts = data.filter(
          (p) => String(p.addedBy) === String(adminId)
        );
        setProducts(adminProducts);
        setFilteredProducts(adminProducts);
      })
      .catch((err) => console.error("Error fetching products:", err));
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Search filter
  useEffect(() => {
    const lowerSearch = search.toLowerCase();
    const filtered = products.filter(
      (p) =>
        (p.name && p.name.toLowerCase().includes(lowerSearch)) ||
        (p.brand && p.brand.toLowerCase().includes(lowerSearch)) ||
        (p.category && p.category.toLowerCase().includes(lowerSearch)) ||
        (p.subCategory && p.subCategory.toLowerCase().includes(lowerSearch))
    );
    setFilteredProducts(filtered);
  }, [search, products]);

  // Attribute handlers
  const handleAttributeChange = (index, field, value) => {
    const updated = [...product.attributes];
    updated[index][field] = value;
    setProduct({ ...product, attributes: updated });
  };
  const addAttributeField = () =>
    setProduct({
      ...product,
      attributes: [...product.attributes, { key: "", value: "" }],
    });
  const removeAttributeField = (index) =>
    setProduct({
      ...product,
      attributes: product.attributes.filter((_, i) => i !== index),
    });

  // Add or Update product
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!image && !isEditing) {
      toast.error("Please select an image!");
      return;
    }

    setLoading(true);
    const formData = new FormData();
    Object.keys(product).forEach((key) => {
      if (key === "attributes") {
        formData.append(key, JSON.stringify(product.attributes));
      } else {
        formData.append(key, product[key]);
      }
    });
    if (image) formData.append("image", image);

    const url = isEditing
      ? `http://localhost:8080/product/update/${editId}`
      : "http://localhost:8080/product/add";

    fetch(url, {
      method: isEditing ? "PUT" : "POST",
      body: formData,
    })
      .then((res) => {
        if (!res.ok)
          throw new Error(isEditing ? "Failed to update product" : "Failed to add product");
        return res.json();
      })
      .then((savedProduct) => {
        if (isEditing) {
          const updatedProducts = products.map((p) =>
            p.id === editId ? savedProduct : p
          );
          setProducts(updatedProducts);
          setFilteredProducts(updatedProducts);
          toast.success("Product updated successfully!");
        } else {
          setProducts([savedProduct, ...products]);
          setFilteredProducts([savedProduct, ...filteredProducts]);
          toast.success("Product added successfully!");
        }

        // Reset form
        setProduct({
          name: "",
          brand: "",
          price: "",
          category: "",
          subCategory: "",
          discount: "",
          description: "",
          stock: "",
          attributes: [],
          adminId: adminId || "",
        });
        setImage(null);
        setIsEditing(false);
        setEditId(null);
      })
      .catch((err) => toast.error(err.message))
      .finally(() => setLoading(false));
  };

  // Edit product
  const handleEdit = (p) => {
    setProduct({
      name: p.name,
      brand: p.brand,
      price: p.price,
      category: p.category,
      subCategory: p.subCategory,
      discount: p.discount,
      description: p.description,
      stock: p.stock,
      attributes: p.attributes || [],
      adminId: p.addedBy,
    });
    setIsEditing(true);
    setEditId(p.id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Delete product
  const handleDelete = (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    fetch(`http://localhost:8080/product/delete/${id}`, { method: "DELETE" })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to delete product");
        const updatedProducts = products.filter((p) => p.id !== id);
        setProducts(updatedProducts);
        setFilteredProducts(updatedProducts);
        toast.success("Product deleted successfully!");
      })
      .catch((err) => toast.error(err.message));
  };

  return (
    <div className="admin-product-panel">
      <ToastContainer />

      {/* LEFT: Product List */}
      <div className="product-list">
        <h2>Your Products</h2>
        <input
          type="text"
          placeholder="Search by name, brand, category..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-bar"
        />

        <div className="product-grid">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((p) => (
              <div className="product-card" key={p.id}>
                <img src={p.imageUrl} alt={p.name} className="product-img" />
                <div className="product-info">
                  <h3>{p.name}</h3>
                  <p className="brand">{p.brand}</p>
                  <p className="price">₹{p.price}</p>
                  <p className="category">{p.category}</p>
                  {p.subCategory && <p className="subcategory">{p.subCategory}</p>}
                  <p className="stock">Stock: {p.stock}</p>
                  {p.attributes?.map((attr, idx) => (
                    <p key={idx}>
                      {attr.key}: {attr.value}
                    </p>
                  ))}
                  <div className="card-actions">
                    <button className="edit-btn" onClick={() => handleEdit(p)}>
                      Edit
                    </button>
                    <button className="delete-btn" onClick={() => handleDelete(p.id)}>
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="no-products">No Products Found</p>
          )}
        </div>
      </div>

      {/* RIGHT: Add/Edit Form */}
      <div className="product-form">
        <h2>{isEditing ? "Update Product" : "Add Product"}</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Product Name"
            value={product.name}
            onChange={(e) => setProduct({ ...product, name: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Brand"
            value={product.brand}
            onChange={(e) => setProduct({ ...product, brand: e.target.value })}
            required
          />
          <input
            type="number"
            placeholder="Price"
            value={product.price}
            onChange={(e) => setProduct({ ...product, price: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Category"
            value={product.category}
            onChange={(e) => setProduct({ ...product, category: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Subcategory"
            value={product.subCategory}
            onChange={(e) => setProduct({ ...product, subCategory: e.target.value })}
          />
          <input
            type="number"
            placeholder="Discount (%)"
            value={product.discount}
            onChange={(e) => setProduct({ ...product, discount: e.target.value })}
          />
          <textarea
            placeholder="Description"
            value={product.description}
            onChange={(e) => setProduct({ ...product, description: e.target.value })}
            rows="3"
          />
          <input
            type="number"
            placeholder="Stock"
            value={product.stock}
            onChange={(e) => setProduct({ ...product, stock: e.target.value })}
            required
          />

          <div className="attributes-section">
            <h4>Attributes</h4>
            {product.attributes.map((attr, index) => (
              <div key={index} className="attribute-pair">
                <input
                  type="text"
                  placeholder="Key"
                  value={attr.key}
                  onChange={(e) => handleAttributeChange(index, "key", e.target.value)}
                  required
                />
                <input
                  type="text"
                  placeholder="Value"
                  value={attr.value}
                  onChange={(e) => handleAttributeChange(index, "value", e.target.value)}
                  required
                />
                <button
                  type="button"
                  onClick={() => removeAttributeField(index)}
                  className="remove-attr-btn"
                >
                  Remove
                </button>
              </div>
            ))}
            <button type="button" onClick={addAttributeField}>
              Add Attribute
            </button>
          </div>

          <input
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
            accept="image/*"
            required={!isEditing}
          />

          <button type="submit" disabled={loading}>
            {loading ? (isEditing ? "Updating..." : "Adding...") : isEditing ? "Update Product" : "Add Product"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminProductPanel;

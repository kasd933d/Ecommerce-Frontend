import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function ManageProducts() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editingProduct, setEditingProduct] = useState(null);
  const [newImageUrl, setNewImageUrl] = useState("");

  // 1. GET ALL PRODUCTS (/api/v1/products)
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/v1/products", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      const data = await res.json();
      if (res.ok) {
        setProducts(data.data || data);
      } else {
        setError(data.message || "Failed to load products");
      }
    } catch (err) {
      setError("Server error while fetching products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // 2. DELETE PRODUCT (DELETE /api/v1/products/:id)
 const handleDelete = async (id) => {
  if (!window.confirm("Are you sure you want to delete this product?")) return;
  try {
    const res = await fetch(`/api/v1/products/${id}`, {
      method: "DELETE",
      credentials: "include", // 👈 Cookie Automatically Send Hogi
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (res.ok) {
      setProducts((prev) => prev.filter((item) => item.id !== id));
    } else {
      alert("Failed to delete product");
      
    }

  } catch (err) {
    console.log(err)
    alert("Error deleting product");
  }
  
};
  // 3. UPDATE PRODUCT DETAILS (PATCH /api/v1/products/:id)
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`/api/v1/products/${editingProduct.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          name: editingProduct.name,
          price: editingProduct.price,
          stock: editingProduct.stock,
          category: editingProduct.category,
        }),
      });
      if (res.ok) {
        setEditingProduct(null);
        fetchProducts();
      } else {
        alert("Failed to update product");
      }
    } catch (err) {
      alert("Error updating product");
    }
  };

  // 4. ADD IMAGE (POST /api/v1/products/:id/images)
  const handleAddImage = async (productId) => {
    if (!newImageUrl.trim()) return;
    try {
      const res = await fetch(`/api/v1/products/${productId}/images`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ url: newImageUrl }),
      });
      if (res.ok) {
        setNewImageUrl("");
        fetchProducts();
      }
    } catch (err) {
      alert("Error adding image");
    }
  };

  // 5. REMOVE IMAGE (DELETE /api/v1/products/:id/images/:imageId)
  const handleRemoveImage = async (productId, imageId) => {
    try {
      const res = await fetch(`/api/v1/products/${productId}/images/${imageId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      if (res.ok) fetchProducts();
    } catch (err) {
      alert("Error deleting image");
    }
  };

  // 6. SET DEFAULT IMAGE (PATCH /api/v1/products/:id/images/:imageId/default)
  const handleSetDefaultImage = async (productId, imageId) => {
    try {
      const res = await fetch(`/api/v1/products/${productId}/images/${imageId}/default`, {
        method: "PATCH",
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      if (res.ok) fetchProducts();
    } catch (err) {
      alert("Error setting default image");
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans p-4 sm:p-8 pt-24">
      <div className="max-w-7xl mx-auto mb-8 flex items-center justify-between border-b border-slate-800 pb-6">
        <div>
          <button
            onClick={() => navigate(-1)}
            className="text-xs text-slate-400 hover:text-white mb-2 transition-colors"
          >
            ← Back to Dashboard
          </button>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">All Products Inventory</h1>
        </div>
        <button
          onClick={() => navigate("/admin/add-product")}
          className="px-4 py-2 bg-[#FFE500] text-slate-950 font-black text-xs rounded-full hover:bg-yellow-400 transition"
        >
          + Add New Product
        </button>
      </div>

      {loading ? (
        <div className="text-center py-12 text-slate-400">Loading inventory...</div>
      ) : error ? (
        <div className="text-center py-12 text-rose-400">{error}</div>
      ) : (
        <div className="grid grid-cols-1 gap-6 max-w-7xl mx-auto">
          {products.map((prod) => (
            <div
              key={prod.id}
              className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-6 backdrop-blur-md shadow-lg"
            >
              <div className="flex flex-col lg:flex-row justify-between gap-6">
                {/* Product Meta */}
                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-3">
                    <h3 className="text-lg font-bold text-white">{prod.name}</h3>
                    <span className="text-xs font-mono text-slate-500">ID: {prod.id}</span>
                  </div>
                  <div className="flex gap-4 text-xs text-slate-400">
                    <span>Category: <strong className="text-slate-200">{prod.category || "N/A"}</strong></span>
                    <span>Price: <strong className="text-white">₹{prod.price}</strong></span>
                    <span>Stock: <strong className="text-slate-200">{prod.stock} units</strong></span>
                  </div>

                  {/* Images List */}
                  <div className="pt-4">
                    <p className="text-xs font-bold text-slate-400 mb-2">Product Gallery & Default Image:</p>
                    <div className="flex flex-wrap gap-3">
                      {prod.images?.map((img) => (
                        <div key={img.id} className="relative group border border-slate-800 rounded-lg p-1 bg-slate-950">
                          <img src={img.url} alt="" className="w-16 h-16 object-cover rounded" />
                          {img.isDefault && (
                            <span className="absolute top-1 left-1 bg-emerald-500 text-slate-950 text-[8px] font-black px-1 rounded">
                              DEFAULT
                            </span>
                          )}
                          <div className="absolute inset-0 bg-slate-950/80 opacity-0 group-hover:opacity-100 flex items-center justify-center gap-1 transition-opacity">
                            {!img.isDefault && (
                              <button
                                onClick={() => handleSetDefaultImage(prod.id, img.id)}
                                className="p-1 bg-sky-500 text-slate-950 rounded text-[9px] font-bold"
                              >
                                Set
                              </button>
                            )}
                            <button
                              onClick={() => handleRemoveImage(prod.id, img.id)}
                              className="p-1 bg-rose-500 text-white rounded text-[9px] font-bold"
                            >
                              Del
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex lg:flex-col justify-end gap-2 border-t lg:border-t-0 lg:border-l border-slate-800 pt-4 lg:pt-0 lg:pl-6">
                  <button
                    onClick={() => setEditingProduct(prod)}
                    className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold rounded-xl transition"
                  >
                    Edit Details
                  </button>
                  <button
                    onClick={() => handleDelete(prod.id)}
                    className="px-4 py-2 bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 border border-rose-500/20 text-xs font-bold rounded-xl transition"
                  >
                    Delete Product
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* EDIT MODAL */}
      {editingProduct && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 w-full max-w-md space-y-4">
            <h2 className="text-lg font-bold text-white">Edit Product</h2>
            <form onSubmit={handleUpdate} className="space-y-3">
              <div>
                <label className="text-xs text-slate-400">Title</label>
                <input
                  type="text"
                  value={editingProduct.name}
                  onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white mt-1 focus:outline-none focus:border-slate-600"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-slate-400">Price</label>
                  <input
                    type="text"
                    value={editingProduct.price}
                    onChange={(e) => setEditingProduct({ ...editingProduct, price: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white mt-1 focus:outline-none focus:border-slate-600"
                  />
                </div>
                <div>
                  <label className="text-xs text-slate-400">Stock</label>
                  <input
                    type="number"
                    value={editingProduct.stock}
                    onChange={(e) => setEditingProduct({ ...editingProduct, stock: Number(e.target.value) })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white mt-1 focus:outline-none focus:border-slate-600"
                  />
                </div>
              </div>

              {/* Add New Image Input */}
              <div>
                <label className="text-xs text-slate-400">Add Image URL</label>
                <div className="flex gap-2 mt-1">
                  <input
                    type="text"
                    placeholder="https://..."
                    value={newImageUrl}
                    onChange={(e) => setNewImageUrl(e.target.value)}
                    className="flex-1 bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-slate-600"
                  />
                  <button
                    type="button"
                    onClick={() => handleAddImage(editingProduct.id)}
                    className="px-3 bg-slate-800 hover:bg-slate-700 text-xs text-white rounded-xl font-bold"
                  >
                    Add
                  </button>
                </div>
              </div>

              <div className="flex gap-2 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-[#FFE500] text-slate-950 text-xs font-black py-2.5 rounded-xl hover:bg-yellow-400"
                >
                  Save Changes
                </button>
                <button
                  type="button"
                  onClick={() => setEditingProduct(null)}
                  className="flex-1 bg-slate-800 text-slate-300 text-xs font-bold py-2.5 rounded-xl hover:bg-slate-700"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function AddProduct() {
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  // Base Form State
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
  });

  // Multiple Image Files & Previews State
  const [imageFiles, setImageFiles] = useState([]); // Array of File objects
  const [imagePreviews, setImagePreviews] = useState([]); // Array of preview URLs
  const [defaultImgIndex, setDefaultImgIndex] = useState(0);

  // Dynamic Variants State (Initial 1st Variant mandatory)
  const [variants, setVariants] = useState([
    { sku: "SKU-PROD-1", size: "", color: "", price: "", stock: "" },
  ]);

  // Load Dummy Categories (Must be 24-char Mongo ObjectIds for Zod Regex)
  useEffect(() => {
    setCategories([
      { _id: "65d4f1a2b3c4d5e6f7a8b9c1", name: "Audio & Headphones" },
      { _id: "65d4f1a2b3c4d5e6f7a8b9c2", name: "Smartwatches & Wearables" },
      { _id: "65d4f1a2b3c4d5e6f7a8b9c3", name: "Gaming Accessories" },
      { _id: "65d4f1a2b3c4d5e6f7a8b9c4", name: "Laptops & Computers" },
    ]);
  }, []);

  // Handle Basic Inputs
  const handleBaseChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Multiple File Selection
  const handleImageChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    if (selectedFiles.length === 0) return;

    const newPreviews = selectedFiles.map((file) => URL.createObjectURL(file));

    setImageFiles((prev) => [...prev, ...selectedFiles]);
    setImagePreviews((prev) => [...prev, ...newPreviews]);
  };

  // Remove individual image
  const removeImage = (index) => {
    setImageFiles((prev) => prev.filter((_, i) => i !== index));
    setImagePreviews((prev) => prev.filter((_, i) => i !== index));
    if (defaultImgIndex === index) setDefaultImgIndex(0);
    else if (defaultImgIndex > index) setDefaultImgIndex((prev) => prev - 1);
  };

  // Dynamic Variant Handlers
  const handleVariantChange = (index, e) => {
    const updated = [...variants];
    updated[index][e.target.name] = e.target.value;
    setVariants(updated);
  };

  const addVariantRow = () => {
    setVariants([
      ...variants,
      {
        sku: `SKU-PROD-${variants.length + 1}`,
        size: "",
        color: "",
        price: variants[0]?.price || "",
        stock: "",
      },
    ]);
  };

  const removeVariantRow = (index) => {
    if (variants.length === 1) {
      setErrorMsg("At least 1 variant is required.");
      return;
    }
    setVariants(variants.filter((_, i) => i !== index));
  };

  // Safe JSON/Text parsing
  const parseResponse = async (res) => {
    const text = await res.text();
    if (!text) return {};
    try {
      return JSON.parse(text);
    } catch {
      return { raw: text };
    }
  };

  // Submit Handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");

    if (imageFiles.length === 0) {
      setErrorMsg("Please select at least one product image.");
      return;
    }

    setLoading(true);

    try {
      // -------------------------------------------------------------
      // STEP 1: Get Upload Signature from Backend
      // -------------------------------------------------------------
      setUploadProgress("Fetching upload signature...");
      const sigRes = await fetch("/api/v1/uploads/signature", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // Essential for HttpOnly Cookie Auth
      });

      const sigData = await parseResponse(sigRes);
      console.log(sigData)
      if (!sigRes.ok) {
        throw new Error(sigData.message || "Failed to fetch Cloudinary signature.");
      }

      const uploadParams = sigData.data || sigData;
      const { signature, timestamp, cloudName, apiKey, folder } = uploadParams;

      if (!signature || !cloudName || !apiKey) {
        throw new Error("Invalid parameters received from signature route.");
      }

      // -------------------------------------------------------------
      // STEP 2: Upload ALL Images to Cloudinary
      // -------------------------------------------------------------
      setUploadProgress(`Uploading ${imageFiles.length} image(s) to Cloudinary...`);

      const uploadedImagesArray = [];

      for (let i = 0; i < imageFiles.length; i++) {
        const file = imageFiles[i];
        const cloudinaryFormData = new FormData();
        cloudinaryFormData.append("file", file);
        cloudinaryFormData.append("api_key", apiKey);
        cloudinaryFormData.append("timestamp", timestamp);
        cloudinaryFormData.append("signature", signature);
        if (folder) cloudinaryFormData.append("folder", folder);

        const cloudRes = await fetch(
          `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
          { method: "POST", body: cloudinaryFormData }
        );

        const cloudData = await parseResponse(cloudRes);
        if (!cloudRes.ok) {
          throw new Error(cloudData.error?.message || `Failed to upload image #${i + 1}`);
        }

        // Schema Match: { url, publicId, alt, isDefault }
        uploadedImagesArray.push({
          url: cloudData.secure_url,
          publicId: cloudData.public_id,
          alt: formData.name || "Product Image",
          isDefault: i === defaultImgIndex,
        });
      }

      // -------------------------------------------------------------
      // STEP 3: Format Variants to Match Schema Types
      // -------------------------------------------------------------
      const formattedVariants = variants.map((v) => ({
        sku: v.sku.trim(),
        price: Number(v.price),
        stock: Number(v.stock),
        ...(v.size?.trim() && { size: v.size.trim() }),
        ...(v.color?.trim() && { color: v.color.trim() }),
      }));



      const Refresh = await fetch("/api/v1/auth/refresh", {
        method: "POST",

        credentials: "include",

      });
      // -------------------------------------------------------------
      // STEP 4: Post Final Schema Payload to Backend
      // -------------------------------------------------------------
      setUploadProgress("Creating product in database...");

      const productPayload = {
        name: formData.name.trim(),
        description: formData.description.trim(),
        category: formData.category,
        images: uploadedImagesArray,
        variants: formattedVariants,
      };

      const productRes = await fetch("/api/v1/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(productPayload),
      });

      const productData = await parseResponse(productRes);

      if (!productRes.ok) {
        // Show validation errors if Zod throws err
        const message = productData.message || JSON.stringify(productData.errors || "Validation error");
        throw new Error(message);
      }

      setSuccessMsg("Product & Variants created successfully!");
      setTimeout(() => navigate("/admin"), 1500);

    } catch (err) {
      console.error("Product Error:", err);
      setErrorMsg(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
      setUploadProgress("");
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans p-4 sm:p-8 pt-20">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-800">
          <div>
            <span className="text-xs font-bold tracking-widest text-[#FFE500] uppercase">
              Admin Panel
            </span>
            <h1 className="text-2xl font-extrabold text-white mt-1">Add Product</h1>
          </div>
          <button
            onClick={() => navigate("/admin")}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-slate-300 font-bold text-xs rounded-full border border-slate-700"
          >
            ← Back
          </button>
        </div>

        {errorMsg && (
          <div className="mb-6 p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-semibold">
            {errorMsg}
          </div>
        )}
        {successMsg && (
          <div className="mb-6 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
            {successMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Section 1: Basic Information */}
          <div className="bg-slate-900/60 border border-slate-800/80 rounded-3xl p-6 shadow-xl space-y-4">
            <h2 className="text-sm font-bold text-slate-300 uppercase tracking-wider">
              1. General Details
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-400 mb-1">
                  Product Name *
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="e.g. Wireless Gaming Mouse"
                  value={formData.name}
                  onChange={handleBaseChange}
                  className="w-full bg-slate-950 border border-slate-800 p-3 rounded-xl text-sm text-white focus:border-[#FFE500] outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 mb-1">
                  Category *
                </label>
                <select
                  name="category"
                  required
                  value={formData.category}
                  onChange={handleBaseChange}
                  className="w-full bg-slate-950 border border-slate-800 p-3 rounded-xl text-sm text-white focus:border-[#FFE500] outline-none"
                >
                  <option value="">-- Select Category --</option>
                  {categories.map((cat) => (
                    <option key={cat._id} value={cat._id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-400 mb-1">
                Description *
              </label>
              <textarea
                name="description"
                rows="3"
                required
                placeholder="Product summary and details..."
                value={formData.description}
                onChange={handleBaseChange}
                className="w-full bg-slate-950 border border-slate-800 p-3 rounded-xl text-sm text-white focus:border-[#FFE500] outline-none resize-none"
              ></textarea>
            </div>
          </div>

          {/* Section 2: Multiple Image Upload */}
          <div className="bg-slate-900/60 border border-slate-800/80 rounded-3xl p-6 shadow-xl space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-sm font-bold text-slate-300 uppercase tracking-wider">
                2. Product Images (Array)
              </h2>
              <span className="text-[11px] text-slate-500">Select multiple files</span>
            </div>

            <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-slate-800 hover:border-[#FFE500]/50 rounded-2xl cursor-pointer bg-slate-950/40 transition">
              <span className="text-xs text-slate-300 font-medium">
                Click to add <span className="text-[#FFE500] font-bold">Multiple Images</span>
              </span>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageChange}
                className="hidden"
              />
            </label>

            {/* Previews Grid */}
            {imagePreviews.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
                {imagePreviews.map((src, idx) => (
                  <div
                    key={idx}
                    className={`relative bg-slate-950 p-2 rounded-2xl border ${defaultImgIndex === idx
                        ? "border-[#FFE500]"
                        : "border-slate-800"
                      }`}
                  >
                    <img
                      src={src}
                      alt={`Upload ${idx}`}
                      className="w-full h-24 object-cover rounded-xl"
                    />
                    <div className="mt-2 flex items-center justify-between">
                      <button
                        type="button"
                        onClick={() => setDefaultImgIndex(idx)}
                        className={`text-[10px] px-2 py-0.5 rounded ${defaultImgIndex === idx
                            ? "bg-[#FFE500] text-slate-950 font-bold"
                            : "bg-slate-800 text-slate-400"
                          }`}
                      >
                        {defaultImgIndex === idx ? "Default" : "Make Default"}
                      </button>
                      <button
                        type="button"
                        onClick={() => removeImage(idx)}
                        className="text-rose-400 hover:text-rose-500 text-xs font-bold"
                      >
                        ✕
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Section 3: Product Variants */}
          <div className="bg-slate-900/60 border border-slate-800/80 rounded-3xl p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-sm font-bold text-slate-300 uppercase tracking-wider">
                  3. Product Variants (Min 1 required)
                </h2>
                <p className="text-[11px] text-slate-500">
                  Default Variant #1 will be created with primary inputs below.
                </p>
              </div>
              <button
                type="button"
                onClick={addVariantRow}
                className="px-3 py-1.5 bg-[#FFE500]/10 border border-[#FFE500]/30 text-[#FFE500] font-bold text-xs rounded-xl hover:bg-[#FFE500]/20 transition"
              >
                + Add Variant
              </button>
            </div>

            <div className="space-y-4">
              {variants.map((v, i) => (
                <div
                  key={i}
                  className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-3"
                >
                  <div className="flex justify-between items-center pb-2 border-b border-slate-800/60">
                    <span className="text-xs font-bold text-slate-400">
                      Variant #{i + 1} {i === 0 && "(Primary)"}
                    </span>
                    {variants.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeVariantRow(i)}
                        className="text-xs text-rose-400 hover:underline"
                      >
                        Remove Variant
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 mb-1">
                        SKU *
                      </label>
                      <input
                        type="text"
                        name="sku"
                        required
                        value={v.sku}
                        onChange={(e) => handleVariantChange(i, e)}
                        className="w-full bg-slate-900 border border-slate-800 p-2 rounded-lg text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 mb-1">
                        Price (₹) *
                      </label>
                      <input
                        type="number"
                        name="price"
                        required
                        min="1"
                        placeholder="1999"
                        value={v.price}
                        onChange={(e) => handleVariantChange(i, e)}
                        className="w-full bg-slate-900 border border-slate-800 p-2 rounded-lg text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 mb-1">
                        Stock *
                      </label>
                      <input
                        type="number"
                        name="stock"
                        required
                        min="0"
                        placeholder="50"
                        value={v.stock}
                        onChange={(e) => handleVariantChange(i, e)}
                        className="w-full bg-slate-900 border border-slate-800 p-2 rounded-lg text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 mb-1">
                        Size (Optional)
                      </label>
                      <input
                        type="text"
                        name="size"
                        placeholder="e.g. M, L, XL"
                        value={v.size}
                        onChange={(e) => handleVariantChange(i, e)}
                        className="w-full bg-slate-900 border border-slate-800 p-2 rounded-lg text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 mb-1">
                        Color (Optional)
                      </label>
                      <input
                        type="text"
                        name="color"
                        placeholder="e.g. Black"
                        value={v.color}
                        onChange={(e) => handleVariantChange(i, e)}
                        className="w-full bg-slate-900 border border-slate-800 p-2 rounded-lg text-xs text-white"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Submit Action */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-[#FFE500] hover:bg-yellow-400 text-slate-950 font-black text-sm uppercase tracking-wider rounded-xl transition shadow-lg disabled:opacity-50 flex flex-col items-center justify-center gap-1"
          >
            {loading ? (
              <>
                <span className="font-bold">Processing Product Creation...</span>
                {uploadProgress && (
                  <span className="text-[10px] font-mono text-slate-800">
                    {uploadProgress}
                  </span>
                )}
              </>
            ) : (
              "Save Product & Upload Images"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
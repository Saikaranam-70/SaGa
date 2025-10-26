import React, { useState, useEffect } from "react";

const AddOffer = () => {
  const [offers, setOffers] = useState([]);
  const [name, setName] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const adminToken = localStorage.getItem("adminToken");
  const adminId = localStorage.getItem("adminId");

  // Fetch all offers
  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const res = await fetch("http://localhost:8080/product/offer/getAll");
        const data = await res.json();
        setOffers(data);
      } catch (err) {
        console.error("Error fetching offers:", err);
      }
    };
    fetchOffers();
  }, []);

  // Add offer
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !image) {
      setMessage("⚠️ Please fill all fields");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("image", image);
    formData.append("addedBy", adminId);

    try {
      setLoading(true);
      const res = await fetch("http://localhost:8080/product/add/offer", {
        method: "POST",
        headers: { Authorization: `${adminToken}` },
        body: formData,
      });

      if (res.ok) {
        const newOffer = await res.json();
        setOffers((prev) => [newOffer, ...prev]);
        setName("");
        setImage(null);
        setPreview(null);
        setMessage("✅ Offer added successfully!");
      } else {
        setMessage("❌ Failed to add offer");
      }
    } catch (error) {
      console.error(error);
      setMessage("❌ Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen w-screen bg-gradient-to-br from-indigo-100 via-white to-purple-100 flex overflow-hidden">
      {/* LEFT SIDE - OFFERS */}
      <div className="w-2/3 p-6 overflow-y-auto backdrop-blur-lg bg-white/60 border-r border-gray-200">
        <h1 className="text-3xl font-extrabold text-indigo-700 mb-6">
          🏷️ Active Offers
        </h1>

        {offers.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <p className="text-gray-400 text-xl">No offers found.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {offers.map((offer, index) => (
              <div
                key={index}
                className="group relative bg-white/70 border border-gray-200 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden"
              >
                <img
                  src={offer.imgUrl}
                  alt={offer.name}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="p-4 text-center">
                  <h3 className="font-semibold text-gray-800 text-lg">
                    {offer.name}
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">
                    Added by:{" "}
                    {/* <span className="text-indigo-500 font-medium">
                      {offer.addedBy}
                    </span> */}
                  </p>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* RIGHT SIDE - FORM */}
      <div className="w-1/3 bg-gradient-to-br from-indigo-600 to-purple-700 flex flex-col justify-center items-center text-white p-10">
        <div className="bg-white/10 backdrop-blur-md rounded-3xl shadow-2xl p-8 w-[90%]">
          <h2 className="text-3xl font-bold text-center mb-8">
            ➕ Add New Offer
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Offer Name */}
            <div>
              <label className="block text-sm font-semibold mb-2 text-indigo-100">
                Offer Name
              </label>
              <input
                type="text"
                placeholder="Enter offer name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-white/20 text-white placeholder-indigo-200 border border-white/30 focus:outline-none focus:ring-2 focus:ring-white focus:bg-white/30 transition-all"
              />
            </div>

            {/* Upload Image */}
            <div>
              <label className="block text-sm font-semibold mb-2 text-indigo-100">
                Offer Image
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  setImage(e.target.files[0]);
                  setPreview(URL.createObjectURL(e.target.files[0]));
                }}
                className="w-full text-sm text-white bg-white/20 border border-white/30 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-white/40 file:text-indigo-800 hover:file:bg-white/70 cursor-pointer"
              />
            </div>

            {/* Preview */}
            {preview && (
              <div className="mt-4">
                <img
                  src={preview}
                  alt="Preview"
                  className="rounded-lg shadow-lg border-2 border-white/30 w-full h-44 object-cover"
                />
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full mt-6 py-3 rounded-xl text-lg font-semibold transition-all ${
                loading
                  ? "bg-white/30 cursor-not-allowed"
                  : "bg-white text-indigo-700 hover:bg-indigo-100"
              }`}
            >
              {loading ? "Uploading..." : "Add Offer"}
            </button>
          </form>

          {message && (
            <p
              className={`mt-6 text-center font-medium ${
                message.includes("✅")
                  ? "text-green-300"
                  : message.includes("⚠️")
                  ? "text-yellow-200"
                  : "text-red-300"
              }`}
            >
              {message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddOffer;

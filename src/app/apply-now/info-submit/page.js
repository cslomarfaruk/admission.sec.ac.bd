"use client";
import { useState } from "react";

export default function CompleteInformation() {
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  const [photo, setPhoto] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);

  const [signature, setSignature] = useState(null);
  const [signaturePreview, setSignaturePreview] = useState(null);

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    setPhoto(file);
    setPhotoPreview(URL.createObjectURL(file));
  };

  const handleSignatureUpload = (e) => {
    const file = e.target.files[0];
    setSignature(file);
    setSignaturePreview(URL.createObjectURL(file));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ phone, email, photo, signature });
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="bg-white p-6 rounded-xl shadow-md max-w-lg w-full my-6">
        <h2 className="text-center text-xl font-semibold mb-4">
          Complete your information
        </h2>
        <form onSubmit={handleSubmit}>
          {/* Input Fields */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Phone No:</label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="01234567890"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">
              Mail Address:
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="abc@xyz.com"
              required
            />
          </div>

          {/* Photo & Signature Upload */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            {/* Photo Upload */}
            <div className="flex flex-col items-center border rounded-md p-3">
              {photoPreview ? (
                <img
                  src={photoPreview}
                  alt="Profile Preview"
                  className="w-32 h-32 object-cover rounded-md mb-2"
                />
              ) : (
                <div className="w-32 h-32 bg-gray-200 flex items-center justify-center rounded-md mb-2">
                  <span className="text-gray-400">Photo</span>
                </div>
              )}
              <label className="cursor-pointer  bg-primary text-white px-3 py-1 rounded-md text-sm">
                Upload Photo
                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  className="hidden"
                />
              </label>
            </div>

            {/* Signature Upload */}
            <div className="flex flex-col items-center border rounded-md p-3">
              {signaturePreview ? (
                <img
                  src={signaturePreview}
                  alt="Signature Preview"
                  className="w-32 h-16 object-cover rounded-md mb-2"
                />
              ) : (
                <div className="w-32 h-16 bg-gray-200 flex items-center justify-center rounded-md mb-2">
                  <span className="text-gray-400">Signature</span>
                </div>
              )}
              <label className="cursor-pointer  bg-primary text-white px-3 py-1 rounded-md text-sm">
                Upload Signature
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleSignatureUpload}
                  className="hidden"
                />
              </label>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-primary text-white py-2 rounded-md font-medium hover:bg-blue-600"
          >
            Submit
          </button>
        </form>

        {/* Disclaimer */}
        <div className="mt-6 p-4 text-primary border rounded-md bg-cyan-500/10 text-sm">
          <p className="mb-1">
            <strong>Profile Picture:</strong> The image should be exactly 300px
            by 300px, with the subject facing straight and holding a steady
            posture.
          </p>
          <p className="mb-1">
            <strong>Signature:</strong> The image should be exactly 600px by
            200px.
          </p>
          <p>
            <strong>Background:</strong> Both the profile picture and signature
            should have a clean, monochromatic background (e.g., white or light
            grey).
          </p>
        </div>
      </div>
    </div>
  );
}

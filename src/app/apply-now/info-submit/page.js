"use client";
import { TriangleAlert } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CompleteInformation() {
  const router = useRouter();

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const [phone, setPhone] = useState("01796127821");
  const [email, setEmail] = useState("straightlife149@gmail.com");

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

  const handleSendOTP = async () => {
    const response = await fetch("/api/send-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    if (response.ok) {
      setError("OTP sent to your email!");
      router.replace(`/apply-now/otp?email=${email}`);
    } else {
      setError("Failed to send OTP! Please try again.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (!phone || !email || !photo || !signature) {
      setError("Opps! All fields are required");
      setTimeout(() => {
        setLoading(false);
      }, 1000);
      return;
    }
    await handleSendOTP();
    console.log({ phone, email, photo, signature });
    setLoading(false);
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="bg-white p-6 rounded-xl shadow-md max-w-lg w-full my-6">
        <h2 className="text-center text-xl font-semibold mb-4">
          Complete your information
        </h2>
        <form onSubmit={handleSubmit}>
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
            <div className="flex flex-col justify-center items-center border rounded-md p-3">
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

          {error && !loading && (
            <div className="flex justify-center items-center">
              <TriangleAlert className="text-rose-700" />
              <div className="text-center text-rose-700 font-semibold p-1 my-1">
                {" "}
                {error}
              </div>
            </div>
          )}
          {/* Submit Button */}
          <button
            type="submit"
            className="bg-primary w-full hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
            disabled={loading}
          >
            {loading ? (
              <>
                <div className="flex justify-center items-center">
                  <div className="h-6 w-6 border-4 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                </div>
              </>
            ) : (
              "Submit"
            )}
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

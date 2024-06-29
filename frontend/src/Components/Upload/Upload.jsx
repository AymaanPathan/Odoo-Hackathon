import { useState } from "react";

function UploadForm() {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("Select image");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setFileName(e.target.files[0]?.name || "Select image");
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file to upload");
      return;
    }

    const formData = new FormData();
    formData.append("productImage", file);

    try {
      const response = await fetch("http://localhost:8080/upload", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        console.log("File uploaded:", data);
        alert("File uploaded successfully");
      } else {
        console.error("Upload failed:", response.statusText);
        alert("Failed to upload file");
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("Error uploading file");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-3xl font-semibold mb-8 text-center text-indigo-600">
        Upload Product Image
      </h2>
      <div className="space-y-6">
        <div className="flex items-center">
          <label
            htmlFor="productImage"
            className="flex items-center justify-center w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm cursor-pointer bg-white text-indigo-600 hover:bg-indigo-50 focus:ring-indigo-500 focus:border-indigo-500"
          >
            {fileName}
          </label>
          <input
            onChange={handleFileChange}
            type="file"
            id="productImage"
            name="productImage"
            className="hidden"
          />
        </div>
        <button
          onClick={handleUpload}
          type="button"
          className="inline-block bg-indigo-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Upload
        </button>
      </div>
    </div>
  );
}

export default UploadForm;

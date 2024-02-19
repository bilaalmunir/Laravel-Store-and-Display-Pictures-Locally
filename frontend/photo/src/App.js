import logo from "./logo.svg";
import "./App.css";
import React, { useState } from "react";

function App() {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
    const formData = new FormData();
    console.log(selectedImage)
    formData.append("image.store", selectedImage);
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/image`, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const responseData = response.json();
        setSelectedImage(responseData.imageUrl);
      } else {
        console.error("Upload failed:", response.statusText);
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  return (
    <div className="App">
      <input type="file" accept="image/*" onChange={handleImageChange} />
      {selectedImage && (
        <div>
          <h2>Selected Image:</h2>
          <img
            src={selectedImage}
            alt="Selected"
            style={{ maxWidth: "100%" }}
          />
        </div>
      )}
    </div>
  );
}

export default App;

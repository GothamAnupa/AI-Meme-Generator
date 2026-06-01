import React, { useRef, useState } from "react";

function App() {
  const canvasRef = useRef(null);

  const [image, setImage] = useState(null);
  const [topText, setTopText] = useState("");
  const [bottomText, setBottomText] = useState("");

  const handleImageUpload = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = () => {
      const img = new Image();
      img.src = reader.result;

      img.onload = () => {
        setImage(img);
        drawMeme(img, topText, bottomText);
      };
    };

    reader.readAsDataURL(file);
  };

  const drawMeme = (img, top, bottom) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    canvas.width = img.width;
    canvas.height = img.height;

    ctx.drawImage(img, 0, 0);

    ctx.font = "40px Impact";
    ctx.fillStyle = "white";
    ctx.strokeStyle = "black";
    ctx.lineWidth = 3;
    ctx.textAlign = "center";

    ctx.fillText(top.toUpperCase(), canvas.width / 2, 50);
    ctx.strokeText(top.toUpperCase(), canvas.width / 2, 50);

    ctx.fillText(
      bottom.toUpperCase(),
      canvas.width / 2,
      canvas.height - 20
    );

    ctx.strokeText(
      bottom.toUpperCase(),
      canvas.width / 2,
      canvas.height - 20
    );
  };

  const handleTopText = (e) => {
    setTopText(e.target.value);

    if (image) {
      drawMeme(image, e.target.value, bottomText);
    }
  };

  const handleBottomText = (e) => {
    setBottomText(e.target.value);

    if (image) {
      drawMeme(image, topText, e.target.value);
    }
  };

  const downloadMeme = () => {
    const canvas = canvasRef.current;

    const link = document.createElement("a");
    link.download = "meme.png";
    link.href = canvas.toDataURL();

    link.click();
  };

  const generateContextMeme = () => {
    const memes = [
      {
        top: "WHEN THE CODE WORKS",
        bottom: "WITHOUT CHANGING ANYTHING",
      },
      {
        top: "DEBUGGING FOR HOURS",
        bottom: "FOUND A MISSING SEMICOLON",
      },
      {
        top: "ME IN THE MEETING",
        bottom: "THIS COULD HAVE BEEN AN EMAIL",
      },
      {
        top: "TRAINING AI MODEL",
        bottom: "ACCURACY STILL 50%",
      },
    ];

    const random =
      memes[Math.floor(Math.random() * memes.length)];

    setTopText(random.top);
    setBottomText(random.bottom);

    if (image) {
      drawMeme(image, random.top, random.bottom);
    }
  };

  return (
    <div
      style={{
        textAlign: "center",
        padding: "30px",
        background: "#f4f4f4",
        minHeight: "100vh",
      }}
    >
      <h1>😂 Context Meme Generator</h1>

      <p>
        Create memes quickly and effortlessly with an intuitive
        interface.
      </p>

      <input
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
      />

      <div style={{ marginTop: "20px" }}>
        <input
          type="text"
          placeholder="Top Text"
          value={topText}
          onChange={handleTopText}
          style={{
            padding: "10px",
            margin: "10px",
            width: "250px",
          }}
        />

        <input
          type="text"
          placeholder="Bottom Text"
          value={bottomText}
          onChange={handleBottomText}
          style={{
            padding: "10px",
            margin: "10px",
            width: "250px",
          }}
        />
      </div>

      <div>
        <button
          onClick={generateContextMeme}
          style={{
            padding: "10px 20px",
            margin: "10px",
            cursor: "pointer",
          }}
        >
          Generate Context Meme
        </button>

        <button
          onClick={downloadMeme}
          style={{
            padding: "10px 20px",
            margin: "10px",
            cursor: "pointer",
          }}
        >
          Download Meme
        </button>
      </div>

      <canvas
        ref={canvasRef}
        style={{
          marginTop: "30px",
          maxWidth: "100%",
          border: "2px solid #ccc",
        }}
      />
    </div>
  );
}

export default App;
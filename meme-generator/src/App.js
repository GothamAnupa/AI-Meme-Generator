import React, { useRef, useState } from "react";

function App() {
  const canvasRef = useRef(null);

  const [image, setImage] = useState(null);
  const [context, setContext] = useState("");
  const [topText, setTopText] = useState("");
  const [bottomText, setBottomText] = useState("");
  const [caption, setCaption] = useState("");
  const [loading, setLoading] = useState(false);

  const [selectedCategory, setSelectedCategory] =
    useState("comedy");

  const categories = [
    "comedy",
    "sad",
    "romantic",
    "anger",
    "hungry",
    "natural",
  ];

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

    ctx.fillText(top, canvas.width / 2, 50);
    ctx.strokeText(top, canvas.width / 2, 50);

    ctx.fillText(
      bottom,
      canvas.width / 2,
      canvas.height - 20
    );

    ctx.strokeText(
      bottom,
      canvas.width / 2,
      canvas.height - 20
    );
  };

  const generateSuggestion = async () => {
    try {
      if (!context.trim()) {
        alert("Please enter a meme idea");
        return;
      }

      setLoading(true);

      const response = await fetch(
        "http://localhost:5000/generate-meme",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            context,
            category: selectedCategory,
          }),
        }
      );

      const text = await response.text();

      const meme = JSON.parse(text);

      setTopText(meme.topText);
      setBottomText(meme.bottomText);
      setCaption(meme.caption);

      if (image) {
        drawMeme(
          image,
          meme.topText,
          meme.bottomText
        );
      }
    } catch (err) {
      console.error(err);
      alert("Failed to generate meme");
    } finally {
      setLoading(false);
    }
  };

  const generateMeme = () => {
    if (image) {
      drawMeme(image, topText, bottomText);
    }
  };

  const downloadMeme = () => {
    const canvas = canvasRef.current;

    const link =
      document.createElement("a");

    link.download = "meme.png";
    link.href = canvas.toDataURL();

    link.click();
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>
        😂 AI Meme Generator
      </h1>

      <p style={styles.subtitle}>
        Create memes using Groq AI
      </p>

      <div style={styles.categoryContainer}>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() =>
              setSelectedCategory(cat)
            }
            style={{
              ...styles.categoryButton,
              background:
                selectedCategory === cat
                  ? "#111827"
                  : "#ffffff",
              color:
                selectedCategory === cat
                  ? "white"
                  : "black",
            }}
          >
            {cat.toUpperCase()}
          </button>
        ))}
      </div>

      <input
        type="text"
        placeholder="Describe your meme idea..."
        value={context}
        onChange={(e) =>
          setContext(e.target.value)
        }
        style={styles.contextInput}
      />

      <br />

      <input
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
      />

      <div style={styles.inputContainer}>
        <input
          type="text"
          value={topText}
          placeholder="Top Text"
          onChange={(e) =>
            setTopText(e.target.value)
          }
          style={styles.input}
        />

        <input
          type="text"
          value={bottomText}
          placeholder="Bottom Text"
          onChange={(e) =>
            setBottomText(e.target.value)
          }
          style={styles.input}
        />
      </div>

      <div style={styles.buttonContainer}>
        <button
          onClick={generateSuggestion}
          style={styles.button}
        >
          {loading
            ? "Generating..."
            : "AI Meme Suggestion"}
        </button>

        <button
          onClick={generateMeme}
          style={styles.button}
        >
          Generate Meme
        </button>

        <button
          onClick={downloadMeme}
          style={styles.button}
        >
          Download Meme
        </button>
      </div>

      {caption && (
        <div style={styles.captionBox}>
          💬 {caption}
        </div>
      )}

      <canvas
        ref={canvasRef}
        style={styles.canvas}
      />
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    background:
      "linear-gradient(to right,#141e30,#243b55)",
    color: "white",
    textAlign: "center",
    padding: "20px",
    fontFamily: "Arial",
  },

  title: {
    fontSize: "3rem",
  },

  subtitle: {
    color: "#d1d5db",
  },

  categoryContainer: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: "10px",
    margin: "20px 0",
  },

  categoryButton: {
    border: "none",
    borderRadius: "20px",
    padding: "10px 15px",
    cursor: "pointer",
  },

  contextInput: {
    width: "90%",
    maxWidth: "700px",
    padding: "15px",
    borderRadius: "10px",
    border: "none",
    marginBottom: "20px",
  },

  inputContainer: {
    marginTop: "20px",
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: "10px",
  },

  input: {
    padding: "10px",
    width: "280px",
    borderRadius: "10px",
    border: "none",
  },

  buttonContainer: {
    marginTop: "20px",
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    gap: "10px",
  },

  button: {
    padding: "12px 20px",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
    background: "#111827",
    color: "white",
  },

  captionBox: {
    marginTop: "20px",
    background: "white",
    color: "#111827",
    padding: "15px",
    borderRadius: "10px",
    maxWidth: "700px",
    marginInline: "auto",
  },

  canvas: {
    marginTop: "30px",
    maxWidth: "100%",
    border: "2px solid white",
    borderRadius: "15px",
  },
};

export default App;
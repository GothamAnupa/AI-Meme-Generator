# 😂 AI Meme Generator

An AI-powered Meme Generator that creates funny and context-aware memes from user ideas using Groq LLM. Users can upload images, select meme categories, generate AI-powered captions, preview memes instantly, and download the final meme.

## 🚀 Features

* Upload custom images
* Generate memes using AI
* Context-aware meme caption generation
* Multiple meme categories:

  * Comedy
  * Sad
  * Romantic
  * Anger
  * Hungry
  * Natural
* Custom top and bottom text editing
* Meme preview using HTML5 Canvas
* Download generated memes
* Responsive UI for desktop and mobile devices
* Powered by Groq LLM API

## 🛠️ Tech Stack

### Frontend

* React.js
* JavaScript
* HTML5 Canvas
* CSS

### Backend

* Node.js
* Express.js
* Groq SDK

### AI

* Groq API
* Llama 3.3 70B Versatile

## 📂 Project Structure

AI-Meme-Generator/

├── meme-generator/        # React Frontend

│   ├── src/

│   ├── public/

│   └── package.json

│

└── server/                # Node.js Backend

```
├── server.js

├── package.json

└── .env
```

## ⚙️ Installation

### Clone Repository

```bash
git clone https://github.com/GothamAnupa/AI-Meme-Generator.git

cd AI-Meme-Generator
```

### Frontend Setup

```bash
cd meme-generator

npm install

npm start
```

Frontend runs on:

```text
http://localhost:3000
```

### Backend Setup

```bash
cd server

npm install
```

Create a `.env` file:

```env
GROQ_API_KEY=your_groq_api_key
```

Start backend:

```bash
node server.js
```

Backend runs on:

```text
http://localhost:5000
```

## 🎯 How It Works

1. User uploads an image.
2. User enters a meme idea.
3. User selects a category.
4. Frontend sends the request to the backend.
5. Backend calls Groq LLM.
6. AI generates:

   * Top Text
   * Bottom Text
   * Caption
7. Meme is rendered on the image using Canvas.
8. User can download the generated meme.

## 📸 Example

### Input

Category: Sad

Idea:

Heartbreak turns a normal person into a gym addict overnight.

### AI Output

Top Text:

AFTER THE BREAKUP

Bottom Text:

NEW PERSONAL RECORD

Caption:

Character development unlocked.

## 🔒 Environment Variables

```env
GROQ_API_KEY=your_groq_api_key
```

Never commit your `.env` file to GitHub.

## 📈 Future Enhancements

* Multiple meme templates
* Meme history
* User authentication
* Social media sharing
* AI image generation
* Trending meme recommendations
* Dark/Light mode

## 👨‍💻 Author

**Gotham Anupa**

GitHub: https://github.com/GothamAnupa

LinkedIn: https://linkedin.com/in/anupagotham

## ⭐ Support

If you found this project useful, consider giving it a star on GitHub.

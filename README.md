# 🎤 AI Voice Transcriber

A modern web application that records your voice, transcribes it using OpenAI Whisper, and intelligently cleans up the transcript using a local AI model. All processing happens locally on your machine for complete privacy.

## ✨ Features

- **🎙️ Browser-based Recording**: Record audio directly in your web browser using the MediaRecorder API
- **📝 AI-Powered Transcription**: Accurate speech-to-text conversion using OpenAI's Whisper model (runs locally)
- **🧹 Intelligent Text Cleaning**: Automatically removes filler words (um, uh, like), repetitions, and false starts while fixing grammar
- **📋 One-Click Copy**: Easily copy cleaned transcripts to your clipboard
- **🔒 Privacy-First**: All processing happens locally - your audio never leaves your machine
- **🎨 Modern UI**: Beautiful gradient interface with smooth animations and responsive design

## 🛠️ Tech Stack

### Backend
- **FastAPI**: Modern, fast web framework for building APIs
- **OpenAI Whisper**: State-of-the-art speech recognition model
- **Ollama**: Local LLM runtime for text cleaning (using gemma2:2b model)

### Frontend
- **Vanilla JavaScript**: No framework dependencies
- **HTML5 MediaRecorder API**: Browser-native audio recording
- **Modern CSS**: Gradient backgrounds, animations, and responsive design

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Python 3.8+** (Python 3.11 recommended)
- **Ollama** installed and running on your system
  - Download from [ollama.ai](https://ollama.ai)
  - Pull the required model: `ollama pull gemma2:2b`

## 🚀 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Aayushmaan-24/VoiceTranscriber
   cd VoiceCleaner/VoiceTranscriber
   ```

2. **Create a virtual environment** (recommended)
   ```bash
   python3 -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. **Install Python dependencies**
   ```bash
   pip install fastapi uvicorn openai-whisper ollama
   ```

   **Note**: Installing Whisper will also install PyTorch and other ML dependencies, which may take some time.

4. **Verify Ollama is running**
   ```bash
   ollama list  # Should show gemma2:2b model
   ```

   If the model is not installed:
   ```bash
   ollama pull gemma2:2b
   ```

## 🎯 Usage

1. **Start the FastAPI server**
   ```bash
   cd backend
   uvicorn main:app --reload
   ```

   The server will start on `http://localhost:8000`

2. **Open your browser**
   - Navigate to `http://localhost:8000`
   - The application will automatically redirect to the frontend

3. **Record and transcribe**
   - Click **"Start Recording 🎙️"** and grant microphone permissions
   - Speak naturally - include ums, pauses, and filler words
   - Click **"🛑 Click to Stop"** when finished
   - Click **"Transcribe with AI"** to process your recording
   - Wait for the AI to transcribe and clean your audio
   - Copy the cleaned transcript using the **"📋 Copy Transcript"** button

## 📁 Project Structure

```
VoiceTranscriber/
├── backend/
│   └── main.py          # FastAPI application with transcription endpoint
├── frontend/
│   ├── index.html       # Main HTML file
│   ├── script.js        # JavaScript for recording and API calls
│   └── styles.css       # Styling and animations
├── temp/                # Temporary audio files (auto-created)
└── venv/                # Python virtual environment
```

## 🔧 Configuration

### Changing the Whisper Model

Edit `backend/main.py` and modify the model name:
```python
whisper_model = whisper.load_model('base')  # Options: tiny, base, small, medium, large
```

**Note**: Larger models provide better accuracy but require more memory and processing time.

### Changing the LLM Model

Edit `backend/main.py` and modify the Ollama model:
```python
response = ollama.generate(model = 'gemma2:2b', prompt = prompt)
```

Available models depend on what you've installed with Ollama. Other options include:
- `llama3.2:3b`
- `llama3.2:1b`
- `mistral:7b`

## 🐛 Troubleshooting

### Microphone Access Denied
- Ensure your browser has microphone permissions enabled
- Check browser settings for site permissions
- Try using HTTPS or localhost (some browsers require secure contexts)

### Ollama Connection Error
- Verify Ollama is running: `ollama list`
- Ensure the model is installed: `ollama pull gemma2:2b`
- Check if Ollama is accessible on the default port

### Whisper Model Loading Issues
- First-time model download may take several minutes
- Ensure you have sufficient disk space (~500MB for base model)
- Check your internet connection for initial download

### Slow Transcription
- Use a smaller Whisper model (tiny or base) for faster processing
- Consider using a smaller LLM model for text cleaning
- Ensure your system meets the minimum requirements

## 📝 API Endpoints

### `POST /transcribe`
Transcribes and cleans an audio file.

**Request:**
- Content-Type: `multipart/form-data`
- Body: Audio file (webm format)

**Response:**
```json
{
  "transcript": "Cleaned transcript text...",
  "raw": "Original transcript with filler words..."
}
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the MIT License.

## 🙏 Acknowledgments

- **OpenAI Whisper** for speech recognition
- **Ollama** for local LLM inference
- **FastAPI** for the web framework

## 📧 Support

For issues, questions, or contributions, please open an issue on the repository.

---

**Made with ❤️ for privacy-conscious voice transcription**


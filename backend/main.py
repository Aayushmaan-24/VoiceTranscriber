from fastapi import FastAPI, UploadFile , File
from fastapi.staticfiles import StaticFiles
from fastapi.responses import HTMLResponse, JSONResponse
import whisper
import ollama
import os
import shutil

app = FastAPI(
    title = "AI Voice Transcriber",
    description = "Your voice note transcribed and cleaned",
    version = "1.0"
)

# serve frontend files
app.mount("/static", StaticFiles(directory="frontend"),name="static")

# load whisper local model at startup
print("Loading whisper base model ... Might take some time (very less) 🙂‍↕️")
whisper_model = whisper.load_model('base')
print("Whisper has been loaded (never doubt me) 🥰")

# temporary recording
TEMP_DIR = "../temp"
os.makedirs(TEMP_DIR, exist_ok=True)

@app.get("/", response_class = HTMLResponse)
def home():
    return """
    <meta http-equiv="refresh" content ="0; url=/static/index.html">
    <p> Redirecting to app ... 
        <a href = "/static/index.html"> Click here if not redirected </a>
    </p>
    """

@app.post("/transcribe")
async def transcribe(audio: UploadFile=File(...)):
    try:
        # save audio temporarily
        temp_path = os.path.join(TEMP_DIR, "temp_audio.webm")
        with open(temp_path, "wb") as f:
            shutil.copyfileobj(audio.file, f)
        
        # transcribe with whisper
        result = whisper_model.transcribe(temp_path)
        raw_transcript = result['text'].strip()

        # clean up with local llm (llama3.2:3b)
        prompt = f"""
Clean up this spoken transcript. Remove filler words (um, uh, like, you know), repetitions, false starts, and fix grammar. Make it concise, natural, and readable while keeping the original meaning

Raw transcript : 
{raw_transcript}

Clean transcript:
"""
        response = ollama.generate(model = 'gemma2:2b', prompt = prompt)
        clean_transcript = response['response'].strip()
        
        # clean the temp file
        os.remove(temp_path)

        return JSONResponse({
            "transcript" : clean_transcript,
            "raw" : raw_transcript
        })
    except Exception as e:
        if os.path.exists(temp_path):
            os.remove(temp_path)
        return JSONResponse({
            "error" : str(e)
        }, status_code = 500)

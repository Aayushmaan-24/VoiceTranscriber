from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.responses import HTMLResponse

app = FastAPI(
    title = "AI Voice Transcriber",
    description = "Your voice note transcribed and cleaned",
    version = "1.0"
)

# serve frontend files
app.mount("/static", StaticFiles(directory="frontend"),name="static")

@app.get("/", response_class = HTMLResponse)
def home():
    return """
    <html>
        <head>
            <title>AI Powered Voice Transcriber</title>
        </head>
        <body style="font-family:Georgia; padding:20px; max-width:800px; margin:auto">
            <h1>🎤 Voice Transcriber Backend is Running!</h1>
            <p>All is good </p>
            <p>server is running at <code>http://localhost:8000</code></p>
        </body>
    </html>
    """
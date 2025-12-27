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
    <meta http-equiv="refresh" content ="0; url=/static/index.html">
    <p> Redirecting to app ... 
        <a href = "/static/index.html"> Click here if not redirected </a>
    </p>
    """
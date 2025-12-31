const startbtn = document.getElementById('startbtn')
const stopbtn = document.getElementById('stopbtn')
const preview = document.getElementById('preview')
const status = document.getElementById('status')
const transcribebtn = document.getElementById("transcribebtn")
const transcript = document.getElementById("transcript")
const spinner = document.getElementById("spinner")
const copybtn = document.getElementById("copyBtn")

let mediaRecorder;
let audioChunks = []

startbtn.addEventListener('click', async() => {
    try{
        const stream = await navigator.mediaDevices.getUserMedia({
            audio : true
        })
        mediaRecorder = new MediaRecorder(stream)
        audioChunks = []

        mediaRecorder.ondataavailable = e => {
            audioChunks.push(e.data)
        }

        mediaRecorder.onstop = () => {
            const audioBlob = new Blob(audioChunks, { type: 'audio/webm'})
            const audioUrl = URL.createObjectURL(audioBlob)
            preview.src = audioUrl
            preview.style.display = 'block'

            window.recordedBlob = audioBlob

            status.textContent = 'Recording Complete! Ready to Transcribe 🫡'
            status.classList.remove('recording')

            transcribeBtn.style.display = 'inline-block';

        }

        mediaRecorder.start()

        startbtn.style.display = 'none'
        stopbtn.style.display = 'inline-block'
        status.textContent = '🔴 Recording... Speak now! 🤠'
        status.classList.add('recording')
    }
    catch(err) {
        status.textContent = 'Microphone access denied or not available. 😤'
        console.error(err)
    }
})

stopbtn.addEventListener('click' , () => {
    if (mediaRecorder && mediaRecorder.state != 'inactive') {
        mediaRecorder.stop()

        mediaRecorder.stream.getTracks().forEach(track => track.stop())
        stopbtn.style.display = 'none'
        startbtn.style.display = 'inline-block'
    }
})


transcribebtn.onclick = async() => {
    if(!window.recordedBlob){
        status.textContent = "No recording found 😒"
        return
    }

    spinner.style.display = 'block'
    transcript.style.display = 'none'

    transcribebtn.disabled = true
    transcribebtn.textContent = "Transcribing ... "
    status.textContent = "Sending to local AI (give me some time 🫠)"

    const formData = new FormData()
    formData.append('audio', window.recordedBlob, 'recording.webm')
    try {
        const response = await fetch('/transcribe', {
            method: "POST",
            body: formData
        })
        const data = await response.json()
        if (data.transcript) {
            transcript.textContent = data.transcript
            transcript.style.display = 'block'
            status.textContent = 'Transcription complete! 🧏‍♂️'
            
            copybtn.style.display = 'inline-block'
            copybtn.onclick = async () =>{
                try {
                    await navigator.clipboard.writeText(data.transcript)
                    copybtn.textContent = "✓ Copied!"
                    copybtn.classList.add('copied')
                    setTimeout(() => {
                        copybtn.textContent = '📋 Copy Transcript'
                        copybtn.classList.remove('copied')
                    },2000)
                }
                catch (err) {
                    const textArea = document.createElement('textarea')
                    textArea.value = data.transcript
                    document.body.appendChild(textArea)
                    textArea.select()
                    document.execCommand('copy')
                    document.body.removeChild(textArea)
                    copybtn.textContent = '✓ Copied!'
                    setTimeout(() => {
                        copybtn.textContent = '📋 Copy Transcript'
                    },2000)
                }
            }

        }
        else{
            status.textContent = "🤡 Error: " + (data.error || 'Unknown')
        }
    }
    catch(err){
        status.textContent = 'Upload failed 😖 ' + err.message
        console.error(err)
    }
    finally{
        spinner.style.display = 'none'
        transcribebtn.disabled = false
        transcribebtn.textContent = 'Transcribe with AI'
    }

}
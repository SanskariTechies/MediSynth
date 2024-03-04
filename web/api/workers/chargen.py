import os, random, subprocess
from gtts import gTTS

def text_to_speech(text):
    tts = gTTS(text=text, lang='en')
    tts.save("./output/audio.mp3")

def CharGen(text):
    try:
        files = os.listdir(os.getcwd())
        face = random.choice(files)
        text_to_speech(text)
        command = [
            "Wav2Lip", 
            "python", "Wav2Lip/inference.py",
            "--checkpoint_path Wav2Lip/checkpoints/wav2lip_gan.pth",
            f"--face \"{face}\"",
            f"--audio \"./output/audio.mp3\"",
            f"--outfile \"./output/result.mp4\""
        ]
        subprocess.run(command)
        os.remove("./output/audio.mp3")
        return { "success": True, "path": "/output/result.mp4" }
    except Exception as e:
        print(e)
        return { "success": False, "message": "Something went wrong." }
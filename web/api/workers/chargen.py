import os, random, subprocess
from gtts import gTTS
from pydub import AudioSegment

def text_to_speech(text):
    tts = gTTS(text=text, lang='en', tld='com.au')
    tts.save("./output/audio.mp3")
    AudioSegment.converter = "C:\\ffmpeg\\ffmpeg\\bin\\ffmpeg.exe"
    AudioSegment.ffmpeg = "C:\\ffmpeg\\ffmpeg\\bin\\ffmpeg.exe"
    AudioSegment.ffprobe ="C:\\ffmpeg\\ffmpeg\\bin\\ffprobe.exe"
    sound = AudioSegment.from_mp3("./output/audio.mp3")
    sound.export("./output/audio.mp3", format="wav")

def CharGen(text):
    try:
        # files = os.listdir(os.getcwd())
        # face = random.choice(files)
        face = "output/input_video.mp4"
        text_to_speech(text)
        print(os.getcwd())
        command = [
            f"python Wav2Lip/inference.py --checkpoint_path Wav2Lip/checkpoints/wav2lip_gan.pth --face \"{os.path.abspath(face)}\" --audio {os.path.abspath('output/audio.mp3')}"#,
            # f"--outfile \"./output/result.mp4\""
        ]
        subprocess.run(command)
        os.remove("./output/audio.mp3")
        return { "success": True, "path": "/output/result.mp4" }
    except Exception as e:
        print(e)
        return { "success": False, "message": "Something went wrong." }
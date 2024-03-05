import os, random, subprocess
from gtts import gTTS
from pydub import AudioSegment

async def text_to_speech(text):
    tts = gTTS(text=text, lang='en', tld='com.au')
    tts.save("./Wav2Lip/output/audio.mp3")
    # sound = AudioSegment.from_mp3("./output/audio.mp3")
    # sound.export("./output/audio.mp3", format="wav")

async def CharGen(text):
    # try:
        # files = os.listdir(os.getcwd())
        # face = random.choice(files)
        await text_to_speech(text)
        os.chdir(os.path.join(os.getcwd(), "Wav2Lip"))
        command = [
            f"python ./inference.py --checkpoint_path ./checkpoints/wav2lip_gan.pth --face output/input_video.mp4 --audio output/audio.mp3"#,
            # f"--outfile ./output/result.mp4"
        ]
        os.system(command[0])
        os.remove("./output/audio.mp3")
        return { "success": True, "path": "/output/result.mp4" }
    # except Exception as e:
    #     print(e)
    #     return { "success": False, "message": "Something went wrong." }
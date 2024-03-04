# MediSynth

## Problem Statement

### Abstract

This  mini  project  is  an  innovative  fusion  of  Machine  Learning  (ML)  and  Artificial  Intelligence (AI)  designed  to  elevate  medical  education.  Featuring  two  interfaces  for  patients  and  aspiring doctors.  A  pivotal  feature  introduces  an  AI-generated  patient  exhibiting  lifelike  symptoms  and presenting a simulated body temperature. Students should diagnose and prescribe medications, and then they receive real-time feedback with alternative suggestions through a user-friendly interface. 
The application will take the access of camera and microphone to get the data from students so as to provide an immersive learning experience. Enhancing realism, the AI patient expresses  emotions  through  audio  and  visual  cues.  Another  noteworthy  feature  is  the  Optical Character  Recognition  (OCR),  which  scans  medicines,  providing  information  on  about  the medicine and its uses . The project facilitates peer-to-peer interactions and introduces AI-driven consultations for remote patient monitoring through a chatbot. The medicine interface covers both English and Ayurvedic medicines for inclusivity. 

## Working

### Frontend

- Move to web/client

```bash
cd web/client
```

```bash
npm i
```

```bash
npm start
```

### Backend

- Move to web/api

```bash
cd web/api
```

```bash
wget 'https://iiitaphyd-my.sharepoint.com/personal/radrabha_m_research_iiit_ac_in/_layouts/15/download.aspx?share=EdjI7bZlgApMqsVoEUUXpLsBxqXbn5z8VTmoxp55YNDcIA' -O './Wav2Lip/checkpoints/wav2lip_gan.pth'

wget "https://www.adrianbulat.com/downloads/python-fan/s3fd-619a316812.pth" -O "./Wav2Lip/face_detection/detection/sfd/s3fd.pth"

pip install -q youtube-dl
```

```bash
python server.py
```

## Team

- **[Akkil M G](https://github.com/AkkilMG)**
- **[Ashish Goswami](https://github.com/Ashish6298)**
- **[Saiesh Savant](https://github.com/SaieshSavant)**
- **[Rakshitha](https://github.com/Rakshitha037)**
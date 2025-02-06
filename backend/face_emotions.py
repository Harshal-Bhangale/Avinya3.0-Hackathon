import cv2
import numpy as np
import json
import time
from flask import Flask, jsonify
from flask_cors import CORS
from deepface import DeepFace
from collections import Counter
import threading

app = Flask(_name)  # ✅ Fixed _name issue
CORS(app)

mood_history = []
current_emotion = "Neutral"
webcam_running = False

def detect_emotion(frame):
    try:
        result = DeepFace.analyze(frame, actions=["emotion"], enforce_detection=False)
        return result[0]["dominant_emotion"]
    except:
        return "No face detected"

def analyze_mood():
    if len(mood_history) == 0:
        return "No data yet."

    mood_counts = Counter(mood_history)
    most_common_mood = mood_counts.most_common(1)[0][0]

    stress_indicators = ["angry", "fear", "sad"]
    calm_indicators = ["happy", "neutral"]

    if most_common_mood in stress_indicators:
        return f"High stress detected! Your common mood: {most_common_mood}"
    elif most_common_mood in calm_indicators:
        return f"Stable mood detected! Your common mood: {most_common_mood}"
    else:
        return f"Mood analysis: {most_common_mood}"

def start_webcam():
    global current_emotion, webcam_running
    if webcam_running:
        return {"message": "Webcam is already running!"}

    webcam_running = True
    cap = cv2.VideoCapture(0)

    if not cap.isOpened():
        webcam_running = False
        return {"error": "Error: Could not access the webcam."}

    start_time = time.time()
    while time.time() - start_time < 10:  # Capture for 10 seconds
        ret, frame = cap.read()
        if not ret:
            break

        frame = cv2.flip(frame, 1)
        emotion = detect_emotion(frame)
        mood_history.append(emotion)
        current_emotion = emotion

        cv2.putText(frame, f"Emotion: {emotion}", (50, 50),
                    cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 255, 0), 2)

        cv2.imshow("Mental Health Monitoring", frame)

        if cv2.waitKey(1) & 0xFF == ord('q'):
            break

    cap.release()
    cv2.destroyAllWindows()

    with open("mood_log.json", "w") as f:
        json.dump(mood_history, f)

    webcam_running = False
    print("\n🔍 Mood Analysis Summary:")
    print(analyze_mood())

    return {"message": "Webcam analysis completed!"}

@app.route('/emotion', methods=['GET'])
def get_emotion():
    return jsonify({"current_emotion": current_emotion})

@app.route('/mood-history', methods=['GET'])
def get_mood_history():
    return jsonify({"mood_history": mood_history, "summary": analyze_mood()})

@app.route('/start-webcam', methods=['POST'])
def trigger_webcam():
    webcam_thread = threading.Thread(target=start_webcam)
    webcam_thread.start()
    return jsonify({"message": "Webcam analysis started!"})

if _name_ == "_main":  # ✅ Fixed _name issue
    app.run(debug=True, port=5000)
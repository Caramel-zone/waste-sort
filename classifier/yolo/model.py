from ultralytics import YOLO
import cv2
import numpy as np
import os

# # Get the base directory
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

model = YOLO(r"best_50.pt")
OUTPUT_DIR = os.path.join(BASE_DIR, 'output')

# Create the output directory if it doesn't exist
if not os.path.exists(OUTPUT_DIR):
    os.makedirs(OUTPUT_DIR)

def detect_image(image_path):
    results = model(image_path)
    detected_classes = [result.boxes.cls.tolist() for result in results]

    class_names = ['Paper', 'Metal', 'Plastic', 'Glass']
    counts = {name: 0 for name in class_names}

    for cls_list in detected_classes:
        for cls_id in cls_list:
            if 0 <= cls_id < len(class_names):
                counts[class_names[int(cls_id)]] += 1

    # Save the processed image in /output/
    filename = "processed_" + os.path.basename(image_path)
    output_path = os.path.join(OUTPUT_DIR, filename)

    processed_image = results[0].plot()
    cv2.imwrite(output_path, processed_image)  # Save processed image

    return f"/output/{filename}", counts  # Return image URL

def detect_video(video_path, output_path):
    cap = cv2.VideoCapture(video_path)
    fourcc = cv2.VideoWriter_fourcc(*'mp4v')
    out = cv2.VideoWriter(output_path, fourcc, 20.0, (640, 480))

    class_names = ['Paper', 'Metal', 'Plastic', 'Glass']
    counts = {name: 0 for name in class_names}

    while cap.isOpened():
        ret, frame = cap.read()
        if not ret:
            break

        results = model(frame)
        frame = results[0].plot()

        for cls_id in results[0].boxes.cls.tolist():
            if 0 <= cls_id < len(class_names):
                counts[class_names[int(cls_id)]] += 1

        out.write(frame)

    cap.release()
    out.release()
    return output_path, counts

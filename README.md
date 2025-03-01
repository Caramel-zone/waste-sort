## **Waste-Sort: AI-Powered Waste Classification System**

### **Project Overview**
Waste-Sort is an AI-powered web application that classifies waste into different categories (plastic, metal, paper, etc.) using **YOLOv8 (You Only Look Once)** for object detection. The system is built with **Django** as the backend and utilizes **PyTorch** for deep learning-based waste classification.

---

## **Project Workflow**
1. **User uploads an image** of waste through the web interface.
2. The image is processed and **sent to the YOLOv8 model**, which classifies it.
3. The **predicted class and confidence score** are displayed on the web UI.
4. The classified image is stored in the `outputs/` folder for reference.
5. Users can view the history of classified waste.

---

## **Project Structure**
```
waste-sort/
│── capstone/              # Django project folder
│   ├── capstone/          # Django core settings
│   ├── classifier/        # Machine learning model and scripts
│   ├── media/             # Stores user-uploaded images
│   ├── outputs/           # Stores processed images
│   ├── templates/         # HTML files for UI
│   ├── manage.py          # Django entry point
│
│── models/
│   ├── best_50.pt         # Trained YOLOv8 model for classification
│   ├── yolov8n.pt         # Pretrained YOLOv8 model (can be fine-tuned)
│
│── requirements.txt       # Dependencies required for the project
│── README.md              # Project documentation (this file)
│── .gitignore             # Ignored files
```

---

## **Installation and Setup**
### **1. Clone the Repository**
```bash
git clone https://github.com/Caramel-zone/waste-sort.git
cd waste-sort
```

### **2. Set Up a Virtual Environment (Recommended)**
```bash
python -m venv env
source env/bin/activate  # For macOS/Linux
env\Scripts\activate  # For Windows
```

### **3. Install Dependencies**
```bash
pip install -r requirements.txt
```

### **4. Set Up Django Database**
```bash
python manage.py makemigrations
python manage.py migrate
```

### **5. Run the Django Development Server**
```bash
python manage.py runserver
```
- The application will be available at **http://127.0.0.1:8000/**

---

## **How to Use**
1. Open the web browser and go to **http://127.0.0.1:8000/**
2. Click on **Upload Image** to select a waste image.
3. Click **Submit** to process the image.
4. The classified waste type and confidence score will be displayed.
5. View processed images in the **outputs/** folder.

---

## **Troubleshooting & Notes**
- Ensure you have **Python 3.8+** installed.
- If you encounter missing module errors, manually install them using:
  ```bash
  pip install django torch ultralytics opencv-python
  ```
- To reset the database, delete the `db.sqlite3` file and rerun migrations.

---

## **Future Enhancements**
- Improve model accuracy with more training data.
- Deploy on cloud platforms like **AWS/GCP**.
- Integrate a **mobile app interface**.

---
🚀 **Developed by Caramel-Zone**  
Feel free to contribute or report issues in the **Issues** tab! 🎯

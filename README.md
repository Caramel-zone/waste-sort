Waste-Sort: AI-Powered Waste Classification System
Project Overview
Waste-Sort is an AI-powered web application that classifies waste into different categories (plastic, metal, paper, etc.) using YOLOv8 (You Only Look Once) for object detection. The system is built with Django as the backend and utilizes PyTorch for deep learning-based waste classification.

Project Workflow
User uploads an image of waste through the web interface.
The image is processed and sent to the YOLOv8 model, which classifies it.
The predicted class and confidence score are displayed on the web UI.
The classified image is stored in the outputs/ folder for reference.
Users can view the history of classified waste.
Project Structure
graphql
Copy
Edit
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
Installation and Setup
1. Clone the Repository
bash
Copy
Edit
git clone https://github.com/Caramel-zone/waste-sort.git
cd waste-sort
2. Set Up a Virtual Environment (Recommended)
bash
Copy
Edit
python -m venv env
source env/bin/activate  # For macOS/Linux
env\Scripts\activate  # For Windows
3. Install Dependencies
bash
Copy
Edit
pip install -r requirements.txt
4. Set Up Django Database
bash
Copy
Edit
python manage.py makemigrations
python manage.py migrate
5. Run the Django Development Server
bash
Copy
Edit
python manage.py runserver
The application will be available at http://127.0.0.1:8000/
How to Use
Open the web browser and go to http://127.0.0.1:8000/
Click on Upload Image to select a waste image.
Click Submit to process the image.
The classified waste type and confidence score will be displayed.
View processed images in the outputs/ folder.
Troubleshooting & Notes
Ensure you have Python 3.8+ installed.
If you encounter missing module errors, manually install them using:
bash
Copy
Edit
pip install django torch ultralytics opencv-python
To reset the database, delete the db.sqlite3 file and rerun migrations.
Future Enhancements
Improve model accuracy with more training data.
Deploy on cloud platforms like AWS/GCP.
Integrate a mobile app interface.
🚀 Developed by Caramel-Zone
Feel free to contribute or report issues in the Issues tab! 🎯

from django.shortcuts import render, redirect
from django.http import JsonResponse
from .yolo.model import detect_image, detect_video
import os

# Get the base directory path
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


def index(request):
    """
    Renders the home page where users can upload images or videos.
    """
    return render(request, "index.html")


def process_image(request):
    """
    Processes the uploaded image, saves it to the server, 
    and redirects to the results page with the detected counts.
    """
    if request.method == "POST" and request.FILES.get('image'):
        image = request.FILES['image']
        image_path = os.path.join(BASE_DIR, "uploads", image.name)

        # Save the uploaded image to the 'uploads' directory
        with open(image_path, 'wb') as f:
            for chunk in image.chunks():
                f.write(chunk)

        # Process the image using YOLO and get the detected counts
        processed_image, counts = detect_image(image_path)

        # Store the counts data in session so that it can be accessed in the results view
        request.session['counts'] = counts

        # Redirect to the results page
        return redirect('results')


def process_video(request):
    """
    Processes the uploaded video, saves it to the server,
    processes it with YOLO, and returns the processed video URL and counts as JSON.
    """
    if request.method == "POST" and request.FILES.get('video'):
        video = request.FILES['video']
        video_path = os.path.join(BASE_DIR, "uploads", video.name)
        output_path = os.path.join(BASE_DIR, "outputs", "processed_video.mp4")

        # Save the uploaded video to the 'uploads' directory
        with open(video_path, 'wb') as f:
            for chunk in video.chunks():
                f.write(chunk)

        # Process the video using YOLO and get the processed video and counts
        output_video, counts = detect_video(video_path, output_path)

        # Return the processed video URL and counts as a JSON response
        return JsonResponse({"video_url": output_video, "counts": counts})
def results(request):
    # Retrieve counts from the session or use default values
    counts = request.session.get('counts', {})
    # Add default categories with zero count if not already present
    default_categories = ['Plastic', 'Metal', 'Glass', 'Paper', 'Organic']
    for category in default_categories:
        counts.setdefault(category, 0)
    return render(request, "results.html", {"counts": counts})
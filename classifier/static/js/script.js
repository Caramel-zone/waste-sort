 // Helper: Get CSRF Token from Cookies
 function getCSRFToken() {
    const cookies = document.cookie.split(";");
    for (let cookie of cookies) {
      cookie = cookie.trim();
      if (cookie.startsWith("csrftoken=")) {
        return cookie.substring("csrftoken=".length);
      }
    }
    return null;
  }

  // Image Capture and Upload
  const video = document.getElementById("video");
  const canvas = document.getElementById("canvas");
  const captureBtn = document.getElementById("capture-btn");
  const imguploadbtn = document.getElementById("img-upload-btn");
  const videouploadbtn = document.getElementById("video-upload-btn");

  document
    .getElementById("img-upload-btn")
    .addEventListener("click", () => {
      event.preventDefault();
      const imageInput = document.getElementById("image-input");

      if (imageInput.files.length === 0) {
        alert("Please select an image first.");
        return;
      }

      const formData = new FormData();
      formData.append("image", imageInput.files[0]);

      fetch("/process_image/", {
        method: "POST",
        body: formData,
        headers: {
          "X-CSRFToken": getCSRFToken(),
        },
      })
        .then((response) => {
          if (response.ok) {
            window.location.href = "/results/";
          } else {
            throw new Error("Image processing failed.");
          }
        })
        .catch((error) => {
          document.getElementById(
            "results"
          ).innerHTML = `<p>${error.message}</p>`;
        });
    });

  function getCSRFToken() {
    const csrfToken = document.querySelector(
      "[name=csrfmiddlewaretoken]"
    ).value;
    return csrfToken;
  }

  navigator.mediaDevices
    .getUserMedia({ video: { width: 1280, height: 720 }, audio: false })
    .then((stream) => {
      video.srcObject = stream;

      captureBtn.addEventListener("click", () => {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        const context = canvas.getContext("2d");
        context.drawImage(video, 0, 0, canvas.width, canvas.height);

        canvas.toBlob((blob) => {
          const formData = new FormData();
          formData.append("image", blob, "captured_image.jpg");

          fetch("/process_image/", {
            method: "POST",
            body: formData,
            headers: { "X-CSRFToken": getCSRFToken() },
          })
            .then((response) => {
              if (response.ok) {
                window.location.href = "/results/";
              } else {
                throw new Error("Image processing failed.");
              }
            })
            .catch((error) => {
              document.getElementById(
                "results"
              ).innerHTML = `<p>${error.message}</p>`;
            });
        });
      });
    })
    .catch((error) => {
      console.error("Camera access error:", error);
    });

  // Video Recording and Upload
  const videoCapture = document.getElementById("video-capture");
  const startRecordBtn = document.getElementById("start-record-btn");
  const stopRecordBtn = document.getElementById("stop-record-btn");
  let mediaRecorder;
  let recordedChunks = [];

  navigator.mediaDevices
    .getUserMedia({ video: true, audio: true })
    .then((stream) => {
      videoCapture.srcObject = stream;
      mediaRecorder = new MediaRecorder(stream);

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          recordedChunks.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(recordedChunks, { type: "video/mp4" });
        const formData = new FormData();
        formData.append("video", blob, "captured_video.mp4");

        fetch("/process_video/", {
          method: "POST",
          body: formData,
          headers: { "X-CSRFToken": getCSRFToken() },
        })
          .then((response) => {
            if (response.ok) {
              window.location.href = "/results/";
            } else {
              throw new Error("Image processing failed.");
            }
          })
          .catch((error) => {
            document.getElementById(
              "results"
            ).innerHTML = `<p>${error.message}</p>`;
          });
      };

      startRecordBtn.addEventListener("click", () => {
        recordedChunks = [];
        mediaRecorder.start();
        startRecordBtn.disabled = true;
        stopRecordBtn.disabled = false;
      });

      stopRecordBtn.addEventListener("click", () => {
        mediaRecorder.stop();
        startRecordBtn.disabled = false;
        stopRecordBtn.disabled = true;
      });
    })
    .catch((error) => {
      console.error("Camera and microphone access error:", error);
    });

  // Video Upload
  document
    .getElementById("video-upload-btn")
    .addEventListener("click", (event) => {
      // Prevent the form from submitting
      event.preventDefault();

      const videoInput = document.getElementById("video-input");

      if (videoInput.files.length === 0) {
        alert("Please select a video first.");
        return;
      }

      const formData = new FormData();
      formData.append("video", videoInput.files[0]);

      fetch("/process_video/", {
        method: "POST",
        body: formData,
        headers: {
          "X-CSRFToken": getCSRFToken(),
        },
      })
        .then((response) => {
          if (response.ok) {
            // Redirect to results page after successful video processing
            window.location.href = "/results/";
          } else {
            throw new Error("Video processing failed.");
          }
        })
        .catch((error) => {
          document.getElementById(
            "results"
          ).innerHTML = `<p>${error.message}</p>`;
        });
    });
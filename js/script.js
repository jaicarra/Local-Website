// Get the modal, image, and caption elements
const lightbox = document.getElementById("myLightbox");
const lightboxImg = document.getElementById("img01");
const lightboxCaption = document.getElementById("caption");
let currentImageIndex = 0; // To keep track of the currently displayed image

// Get all gallery items (images)
const galleryImages = Array.from(document.querySelectorAll(".gallery-item img")); // Convert NodeList to Array

// Function to open the lightbox
function openLightbox(imgElement) {
    lightbox.style.display = "flex"; // Use flex to center content
    currentImageIndex = galleryImages.indexOf(imgElement); // Set current index
    showImage(currentImageIndex); // Show the clicked image
}

// Function to show a specific image in the lightbox
function showImage(index) {
    if (index >= galleryImages.length) {
        currentImageIndex = 0; // Loop back to the first image
    } else if (index < 0) {
        currentImageIndex = galleryImages.length - 1; // Loop to the last image
    } else {
        currentImageIndex = index;
    }
    lightboxImg.src = galleryImages[currentImageIndex].src;
    lightboxCaption.innerHTML = galleryImages[currentImageIndex].alt;
}

// Function to navigate between images (for arrows and keyboard)
function plusSlides(n) {
    showImage(currentImageIndex + n);
}

// Function to close the lightbox
function closeLightbox() {
    lightbox.style.display = "none";
}

// Close the lightbox if the user clicks anywhere outside the image (but not on controls)
lightbox.addEventListener("click", function(event) {
    if (event.target === lightbox || event.target.classList.contains('close-button')) {
        closeLightbox();
    }
});

// Keyboard navigation (left/right arrow keys)
document.addEventListener("keydown", function(event) {
    if (lightbox.style.display === "flex") { // Only navigate if lightbox is open
        if (event.key === "ArrowLeft") {
            plusSlides(-1);
        } else if (event.key === "ArrowRight") {
            plusSlides(1);
        } else if (event.key === "Escape") { // Close with Escape key
            closeLightbox();
        }
    }
});

// Touch swipe navigation
let touchstartX = 0;
let touchendX = 0;

lightboxImg.addEventListener('touchstart', e => {
    touchstartX = e.changedTouches[0].screenX;
});

lightboxImg.addEventListener('touchend', e => {
    touchendX = e.changedTouches[0].screenX;
    handleGesture();
});

function handleGesture() {
    if (touchendX < touchstartX) { // Swiped left
        plusSlides(1);
    }
    if (touchendX > touchstartX) { // Swiped right
        plusSlides(-1);
    }
}

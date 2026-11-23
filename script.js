
function openAchievement() {
    const modal = document.getElementById("achievement-modal");

    modal.classList.add("active");
    modal.setAttribute("aria-hidden", "false");

    document.body.style.overflow = "hidden";
}

function closeAchievement() {
    const modal = document.getElementById("achievement-modal");

    modal.classList.remove("active");
    modal.setAttribute("aria-hidden", "true");

    document.body.style.overflow = "";
}

// Close when clicking outside the pop-up
document.getElementById("achievement-modal").addEventListener("click", function(event) {
    if (event.target === this) {
        closeAchievement();
    }
});

// Close using the Escape key
document.addEventListener("keydown", function(event) {

    const lightbox = document.getElementById("photo-lightbox");

    if (event.key === "Escape") {
        if (lightbox.classList.contains("active")) {
            closePhotoViewer();
        } else {
            closeAchievement();
        }
    }

    if (lightbox.classList.contains("active")) {
        if (event.key === "ArrowRight") changePhoto(1);
        if (event.key === "ArrowLeft") changePhoto(-1);
    }

});

// PHOTO VIEWER

const achievementPhotos = Array.from(
    document.querySelectorAll("#achievement-modal .achievement-photo")
);

let currentPhotoIndex = 0;

function openPhotoViewer(index) {
activeGallery = "achievement";
    currentPhotoIndex = index;
    showCurrentPhoto();

    document.getElementById("photo-lightbox")
        .classList.add("active");
}

function showCurrentPhoto() {
    const photo = achievementPhotos[currentPhotoIndex];

    document.getElementById("lightbox-image").src = photo.src;
    document.getElementById("lightbox-counter").textContent =
        (currentPhotoIndex + 1) + " / " + achievementPhotos.length;
}


let activeGallery = "achievement";

function changePhoto(direction) {

    if (activeGallery === "certificate") {

        currentCertificateIndex =
            (currentCertificateIndex + direction + certificatePhotos.length)
            % certificatePhotos.length;

        showCertificatePhoto();

    } else {

        currentPhotoIndex =
            (currentPhotoIndex + direction + achievementPhotos.length)
            % achievementPhotos.length;

        showCurrentPhoto();

    }
}


function closePhotoViewer() {
    document.getElementById("photo-lightbox")
        .classList.remove("active");
}

// Make all five achievement photos clickable

achievementPhotos.forEach(function(photo, index) {
    photo.addEventListener("click", function() {
        openPhotoViewer(index);
    });
});

// Close when clicking the dark background

document.getElementById("photo-lightbox")
    .addEventListener("click", function(event) {
        if (event.target === this) {
            closePhotoViewer();
        }
    });

/* MOBILE SWIPE NAVIGATION */

const photoLightbox = document.getElementById("photo-lightbox");

let touchStartX = 0;
let touchEndX = 0;

photoLightbox.addEventListener("touchstart", function(event) {
    touchStartX = event.changedTouches[0].screenX;
}, { passive: true });

photoLightbox.addEventListener("touchend", function(event) {
    touchEndX = event.changedTouches[0].screenX;

    const swipeDistance = touchEndX - touchStartX;

    if (Math.abs(swipeDistance) > 50) {

        if (swipeDistance < 0) {
            changePhoto(1);  // Swipe left: Next photo
        } else {
            changePhoto(-1); // Swipe right: Previous photo
        }

    }
}, { passive: true });



// Digital 101 certificate gallery

const certificatePhotos = [
    "digital-101-certificate-1.jpg",
    "digital-101-certificate-2.jpg"
];

let currentCertificateIndex = 0;

function openCertificateViewer(index) {
activeGallery = "certificate";
    currentCertificateIndex = index;

    document.getElementById("photo-lightbox")
        .classList.add("active");

    showCertificatePhoto();
}

function showCertificatePhoto() {
    document.getElementById("lightbox-image").src =
        certificatePhotos[currentCertificateIndex];

    document.getElementById("lightbox-counter").textContent =
        (currentCertificateIndex + 1) + " / " + certificatePhotos.length;
}

function changeCertificatePhoto(direction) {
    currentCertificateIndex =
        (currentCertificateIndex + direction + certificatePhotos.length)
        % certificatePhotos.length;

    showCertificatePhoto();
}


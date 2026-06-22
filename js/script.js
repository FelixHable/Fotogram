// ===============================
// Bilder
// ===============================

const images = [
    {
        title: "Mountain",
        src: "./assets/img/mountain.jpg"
    },
    {
        title: "Beach",
        src: "./assets/img/beach.jpg"
    },
    {
        title: "Forest",
        src: "./assets/img/forest.jpg"
    },
    {
        title: "City",
        src: "./assets/img/city.jpg"
    },
    {
        title: "Flowers",
        src: "./assets/img/flowers.jpg"
    },
    {
        title: "Lake",
        src: "./assets/img/lake.jpg"
    },
    {
        title: "Sky",
        src: "./assets/img/sky.jpg"
    },
    {
        title: "Sunset",
        src: "./assets/img/sunset.jpg"
    },
    {
        title: "Bridge",
        src: "./assets/img/bridge.jpg"
    },
    {
        title: "Snow",
        src: "./assets/img/snow.jpg"
    },
    {
        title: "Road",
        src: "./assets/img/road.jpg"
    },
    {
        title: "Waterfall",
        src: "./assets/img/waterfall.jpg"
    }
];

let currentImage = 0;


// ===============================
// Galerie erzeugen
// ===============================

function renderGallery() {

    const gallery = document.getElementById("gallery");

    gallery.innerHTML = "";

    images.forEach((image, index) => {

        gallery.innerHTML += `

            <img
                src="${image.src}"
                alt="${image.title}"
                onclick="openOverlay(${index})">

        `;

    });

}

renderGallery();


// ===============================
// Overlay öffnen
// ===============================

function openOverlay(index) {

    currentImage = index;

    document
        .getElementById("overlay")
        .classList.remove("d-none");

    updateOverlay();

}


// ===============================
// Overlay schließen
// ===============================

function closeOverlay() {

    document
        .getElementById("overlay")
        .classList.add("d-none");

}


// ===============================
// Overlay aktualisieren
// ===============================

function updateOverlay() {

    document.getElementById("overlayImage").src =
        images[currentImage].src;

    document.getElementById("imageTitle").innerText =
        images[currentImage].title;

    document.getElementById("counter").innerText =
        `${currentImage + 1} / ${images.length}`;

}


// ===============================
// Nächstes Bild
// ===============================

function nextImage() {

    currentImage++;

    if (currentImage >= images.length) {

        currentImage = 0;

    }

    updateOverlay();

}


// ===============================
// Vorheriges Bild
// ===============================

function previousImage() {

    currentImage--;

    if (currentImage < 0) {

        currentImage = images.length - 1;

    }

    updateOverlay();

}


// ===============================
// Tastatursteuerung
// ===============================

document.addEventListener("keydown", function(event){

    const overlay =
        document.getElementById("overlay");

    if(overlay.classList.contains("d-none")) return;


    if(event.key === "ArrowRight"){

        nextImage();

    }

    if(event.key === "ArrowLeft"){

        previousImage();

    }

    if(event.key === "Escape"){

        closeOverlay();

    }

});


// ===============================
// Klick außerhalb schließen
// ===============================

document
.getElementById("overlay")
.addEventListener("click", function(event){

    if(event.target === this){

        closeOverlay();

    }

});
// ===============================
// Bilder
// ===============================

const images = [
    {
        title: "alaska",
        src: "./img/alaska.jpg"
    },
    {
        title: "anime",
        src: "./img/anime.jpg"
    },
    {
        title: "atmosphere",
        src: "./img/atmosphere.png"
    },
    {
        title: "blue-tit",
        src: "./img/blue-tit.jpg"
    },
    {
        title: "hurricane",
        src: "./img/hurricane.jpg"
    },
    {
        title: "lake",
        src: "./img/lake.jpg"
    },
    {
        title: "moorente",
        src: "./img/moorente.jpg"
    },
    {
        title: "sea",
        src: "./img/sea.jpg"
    },
    {
        title: "snow-bunting",
        src: "./img/snow-bunting.jpg"
    },
    {
        title: "snow-leopard",
        src: "./img/snow-leopard.jpg"
    },
    {
        title: "travel",
        src: "./img/travel.jpg"
    },
    {
        title: "winter",
        src: "./img/winter.jpg"
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
                loading="lazy"
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

    document.getElementById("overlay").classList.remove("d-none");

    document.body.classList.add("no-scroll");

    updateOverlay();
}


// ===============================
// Overlay schließen
// ===============================

function closeOverlay() {

    document.getElementById("overlay").classList.add("d-none");

    document.body.classList.remove("no-scroll");
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
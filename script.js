// ===============================
// Bilder
// ===============================

const images = [
    {
        title: "Alaska",
        src: "./img/alaska.jpg"
    },
    {
        title: "Anime",
        src: "./img/anime.jpg"
    },
    {
        title: "Atmosphere",
        src: "./img/atmosphere.png"
    },
    {
        title: "Blue-tit",
        src: "./img/blue-tit.jpg"
    },
    {
        title: "Hurricane",
        src: "./img/hurricane.jpg"
    },
    {
        title: "Lake",
        src: "./img/lake.jpg"
    },
    {
        title: "Moorente",
        src: "./img/moorente.jpg"
    },
    {
        title: "Sea",
        src: "./img/sea.jpg"
    },
    {
        title: "Snow-bunting",
        src: "./img/snow-bunting.jpg"
    },
    {
        title: "Snow-leopard",
        src: "./img/snow-leopard.jpg"
    },
    {
        title: "Travel",
        src: "./img/travel.jpg"
    },
    {
        title: "Winter",
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

const closeIcon = document.getElementById("closeIcon");

closeBtn.addEventListener("mouseenter", () => {
    closeIcon.src = "./img/close-hover.png";
});

closeBtn.addEventListener("mouseleave", () => {
    closeIcon.src = "./img/close.png";
});

closeBtn.addEventListener("mousedown", () => {
    closeIcon.src = "./img/close-press.png";
});

closeBtn.addEventListener("mouseup", () => {
    closeIcon.src = "./img/close-hover.png";
});


const prevArrow = document.getElementById("prevArrow");
const nextArrow = document.getElementById("nextArrow");

function addArrowEffects(arrow) {

    arrow.parentElement.addEventListener("mouseenter", () => {
        arrow.src = "./img/arrow-hover.png";
    });

    arrow.parentElement.addEventListener("mouseleave", () => {
        arrow.src = "./img/arrow.png";
    });

    arrow.parentElement.addEventListener("mouseup", () => {
        arrow.src = "./img/arrow-hover.png";
    });
}

addArrowEffects(prevArrow);
addArrowEffects(nextArrow);
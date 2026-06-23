const images = [
    { title: "Alaska", src: "./img/alaska.jpg" },
    { title: "Anime", src: "./img/anime.jpg" },
    { title: "Atmosphere", src: "./img/atmosphere.png" },
    { title: "Blue-tit", src: "./img/blue-tit.jpg" },
    { title: "Hurricane", src: "./img/hurricane.jpg" },
    { title: "Lake", src: "./img/lake.jpg" },
    { title: "Moorente", src: "./img/moorente.jpg" },
    { title: "Sea", src: "./img/sea.jpg" },
    { title: "Snow-bunting", src: "./img/snow-bunting.jpg" },
    { title: "Snow-leopard", src: "./img/snow-leopard.jpg" },
    { title: "Travel", src: "./img/travel.jpg" },
    { title: "Winter", src: "./img/winter.jpg" }
];


const closeBtn = document.getElementById("closeBtn");
const closeIcon = document.getElementById("closeIcon");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const prevArrow = document.getElementById("prevArrow");
const nextArrow = document.getElementById("nextArrow");


let currentImage = 0;
let lastActiveElement = null;


function renderGallery() {
    const gallery = document.getElementById("gallery");
    gallery.innerHTML = "";

    images.forEach((image, index) => {
        gallery.innerHTML += `
            <button class="gallery-item-btn" onclick="openOverlay(${index})" aria-label="View larger version of ${image.title}">
                <img src="${image.src}" alt="${image.title}" loading="lazy">
            </button>
        `;
    });
}

renderGallery();


function openOverlay(index) {
    lastActiveElement = document.activeElement; 
    currentImage = index;

    const overlay = document.getElementById("overlay");
    overlay.classList.remove("d-none");
    overlay.setAttribute("aria-hidden", "false");
    document.body.classList.add("no-scroll");

    updateOverlay();

    setTimeout(() => {
        document.getElementById("closeBtn").focus();
    }, 50);
}


function closeOverlay() {
    const overlay = document.getElementById("overlay");
    overlay.classList.add("d-none");
    overlay.setAttribute("aria-hidden", "true");
    document.body.classList.remove("no-scroll");

    if (lastActiveElement) {
        lastActiveElement.focus();
    }
}


function updateOverlay() {
    const imgEl = document.getElementById("overlayImage");
    imgEl.src = images[currentImage].src;
    imgEl.alt = "Expanded display view of: " + images[currentImage].title;

    document.getElementById("imageTitle").innerText = images[currentImage].title;
    document.getElementById("counter").innerText = `Image ${currentImage + 1} of ${images.length}`;
}


function nextImage() {
    currentImage++;
    if (currentImage >= images.length) {
        currentImage = 0;
    }
    updateOverlay();
}


function previousImage() {
    currentImage--;
    if (currentImage < 0) {
        currentImage = images.length - 1;
    }
    updateOverlay();
}


document.addEventListener("keydown", function(event){
    const overlay = document.getElementById("overlay");
    
    if(overlay.classList.contains("d-none")) return;

    if(event.key === "ArrowRight") nextImage();
    if(event.key === "ArrowLeft") previousImage();
    if(event.key === "Escape") closeOverlay();

    if (event.key === "Tab") {
        const focusableElements = overlay.querySelectorAll('button:not([disabled])');
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (event.shiftKey) { 

            if (document.activeElement === firstElement) {
                lastElement.focus();
                event.preventDefault();
            }
        } else { 

            if (document.activeElement === lastElement) {
                firstElement.focus();
                event.preventDefault();
            }
        }
    }
});


document.getElementById("overlay").addEventListener("click", function(event){
    if(event.target === this){
        closeOverlay();
    }
});


closeBtn.addEventListener("mouseenter", () => closeIcon.src = "./img/close-hover.png");
closeBtn.addEventListener("mouseleave", () => closeIcon.src = "./img/close.png");
closeBtn.addEventListener("mousedown", () => closeIcon.src = "./img/close-press.png");
closeBtn.addEventListener("mouseup", () => closeIcon.src = "./img/close-hover.png");

function addArrowEffects(buttonEl, arrowEl) {
    buttonEl.addEventListener("mouseenter", () => arrowEl.src = "./img/arrow-hover.png");
    buttonEl.addEventListener("mouseleave", () => arrowEl.src = "./img/arrow.png");
    buttonEl.addEventListener("mouseup", () => arrowEl.src = "./img/arrow-hover.png");
}
addArrowEffects(prevBtn, prevArrow);
addArrowEffects(nextBtn, nextArrow);
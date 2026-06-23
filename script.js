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


function changeImage(direction) {
    currentImage += direction;

    
    if (currentImage >= images.length) {
        currentImage = 0;
    }
    
    else if (currentImage < 0) {
        currentImage = images.length - 1;
    }

    updateOverlay();
}

function handleKeyDown(event) {
    const overlay = document.getElementById("overlay");
    if (overlay.classList.contains("d-none")) return;

    if (event.key === "ArrowRight") changeImage(1);
    if (event.key === "ArrowLeft") changeImage(-1);
    if (event.key === "Escape") closeOverlay();

    if (event.key === "Tab") {
        const focusable = overlay.querySelectorAll('button:not([disabled])');
        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (event.shiftKey && document.activeElement === first) {
            last.focus();
            event.preventDefault();
        } else if (!event.shiftKey && document.activeElement === last) {
            first.focus();
            event.preventDefault();
        }
    }
}

document.addEventListener("keydown", handleKeyDown);


document.getElementById("overlay").addEventListener("click", function(event){
    if(event.target === this){
        closeOverlay();
    }
});


function addIconEffects(buttonEl, iconEl, baseName) {
    if (!buttonEl || !iconEl) return;

    buttonEl.addEventListener("mouseenter", () => iconEl.src = `./img/${baseName}-hover.png`);
    buttonEl.addEventListener("mouseleave", () => iconEl.src = `./img/${baseName}.png`);
    buttonEl.addEventListener("mousedown", () => iconEl.src = `./img/${baseName}-press.png`);
    buttonEl.addEventListener("mouseup", () => iconEl.src = `./img/${baseName}-hover.png`);
}

addIconEffects(closeBtn, closeIcon, "close");


function addArrowEffects(buttonEl, arrowEl) {
    buttonEl.addEventListener("mouseenter", () => arrowEl.src = "./img/arrow-hover.png");
    buttonEl.addEventListener("mouseleave", () => arrowEl.src = "./img/arrow.png");
    buttonEl.addEventListener("mouseup", () => arrowEl.src = "./img/arrow-hover.png");
}
addArrowEffects(prevBtn, prevArrow);
addArrowEffects(nextBtn, nextArrow);
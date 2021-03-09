const interval = setInterval(fade, 100);
var matrix = document.getElementById("matrix-title");
var about = document.getElementById("about-title");
var patients = document.getElementById("patients-title");
var clinicians = document.getElementById("clinicians-title");
var pags = document.getElementById("pag-title");
var researchers = document.getElementById("researchers-title");
var clients = document.getElementById("clients-title");
var contact = document.getElementById("contact-title");

var aboutContent = document.getElementById("about-title-reveal");
var patientContent = document.getElementById("patient-title-reveal");
var cliniciansContent = document.getElementById("clinicians-title-reveal");
var pagContent = document.getElementById("pag-title-reveal");
var researchersContent = document.getElementById("researchers-title-reveal");
var clientsContent = document.getElementById("clients-title-reveal");
var contactContent = document.getElementById("contact-title-reveal");

var titles = [matrix, about, patients, clinicians, pags, researchers, clients, contact];
var content = [0, 
    getPosition(aboutContent), 
    getPosition(patientContent), 
    getPosition(cliniciansContent), 
    getPosition(pagContent),
    getPosition(researchersContent),
    getPosition(clientsContent),
    getPosition(contactContent)];

var currentIndex = 0;
var currentTitleIndex = 0;
var lastPosition = 0;
var upper = 0;
var lower = content[currentIndex + 1];
var delta = 5;
var isAnimating = false;
var query = window.matchMedia("(max-width: 400px)");
var scrollSpeed = 0;

function setScrollSpeed() {
    var currentPosition = document.documentElement.scrollTop;
    scrollSpeed = Math.abs(lastPosition - currentPosition)
    lastPosition = currentPosition
}

function fadeMobile() {
    currentPosition = document.documentElement.scrollTop;
    if(currentPosition > lower + delta && !isAnimating) {
        vanishLeft(titles[currentIndex])
        currentIndex++;
        upper = lower;
        showRight(titles[currentIndex]);
        if (currentIndex + 1 >= content.length) {
            lower = Number.MAX_SAFE_INTEGER;
        } else {
            lower = content[currentIndex + 1]
        }
    } else if (currentPosition < upper - delta && !isAnimating) {
        vanishRight(titles[currentIndex]);
        currentIndex--;
        lower = upper;
        showLeft(titles[currentIndex]);
        upper = content[currentIndex];
    }
}

function fadeDesktop() {
    currentPosition = document.documentElement.scrollTop
    setScrollSpeed()
    if(currentPosition > lower + delta) {
        currentIndex++;
        upper = lower;
        
        if (currentIndex + 1 >= content.length) {
            lower = Number.MAX_SAFE_INTEGER;
        } else {
            lower = content[currentIndex + 1]
        }
    } else if (currentPosition < upper - delta) {
        currentIndex--;
        lower = upper;
        upper = content[currentIndex];
    }
    if(!isAnimating && scrollSpeed < 140) {
        if (currentTitleIndex < currentIndex) {
            vanishUp(titles[currentTitleIndex])
            showUp(titles[currentIndex])
            currentTitleIndex = currentIndex;
            console.log("Scroll " + scrollSpeed)
        console.log("Vanish" + currentTitleIndex)
        console.log("Show " + currentIndex)
        } else if (currentTitleIndex > currentIndex) {
            vanishDown(titles[currentTitleIndex])
            showDown(titles[currentIndex])
            currentTitleIndex = currentIndex;
            console.log("Scroll " + scrollSpeed)
        console.log("Vanish" + currentTitleIndex)
        console.log("Show " + currentIndex)
        }
        
    }
}

function fade() {
    if(query.matches) {
        fadeMobile()
    } else {
        fadeDesktop()
    }
}

function showLeft(element) {
    element.classList.add("animate__fadeInLeft");
    element.classList.remove('hide');
    isAnimating = true;
    element.addEventListener('animationend', handleShowLeft);
}

function handleShowLeft() {
    this.classList.remove("animate__fadeInLeft");
    this.removeEventListener('animationend', handleShowLeft);
    isAnimating = false;
}

function showRight(element) {
    element.classList.add("animate__fadeInRight");
    element.classList.remove('hide');
    isAnimating = true;
    element.addEventListener('animationend', handleShowRight);
}

function handleShowRight() {
    this.classList.remove("animate__fadeInRight");
    this.removeEventListener('animationend', handleShowRight);
    isAnimating = false;
}

function vanishRight(element) {
    element.classList.add("animate__fadeOutRight");
    isAnimating = true;
    element.addEventListener('animationend', handleVanishRight);
}

function handleVanishRight() {
    this.classList.remove("animate__fadeOutRight");
    this.classList.add('hide');
    this.removeEventListener('animationend', handleVanishRight);
    isAnimating = false;
}

function vanishLeft(element) {
    element.classList.add("animate__fadeOutLeft");
    isAnimating = true;
    element.addEventListener('animationend', handleVanishLeft);
}

function handleVanishLeft() {
    this.classList.remove("animate__fadeOutLeft");
    this.classList.add('hide');
    this.removeEventListener('animationend', handleVanishLeft);
    isAnimating = false;
}

function vanishDown(element) {
    element.classList.add("animate__fadeOutDown");
    isAnimating = true;
    element.addEventListener('animationend', handleVanishDown);
}

function handleVanishDown() {
    this.classList.remove("animate__fadeOutDown");
    this.classList.add('hide');
    this.removeEventListener('animationend', handleVanishDown);
    isAnimating = false;
}

function vanishUp(element) {
    element.classList.add("animate__fadeOutUp");
    isAnimating = true;
    element.addEventListener('animationend', handleVanishUp);
}

function handleVanishUp() {
    this.classList.remove("animate__fadeOutUp");
    this.classList.add('hide');
    this.removeEventListener('animationend', handleVanishUp);
    isAnimating = false;
}

function showDown(element) {
    element.classList.remove('hide');
    element.classList.add('animate__fadeInDown');
    isAnimating = true;
    element.addEventListener('animationend', handleShowDown);
}

function handleShowDown() {
    this.classList.remove("animate__fadeInDown");
    this.removeEventListener("animationend", handleShowDown);
    isAnimating = false;
}

function showUp(element) {
    element.classList.remove('hide');
    element.classList.add('animate__fadeInUp');
    isAnimating = true;
    element.addEventListener('animationend', handleShowUp);
}

function handleShowUp() {
    this.classList.remove("animate__fadeInUp");
    this.style.display = null;
    this.removeEventListener("animationend", handleShowUp);
    isAnimating = false;
}

function getPosition( el ) {
    var x = 0;
    var y = 0;
    while( el && !isNaN( el.offsetLeft ) && !isNaN( el.offsetTop ) ) {
    x += el.offsetLeft - el.scrollLeft;
    y += el.offsetTop - el.scrollTop;
    el = el.offsetParent;
    }
    return y;
}



var owl = $('.owl-carousel');
owl.owlCarousel({
    items:3,
    loop:true,
    center: true,
    margin:10,
    autoplay:true,
    autoplayTimeout:1000,
    autoplayHoverPause:true
});
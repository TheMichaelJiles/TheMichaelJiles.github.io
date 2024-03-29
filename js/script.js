const interval = setInterval(fade, 100);
var matrix = document.getElementById("matrix-title");
var patients = document.getElementById("patients-title");
var clinicians = document.getElementById("clinicians-title");
var pags = document.getElementById("pag-title");
var researchers = document.getElementById("researchers-title");
var ourstory = document.getElementById("our-story-title");
var clients = document.getElementById("clients-title");
var contact = document.getElementById("contact-title");

var patientContent = document.getElementById("patient-title-reveal");
var cliniciansContent = document.getElementById("clinicians-title-reveal");
var pagContent = document.getElementById("pag-title-reveal");
var researchersContent = document.getElementById("researchers-title-reveal");
var ourStoryContent = document.getElementById("our-story-title-reveal");
var clientsContent = document.getElementById("clients-title-reveal");
var contactContent = document.getElementById("contact-title-reveal");

var titles = [matrix, patients, clinicians, pags, researchers, ourstory, clients, contact];
var content = [Number.MIN_SAFE_INTEGER, 
    getPosition(patientContent), 
    getPosition(cliniciansContent), 
    getPosition(pagContent),
    getPosition(researchersContent),
    getPosition(ourStoryContent),
    getPosition(clientsContent),
    getPosition(contactContent)];

var currentIndex = 0;
var currentTitleIndex = 0;
var lastPosition = 0;
var upper = content[currentIndex];
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
    if(!isAnimating && scrollSpeed < 140) {
        if (currentTitleIndex < currentIndex) {
            vanishLeft(titles[currentTitleIndex])
            showRight(titles[currentIndex])
            currentTitleIndex = currentIndex;
        } else if (currentTitleIndex > currentIndex) {
            vanishRight(titles[currentTitleIndex])
            showLeft(titles[currentIndex])
            currentTitleIndex = currentIndex;
        }
        
    }
}

function fadeDesktop() {
    if(!isAnimating && scrollSpeed < 140) {
        if (currentTitleIndex < currentIndex) {
            vanishUp(titles[currentTitleIndex])
            showUp(titles[currentIndex])
            currentTitleIndex = currentIndex;
        } else if (currentTitleIndex > currentIndex) {
            vanishDown(titles[currentTitleIndex])
            showDown(titles[currentIndex])
            currentTitleIndex = currentIndex;
        }
        
    }
}

function fade() {
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

//Shows the video player
function showVideoForm() {
    var dimmer = document.getElementById("dimmer");
    var videoContainer = document.getElementById("video-container");
    var videoInfoDialog = document.getElementById("video-info-dialog");
    toggleMobileNav();
    videoInfoDialog.style.display = "flex";
    dimmer.classList.toggle("dimmer");
    videoContainer.style.display = "flex";
    document.body.style.overflowY = "hidden"; 
    document.body.style.position = 'fixed';
}

//Hides the video player
function hideVideoForm() {
  var dimmer = document.getElementById("dimmer");
  var videoContainer = document.getElementById("video-container");
  videoContainer.style.display = "none";
  dimmer.classList.toggle("dimmer");
  document.body.style.overflowY = "visible";
  document.body.style.position = '';
  document.body.style.top = '';
}



var owl = $('.owl-carousel');
owl.owlCarousel({
    items:2,
    loop:true,
    center: true,
    margin:10,
    autoplay:true,
    autoplayTimeout:1000,
    autoplayHoverPause:true,
    responsiveClass: true,
});
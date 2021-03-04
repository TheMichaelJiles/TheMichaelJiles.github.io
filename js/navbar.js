var navbarIsAnimating = false;
var navbar = document.getElementById("navbar");
var lastScrollTop = 0;
var ndelta = 10;

const navinterval = setInterval(setnav, 100);

function setnav() {
    var nowScrollTop = $(this).scrollTop();
    if(Math.abs(lastScrollTop - nowScrollTop) >= ndelta && !navbarIsAnimating){
        if (nowScrollTop > lastScrollTop && !navbar.classList.contains("hide")){
            vanishUpNav(navbar);
        } else if (nowScrollTop < lastScrollTop && navbar.classList.contains("hide")) {
            showDownNav(navbar);
        }
        lastScrollTop = nowScrollTop;
    }
}

function showDownNav(element) {
    navbarIsAnimating = true;
    element.classList.remove('hide');
    element.classList.add('animate__fadeInDown');
    element.addEventListener('animationend', handleShowDownNav);
}

function handleShowDownNav() {
    this.classList.remove("animate__fadeInDown");
    navbarIsAnimating = false;
    this.removeEventListener("animationend", handleShowDownNav);
}

function vanishUpNav(element) {
    navbarIsAnimating = true;
    element.classList.add("animate__fadeOutUp");
    element.addEventListener('animationend', handleVanishUpNav);
}

function handleVanishUpNav() {
    this.classList.remove("animate__fadeOutUp");
    this.classList.add('hide');
    navbarIsAnimating = false;
    this.removeEventListener('animationend', handleVanishUpNav);
}
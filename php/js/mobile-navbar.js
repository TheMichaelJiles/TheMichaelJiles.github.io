
var mobileNav = document.getElementById("mobile-nav")
var mobileNavButton = document.getElementById("mobile-nav-button") 

function toggleMobileNav() {
    mobileNav.classList.toggle("hide-mobile-nav");
    mobileNav.classList.toggle("mobile-nav");
    mobileNavButton.classList.toggle("open-button");
}

const albumModule = {
    swiper: null,
    handleLinkClick: function() {
        const navMenu = document.getElementById("nav-menu");
    
        navMenu.classList.remove("show-menu");
    },
    handleHeaderScroll: function() {
        const header = document.getElementById("header");
        const fishLogo = document.querySelector(".nav__logo-fish");

        if (scrollY >= 100) header.classList.add("scroll-header");
        else header.classList.remove("scroll-header");
        if (scrollY >= 100) fishLogo.classList.add("nav__logo-fish-rotate");
        else fishLogo.classList.remove("nav__logo-fish-rotate");
    }
}

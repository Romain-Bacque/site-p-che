const headerModule = {
    handleTheme: function() {
        const themeButton = document.getElementById("theme-button"),
            darkTheme = "dark-theme",
            iconTheme = "ri-sun-line";

        document.body.classList.toggle(darkTheme);
        themeButton.classList.toggle(iconTheme);
        
        localStorage.setItem("selected-theme", getCurrentTheme());
        localStorage.setItem("selected-icon", getCurrentIcon());
    },
    getCurrentTheme: function() {
        return document.body.classList.contains(darkTheme) ? "dark" : "light";
    },
    getCurrentIcon: function() {
        return themeButton.classList.contains(iconTheme) ? "ri-moon-line" : "ri-sun-line";
    },
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

module.exports = headerModule;
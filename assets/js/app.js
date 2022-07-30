
const appModule = {
  loaderDOM: document.getElementById('loader__dom'),
  init: function() {
    appModule.handlePageLoader(1);
    appModule.initTheme();
    albumModule.initAlbum();
    appModule.initIntersectionObserver();
    appModule.addEventActions();
  },
  handlePageLoader: function(opacity) {
      if(opacity <= 0) {
        headerModule.handleHeaderScroll();
        appModule.loaderDOM.style.display = "none";  
      } else {
        appModule.loaderDOM.style.opacity = opacity;
        window.setTimeout(() => {
          appModule.handlePageLoader(opacity - 0.05);
        }, 50);
      }
  },
  initTheme: function() {
    const darkTheme = "dark-theme",
      iconTheme = "ri-sun-line",
      selectedTheme = localStorage.getItem("selected-theme"),
      selectedIcon = localStorage.getItem("selected-icon");

    
    if (selectedTheme) {
      document.body.classList[selectedTheme === "dark" ? "add" : "remove"](
        darkTheme
      );
      themeButton.classList[selectedIcon === "ri-moon-line" ? "add" : "remove"](
        iconTheme
      );
    }
  },
  initIntersectionObserver: function() {
    const options = {
      root: null,
      rootMargin: "-10% 0px",
      treshold: 0,
    };
    
    const handleIntersect = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.remove("reveal");
        } else entry.target.classList.add("reveal");
      });
    };
    
    const observer = new IntersectionObserver(handleIntersect, options);
    
    document.querySelectorAll(".reveal, .reveal-box").forEach(reveal => {
      observer.observe(reveal);
    });
  },
  addEventActions: function() {
    const navMenu = document.getElementById("nav-menu"),
        navToggle = document.getElementById("nav-toggle"),
        navClose = document.getElementById("nav-close"),
        navLink = document.querySelectorAll(".nav__link"),
        themeButton = document.getElementById("theme-button"),
        marker = document.getElementById("marker"),
        lieuxBanniere = document.querySelector(".lieux__bannière"),
        panelTitles = document.querySelectorAll(".panneau__text"),
        shelterContainer = document.querySelector(".gîtes__container"),
        formButton = document.querySelectorAll(".form__button"),
        form = document.getElementById("form"),
        inputs = document.querySelectorAll("input, textarea"),
        videoButton = document.getElementById("video-button"),
        videoFile = document.getElementById("video-file");

    window.addEventListener("scroll", _ => {
      appModule.handleSomeElementsDisplay;
      appModule.handleScrollUpButton();
      appModule.handleActiveNavLink();
      headerModule.handleHeaderScroll();
    });
    navToggle.addEventListener("click", _ => navMenu.classList.add("show-menu"));  
    navClose.addEventListener("click", _ => navMenu.classList.remove("show-menu"));
    navLink.forEach(link => link.addEventListener("click", headerModule.handleLinkClick));
    themeButton.addEventListener("click", _ => headerModule.handleTheme);
    marker.addEventListener("click", _ => placesModule.handleDescriptionDisplay.bind(null, 0));
    lieuxBanniere.addEventListener("click", _ => placesModule.handleDescriptionDisplay.bind(null, 1));       
    panelTitles[0].addEventListener("click", _ => sheltersModule.handlePicturesDisplay.bind(null, 0));
    panelTitles[1].addEventListener("click", _ => sheltersModule.handlePicturesDisplay.bind(null, 1));
    shelterContainer.addEventListener("click", _ => sheltersModule.handlePicturesDisplay.bind(null, 2));
    formButton[0].addEventListener("click", _ => giftModule.handleDisplayForm.bind(null, 0));
    formButton[1].addEventListener("click", _ => giftModule.handleDisplayForm.bind(null, 1));
    form.addEventListener("submit", giftModule.handleFormSubmit);
    inputs.forEach(input => input.addEventListener("input", _ => giftModule.handleInputChange(input)));
    videoButton.addEventListener("click", albumModule.handleVideo);
    videoFile.addEventListener("ended", albumModule.handleVideoEnding);
  },
  handleScrollUpButton: function() {
    const scrollUp = document.getElementById("scroll-up");
    
    if (this.scrollY >= 560) scrollUp.classList.add("show-scroll");
    else scrollUp.classList.remove("show-scroll");
  },
  handleActiveNavLink: function() {
    const sections = document.querySelectorAll("section[id]"),
        scrollY = window.pageYOffset;

    sections.forEach((section) => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 50;

      sectionId = section.getAttribute("id");
      
      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        document
          .querySelector(`.nav__menu a[href*="${sectionId}"]`)
          .classList.add("active-link");
      } else {
        document
          .querySelector(`.nav__menu a[href*="${sectionId}"]`)
          .classList.remove("active-link");
      }
    });
  },
  handleSomeElementsDisplay: function() {
    const shelterAndGifSections = document.querySelectorAll("#cadeau, #gîtes");

    if (
      window.scrollY < shelterAndGifSections[1].offsetTop - 600 ||
      window.scrollY > shelterAndGifSections[1].offsetHeight + shelterAndGifSections[1].offsetTop
    ) {
      sheltersModule.hideShelters();
    }
    if (
      window.scrollY < shelterAndGifSections[0].offsetTop - 600 ||
      window.scrollY > shelterAndGifSections[0].offsetHeight + shelterAndGifSections[0].offsetTop
    ) {
      giftModule.hideForm();
    }
  }
}

window.addEventListener("load", appModule.init);


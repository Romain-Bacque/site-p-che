
const appModule = {
  loaderDOM: document.getElementById('loader__dom'),
  init: function() {
    appModule.loader(1);
    appModule.addEventActions();
    albumModule.albumInit();
  },
  handleLoader: function(opacity) {
      if(opacity <= 0){
        scrollHeader();
        appModule.loaderDOM.style.display = "none";  
      } else {
        appModule.loaderDOM.style.opacity = opacity;
        window.setTimeout(() => {
          appModule.handleLoader(opacity - 0.05);
        }, 50);
      }
  },
  addEventActions: function() {
    const navMenu = document.getElementById("nav-menu"),
        navToggle = document.getElementById("nav-toggle"),
        navClose = document.getElementById("nav-close"),
        navLink = document.querySelectorAll(".nav__link"),
        marker = document.getElementById("marker"),
        lieuxBanniere = document.querySelector(".lieux__bannière"),
        panelTitles = document.querySelectorAll(".panneau__text"),
        shelterContainer = document.querySelector(".gîtes__container"),
        formButton = document.querySelectorAll(".form__button"),
        form = document.getElementById("form"),
        inputs = document.querySelectorAll("input, textarea");
    
    window.addEventListener("scroll", appModule.handleSomeElementsDisplay)
    window.addEventListener("load", _ => appModule.handleLoader(1));
    window.addEventListener("scroll", headerModule.handleHeaderScroll);
    navToggle.addEventListener("click", _ => navMenu.classList.add("show-menu"));  
    navClose.addEventListener("click", _ => navMenu.classList.remove("show-menu"));
    navLink.forEach(link => link.addEventListener("click", headerModule.handleLinkClick));
    marker.addEventListener("click", _ => placesModule.handleDescriptionDisplay.bind(null, 0));
    lieuxBanniere.addEventListener("click", _ => placesModule.handleDescriptionDisplay.bind(null, 1));       
    panelTitles[0].addEventListener("click", _ => sheltersModule.handlePicturesDisplay.bind(null, 0));
    panelTitles[1].addEventListener("click", _ => sheltersModule.handlePicturesDisplay.bind(null, 1));
    shelterContainer.addEventListener("click", _ => sheltersModule.handlePicturesDisplay.bind(null, 2));
    formButton[0].addEventListener("click", _ => giftModule.handleDisplayForm.bind(null, 0));
    formButton[1].addEventListener("click", _ => giftModule.handleDisplayForm.bind(null, 1));
    form.addEventListener("submit", giftModule.handleFormSubmit);
    inputs.forEach(input => input.addEventListener("input", _ => giftModule.handleInputChange(input)));
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
  },
  albumInit: function() {
    const cards = document.querySelectorAll(".album__card");

    cards.forEach((card) => {
    const cardLinks = card.querySelectorAll("a");
    
    card.querySelector(".album__description").innerText = `${cardLinks.length} photos`;
    });

    albumModule.swiper = new Swiper(".album__container", {
        effect: "coverflow",
        grabCursor: true,
        centeredSlides: true,
        slidesPerView: "auto",
        loop: true,
        spaceBetween: 32,
        coverflowEffect: {
            rotate: 0,
        },
    });
  }
}

window.addEventListener("load", appModule.init);


/*==================== ALBUM ====================*/


/*==================== VIDEO ====================*/
const videoFile = document.getElementById("video-file"),
    videoButton = document.getElementById("video-button"),
    videoIcon = document.getElementById("video-icon");

function playPause() {
  if (videoFile.paused) {
    videoFile.play();
    videoIcon.classList.add("ri-pause-line");
    videoIcon.classList.remove("ri-play-line");
  } else {
    videoFile.pause();
    videoIcon.classList.remove("ri-pause-line");
    videoIcon.classList.add("ri-play-line");
  }
}

videoButton.addEventListener("click", playPause);

const finalVideo = () => {
  videoIcon.classList.remove("ri-pause-line");
  videoIcon.classList.add("ri-play-line");
};

videoFile.addEventListener("ended", finalVideo);

/*==================== SHOW SCROLL TOP ====================*/
function scrollUp() {
  const scrollUp = document.getElementById("scroll-up");
  // When the scroll is higher than 560 viewport height, add the show-scroll class to the a tag with the scroll-top class
  if (this.scrollY >= 560) scrollUp.classList.add("show-scroll");
  else scrollUp.classList.remove("show-scroll");
}
window.addEventListener("scroll", scrollUp);

/*==================== SCROLL SECTIONS ACTIVE LINK ====================*/
const sections = document.querySelectorAll("section[id]");

function scrollActive() {
  const scrollY = window.pageYOffset;

  sections.forEach((current) => {
    const sectionHeight = current.offsetHeight;
    const sectionTop = current.offsetTop - 50;
    sectionId = current.getAttribute("id");

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      document
        .querySelector(".nav__menu a[href*=" + sectionId + "]")
        .classList.add("active-link");
    } else {
      document
        .querySelector(".nav__menu a[href*=" + sectionId + "]")
        .classList.remove("active-link");
    }
  });
}

window.addEventListener("scroll", scrollActive);

/*==================== DARK LIGHT THEME ====================*/
const themeButton = document.getElementById("theme-button");
const darkTheme = "dark-theme";
const iconTheme = "ri-sun-line";

// Previously selected topic (if user selected)
const selectedTheme = localStorage.getItem("selected-theme");
const selectedIcon = localStorage.getItem("selected-icon");

// We obtain the current theme that the interface has by validating the dark-theme class
const getCurrentTheme = () => document.body.classList.contains(darkTheme) ? "dark" : "light";
const getCurrentIcon = () => themeButton.classList.contains(iconTheme) ? "ri-moon-line" : "ri-sun-line";

// We validate if the user previously chose a topic
if (selectedTheme) {
  // If the validation is fulfilled, we ask what the issue was to know if we activated or deactivated the dark
  document.body.classList[selectedTheme === "dark" ? "add" : "remove"](
    darkTheme
  );
  themeButton.classList[selectedIcon === "ri-moon-line" ? "add" : "remove"](
    iconTheme
  );
}

// Activate / deactivate the theme manually with the button
themeButton.addEventListener("click", () => {
  // Add or remove the dark / icon theme
  document.body.classList.toggle(darkTheme);
  themeButton.classList.toggle(iconTheme);
  // We save the theme and the current icon that the user chose
  localStorage.setItem("selected-theme", getCurrentTheme());
  localStorage.setItem("selected-icon", getCurrentIcon());
});

// scroll reveal animation
const options = {
  root: null,
  rootMargin: "-10% 0px",
  treshold: 0, //0% de l'élément à reveler doit être visible
};

const handleIntersect = function (entries, observer) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      //intersectionRatio permet de savoir le ratio de l'élément visible (le pourcentage), ex: 0.12656554262.
      entry.target.classList.remove("reveal");
    } else entry.target.classList.add("reveal");
  });
};

const observer = new IntersectionObserver(handleIntersect, options);

document.querySelectorAll(".reveal, .reveal-box").forEach(function (r) {
  observer.observe(r);
});

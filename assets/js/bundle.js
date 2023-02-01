(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
const albumModule = {
  videoFile: document.getElementById("video-file"),
  videoIcon: document.getElementById("video-icon"),
  initAlbum: function () {
    const cards = document.querySelectorAll(".album__card");

    cards.forEach((card) => {
      const cardLinks = card.querySelectorAll("a");

      card.querySelector(
        ".album__description"
      ).innerText = `${cardLinks.length} photos`;
    });

    new Swiper(".album__container", {
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
  },
  handleVideo: function () {
    if (albumModule.videoFile.paused) {
      albumModule.videoFile.play();
      albumModule.videoIcon.classList.add("ri-pause-line");
      albumModule.videoIcon.classList.remove("ri-play-line");
    } else {
      albumModule.videoFile.pause();
      albumModule.videoIcon.classList.remove("ri-pause-line");
      albumModule.videoIcon.classList.add("ri-play-line");
    }
  },
  handleVideoEnding: function () {
    albumModule.videoIcon.classList.remove("ri-pause-line");
    albumModule.videoIcon.classList.add("ri-play-line");
  },
};

module.exports = albumModule;

},{}],2:[function(require,module,exports){
const albumModule = require("./album");
const giftModule = require("./gift");
const headerModule = require("./header");
const placesModule = require("./places");
const sheltersModule = require("./shelters");
const utilsModule = require("./utils");

const appModule = {
  loaderDOM: document.getElementById("loader-dom"),
  init: function () {
    appModule.initTheme();
    albumModule.initAlbum();
    appModule.initIntersectionObserver();
    appModule.initEmailjs();
    appModule.addEventActions();
  },
  initDOMLoader: function (opacity) {
    if (opacity <= 0) {
      headerModule.handleHeaderScroll();
      appModule.loaderDOM.style.display = "none";
    } else {
      appModule.loaderDOM.style.opacity = opacity;
      window.setTimeout(() => {
        appModule.initDOMLoader(opacity - 0.05);
      }, 50);
    }
  },
  initTheme: function () {
    const darkTheme = "dark-theme",
      iconTheme = "ri-sun-line",
      selectedTheme = localStorage.getItem("selected-theme"),
      selectedIcon = localStorage.getItem("selected-icon"),
      themeButton = document.getElementById("theme-button");

    if (selectedTheme) {
      document.body.classList[selectedTheme === "dark" ? "add" : "remove"](
        darkTheme
      );
      themeButton.classList[selectedIcon === "ri-moon-line" ? "add" : "remove"](
        iconTheme
      );
    }
  },
  initIntersectionObserver: function () {
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

    document.querySelectorAll(".reveal, .reveal-box").forEach((reveal) => {
      observer.observe(reveal);
    });
  },
  initEmailjs: function () {
    emailjs.init(utilsModule.emailjs_user);
  },
  addEventActions: function () {
    window.addEventListener("load", () => appModule.initDOMLoader(1));

    window.addEventListener("scroll", () => {
      appModule.handleSomeElementsDisplay();
      appModule.handleScrollUpButton();
      appModule.handleActiveNavLink();
      headerModule.handleHeaderScroll();
    });

    const navToggle = document.getElementById("nav-toggle");
    navToggle.addEventListener("click", () =>
      document.getElementById("nav-menu").classList.add("show-menu")
    );

    const navClose = document.getElementById("nav-close");
    navClose.addEventListener("click", () =>
      document.getElementById("nav-menu").classList.remove("show-menu")
    );

    const navLink = document.querySelectorAll(".nav__link");
    navLink.forEach((link) =>
      link.addEventListener("click", headerModule.handleLinkClick)
    );

    const themeButton = document.getElementById("theme-button");
    themeButton.addEventListener("click", headerModule.handleTheme);

    const marker = document.getElementById("marker");
    marker.addEventListener(
      "click",
      placesModule.handleDescriptionDisplay.bind(null, 0)
    );

    const placesBanniere = document.querySelector(".places__banner");
    placesBanniere.addEventListener(
      "click",
      placesModule.handleDescriptionDisplay.bind(null, 1)
    );

    const panelTitles = document.querySelectorAll(".sign__text");
    panelTitles[0].addEventListener(
      "click",
      sheltersModule.handlePicturesDisplay.bind(null, 0)
    );
    panelTitles[1].addEventListener(
      "click",
      sheltersModule.handlePicturesDisplay.bind(null, 1)
    );

    const shelterContainer = document.querySelector(".cottages__container");
    shelterContainer.addEventListener(
      "click",
      sheltersModule.handlePicturesDisplay.bind(null, 2)
    );

    const formButton = document.querySelectorAll(".form__button");
    formButton[0].addEventListener(
      "click",
      giftModule.handleDisplayForm.bind(null, 0)
    );
    formButton[1].addEventListener(
      "click",
      giftModule.handleDisplayForm.bind(null, 1)
    );

    const form = document.getElementById("form");
    form.addEventListener("submit", giftModule.handleFormSubmit);

    const inputs = document.querySelectorAll("input, textarea");
    inputs.forEach((input) =>
      input.addEventListener("input", () => giftModule.handleInputChange(input))
    );

    const videoButton = document.getElementById("video-button");
    videoButton.addEventListener("click", albumModule.handleVideo);

    const videoFile = document.getElementById("video-file");
    videoFile.addEventListener("ended", albumModule.handleVideoEnding);
  },
  handleScrollUpButton: function () {
    const scrollUp = document.getElementById("scroll-up");

    if (window.scrollY >= 560) scrollUp.classList.add("show-scroll");
    else scrollUp.classList.remove("show-scroll");
  },
  handleActiveNavLink: function () {
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
  handleSomeElementsDisplay: function () {
    const shelterAndGifSections = document.querySelectorAll("#gift, #cottages");

    if (
      window.scrollY < shelterAndGifSections[1].offsetTop - 600 ||
      window.scrollY >
        shelterAndGifSections[1].offsetHeight +
          shelterAndGifSections[1].offsetTop
    ) {
      sheltersModule.hideShelters();
    }
    if (
      window.scrollY < shelterAndGifSections[0].offsetTop - 600 ||
      window.scrollY >
        shelterAndGifSections[0].offsetHeight +
          shelterAndGifSections[0].offsetTop
    ) {
      giftModule.hideForm();
    }
  },
};

window.addEventListener("DOMContentLoaded", appModule.init);

},{"./album":1,"./gift":3,"./header":4,"./places":5,"./shelters":6,"./utils":7}],3:[function(require,module,exports){
const utilsModule = require("./utils");

const giftModule = {
  formContainer: document.getElementById("container__form"),
  firstName: document.getElementById("user__firstname"),
  lastName: document.getElementById("user__lastname"),
  email: document.getElementById("user__email"),
  tel: document.getElementById("user__tel"),
  // fromDateValue = fromDate.value.trim(),
  // toDateValue = toDate.value.trim(),
  msg: document.getElementById("msg"),
  loader: document.getElementById("loader"),
  inputs: document.querySelectorAll("input, textarea"),
  handleFormSubmit: function (event) {
    event.preventDefault();

    giftModule.checkInputs();
  },
  handleDisplayForm: function (value) {
    if (value === 0) {
      giftModule.hideForm();
    } else if (value === 1) {
      giftModule.showForm();
    }
  },
  handleInputChange: function (input) {
    if (!input.value) input.parentElement.className = "form__control";
  },
  handleMinAndMaxDate: function (event) {
    const form = document.getElementById("form");

    event.target.setAttribute("min", giftModule.getLimitDate(0));
    event.target.setAttribute("max", giftModule.getLimitDate(2));
    form.elements.todate.setAttribute("min", form.elements.fromdate.value);
    form.elements.todate.value < form.elements.fromdate.value
      ? (form.elements.todate.value = form.elements.fromdate.value)
      : "";
  },
  getLimitDate: function (value) {
    const today = new Date();
    const day = today.getDate();
    const month = today.getMonth() + 1;
    const year = today.getFullYear() + value;

    if (day < 10) {
      day = "0" + day;
    }
    if (month < 10) {
      month = "0" + month;
    }

    return year + "-" + month + "-" + day;
  },
  hideForm: function () {
    giftModule.clearInputsText();
    giftModule.formContainer.style.display = "none";
    giftModule.formContainer.classList.remove("container__form");
  },
  showForm: function () {
    const dates = document.querySelectorAll(".timepicker");

    giftModule.formContainer.style.display = "flex";
    giftModule.formContainer.classList.add("container__form");

    for (date of dates) {
      date.addEventListener("click", giftModule.handleMinAndMaxDate);
      date.addEventListener("input", giftModule.handleMinAndMaxDate);
    }
  },
  checkInputs: function () {
    const firstNameValue = giftModule.firstName.value.trim(),
      lastNameValue = giftModule.lastName.value.trim(),
      emailValue = giftModule.email.value.trim(),
      telValue = giftModule.tel.value.trim(),
      // fromDate: fromDate.value,
      // toDate: toDate.value,
      emptyField = "Le champs ne doit pas être vide";

    if (!firstNameValue) {
      giftModule.setErrorFor(giftModule.firstName, emptyField);
    } else {
      giftModule.setSuccessFor(giftModule.firstName);
    }

    if (!lastNameValue) {
      giftModule.setErrorFor(giftModule.lastName, emptyField);
    } else {
      giftModule.setSuccessFor(giftModule.lastName);
    }

    if (!emailValue) {
      giftModule.setErrorFor(giftModule.email, emptyField);
    } else {
      giftModule.setSuccessFor(giftModule.email);
    }

    if (!telValue) {
      giftModule.setErrorFor(giftModule.tel, emptyField);
    } else {
      giftModule.setSuccessFor(giftModule.tel);
    }

    // if(!fromDateValue) {
    //    setErrorFor(fromDate, emptyField);
    // } else {
    //    setSuccessFor(fromDate);
    // }

    // if(!toDateValue) {
    //    setErrorFor(toDate, emptyField);
    // } else {
    //    setSuccessFor(toDate);
    // }
  },
  setErrorFor: function (input, message) {
    const formControl = input.parentElement;
    const small = formControl.querySelector("small");

    small.innerText = message;
    formControl.className = "form__control error";
  },
  setSuccessFor: function (input) {
    const formControl = input.parentElement;

    formControl.className = "form__control success";
    giftModule.sendEmail();
  },
  sendEmail: async function () {
    giftModule.loader.style.display = "flex";
    const mailData = {
      firstName: giftModule.firstName.value,
      lastName: giftModule.lastName.value,
      email: giftModule.email.value,
      tel: giftModule.tel.value,
      msg: giftModule.msg.value,
    };

    try {
      await utilsModule.sendMail(mailData);

      giftModule.loader.style.display = "none";
      giftModule.makeSuccessModal();
      giftModule.clearInputsText();

      console.log("SUCCESS!");
    } catch (err) {
      giftModule.loader.style.display = "none";
      giftModule.makeErrorModal();

      console.log("FAILED...", err);
    }
  },
  makeSuccessModal: function () {
    swal({
      title: "Demande Envoyée avec succès !",
      text: "Selon mes disponibilités, je la confirmerai par mail.",
      icon: "success",
      button: "OK",
    });
  },
  makeErrorModal: function () {
    swal({
      title: "Oups...",
      text: "Echec de l'envoi de la demande",
      icon: "error",
      button: "OK",
    });
  },
  clearInputsText: function () {
    giftModule.inputs.forEach((input) => {
      input.value = "";
      input.parentElement.className = "form__control";
    });
  },
};

module.exports = giftModule;

},{"./utils":7}],4:[function(require,module,exports){
const headerModule = {
  themeButton: document.getElementById("theme-button"),
  handleTheme: function () {
    const darkTheme = "dark-theme",
      iconTheme = "ri-sun-line";

    document.body.classList.toggle(darkTheme);
    headerModule.themeButton.classList.toggle(iconTheme);

    localStorage.setItem("selected-theme", getCurrentTheme());
    localStorage.setItem("selected-icon", getCurrentIcon());
  },
  getCurrentTheme: function () {
    return document.body.classList.contains(darkTheme) ? "dark" : "light";
  },
  getCurrentIcon: function () {
    return headerModule.themeButton.classList.contains(iconTheme)
      ? "ri-moon-line"
      : "ri-sun-line";
  },
  handleLinkClick: function () {
    const navMenu = document.getElementById("nav-menu");

    navMenu.classList.remove("show-menu");
  },
  handleHeaderScroll: function () {
    const header = document.getElementById("header");
    const fishLogo = document.querySelector(".nav__logo-fish");

    if (scrollY >= 100) header.classList.add("scroll-header");
    else header.classList.remove("scroll-header");
    if (scrollY >= 100) fishLogo.classList.add("nav__logo-fish-rotate");
    else fishLogo.classList.remove("nav__logo-fish-rotate");
  },
};

module.exports = headerModule;

},{}],5:[function(require,module,exports){
const placesModule = {
  handleDescriptionDisplay: function (value, event) {
    event.stopPropagation();

    if (value === 0) {
      document
        .getElementById("places__description")
        .classList.toggle("description");
    } else if (value === 1) {
      document
        .getElementById("places__description")
        .classList.remove("description");
    }
  },
};

module.exports = placesModule;

},{}],6:[function(require,module,exports){
const sheltersModule = {
  shelterPictures: document.querySelectorAll(".cottage"),
  handlePicturesDisplay: function (value, event) {
    event.stopPropagation();

    switch (value) {
      case 0:
        sheltersModule.toggleShelter1();
        break;

      case 1:
        sheltersModule.toggleShelter2();
        break;

      case 2:
        sheltersModule.hideShelters();
        break;

      default:
        console.log(`Sorry, we are out of ${value}.`);
    }
  },
  toggleShelter1: function () {
    sheltersModule.shelterPictures[1].classList.toggle("cottage--2");
    sheltersModule.shelterPictures[0].classList.remove("cottage--1");
  },
  toggleShelter2: function () {
    sheltersModule.shelterPictures[0].classList.toggle("cottage--1");
    sheltersModule.shelterPictures[1].classList.remove("cottage--2");
  },
  hideShelters: function () {
    sheltersModule.shelterPictures[0].classList.remove("cottage--1");
    sheltersModule.shelterPictures[1].classList.remove("cottage--2");
  },
};

module.exports = sheltersModule;

},{}],7:[function(require,module,exports){
const utilsModule = {
  emailjs_user: "user_I1HWuX9oE076hNrKEuHTK",
  emailjs_service: "service_ruzv3v1",
  emailjs_template: "template_y6oarwo",
  sendMail(data) {
    emailjs.send(utilsModule.emailjs_service, utilsModule.emailjs_template, {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      tel: data.tel,
      msg: data.msg ? data.msg : "Aucune information complémentaire.",
    });
  },
};

module.exports = utilsModule;

},{}]},{},[2]);

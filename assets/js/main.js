const navMenu = document.getElementById("nav-menu"),
  navToggle = document.getElementById("nav-toggle"),
  navClose = document.getElementById("nav-close");

if (navToggle) {
  navToggle.addEventListener("click", () => {
    navMenu.classList.add("show-menu");
  });
}

if (navClose) {
  navClose.addEventListener("click", () => {
    navMenu.classList.remove("show-menu");
  });
}

/*==================== REMOVE MENU MOBILE ====================*/
const navLink = document.querySelectorAll(".nav__link");

function linkAction() {
  const navMenu = document.getElementById("nav-menu");
  // When we click on each nav__link, we remove the show-menu class
  navMenu.classList.remove("show-menu");
}
navLink.forEach((n) => n.addEventListener("click", linkAction));

/*==================== CHANGE BACKGROUND HEADER ====================*/
function scrollHeader() {
  const header = document.getElementById("header");
  const fishLogo = document.querySelector(".nav__logo-fish");
  // When the scroll is greater than 100 viewport height, add the scroll-header class to the header tag
  if (scrollY >= 100) header.classList.add("scroll-header");
  else header.classList.remove("scroll-header");
  if (scrollY >= 100) fishLogo.classList.add("nav__logo-fish-rotate");
  else fishLogo.classList.remove("nav__logo-fish-rotate");
}
window.addEventListener("scroll", scrollHeader);

/*==================== ALBUM COUNT ====================*/
var count = document.querySelectorAll(".album__card");

count.forEach((i) => {
  var total = i.querySelectorAll("a");
  i.querySelector(".album__description").innerText =
    total.length + " " + "photos";
});

/*==================== SWIPER DISCOVER ====================*/
var swiper = new Swiper(".album__container", {
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

/*==================== LIEUX ====================*/
var elt1 = document.getElementById("marker");
var elt2 = document.querySelector(".lieux__bannière");

elt1.addEventListener("click", function (e) {
  e.stopPropagation();
  animate1(0);
});
elt2.addEventListener("click", function (e) {
  e.stopPropagation();
  animate1(1);
});

function animate1(value) {
  switch (value) {
    case 0:
      document.getElementById("description").classList.toggle("description");

      break;

    case 1:
      document.getElementById("description").classList.remove("description");

    default:
      console.log(`Sorry, we are out of ${value}.`);
  }
}

/*==================== GÎTES ====================*/
var elt = document.querySelectorAll(".panneau__text");

elt[0].addEventListener("click", function (e) {
  e.stopPropagation();
  animate2(0);
});
elt[1].addEventListener("click", function (e) {
  e.stopPropagation();
  animate2(1);
});
document
  .querySelector(".gîtes__container")
  .addEventListener("click", function (e) {
    e.stopPropagation();
    animate2(2);
  });

function animate2(value) {
  var newClass = document.querySelectorAll(".photo__gîte");

  switch (value) {
    case 0:
      newClass[1].classList.toggle("gîte2");
      newClass[0].classList.remove("gîte1");

      break;

    case 1:
      newClass[0].classList.toggle("gîte1");
      newClass[1].classList.remove("gîte2");

      break;

    case 2:
      newClass[0].classList.remove("gîte1");
      newClass[1].classList.remove("gîte2");

      break;

    default:
      console.log(`Sorry, we are out of ${value}.`);
  }
}

/*==================== CADEAU ====================*/
var elt = document.getElementById("container__form");
var btn = document.querySelectorAll(".form__button");
var inputs = document.querySelectorAll("input, textarea");

//button close formulaire
btn[0].addEventListener("click", function (e) {
  e.preventDefault();
  displayForm(0);
});

//button accès formulaire
btn[1].addEventListener("click", function (e) {
  displayForm(1);
});

//remove element
const sectionsGitesCadeau = document.querySelectorAll("#cadeau, #gîtes");

window.onscroll = () => {
  if (
    this.scrollY < sectionsGitesCadeau[1].offsetTop - 600 ||
    this.scrollY >
      sectionsGitesCadeau[1].offsetHeight + sectionsGitesCadeau[1].offsetTop
  ) {
    animate2(2);
  }
  if (
    this.scrollY < sectionsGitesCadeau[0].offsetTop - 600 ||
    this.scrollY >
      sectionsGitesCadeau[0].offsetHeight + sectionsGitesCadeau[0].offsetTop
  ) {
    displayForm(0);
  }
};

//add Form//
function displayForm(value) {
  switch (value) {
    case 0:
      //remove
      clear();
      elt.style.display = "none";
      elt.classList.remove("container__form");

      break;

    case 1:
      //add
      elt.style.display = "flex";
      elt.classList.add("container__form");

      var dates = document.querySelectorAll(".timepicker");

      for (date of dates) {
        date.addEventListener("click", (e) => {
          setAttribute(e);
        });

        date.addEventListener("input", (e) => {
          setAttribute(e);
        });
      }

      break;

    default:
      console.log(`Sorry, we are out of ${value}.`);
  }
}

//set attribute
const setAttribute = (e) => {
  e.target.setAttribute("min", dateLimit(0));
  e.target.setAttribute("max", dateLimit(2));
  form.elements.todate.setAttribute("min", form.elements.fromdate.value);
  form.elements.todate.value < form.elements.fromdate.value
    ? (form.elements.todate.value = form.elements.fromdate.value)
    : "";
};

//max date
function dateLimit(value) {
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth() + 1; //January is 0!
  var yyyy = today.getFullYear() + value;

  if (dd < 10) {
    dd = "0" + dd;
  }
  if (mm < 10) {
    mm = "0" + mm;
  }

  return yyyy + "-" + mm + "-" + dd;
}

//Form managing
const form = document.getElementById("form");
const firstName = document.getElementById("user__firstname");
const lastName = document.getElementById("user__lastname");
const email = document.getElementById("user__email");
const tel = document.getElementById("user__tel");
// const fromDate = document.getElementById('fromdate');
// const toDate = document.getElementById('todate');
const msg = document.getElementById("msg");
const loader = document.getElementById("loader");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  checkInputs();
});

function sendMail() {
  loader.style.display = "flex";

  emailjs
    .send("service_ruzv3v1", "template_y6oarwo", {
      firstName: firstName.value,
      lastName: lastName.value,
      email: email.value,
      tel: tel.value,
      // fromDate: fromDate.value,
      // toDate: toDate.value,
      msg: msg.value != "" ? msg.value : "aucune information complémentaire.",
    })
    .then(
      function (response) {
        loader.style.display = "none";
        success();
        clear();
        console.log("SUCCESS!", response.status, response.text);
      },
      function (err) {
        loader.style.display = "none";
        error();
        console.log("FAILED...", error);
      }
    );
}

function success() {
  swal({
    title: "Demande Envoyée avec succès !",
    text: "Selon mes disponibilités, je la confirmerai par mail.",
    icon: "success",
    button: "OK",
  });
}

function error() {
  swal({
    title: "Oups...",
    text: "Echec de l'envoi de la demande",
    icon: "error",
    button: "OK",
  });
}

function checkInputs() {
  //get the value from the input
  const firstNameValue = firstName.value.trim();
  const lastNameValue = lastName.value.trim();
  const emailValue = email.value.trim();
  const telValue = tel.value.trim();
  // const fromDateValue = fromDate.value.trim();
  // const toDateValue = toDate.value.trim();
  const champsVide = "Le Champs ne doit pas être vide";

  if (firstNameValue === "") {
    setErrorFor(firstName, champsVide);
  } else {
    setSuccessFor(firstName);
  }

  if (lastNameValue === "") {
    setErrorFor(lastName, champsVide);
  } else {
    setSuccessFor(lastName);
  }

  if (emailValue === "") {
    setErrorFor(email, champsVide);
  } else {
    setSuccessFor(email);
  }

  if (telValue === "") {
    setErrorFor(tel, champsVide);
  } else {
    setSuccessFor(tel);
  }

  // if(!fromDateValue){
  //     setErrorFor(fromDate, champsVide);
  // }else{
  // setSuccessFor(fromDate);
  // }

  // if(!toDateValue){
  //     setErrorFor(toDate, champsVide);
  // }else{
  // setSuccessFor(toDate);
  // }
}

function setErrorFor(input, message) {
  const formControl = input.parentElement; //.form__control
  const small = formControl.querySelector("small");

  // add error message inside small
  small.innerText = message;

  // add error class
  formControl.className = "form__control error";
}

function setSuccessFor(input) {
  const formControl = input.parentElement; //.form__control

  // add success class
  formControl.className = "form__control success";

  sendMail();
}

//clear
function clear() {
  inputs.forEach((i) => {
    i.value = "";
    i.parentElement.className = "form__control";
  });
}

//onChange
inputs.forEach((i) => {
  i.addEventListener("input", () => {
    if (i.value === "") {
      i.parentElement.className = "form__control";
    }
  });
});

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
const getCurrentTheme = () =>
  document.body.classList.contains(darkTheme) ? "dark" : "light";
const getCurrentIcon = () =>
  themeButton.classList.contains(iconTheme) ? "ri-moon-line" : "ri-sun-line";

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

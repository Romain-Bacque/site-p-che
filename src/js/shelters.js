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

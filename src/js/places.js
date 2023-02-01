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

const placesModule = {
  handleDescriptionDisplay: function (value, event) {
    event.stopPropagation();

    if (value === 0) {
      document
        .getElementById("lieux__description")
        .classList.toggle("description");
    } else if (value === 1) {
      document
        .getElementById("lieux__description")
        .classList.remove("description");
    }
  },
};

module.exports = placesModule;

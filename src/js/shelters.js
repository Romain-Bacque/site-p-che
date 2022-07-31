const sheltersModule = {
    shelterPictures: document.querySelectorAll(".photo__gîte"),
    handlePicturesDisplay: function(value, event) {
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
    toggleShelter1: function() {
        sheltersModule.shelterPictures[1].classList.toggle("gîte2");
        sheltersModule.shelterPictures[0].classList.remove("gîte1");
    },
    toggleShelter2: function() {
        sheltersModule.shelterPictures[0].classList.toggle("gîte1");
        sheltersModule.shelterPictures[1].classList.remove("gîte2");
    },
    hideShelters: function() {
        sheltersModule.shelterPictures[0].classList.remove("gîte1");
        sheltersModule.shelterPictures[1].classList.remove("gîte2");
    },
}

module.exports = sheltersModule;
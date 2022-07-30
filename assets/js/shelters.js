const sheltersModule = {
    newClass: document.querySelectorAll(".photo__gîte"),
    handlePicturesDisplay: function(value, event) {
        event.stopPropagation();

        switch (value) {
        case 0:
            sheltersModule.toogleShelter1();
        break;
    
        case 1:
            sheltersModule.toogleShelter2();
        break;
    
        case 2:
            sheltersModule.hideShelters();
        break;
    
        default:
            console.log(`Sorry, we are out of ${value}.`);
        }
    },
    toogleShelter1: function() {
        sheltersModule.newClass[1].classList.toggle("gîte2");
        sheltersModule.newClass[0].classList.remove("gîte1");
    },
    toogleShelter2: function() {
        sheltersModule.newClass[0].classList.toggle("gîte1");
        sheltersModule.newClass[1].classList.remove("gîte2");
    },
    hideShelters: function() {
        sheltersModule.newClass[0].classList.remove("gîte1");
        sheltersModule.newClass[1].classList.remove("gîte2");
    },
}
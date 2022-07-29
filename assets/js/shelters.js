const sheltersModule = {
    handlePicturesDisplay: function(value, event) {
        event.stopPropagation();

        const newClass = document.querySelectorAll(".photo__gîte");
    
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
}
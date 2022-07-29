const placesModule = {
    handleDescriptionDisplay: function(value, event) {
        event.stopPropagation();

        switch (value) {
            case 0:
                document.getElementById("description").classList.toggle("description");
            break;
        
            case 1:
                document.getElementById("description").classList.remove("description");
            break;
        
            default:
                console.log(`Sorry, we are out of ${value}.`);
        }
    }
}
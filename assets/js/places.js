const placesModule = {
    handleDescriptionDisplay: function(value, event) {
        event.stopPropagation();
        console.log('value')

        if(value === 0) {
            document.getElementById("description").classList.toggle("description");
        } else if(value === 1) {
            document.getElementById("description").classList.remove("description");
        }
    }
}
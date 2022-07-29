const giftModule = {
    handleDisplayForm: function(value) {
        switch (value) {
            case 0:
                giftModule.clearInputsText();
                formContainer.style.display = "none";
                formContainer.classList.remove("container__form");
            break;
        
            case 1:
                formContainer.style.display = "flex";
                formContainer.classList.add("container__form");
        
                const dates = document.querySelectorAll(".timepicker");
        
                for (date of dates) {
                    date.addEventListener("click", (e) => {
                        giftModule.setElementsAttribute(e);
                    });
            
                    date.addEventListener("input", (e) => {
                        giftModule.setElementsAttribute(e);
                    });
                }
            break;
        
            default:
                console.log(`Sorry, we are out of ${value}.`);
        }
    },
    setElementsAttribute: function(event) {
        event.target.setAttribute("min", dateLimit(0));
        event.target.setAttribute("max", dateLimit(2));
        form.elements.todate.setAttribute("min", form.elements.fromdate.value);
        form.elements.todate.value < form.elements.fromdate.value
            ? (form.elements.todate.value = form.elements.fromdate.value)
            : "";
    },
    clearInputsText() {
        inputs.forEach((input) => {
            input.value = "";
            input.parentElement.className = "form__control";
        });
    }
}



// var form = document.getElementById("form");

// //add Form//
// function displayForm() {
//   form.style.display = "flex";
//   form.classList.add("form");

//   var dates = document.querySelectorAll(".timepicker");

//   for (let date of dates) {
//     date.setAttribute("min", dateLimit(0));
//     date.setAttribute("max", dateLimit(2));
//   }
// }

// //remove Form
// function hideForm() {
//   form.style.display = "none";
//   form.classList.remove("form");
// }

// //max date
// function dateLimit(value) {
//   var today = new Date();
//   var dd = today.getDate();
//   var mm = today.getMonth() + 1; //January is 0!
//   var yyyy = today.getFullYear() + value;

//   if (dd < 10) {
//     dd = "0" + dd;
//   }
//   if (mm < 10) {
//     mm = "0" + mm;
//   }

//   return yyyy + "-" + mm + "-" + dd;
// }

// var btn = document.querySelectorAll("button");

// //button accès formulaire
// btn[2].onclick = displayForm;

// //button close formulaire
// btn[0].onclick = hideForm;

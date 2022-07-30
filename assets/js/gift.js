const giftModule = {
    formContainer: document.getElementById("container__form"),
    inputs: document.querySelectorAll("input, textarea"),
    handleFormSubmit: function(event) {
        event.preventDefault();

        giftModule.checkInputs();
    },
    handleDisplayForm: function(value) {
        switch (value) {
            case 0:
                giftModule.hideForm();
            break;
        
            case 1:
                giftModule.showForm();
            break;
        
            default:
                console.log(`Sorry, we are out of ${value}.`);
        }
    },
    handleMinAndMaxDate: function(event) { 
        const form = document.getElementById("form");

        event.target.setAttribute("min", giftModule.setLimitDate(0));
        event.target.setAttribute("max", giftModule.setLimitDate(2));
        form.elements.todate.setAttribute("min", form.elements.fromdate.value);
        form.elements.todate.value < form.elements.fromdate.value
            ? (form.elements.todate.value = form.elements.fromdate.value)
            : "";
    },
    setLimitDate: function(value) {
        const today = new Date();
        const day = today.getDate();
        const month = today.getMonth() + 1;
        const year = today.getFullYear() + value;
    
        if (day < 10) {
        day = "0" + day;
        }
        if (month < 10) {
        month = "0" + month;
        }
    
        return year + "-" + month + "-" + day;
    },  
    hideForm: function(){
        giftModule.clearInputsText();
        giftModule.formContainer.style.display = "none";
        giftModule.formContainer.classList.remove("container__form");
    },
    showForm: function(){
        const dates = document.querySelectorAll(".timepicker");
        
        giftModule.formContainer.style.display = "flex";
        giftModule.formContainer.classList.add("container__form");
        for (date of dates) {
            date.addEventListener("click", _ => giftModule.handleMinAndMaxDate);   
            date.addEventListener("input", _ => giftModule.handleMinAndMaxDate);
        }
    },
    checkInputs: function() {
        const firstNameValue = firstName.value.trim(),
            lastNameValue = lastName.value.trim(),
            emailValue = email.value.trim(),
            telValue = tel.value.trim(),
            emptyField = "Le champs ne doit pas être vide";
    
        if (!firstNameValue) {
            giftModule.setErrorFor(firstName, emptyField);
        } else {
            giftModule.setSuccessFor(firstName);
        }
    
        if (!lastNameValue) {
            giftModule.setErrorFor(lastName, emptyField);
        } else {
            giftModule.setSuccessFor(lastName);
        }
    
        if (!emailValue) {
            giftModule.setErrorFor(email, emptyField);
        } else {
            giftModule.setSuccessFor(email);
        }
    
        if (!telValue) {
            giftModule.setErrorFor(tel, emptyField);
        } else {
            giftModule.setSuccessFor(tel);
        }
    },  
    setErrorFor: function(input, message) {
        const formControl = input.parentElement; //.form__control
        const small = formControl.querySelector("small");
    
        small.innerText = message;
        formControl.className = "form__control error";
    },
    setSuccessFor: function(input) {
        const formControl = input.parentElement;
    
        formControl.className = "form__control success";
        giftModule.sendMail();
    },
    sendMail: function() {
        loader.style.display = "flex";
        
        emailjs
        .send(utilsModule.emailjs_service, utilsModule.emailjs_template, {
            firstName: firstName.value,
            lastName: lastName.value,
            email: email.value,
            tel: tel.value,
            msg: msg.value != "" ? msg.value : "Aucune information complémentaire.",
        })
        .then(
            response => {
                loader.style.display = "none";
                giftModule.makeSuccessModal();
                giftModule.clearInputsText();
                console.log("SUCCESS!", response.status, response.text);
            },
            error => {
                loader.style.display = "none";
                giftModule.makeErrorModal();
                console.log("FAILED...", error);
            }
            );
    },
    makeSuccessModal: function() {
        swal({
            title: "Demande Envoyée avec succès !",
            text: "Selon mes disponibilités, je la confirmerai par mail.",
            icon: "success",
            button: "OK",
        });
    },  
    makeErrorModal: function() {
        swal({
            title: "Oups...",
            text: "Echec de l'envoi de la demande",
            icon: "error",
            button: "OK",
        });
    },  
    clearInputsText: function() {
        giftModule.inputs.forEach((input) => {
            input.value = "";
            input.parentElement.className = "form__control";
        });
    },
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

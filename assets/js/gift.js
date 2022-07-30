const giftModule = {
    formContainer: document.getElementById("container__form"),
    firstName: document.getElementById("user__firstname"),
    lastName: document.getElementById("user__lastname"),
    email: document.getElementById("user__email"),
    tel: document.getElementById("user__tel"),
    msg: document.getElementById("msg"),
    loader: document.getElementById("loader"),
    inputs: document.querySelectorAll("input, textarea"),
    handleFormSubmit: function(event) {
        event.preventDefault();

        giftModule.checkInputs();
    },
    handleDisplayForm: function(value) {
        if (value === 0) {
            giftModule.hideForm();
        } else if (value === 1) {
            giftModule.showForm();
        }
    },
    handleInputChange: function(input) {
        if (!input.value) input.parentElement.className = "form__control";
    },
    handleMinAndMaxDate: function(event) { 
        const form = document.getElementById("form");

        event.target.setAttribute("min", giftModule.getLimitDate(0));
        event.target.setAttribute("max", giftModule.getLimitDate(2));
        form.elements.todate.setAttribute("min", form.elements.fromdate.value);
        form.elements.todate.value < form.elements.fromdate.value
            ? (form.elements.todate.value = form.elements.fromdate.value)
            : "";
    },
    getLimitDate: function(value) {
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
        const firstNameValue = giftModule.firstName.value.trim(),
            lastNameValue = giftModule.lastName.value.trim(),
            emailValue = giftModule.email.value.trim(),
            telValue = giftModule.tel.value.trim(),
            emptyField = "Le champs ne doit pas être vide";
    
        if (!firstNameValue) {
            giftModule.setErrorFor(giftModule.firstName, emptyField);
        } else {
            giftModule.setSuccessFor(giftModule.firstName);
        }
    
        if (!lastNameValue) {
            giftModule.setErrorFor(giftModule.lastName, emptyField);
        } else {
            giftModule.setSuccessFor(giftModule.lastName);
        }
    
        if (!emailValue) {
            giftModule.setErrorFor(giftModule.email, emptyField);
        } else {
            giftModule.setSuccessFor(giftModule.email);
        }
    
        if (!telValue) {
            giftModule.setErrorFor(giftModule.tel, emptyField);
        } else {
            giftModule.setSuccessFor(giftModule.tel);
        }
    },  
    setErrorFor: function(input, message) {
        const formControl = input.parentElement;
        const small = formControl.querySelector("small");
    
        small.innerText = message;
        formControl.className = "form__control error";
    },
    setSuccessFor: function(input) {
        const formControl = input.parentElement;
    
        formControl.className = "form__control success";
        giftModule.sendEmail();
    },
    sendEmail: function() {
        giftModule.loader.style.display = "flex";
        
        emailjs
        .send(utilsModule.emailjs_service, utilsModule.emailjs_template, {
            firstName: giftModule.firstName.value,
            lastName: giftModule.lastName.value,
            email: giftModule.email.value,
            tel: giftModule.tel.value,
            msg: giftModule.msg.value != "" ? msg.value : "Aucune information complémentaire.",
        })
        .then(
            response => {
                giftModule.loader.style.display = "none";
                giftModule.makeSuccessModal();
                giftModule.clearInputsText();

                console.log("SUCCESS!", response.status, response.text);
            },
            error => {
                giftModule.loader.style.display = "none";
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
const utilsModule = {
  emailjs_user: "user_I1HWuX9oE076hNrKEuHTK",
  emailjs_service: "service_ruzv3v1",
  emailjs_template: "template_y6oarwo",
  sendMail(data) {
    emailjs.send(utilsModule.emailjs_service, utilsModule.emailjs_template, {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      tel: data.tel,
      msg: data.msg ? data.msg : "Aucune information complémentaire.",
    });
  },
};

module.exports = utilsModule;

const form_two = document.getElementById("form");
// const formTest = document.querySelectorAll(".form");
const inputs = document.querySelectorAll("input");
const button = document.getElementById("buttons");
const errorEl = document.getElementById("error_el");
const errorElTwo = document.getElementById("error_el_two");
const buttonTwo = document.getElementById("buttons_two");
const contactTel = document.getElementById("kick_contacts");
const contactTel_two = document.getElementById("kick_contact");
const errorHidden = document.getElementById("err_hidden");
const errorHidden_two = document.getElementById("err_hidden_two");

console.log(contactTel);
// console.log(formTwo);
// console.log(form);
form_two.addEventListener(
  "submit",
  function (e) {
    e.preventDefault();
    inputVal = $("input").val;
    var inputValShould = true;
    if (!inputVal) {
      appNotifier("Please fill all the required fields");
      inputValShould = false;
    } else {
      const formData_two = new FormData(form);
      nameEl = $("#users_name").text();
      PhoneEl = $("#contact_els").text();
      countyEl = $("#county_els").text();
      subEl = $("#sub_els").text();
      registerLatEl = $("#register_latitude");
      registerLongEl = $("#register_longitude");
      console.log(subEl);
      formData_two.append("user_name", nameEl);
      formData_two.append("user_phone", PhoneEl);
      formData_two.append("user_county", countyEl);
      formData_two.append("user_sub_county", subEl);
      formData_two.append("register_latitude", registerLatEl);
      formData_two.append("register_longitude", registerLongEl);
      console.log([...formData_two]);
      fetch("https://api3.staging.iguru.co.ke/api/kickoff_questionnaire", {
        method: "POST",
        body: formData_two,
      })
        .then((res) => res.json())
        .then((data) => {
          var shouldProceed = true;
          if (!data.error) {
            workingNotifier("Your details are successfully submitted!");
            shouldProceed = false;
            // errorEl.style.display = "block";
            // errorEl.style.height = "300px";
            // setTimeout(() => {
            //   location.reload();
            // });
          } else {
            console.log(data.error);
          }
        })
        .catch((err) => {
          var shouldProceed = true;
          if (err) {
            appNotifier("Operation has not been completed!");
            shouldProceed = false;
            // errorElTwo.style.display = "block";
            // errorElTwo.style.height = "300px";
            console.log(err);
          }
        });
      for (let i = 0; i < inputs.length; i++) {
        inputs[i].value = "";
      }
    }
  },
  false
);

button.addEventListener(
  "click",
  function (e) {
    errorEl.style.display = "none";
    errorEl.style.height = "0";
    window.scrollTo({
      top: "0px",
      behavior: "smooth",
    });
  },
  false
);

buttonTwo.addEventListener(
  "click",
  function (e) {
    errorElTwo.style.display = "none";
    errorElTwo.style.height = "0";
    window.scrollTo({
      top: "0px",
      behavior: "smooth",
    });
  },
  false
);

// validation of contact
function validationForm(input_test) {
  var re = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/;
  return re.test(input_test);
}

contactTel.addEventListener(
  "keyup",
  function (e) {
    if (!validationForm(contactTel.value)) {
      errorHidden.style.display = "flex";
      contactTel.style.border = "1px solid red";
    } else {
      errorHidden.style.display = "none";
      contactTel.style.border = "none";
    }
  },
  false
);

contactTel_two.addEventListener(
  "keyup",
  function (e) {
    if (!validationForm(contactTel_two.value)) {
      errorHidden_two.style.display = "flex";
      contactTel_two.style.border = "1px solid red";
    } else {
      errorHidden_two.style.display = "none";
      contactTel_two.style.border = "none";
    }
  },
  false
);

const workingNotifier = (message) => {
  swal({
    title: message,
    text: "",
    icon: "success",
  });
};

function appNotifier(message) {
  swal({
    title: message,
    text: "",
    icon: "warning",
  });
}

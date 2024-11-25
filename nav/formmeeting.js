const form = document.getElementById("form");
const button = document.getElementById("buttons");
const inputs = document.querySelectorAll("input");
const errorEl = document.getElementById("error_el");
const errorElTwo = document.getElementById("error_el_two");
const buttonTwo = document.getElementById("buttons_two");
const meetinngCon = document.getElementById("chama_contacts");
const errorHiddenMeet = document.getElementById("err_hidden_three");
// const formTest = document.querySelectorAll(".form");
// const formTwo = document.getElementById("form_two");
// console.log(formTwo);
// console.log(form);

form.addEventListener(
  "submit",
  function (e) {
    e.preventDefault();
    const input = document.querySelectorAll(".input");
    console.log(input.values);
    const formData_one = new FormData(form);
    nameEl = $("#users_name").text();
    PhoneEl = $("#contact_els").text();
    countyEl = $("#county_els").text();
    subEl = $("#sub_els").text();
    registerLatEl = $("#register_latitude");
    registerLongEl = $("#register_longitude");
    console.log(subEl);
    formData_one.append("user_name", nameEl);
    formData_one.append("user_phone", PhoneEl);
    formData_one.append("user_county", countyEl);
    formData_one.append("user_sub_county", subEl);
    formData_one.append("register_latitude", registerLatEl);
    formData_one.append("register_longitude", registerLongEl);
    console.log([...formData_one]);
    fetch("https://api3.staging.iguru.co.ke/api/chama_meeting", {
      method: "POST",
      body: formData_one,
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
          setTimeout(function () {
            location.href = "../index.html";
          }, 2000);
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
    inputs.forEach((input) => {
      input.value = "";
    });
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

meetinngCon.addEventListener(
  "keyup",
  function (e) {
    if (!validationForm(meetinngCon.value)) {
      errorHiddenMeet.style.display = "flex";
      meetinngCon.style.border = "1px solid red";
    } else {
      errorHiddenMeet.style.display = "none";
      meetinngCon.style.border = "none";
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

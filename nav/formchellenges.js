const form = document.getElementById("form");
const button = document.getElementById("buttons");
const inputs = document.querySelectorAll("input");
const errorEl = document.getElementById("error_el");
const textArea = document.getElementById("cooking_comments");
const cookingRole = document.getElementById("cooking_roles");
const errorElTwo = document.getElementById("error_el_two");
const buttonTwo = document.getElementById("buttons_two");
// const formTest = document.querySelectorAll(".form");
console.log(textArea);
// console.log(formTwo);
// console.log(form);
console.log(cookingRole);
form.addEventListener(
  "submit",
  function (e) {
    e.preventDefault();
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
    fetch("https://api3.staging.iguru.co.ke/api/cooking_challenge", {
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
    textArea.value = "";
    cookingRole.value = "";
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

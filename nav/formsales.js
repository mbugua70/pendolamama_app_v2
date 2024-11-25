const form = document.getElementById("form");
// const formTest = document.querySelectorAll(".form");
// const formTwo = document.getElementById("form_two");
const button = document.getElementById("buttons");
const inputs = document.querySelectorAll("input");
const errorEl = document.getElementById("error_el");
const saleActivity = document.getElementById("sale_activity");
const errorElTwo = document.getElementById("error_el_two");
const buttonTwo = document.getElementById("buttons_two");
const salesContacts = document.getElementById("contact");
const errorHiddenSales = document.getElementById("err_hidden_two");
console.log(salesContacts);
// console.log(formTwo);
// console.log(form);
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

    fetch("https://api3.staging.iguru.co.ke/api/sale", {
      method: "POST",
      body: formData_one,
    })
      .then((res) => res.json())
      .then((data) => {
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
    saleActivity.value = "";
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

function validationForm(input_test) {
  var re = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/;
  return re.test(input_test);
}

salesContacts.addEventListener(
  "keyup",
  (e) => {
    if (!validationForm(salesContacts.value)) {
      salesContacts.style.border = "1px solid red";
      errorHiddenSales.style.display = "flex";
    } else {
      salesContacts.style.border = "none";
      errorHiddenSales.style.display = "none";
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

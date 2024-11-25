const form = document.getElementById("form");
const button = document.getElementById("buttons");
const inputs = document.querySelectorAll("input");
const errorEl = document.getElementById("error_el");
const errorElTwo = document.getElementById("error_el_two");
const buttonTwo = document.getElementById("buttons_two");
const contactPre = document.getElementById("pre_contacts");
const errorHidden = document.getElementById("err_hidden");
const contactPre_two = document.getElementById("pre_contacts2");
const errorHidden_two = document.getElementById("err_hidden_two");
const contactPre_three = document.getElementById("marchpre_contact");
const errorHidden_three = document.getElementById("err_hidden_three");
// const PhoneEl = document.querySelector("#contact_els");
// const nameEl = document.querySelector("#users_name");
// const countyEl = document.querySelector("#county_els");
// const subEl = document.querySelector("#sub_els");
// console.log(PhoneEl.textContent)

// const checkBtn = document.getElementById("button");
console.log(errorEl);
// const formTest = document.querySelectorAll(".form");
// const formTwo = document.getElementById("form_two");
// console.log(formTwo);
console.log(form);
// console.log(inputs);

//  inputs validation
// let phone = /^\d$]/gi;
console.log(contactPre);
// console.log(PhoneEl)

// contactTel.forEach(contacts =>{
//   if(contacts.value === phone){
//   }
// })

form.addEventListener(
  "submit",
  function (e) {
    e.preventDefault();
    inputVal = $("input").val();
    console.log($("input"));
    var inputValProceed = true;
    if (!inputVal) {
      appNotifier("Please fill in all the required field!");
      inputValProceed = false;
      $("input").focus();
    } else {
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
      // window.scrollTo({
      //   top: 0,
      //   behavior: "smooth",
      // });
      fetch("https://api3.staging.iguru.co.ke/api/charma_reg", {
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
    }
  },
  false
);

// button.addEventListener(
//   "click",
//   function (e) {
//     errorEl.style.display = "none";
//     errorEl.style.height = "0";
//     window.scrollTo({
//       top: "0px",
//       behavior: "smooth",
//     });
//   },
//   false
// );

// buttonTwo.addEventListener(
//   "click",
//   function (e) {
//     errorElTwo.style.display = "none";
//     errorElTwo.style.height = "0";
//     window.scrollTo({
//       top: "0px",
//       behavior: "smooth",
//     });
//   },
//   false
// );

// checkBtn.addEventListener("click", function (e) {
//   e.preventDefault();
//   inputs.forEach((input) => {
//     if ((input.value = "")) {
//     }
//   });
// });

// validation of contacts
function validationForm(input_test) {
  var re = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/;
  return re.test(input_test);
}

contactPre.addEventListener(
  "keyup",
  function (e) {
    if (!validationForm(contactPre.value)) {
      errorHidden.style.display = "flex";
      contactPre.style.border = "1px solid red";
    } else {
      errorHidden.style.display = "none";
      contactPre.style.border = "none";
    }
  },
  false
);

contactPre_two.addEventListener(
  "keyup",
  function (e) {
    if (!validationForm(contactPre_two.value)) {
      errorHidden_two.style.display = "flex";
      contactPre_two.style.border = "1px solid red";
    } else {
      errorHidden_two.style.display = "none";
      contactPre_two.style.border = "none";
    }
  },
  false
);

contactPre_three.addEventListener(
  "keyup",
  function (e) {
    e.preventDefault();
    if (!validationForm(contactPre_three.value)) {
      errorHidden_three.style.display = "flex";
      contactPre_three.style.border = "1px solid red";
    } else {
      errorHidden_three.style.display = "none";
      contactPre_three.style.border = "none";
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

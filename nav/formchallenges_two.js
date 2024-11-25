const form = document.getElementById("form");
const button = document.getElementById("buttons");
const inputs = document.querySelectorAll("input");
const errorEl = document.getElementById("error_el");
const textArea = document.getElementById("challenge_ch");
const errorElTwo = document.getElementById("error_el_two");
const buttonTwo = document.getElementById("buttons_two");

form.addEventListener(
  "submit",
  function (e) {
    e.preventDefault();
    console.log("working");
    var varification = challengeCheck();
    if (varification) {
      const formData_one = new FormData(form);
      nameEl = $("#users_name").text();
      PhoneEl = $("#contact_els").text();
      countyEl = $("#county_els").text();
      registerLatEl = $("#register_latitude");
      registerLongEl = $("#register_longitude");
      subEl = $("#sub_els").text();
      console.log(subEl);
      formData_one.append("user_name", nameEl);
      formData_one.append("user_phone", PhoneEl);
      formData_one.append("user_county", countyEl);
      formData_one.append("user_sub_county", subEl);
      formData_one.append("register_latitude", registerLatEl);
      formData_one.append("register_longitude", registerLongEl);
      console.log([...formData_one]);
      fetch("https://api3.staging.iguru.co.ke/api/challenge", {
        method: "POST",
        body: formData_one,
      })
        .then((res) => res.json())
        .then((data) => {
          var testShould = true;
          if (!data.error) {
            // errorEl.style.display = "block";
            // errorEl.style.height = "300px";
            workingNotifier("Your details are successfully submitted!");
            testShould = false;
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
            // errorElTwo.style.display = "block";
            // errorElTwo.style.height = "300px";
            workedNotifier("Operation has not been completed!");
            shouldProceed = false;
            console.log(err);
          }
        });
      inputs.forEach((input) => {
        input.value = "";
      });
      textArea.value = "";
    }
  },
  false
);

const challengeCheck = () => {
  // e.preventDefault();
  console.log("working");
  var toggleEffect = true;
  date = $("#challenge_date").val();
  feedback = $("#challenge_ch").val();
  if (!date) {
    workedNotifier("Enter Date please!!");
    $("#challenge_date").focus();
    toggleEffect = false;
  } else if (!feedback) {
    workedNotifier("Please enter your feedback!!");
    $("#challenge_ch").focus();
    toggleEffect = false;
  }
  return toggleEffect;
};

const workedNotifier = (message) => {
  swal({
    title: message,
    text: "",
    icon: "warning",
  });
};

const workingNotifier = (message) => {
  swal({
    title: message,
    text: "",
    icon: "success",
  });
};

// buttonClick.addEventListener("click", (e) => workedCheck(e), false);

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

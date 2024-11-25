const form = document.getElementById("form");
const button = document.getElementById("buttons");
const inputs = document.querySelectorAll("input");
const errorEl = document.getElementById("error_el");
// const textArea = document.getElementById("challenge_ch");
const errorElTwo = document.getElementById("error_el_two");
const buttonTwo = document.getElementById("buttons_two");
const registerButton = document.querySelector("#register_button");
const inputFile = document.getElementById("file");
const registerName = document.getElementById("register_name");
const registerPhone = document.getElementById("register_phone");
const registerCounty = document.getElementById("register_county");
const registerSub = document.getElementById("register_sub_county");
console.log(inputFile);

console.log(form);

form.addEventListener(
  "submit",
  function (e) {
    e.preventDefault();
    console.log("working");
    var varification = validateForm3();
    if (varification) {
      const formData_one = new FormData(form);
      // console.log(inputFile.files);
      // formData_one.append("file",inputFile.files[0]);
      console.log([...formData_one]);
      // The constructor of Dropzone accepts two arguments:
      // 1. The selector for the HTML element that you want to add
      //    Dropzone to, the second
      // 2. An (optional) object with the configuration

      fetch("https://api3.staging.iguru.co.ke/api/registerba", {
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
      // textArea.value = "";
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

var flashStore = window.localStorage;
function prefill() {
  // longitude = flashStore.getItem("longitude");
  // latitude = flashStore.getItem("latitude");
  var names = flashStore.getItem("name");
  var phone = flashStore.getItem("phone");
  var county = flashStore.getItem("county");
  var sub_county = flashStore.getItem("sub county");
  // group_name = flashStore.getItem("group name");
  // village = flashStore.getItem("village");

  if (!names || !phone || !county || !sub_county) {
  } else {
    setTimeout(() => {
      const $registerButton = $("#register_button");
      $("#register_name").val(names);
      $("#register_phone").val(phone);
      $("#register_county").val(county);
      $("#register_sub_county").val(sub_county);
      // $("#register_groupnm").val(group_name);
      // $("#register_village").val(village);
      // $("#register_latitude").val(latitude);
      // $("#register_longitude").val(longitude);
      $("input").css({
        "background-color": "#d6dfe6",
      });
      registerButton.textContent = "";
      $registerButton.append(
        `<i class="material-icons register_buttons">check</i>`
      );
    }, 2000);

    // $("#rba_name").text(names);
    // $("#rba_phone").text(phone);
    // $("#rba_region").text(region);
  }
}

prefill();

flashStore = window.localStorage;
function validateForm3() {
  var shouldProceed = true;
  // latitude = $("#register_latitude").val();
  // longitude = $("#register_longitude");
  names = $("#register_name").val();
  phone = $("#register_phone").val();
  county = $("#register_county").val();
  sub_county = $("#register_sub_county").val();
  // group_name = $("#register_groupnm").val();
  // village = $("#register_village").val();

  if (!names) {
    appNotifier("Your name is required");
    $("#register_name").focus();
    shouldProceed = false;
  } else if (!phone) {
    appNotifier("Your Phone Number is required");
    $("#register_phone").focus();
    shouldProceed = false;
  } else if (!county) {
    appNotifier("County is required");
    $("#register_county").focus();
    shouldProceed = false;
  } else if (!sub_county) {
    appNotifier("Sub County is required");
    $("register_sub_county").focus();
    shouldProceed = false;
  }

  return shouldProceed;
}

function registerBA() {
  var formStatus = validateForm3();
  if (formStatus) {
    // latitude = $("#register_latitude").val();
    // longitude = $("#register_longitude").val();
    names = $("#register_name").val();
    phone = $("#register_phone").val();
    county = $("#register_county").val();
    sub_county = $("#register_sub_county").val();
    // group_name = $("#register_groupnm").val();
    // village = $("#register_village").val();

    // flashStore.setItem("latitude", latitude);
    // flashStore.setItem("longitude", longitude);
    flashStore.setItem("name", names);
    flashStore.setItem("phone", phone);
    flashStore.setItem("county", county);
    flashStore.setItem("sub county", sub_county);
    // flashStore.setItem("group name", group_name);
    // flashStore.setItem("village", village);

    swal(
      "Registration Successfull",
      "You have been registered successfully",
      "success"
    );
  } //vorm validator
}

function appNotifier(message) {
  swal({
    title: message,
    text: "",
    icon: "warning",
  });
}

function appLocationNotifier(message) {
  swal({
    title: message,
    text: "",
    icon: "error",
  });
}

const workingNotifier = (message) => {
  swal({
    title: message,
    text: "",
    icon: "success",
  });
};

// names = flashStore.getItem("name");
// phone = flashStore.getItem("phone");
// county = flashStore.getItem("county");
// sub_county = flashStore.getItem("sub county");
// group_name = flashStore.getItem("group name");
// village = flashStore.getItem("village");

// $("#register_name").val(names);
// $("#register_phone").val(phone);
// $("#register_county").val(county);
// $("#register_sub_county").val(sub_county);
// $("#register_groupnm").val(group_name);
// $("#register_village").val(village);
console.log(localStorage);
// Dropzone.options.myDropzone = {
//   paramName: "file",
//   maxFilesize: 5, // MB
//   acceptedFiles: ".jpg,.png,.gif",
//   // init: function () {
//   //   this.on("success", function (file, response) {
//   //     console.log("Upload success:", response);
//   //   });
//   // },
// };

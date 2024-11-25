var flashStore = window.localStorage;
function prefill() {
  // var shouldProceed = true;
  // appNotifier("Please register to Continue");
  // shouldProceed = false;

  // longitude = flashStore.getItem("longitude");
  // latitude = flashStore.getItem("latitude");
  names = flashStore.getItem("name");
  phone = flashStore.getItem("phone");
  county = flashStore.getItem("county");
  sub_county = flashStore.getItem("sub county");
  // group_name = flashStore.getItem("group name");
  // village = flashStore.getItem("village");
  console.log(names);
  var swalContinue = true;
  if (!names || !phone || !county || !sub_county) {
    appNotifier("Please register to Continue!");
    swalContinue = false;
    setTimeout(function () {
      location.href = "../components/registration.html";
    }, 2000);
  } else {
    $(".preloader_element").css("display", "inline-block");
    setTimeout(() => {
      // const $registerButton = $("#register_button");
      $("#users_name").text(names);
      $("#contact_els").text(phone);
      $("#county_els").text(county);
      $("#sub_els").text(sub_county);
      // $("#register_groupnm").val(group_name);
      // $("#register_village").val(village);
      // $("#register_latitude").val(latitude);
      // $("#register_longitude").val(longitude);
      // $("input").css({
      //   "background-color": "#d6dfe6",
      // });
    }, 3000);

    // $("#rba_name").text(names);
    // $("#rba_phone").text(phone);
    // $("#rba_region").text(region);
  }
}

prefill();

function appNotifier(message) {
  swal({
    title: message,
    text: "",
    icon: "warning",
  });
}

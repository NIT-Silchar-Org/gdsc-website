var slider = document.querySelector(".heading-block");
var container = document.getElementById("container");
var cansubmit = true;
//Switchers
var loginswitcher = document.getElementById("switchtologin");
var switchtosignup = document.getElementById("switchtosignup");
//Type
var label = document.getElementById("label");
//Forms
var signupform = document.getElementById("signupform");
var loginform = document.getElementById("loginform");

var url = new URL(window.location.href);
// console.log(url.searchParams.get("type"));
if (url.searchParams.get("type") == "login") {
  login();
  loginform.style.display = "none";
  signupform.style.display = "none";
  setTimeout(()=>{
    loginform.style.display = "flex";
  },window.screen.width>800?1200:200)
}

//Animation
loginswitcher.addEventListener("click", () => {
  login();
  loginform.style.display = "none";
  signupform.style.display = "none";
  setTimeout(()=>{
    loginform.style.display = "flex";
  },window.screen.width>800?1200:200)
});
switchtosignup.addEventListener("click", () => {
  loginform.style.display = "none";
  signupform.style.display = "none";
  setTimeout(()=>{
    signupform.style.display = "flex";
  },window.screen.width>800?1400:200)
  signup();
});

function signup() {
  const timeline = anime.timeline({
    duration: 200,
    easing: "easeInOutExpo",
  });

  timeline
    .add({
      targets: label,
      delay: 100,
      opacity: 0,
    })
    .add({
      targets: label,
      update: function () {
        label.innerHTML = "SignUp";
      },
    })
    .add({
      targets: label,
      opacity: 1,
    });

  timeline.add(
    {
      targets: slider,
      width: "100%",
    },
    "-=200"
  );

  // timeline.add({
  //   delay: 100,
  //   update: function () {
  //     signupform.style.display = "flex";
  //     loginform.style.display = "none";
  //   },
  // });
  // timeline.add({
  //   targets: loginform,
  //   display: "none",
  // });
  timeline.add({
    targets: slider,
    width: "40%",
  });
  type = false;
}

function login() {
  const timeline = anime.timeline({
    duration: 100,
    easing: "easeInOutExpo",
  });

  timeline
    .add({
      targets: label,
      delay: 100,
      opacity: 0,
    })
    .add({
      targets: label,
      update: function () {
        label.innerHTML = "Login";
      },
    })
    .add({
      targets: label,
      opacity: 1,
    });

  timeline.add(
    {
      targets: slider,
      width: "100%",
    },
    "-=200"
  );

  // timeline.add({
  //   targets: signupform,
  //   delay: 100,
  //   update: function () {
  //     signupform.style.display = "none";
  //     loginform.style.display = "flex";
  //   },
  // });
  // timeline.add({
  //   targets: loginform,
  //   display: "flex",
  // });
  timeline.add({
    targets: slider,
    width: "40%",
  });
  type = true;
}

// Validation Logic

function validate() {
  var name = document.getElementById("name").value;
  var ps = document.getElementById("password").value;
  var cps = document.getElementById("cpassword").value;
  var signup = document.getElementById("signupform");
  var hname = document.getElementById("hname").value;

  // var urlget = "/user/verify-handle/" + hname;
  // var response = await fetch(urlget, { method: "GET" });
  // var res = await response.json();

  if (name.length < 1) {
    alert("Name is too short !");
    return false;
  }

  if (ps.length < 3) {
    alert("Password is weak !");
    return false;
  }
  if (ps < 4 && cps < 4) {
    alert("Password is too short ! ");
    return false;
  }
  if (ps != cps) {
    alert("Password doesn't match !");
    return false;
  }
  if (cansubmit == false) {
    alert("Enter a unique DSC Handle");
    return false;
  }
  return true;
}

function showpasswordsignup() {
  var ps = document.getElementById("password");
  var cps = document.getElementById("cpassword");
  var pis1 = document.getElementById("password_img_signin1");
  var pis2 = document.getElementById("password_img_signin2");

  if (ps.type === "password") {
    ps.type = "text";
    cps.type = "text";
    pis1.src = "/img/icons/show.png"
    pis2.src = "/img/icons/show.png"
  } else {
    ps.type = "password";
    cps.type = "password";
    pis1.src = "/img/icons/hide.png"
    pis2.src = "/img/icons/hide.png"
  }
}
function showpasswordlogin() {
  var ps = document.getElementById("loginpassword");
  var pil = document.getElementById("password_img_login");

  if (ps.type === "password") {
    ps.type = "text";
    pil.src = "/img/icons/show.png"
  } else {
    ps.type = "password";
    pil.src = "/img/icons/hide.png"
  }
}

async function checkuniquedschandle() {
  var hname = document.forms["signupform"]["dscHandle"].value;
  var result = document.getElementById("uniqueness");
  var urlget = "/user/verify-handle/" + hname;
  var response = await fetch(urlget, { method: "GET" });
  var res = await response.json(); /*  */
  if (res.valid) {
    if (res.inUse == true) {
      result.style.color = "Red";
      result.innerHTML = "Already in Use";
      cansubmit = false;
      return false;
    }
    if (res.inUse == false) {
      result.style.color = "Green";
      result.innerHTML = "Handle Available";
      cansubmit = true;
      return true;
    }
  } else {
    result.style.color = "Red";
    result.innerHTML = "Invalid Handle";
    cansubmit = false;
    return false
  }

}

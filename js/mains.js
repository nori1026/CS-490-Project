let form = document.getElementById("formOne");
let id = document.querySelector("#first-item");
let password = document.querySelector("#second-item");
let result = document.querySelector(".result");
const btn = document.querySelector(".submitbtn");

const authentication = document.querySelector("#authentication");
id.addEventListener("focus", increaseOpacity);
password.addEventListener("focus", increaseOpacity);
password.addEventListener("blur", reduceOpacity);
id.addEventListener("blur", reduceOpacity);
btn.addEventListener("click", sendData);


window.addEventListener("load", () => {
  id.value = "";
  password.value = "";
});

console.log("wiN");

function sendData(e) {
  e.preventDefault();

  const xhr = new XMLHttpRequest();

  xhr.onload = function() {
    const serverResponse = document.getElementById("verification");
    console.log(this.responseText);
    const jCon = JSON.parse(this.responseText);
    console.log(jCon);
    if (jCon[0] == "Student" && jCon[1] == "Password is valid") {
      window.location.href = "student.php";
    } else if (jCon[0] == "Instructor" && jCon[1] == "Password is valid") {
      window.location.href = "professor.php";
    }
    //serverResponse.innerHTML = "DB: " + jCon.DB + "NJIT: " + jCon.NJIT;
	
  };

  xhr.open("POST", "curl.php");
  xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhr.send(`ucid=${id.value}&pass=${password.value}`); 

/*
  fetch('sendSession.php', {
  	method: 'POST',
	mode: "same-origin",
	credentials: "same-origin",
	headers: {
		"Content-Type": "application/json";
	},
  	body: JSON.stringify({
		"payload": array
	})
  })
*/
}





const label1 = document.querySelector("#lab1");
const label2 = document.querySelector("#lab2");

function increaseOpacity() {
  console.log("focused");
  form.style.opacity = "0.7";
  this.style.borderColor = "#00ffff";
  if (this.id === "first-item") {
    label1.style.left = "-100px";
    label1.style.color = "#ffff00";
  } else {
    label2.style.left = "-100px";
    label2.style.color = "#ffff00";
  }
}

function reduceOpacity() {
  console.log("blurred");
  form.style.opacity = "0.5";
  this.style.borderColor = "#fff";

  if (this.id === "first-item") {
    if (this.value.length <= 0) {
      label1.style.left = "0px";
      label1.style.color = "#00ffff";
    }
  } else {
    if (this.value.length <= 0) {
      label2.style.left = "0px";
      label2.style.color = "#00ffff";
    }
  }
}

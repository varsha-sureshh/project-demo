const form = document.querySelector("form");

const eField = form.querySelector(".email"),
  eInput = eField.querySelector("input"),
  pField = form.querySelector(".password"),
  pInput = pField.querySelector("input");

const togglePassword = document.getElementById("togglePassword");
const strengthMeter = document.getElementById("password-strength-meter");
const strengthText = document.getElementById("password-strength-text");

form.onsubmit = (e) => {
  e.preventDefault();
  (eInput.value == "") ? eField.classList.add("shake", "error") : checkEmail();
  (pInput.value == "") ? pField.classList.add("shake", "error") : checkPass();

  setTimeout(() => {
    eField.classList.remove("shake");
    pField.classList.remove("shake");
  }, 500);

  eInput.onkeyup = () => { checkEmail(); }
  pInput.onkeyup = () => { checkPass(); }

  if (!eField.classList.contains("error") && !pField.classList.contains("error")) {
    window.location.href = form.getAttribute("action");
  }
}

function checkEmail() {
  let pattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
  if (!eInput.value.match(pattern)) {
    eField.classList.add("error");
    eField.classList.remove("valid");
    let errorTxt = eField.querySelector(".error-txt");
    (eInput.value != "") ? errorTxt.innerText = "Enter a valid email address" : errorTxt.innerText = "Email can't be blank";
  } else {
    eField.classList.remove("error");
    eField.classList.add("valid");
  }
}

function checkPass() {
  if (pInput.value == "") {
    pField.classList.add("error");
    pField.classList.remove("valid");
    let errorTxt = pField.querySelector(".error-txt");
    errorTxt.innerText = "Password can't be blank";
  } else {
    pField.classList.remove("error");
    pField.classList.add("valid");
    let errorTxt = pField.querySelector(".error-txt");
    errorTxt.innerText = "";
  }
}

// Show/Hide Password
togglePassword.addEventListener('click', function () {
  const type = pInput.getAttribute('type') === 'password' ? 'text' : 'password';
  pInput.setAttribute('type', type);
  this.classList.toggle('active');
  this.innerText = type === 'password' ? '👁️' : '🙈'; // Use emoji icons for simplicity
});

// Accessibility toggle by keyboard
togglePassword.addEventListener('keydown', function(e) {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault();
    this.click();
  }
});
// Set initial icon
togglePassword.innerText = '👁️';

// Password Strength Meter
pInput.addEventListener('input', function () {
  const val = pInput.value;
  let score = 0;
  if (val.length > 7) score++;
  if (/[a-z]/.test(val) && /[A-Z]/.test(val)) score++;
  if (/\d/.test(val)) score++;
  if (/[^A-Za-z0-9]/.test(val)) score++;
  strengthMeter.value = score;
  strengthText.textContent =
    score === 0 ? "" :
    score === 1 ? "Weak" :
    score === 2 ? "Moderate" :
    score === 3 ? "Strong" : "Very Strong";
});

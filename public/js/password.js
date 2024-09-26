const eyeClosed = document.querySelector(".ph-eye-closed");
const eye = document.querySelector(".ph-eye");

const inputPassword = document.querySelector("#password");

eye.addEventListener("click", () => {
    eyeClosed.style.display = "block";
    eye.style.display = "none";
    inputPassword.type = "text";
});

eyeClosed.addEventListener("click", () => {
    eye.style.display = "block";
    eyeClosed.style.display = "none";
    inputPassword.type = "password";
});

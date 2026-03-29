// Password toggle visibility
const showPasswordBtn = document.getElementById("showPassword");
if (showPasswordBtn) {
  showPasswordBtn.addEventListener("click", function () {
    const passwordInput = document.getElementById("account_password");
    const type = passwordInput.getAttribute("type");
    if (type === "password") {
      passwordInput.setAttribute("type", "text");
      showPasswordBtn.textContent = "Hide Password";
    } else {
      passwordInput.setAttribute("type", "password");
      showPasswordBtn.textContent = "Show Password";
    }
  });
}

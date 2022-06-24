let form = document.querySelector(".authorization__form");
let input = form.querySelector(".authorization__email");
let submit = form.querySelector(".authorization__btn");

form.addEventListener("submit", (e) => {
  if (!input.value) {
    e.preventDefault();
    input.placeholder = "Введите e-mail";
    input.classList.add("authorization__email--invalid");
  }
});

input.addEventListener("focus", () => {
  input.placeholder = "Введите текст";
  input.classList.remove("authorization__email--invalid");
});

input.addEventListener("blur", () => {
  input.placeholder = "E-mail";
})

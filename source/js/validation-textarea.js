let formPlans = document.querySelector(".new-plan__form");
let area = formPlans.querySelector(".comment-text--required");
let textError = formPlans.querySelector(".plan__error-text");


formPlans.addEventListener("submit", (e) => {
  if (!area.value) {
    e.preventDefault();
    area.classList.add("comment-text--error");
    textError.classList.add("plan__error-text--show");
  } else if (area.value) {
    formPlans.reset();
  }
});

area.addEventListener("input", (e) => {
  if (e.currentTarget.value !== "") {
    area.classList.remove("comment-text--error");
    textError.classList.remove("plan__error-text--show");
  }
})




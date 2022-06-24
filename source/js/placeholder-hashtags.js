let formHash = document.querySelector(".profile__form");
let aria = formHash.querySelector(".hashtags__textarea");


formHash.addEventListener("focus", (e) => {
  e.target.placeholder = "#введенные #тэги";

},true);

aria.addEventListener("blur", () => {
  aria.value = "#бургер #бар #футбол #концерт #крафт";
})




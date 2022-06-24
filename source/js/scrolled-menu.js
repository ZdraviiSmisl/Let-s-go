let header = document.querySelector(".page-header");

window.addEventListener("wheel", ()=>{

})

window.addEventListener("scroll", ()=>{
  if(this.pageYOffset > 800) {
    header.classList.add("page-header--scrolled")
  }
  else  {
    header.classList.remove("page-header--scrolled");
  }
})

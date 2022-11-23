let selectHeader = document.querySelectorAll(".select__header");
let selectItem = document.querySelectorAll(".select__item");
let main = document.querySelector(".main");

selectHeader.forEach((item) => {
  item.addEventListener("click", openClose);
});

selectItem.forEach((item) => {
  item.addEventListener("click", changeItem);
});

function openClose() {
  this.parentElement.classList.toggle("is-active");
}

function changeItem() {
  let text = this.innerText;
  let select = this.closest(".select");
  select.classList.toggle("is-active");
  let currentItem = select.querySelector(".select__current");
  currentItem.innerText = text;
  currentItem.classList.add("is-chosen");
}

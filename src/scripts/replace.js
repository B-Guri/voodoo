function replaceSelects() {
  let selects = document.querySelectorAll("select");
  selects.forEach((select) => {
    let newSelect = document.createElement("div");
    newSelect.classList.add("select");
    if (select.attributes.fullWidth) {
      newSelect.classList.add("grid-full-width");
    }

    let newSelectHeader = document.createElement("div");
    newSelectHeader.classList.add("select__header");
    newSelectHeader.appendChild(
      Object.assign(document.createElement("span"), {
        classList: "select__current",
        innerText: select.attributes.placeholder.value,
      })
    );
    newSelectHeader.appendChild(
      Object.assign(document.createElement("img"), {
        classList: "select__icon",
        src: "./src/images/Shape.svg",
        alt: "Shape",
      })
    );

    let newSelectBody = document.createElement("div");
    newSelectBody.classList.add("select__body");
    for (let i = 0; i < select.options.length; i++) {
      newSelectBody.appendChild(
        Object.assign(document.createElement("div"), {
          classList: "select__item",
          innerText: select.options[i].innerText,
        })
      );
    }

    newSelect.appendChild(newSelectHeader);
    newSelect.appendChild(newSelectBody);

    select.replaceWith(newSelect);
  });
}

replaceSelects();

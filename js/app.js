function Insurance(brand, year, type) {
  this.brand = brand;
  this.year = year;
  this.type = type;
}

Insurance.prototype.quoteInsurance = function () {
  let aoumnt;
  const base = 2000;
  switch (this.brand) {
    case "1":
      aoumnt = base * 1.15;
      break;
    case "2":
      aoumnt = base * 1.05;
      break;
    case "3":
      aoumnt = base * 1.35;
      break;
    default:
      break;
  }

  const diferent = new Date().getFullYear() - this.year;
  aoumnt -= (diferent * 3 * aoumnt) / 100;

  if (this.type === "basic") {
    aoumnt *= 1.3;
  } else {
    aoumnt *= 1.5;
  }
  return aoumnt;
};
function UI() {}

UI.prototype.fillOptions = () => {
  const max = new Date().getFullYear();
  const min = max - 20;

  const selectYear = document.querySelector("#year");

  for (let i = max; i > min; i--) {
    let option = document.createElement("option");
    option.value = i;
    option.innerHTML = i;
    selectYear.appendChild(option);
  }
};

UI.prototype.showMessage = (message, type) => {
  const div = document.createElement("div");
  if (type === "error") {
    div.classList.add("message", "error");
  } else {
    div.classList.add("message", "correct");
  }

  div.classList.add("mt-10");
  div.textContent = message;
  formQuote.insertBefore(div, document.querySelector("#result"));

  setTimeout(() => {
    document.querySelector(".message").remove();
  }, 3000);
};

UI.prototype.showResult = (total, insurance) => {
  const { brand, year, type } = insurance;

  let textBrand;
  switch (brand) {
    case "1":
      textBrand = "American";
      break;
    case "2":
      textBrand = "Asian";
      break;
    case "3":
      textBrand = "European";
      break;

    default:
      break;
  }

  const div = document.createElement("div");
  div.classList.add("mt-10");

  div.innerHTML = ` 
  
  <p class="header">Your resume</p>
  <p class="font-bold">Brand:<span class="font-normal"> ${textBrand}</span></p>
  <p class="font-bold">Year:<span class="font-normal"> ${year}</span></p>
  <p class="font-bold">Type:<span class="font-normal capitalize"> ${type}</span></p>
  <p class="font-bold">Total: $ <span class="font-normal"> ${total}</span></p>
  `;

  const resultDiv = document.querySelector("#result");

  const spinner = document.querySelector("#loading");
  spinner.style.display = "block";

  setTimeout(() => {
    spinner.remove();
    resultDiv.appendChild(div);
  }, 3000);
};
const ui = new UI();

document.addEventListener("DOMContentLoaded", () => {
  ui.fillOptions();
});

const formQuote = document.querySelector("#quoter-insurance");
formQuote.addEventListener("submit", (e) => {
  e.preventDefault();

  const brand = document.querySelector("#brand").value;
  const year = document.querySelector("#year").value;
  const type = document.querySelector('input[name="type"]:checked').value;

  if (brand === "" || year === "" || type === "") {
    ui.showMessage("All fields are required", "error");
  } else {
    const results = document.querySelector("#result div");
    if (results != null) {
      results.remove();
    }
  }

  const insurance = new Insurance(brand, year, type);
  const total = insurance.quoteInsurance();

  ui.showResult(total, insurance);
});

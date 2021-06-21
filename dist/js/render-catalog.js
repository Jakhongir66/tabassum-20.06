
// render catalog items ------------------------------
var items = [];

fetch("../data/catalog-items.json")
  .then((d) => d.json())
  .then((data) => {
    items = data.catalog_items;
    renderItems();
  })
  .catch(() => console.log("Error catalog-items.json"));


const toItems = (item) => `
  <div class="item-filter">
  <input type="checkbox"  class="items__type-input" id="label-id-${item.id}" />
    <label data-filter="${item.text}" for="label-id-${item.id}" class="items__type">${item.text}</label>
  </div>
`;

function renderItems() {
  const html = items.map(toItems).join("");
  document.querySelector(".items").innerHTML = html;
}

// render catalog services ------------------------------
var catalog_services = [];

fetch("../data/catalog-services.json")
  .then((d) => d.json())
  .then((data) => {
    catalog_services = data.catalog_services;
    renderCatalogServices();
  })
  .catch(() => console.log("Error catalog-services.json"));


// let i = 0;
const toCatalogServices = (service) =>
  `
    <div class="catalog-content__column ${service.parent_name}">
      <div class="cards">
        <div class="cards__label">${service.procedure_name}</div>
        <div class="cards__text">${service.parent_name}</div>
        <div class="cards__price"><span>${currency(service.price, { separator: ' ', pattern: '#' }).format()}</span>сум</div>
      </div>
    </div>
  `;

function renderCatalogServices() {
  const html = catalog_services.map(toCatalogServices).join("");
  document.querySelector(".catalog-content__row").innerHTML = html;
}

// search 
document.querySelector('#search').oninput = function () {
  let val = this.value.toLowerCase().toUpperCase().trim()
  let cardText = document.querySelectorAll('.catalog-content__row .catalog-content__column')
  if (val != '') {
    cardText.forEach(function (elem) {
      if (elem.innerText.search(val) == -1) {
        elem.classList.add('hide')
      } else {
        elem.classList.remove('hide')
      }
    })
  } else {
    cardText.forEach(function (elem) {
      elem.classList.remove('hide')
    })
  }
}

// download PDF
window.onload = function () {
  document.getElementById("download")
    .addEventListener("click", () => {
      const content = this.document.querySelector('.catalog-content')
      console.log(content);
      var opt = {
        margin: 1,
        filename: 'tabassum-file.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
      };
      html2pdf().from(content).set(opt).save();
    })
}

// =======================================================================================================
// filter items




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
<input type="checkbox" class="items__type-input" id="label-id-${item.id}" />
  <label for="label-id-${item.id}" class="items__type">${item.text}</label>
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
  <div class="catalog-content__column" >
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
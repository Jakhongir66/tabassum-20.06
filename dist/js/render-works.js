
// render works ------------------------------
var works = [];

fetch("../data/galery.json")
  .then((d) => d.json())
  .then((data) => {
    works = data.images;
    renderWorks();
  })
  .catch(() => console.log("Error galery.json"));


// let i = 0;
const toWorks = (item) =>
  `
   <div class="works__grid works__grid--${item.id}">
      <div class="works__item item-works">
      <div class="item-works__image"><img src="img/reviews/${item.imgSrc}.png" alt=""></div>
      <a href="${item.youtubeSrc ? item.youtubeSrc : item.bigImageSrc}" data-fancybox class="item-works__play"><img
            src="img/reviews/${item.play ? item.play : item.zoom}.png" alt=""></a>
      </div>
   </div>
   `;

function renderWorks() {
  const html = works.map(toWorks).join("");
  document.querySelector(".works__content").innerHTML = html;
}
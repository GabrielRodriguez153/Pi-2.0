// Cards
document.addEventListener("DOMContentLoaded", function () {
  var $grid = $(".grid").isotope({
      itemSelector: ".hotel-card",
      layoutMode: "masonry",
      masonry: {
          columnWidth: ".hotel-card",
      },
      getSortData: {
          price: '[data-price] parseInt',
          rating: '[data-rating] parseFloat'
      }
  });

  var filters = {};

  document.querySelectorAll("#filters select").forEach(function (filter) {
      filter.addEventListener("change", function () {
          var filterGroup = this.getAttribute("id").replace("-filter", "");
          filters[filterGroup] = this.value;
          var filterValue = concatValues(filters);
          $grid.isotope({ filter: filterValue });
      });
  });

  function concatValues(obj) {
      var value = "";
      for (var prop in obj) {
          value += obj[prop];
      }
      return value;
  }

  // Toggle dropdown content and relayout Isotope
  var dropdowns = document.querySelectorAll(".dropdown-btn");
  dropdowns.forEach(function (dropdown) {
      dropdown.addEventListener("click", function () {
          var card = this.closest(".hotel-card");
          var dropdownContent = card.querySelector(".dropdown-content");
          var icon = this.querySelector("i");

          if (dropdownContent.classList.contains("expanded")) {
              dropdownContent.classList.remove("expanded");
              card.classList.remove("expanded");
              icon.classList.remove("fa-chevron-up");
              icon.classList.add("fa-chevron-down");
          } else {
              dropdownContent.classList.add("expanded");
              card.classList.add("expanded");
              icon.classList.remove("fa-chevron-down");
              icon.classList.add("fa-chevron-up");
          }

          $grid.isotope("layout");
      });
  });
});


// Filter - price

function updatePriceValues() {
  var minPrice = document.getElementById("price-min").value;
  var maxPrice = document.getElementById("price-max").value;
  document.getElementById("price-min-value").value = minPrice;
  document.getElementById("price-max-value").value = maxPrice;
}

document.getElementById("price-filter-apply").addEventListener("click", function () {
  var minPrice = parseInt(document.getElementById("price-min").value, 10);
  var maxPrice = parseInt(document.getElementById("price-max").value, 10);
  
  $grid.isotope({
      filter: function () {
          var price = parseInt($(this).find('.price').text().replace('R$', '').replace('diária', '').trim(), 10);
          return price >= minPrice && price <= maxPrice;
      }
  });
});

document.querySelectorAll(".filter-buttons button").forEach(function (button) {
  button.addEventListener("click", function () {
      document.querySelectorAll(".filter-buttons button").forEach(function (btn) {
          btn.classList.remove("active");
      });
      this.classList.add("active");
  });
});

const rangeInput = document.querySelectorAll(".range-input input"),
priceInput = document.querySelectorAll(".price-values span input"),
range = document.querySelector(".slider .progress");
let priceGap = 100;

priceInput.forEach(input =>{
  input.addEventListener("input", e =>{
      let minPrice = parseInt(priceInput[0].value),
      maxPrice = parseInt(priceInput[1].value);

      if((maxPrice - minPrice >= priceGap) && maxPrice <= rangeInput[0].max){
          if(e.target.className === "input-min"){
              rangeInput[0].value = minPrice;
              range.style.left = ((minPrice / rangeInput[0].max) * 100) + "%";
          }else{
              rangeInput[1].value = maxPrice;
              range.style.right = 100 - (maxPrice / rangeInput[1].max) * 100 + "%";
          }
      }
  });
});
rangeInput.forEach(input =>{
  input.addEventListener("input", e =>{
      let minVal = parseInt(rangeInput[0].value),
      maxVal = parseInt(rangeInput[1].value);
      if((maxVal - minVal) < priceGap){
          if(e.target.className === "range-min"){
              rangeInput[0].value = maxVal - priceGap
          }else{
              rangeInput[1].value = minVal + priceGap;
          }
      }else{
          priceInput[0].value = minVal;
          priceInput[1].value = maxVal;
          range.style.left = ((minVal / rangeInput[0].max) * 100) + "%";
          range.style.right = 100 - (maxVal / rangeInput[1].max) * 100 + "%";
      }
  });
});

// Initialize price values
updatePriceValues();

// header container
const scrollRevealOption = {
    distance: "3.125rem",
    origin: "bottom",
    duration: 1000,
  };
  
  ScrollReveal().reveal(".section-container h1", {
    ...scrollRevealOption
  });
  
  ScrollReveal().reveal(".section-container p", {
    ...scrollRevealOption,
    delay: 500,
  });






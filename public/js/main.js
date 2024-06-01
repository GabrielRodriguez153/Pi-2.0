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


// buttons

// Seleciona os elementos
const priceRangeInput = document.getElementById('priceRange');
const inputGroupFilter = document.querySelector('.input-group-filter');
const dailyButton = document.getElementById('daily');
const totalButton = document.getElementById('total');
const minRangeInput = document.querySelector('.min-range');
const maxRangeInput = document.querySelector('.max-range');
const minInput = document.querySelector('.min-input');
const maxInput = document.querySelector('.max-input');
const applyButton = document.getElementById('price-filter-apply');
const dropdownIcon = document.getElementById('price-dropdown-icon');
const priceFilterContainer = document.getElementById('price-filter-container');

    dropdownIcon.addEventListener('click', function() {
      if (priceFilterContainer.style.display === 'none' || priceFilterContainer.style.display === '') {
        priceFilterContainer.style.display = 'block';
      } else {
        priceFilterContainer.style.display = 'none';
      }
    });

    document.addEventListener('click', function(event) {
      if (!dropdownIcon.contains(event.target) && !priceFilterContainer.contains(event.target)) {
        priceFilterContainer.style.display = 'none';
      }
    });

// Sincroniza os valores dos inputs de número e range
minRangeInput.addEventListener('input', () => {
    minInput.value = minRangeInput.value;
    updatePriceRange();
});

maxRangeInput.addEventListener('input', () => {
    maxInput.value = maxRangeInput.value;
    updatePriceRange();
});

minInput.addEventListener('input', () => {
    minRangeInput.value = minInput.value;
    updatePriceRange();
});

maxInput.addEventListener('input', () => {
    maxRangeInput.value = maxInput.value;
    updatePriceRange();
});

// Atualiza o valor no input de faixa de preço
function updatePriceRange() {
    priceRangeInput.value = `R$ ${minInput.value} — R$ ${maxInput.value}`;
}

// Fecha o dropdown ao clicar no botão de aplicar
applyButton.addEventListener('click', () => {
    inputGroupFilter.classList.remove('open');
});

const rangevalue =  
    document.querySelector(".slider-container .price-slider"); 
const rangeInputvalue =  
    document.querySelectorAll(".range-input input"); 
  
// Set the price gap 
let priceGap = 1000; 
  
// Adding event listners to price input elements 
const priceInputvalue =  
    document.querySelectorAll(".price-input input"); 
for (let i = 0; i < priceInputvalue.length; i++) { 
    priceInputvalue[i].addEventListener("input", e => { 
  
        // Parse min and max values of the range input 
        let minp = parseInt(priceInputvalue[0].value); 
        let maxp = parseInt(priceInputvalue[1].value); 
        let diff = maxp - minp 
  
        if (minp < 0) { 
            priceInputvalue[0].value = 0; 
            minp = 0; 
        } 
  
        // Validate the input values 
        if (maxp > 10000) { 
            priceInputvalue[1].value = 10000; 
            maxp = 10000; 
        } 
  
        if (minp > maxp - priceGap) { 
            priceInputvalue[0].value = maxp - priceGap; 
            minp = maxp - priceGap; 
  
            if (minp < 0) { 
                priceInputvalue[0].value = 0; 
                minp = 0; 
            } 
        } 
  
        // Check if the price gap is met  
        // and max price is within the range 
        if (diff >= priceGap && maxp <= rangeInputvalue[1].max) { 
            if (e.target.className === "min-input") { 
                rangeInputvalue[0].value = minp; 
                let value1 = rangeInputvalue[0].max; 
                rangevalue.style.left = `${(minp / value1) * 100 + 1}%`; 
            } 
            else { 
                rangeInputvalue[1].value = maxp; 
                let value2 = rangeInputvalue[1].max; 
                rangevalue.style.right =  
                    `${100 - (maxp / value2) * 100}%`; 
            } 
        } 
    }); 
  
    // Add event listeners to range input elements 
    for (let i = 0; i < rangeInputvalue.length; i++) { 
        rangeInputvalue[i].addEventListener("input", e => { 
            let minVal =  
                parseInt(rangeInputvalue[0].value); 
            let maxVal =  
                parseInt(rangeInputvalue[1].value); 
  
            let diff = maxVal - minVal 
              
            // Check if the price gap is exceeded 
            if (diff < priceGap) { 
              
                // Check if the input is the min range input 
                if (e.target.className === "min-range") { 
                    rangeInputvalue[0].value = maxVal - priceGap; 
                } 
                else { 
                    rangeInputvalue[1].value = minVal + priceGap; 
                } 
            } 
            else { 
              
                // Update price inputs and range progress 
                priceInputvalue[0].value = minVal; 
                priceInputvalue[1].value = maxVal; 
                rangevalue.style.left = 
                    `${(minVal / rangeInputvalue[0].max) * 100}%`; 
                rangevalue.style.right = 
                    `${100 - (maxVal / rangeInputvalue[1].max) * 100}%`; 
            } 
        }); 
    } 
}


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


// Manage Active State
$(document).ready(function () {
    $('.nav-link').on('click', function () {
        $('.nav-link').removeClass('active');
        $(this).addClass('active');
    });
});





document.addEventListener("DOMContentLoaded", function () {
  var $grid = $(".grid").isotope({
    itemSelector: ".hotel-card",
    layoutMode: "masonry",
    masonry: {
      columnWidth: ".hotel-card",
    },
  });

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







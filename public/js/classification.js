// Toggle sort menu
const sortBtn = document.getElementById('sortBtn');
const sortMenu = document.getElementById('sort-inventory-form');
const closeSortMenu = document.getElementById('closeSortMenu');
const enablePrice = document.getElementById('enablePrice');
const minPrice = document.getElementById('minPrice');
const maxPrice = document.getElementById('maxPrice');
const enableMiles = document.getElementById('enableMiles');
const minMiles = document.getElementById('minMiles');
const maxMiles = document.getElementById('maxMiles');
const sortError = document.getElementById('sortError');

if (sortBtn && sortMenu && closeSortMenu) {
  // Helper to open the sort menu
  function openSortMenu() {
    sortMenu.style.display = 'block';
    sortBtn.innerHTML = '×';
    sortBtn.setAttribute('aria-label', 'Close sort menu');
  }
  // Helper to close the sort menu
  function closeSortMenuFn() {
    sortMenu.style.display = 'none';
    sortBtn.innerHTML = '<span class="sortBtn-large">Sort Vehicles</span><span class="sortBtn-small">Sort</span>';
    sortBtn.setAttribute('aria-label', 'Open sort menu');
  }
  // Toggle logic for sortBtn
  sortBtn.onclick = function() {
    if (sortMenu.style.display === 'block') {
      closeSortMenuFn();
    } else {
      openSortMenu();
    }
  }
  // Cancel button closes the menu
  closeSortMenu.onclick = function(e) {
    e.preventDefault();
    closeSortMenuFn();
  }
}
if (enablePrice && minPrice && maxPrice) {
  enablePrice.onchange = function() {
    minPrice.disabled = !this.checked;
    maxPrice.disabled = !this.checked;
  }
}
if (enableMiles && minMiles && maxMiles) {
  enableMiles.onchange = function() {
    minMiles.disabled = !this.checked;
    maxMiles.disabled = !this.checked;
  }
}
if (sortMenu) {
  sortMenu.onsubmit = function(e) {
    let err = '';
    if(enablePrice && enablePrice.checked) {
      let min = parseFloat(minPrice.value);
      let max = parseFloat(maxPrice.value);
      if(!isNaN(min) && !isNaN(max) && min > max) err += 'Min price must be less than max price. ';
    }
    if(enableMiles && enableMiles.checked) {
      let min = parseInt(minMiles.value);
      let max = parseInt(maxMiles.value);
      if(!isNaN(min) && !isNaN(max) && min > max) err += 'Min miles must be less than max miles.';
    }
    if(err) {
      if (sortError) sortError.textContent = err;
      e.preventDefault();
    }
  }
}
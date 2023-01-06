const products = document.querySelector('.products');
const gridViewBtn = document.getElementById('grid-active-btn');
const detailsViewBtn = document.getElementById('details-active-btn');

gridViewBtn.classList.add('active-btn');

gridViewBtn.addEventListener('click', () => {
    gridViewBtn.classList.add('active-btn');
    
    detailsViewBtn.classList.remove('active-btn');
    products.classList.remove('details-active');
});

detailsViewBtn.addEventListener('click', () => {
    gridViewBtn.classList.remove('active-btn');

    detailsViewBtn.classList.add('active-btn');
    products.classList.add('details-active');
});



const CONFIG = {
    perPage: 6,
    currentPage: 1
};

// 1. SHOP PAGE LOGIC
function renderProducts(page) {
    const container = document.getElementById('product-grid');
    if (!container) return;

    const start = (page - 1) * CONFIG.perPage;
    const end = start + CONFIG.perPage;
    const paginatedItems = products.slice(start, end);

    container.innerHTML = paginatedItems.map(product => `
        <div class="col-md-4">
            <div class="card mb-4 product-wap rounded-0">
                <div class="card rounded-0">
                    <img class="card-img rounded-0 img-fluid" src="${product.image}">
                    <div class="card-img-overlay rounded-0 product-overlay d-flex align-items-center justify-content-center">
                        <ul class="list-unstyled">
                            <li><a class="btn btn-success text-white" href="shop-single.html?id=${product.id}"><i class="far fa-eye"></i></a></li>
                            <li><a class="btn btn-success text-white mt-2" href="shop-single.html?id=${product.id}"><i class="fas fa-cart-plus"></i></a></li>
                        </ul>
                    </div>
                </div>
                <div class="card-body">
                    <a href="shop-single.html?id=${product.id}" class="h3 text-decoration-none">${product.name}</a>
                    <ul class="w-100 list-unstyled d-flex justify-content-between mb-0">
                        <li>${product.sizes}</li>
                        <li class="pt-2">
                            ${product.colors.map(c => `<span class="product-color-dot color-dot-${c} float-left rounded-circle ml-1"></span>`).join('')}
                        </li>
                    </ul>
                    <p class="text-center mb-0">$${product.price.toFixed(2)}</p>
                </div>
            </div>
        </div>
    `).join('');

    renderPagination();
}

function renderPagination() {
    const container = document.getElementById('pagination-container');
    if (!container) return;

    const totalPages = Math.ceil(products.length / CONFIG.perPage);
    let html = '';
    for (let i = 1; i <= totalPages; i++) {
        html += `
            <li class="page-item ${i === CONFIG.currentPage ? 'active' : ''}">
                <a class="page-link rounded-0 mr-3 shadow-sm border-top-0 border-left-0 ${i === CONFIG.currentPage ? 'text-white' : 'text-dark'}" 
                href="javascript:void(0)" onclick="changePage(${i})">${i}</a>
            </li>`;
    }
    container.innerHTML = html;
}

window.changePage = (page) => {
    CONFIG.currentPage = page;
    renderProducts(page);
    window.scrollTo({ top: 300, behavior: 'smooth' });
};

// 2. HOME PAGE LOGIC (Featured Products)
function renderFeaturedProducts() {
    const container = document.getElementById('featured-products');
    if (!container) return;

    const featured = products.slice(0, 3);
    container.innerHTML = featured.map(p => `
        <div class="col-12 col-md-4 mb-4">
            <div class="card h-100">
                <a href="shop-single.html?id=${p.id}"><img src="${p.image}" class="card-img-top" alt="..."></a>
                <div class="card-body">
                    <ul class="list-unstyled d-flex justify-content-between">
                        <li class="text-muted text-right">$${p.price.toFixed(2)}</li>
                    </ul>
                    <a href="shop-single.html?id=${p.id}" class="h2 text-decoration-none text-dark">${p.name}</a>
                    <p class="card-text">${p.description}</p>
                </div>
            </div>
        </div>
    `).join('');
}

// 3. DETAIL PAGE LOGIC
function renderSingleProduct() {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');
    const product = products.find(p => p.id == id);
    
    if (product && document.getElementById('product-detail-name')) {
        document.getElementById('product-detail-img').src = product.image;
        document.getElementById('product-detail-name').innerText = product.name;
        document.getElementById('product-detail-price').innerText = `$${product.price.toFixed(2)}`;
        document.getElementById('product-detail-desc').innerText = product.description;
    }
}

// Global Initialization
document.addEventListener('DOMContentLoaded', () => {
    renderProducts(CONFIG.currentPage);
    renderFeaturedProducts();
    renderSingleProduct();
});
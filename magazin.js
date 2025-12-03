document.addEventListener('DOMContentLoaded', function() {
 
async function loadProductsFromJSON() {
    try {
        const response = await fetch('shop.json');
        const data = await response.json();

        displayProducts(data.products);
        loadingIndicator.style.display = 'none';
    } catch (error) {
        console.error('Ошибка загрузки товаров:', error);
        loadingIndicator.innerHTML = '<p class="text-danger">Ошибка загрузки товаров</p>';
    }
}
    const products = [
        {
            id: 1,
            name: "Футболка с Крошем",
            description: "Хлопковая футболка с изображением Кроша",
            price: 1299,
            category: "clothes",
            image: "https://files.indiwd.com/app/products/1543/gallery/678ab0b3963ee.jpg",
            inStock: true
        },
        {
            id: 2,
            name: "Футболка с Крошем и Пином",
            description: "Размер L",
            price: 1999,
            category: "clothes",
            image: "https://files.indiwd.com/app/products/1544/gallery/679d4b07b58ba.jpg",
            inStock: true
        },
        {
            id: 3,
            name: "Значок с Нюшей",
            description: "30х20 см",
            price: 2499,
            category: "accessories",
            image: "https://avatars.mds.yandex.net/get-mpic/13750035/2a0000019a16e2801a5deb346b96817fa42a/orig",
            inStock: false
        },
        {
            id: 4,
            name: "Мягкие персонажи",
            description: "Маленькие игрушки",
            price: 899,
            category: "toys",
            image: "https://avatars.mds.yandex.net/get-mpic/14067069/2a000001971796c83b5cc329e51bf3d619eb/orig",
            inStock: true
        },
        {
            id: 5,
            name: "Значок с Крошем",
            description: "50х20 см",
            price: 1599,
            category: "accessories",
            image: "https://ir.ozone.ru/s3/multimedia-1-1/c400/7632036325.jpg",
            inStock: true
        },
        {
            id: 6,
            name: "Костюм в виде Пина",
            description: "Подходит для ребенка 7-10 лет",
            price: 699,
            category: "clothes",
            image: "https://lanta.biz/upload/resize_cache/iblock/8f0/700_700_1/0ty648ktxtz7pkfwo5rrie8bm2xw4ukc.jpg",
            inStock: true
        },
        {
            id: 7,
            name: "Толстовка Лосяш",
            description: "Теплая толстовка на флисе",
            price: 2899,
            category: "clothes",
            image: "https://riki.shop/wp-content/uploads/2025/01/65.webp",
            inStock: true
        },
       
    ];

  
    const productsContainer = document.getElementById('node_for_insert');
    const loadingIndicator = document.getElementById('loadingIndicator');
    const noProductsMessage = document.getElementById('noProductsMessage');
    const searchInput = document.getElementById('searchInput');
    const categoryFilter = document.getElementById('categoryFilter');

    function createProductCard(product) {
        return `
        <div class="col-md-4 col-lg-3 mb-4">
            <div class="card card-custom h-100">
                <img src="${product.image}" 
                     class="card-img-top" 
                     alt="${product.name}"
                     style="height: 250px; object-fit: cover;">
                <div class="card-body d-flex flex-column">
                    <h5 class="card-title" style="color: #5cd7fd;">${product.name}</h5>
                    <p class="card-text flex-grow-1">${product.description}</p>
                    <div class="mt-auto">
                        <p class="card-text fw-bold" style="color: #ff69b4;">
                            ${product.price} ₽
                        </p>
                        <div class="d-flex justify-content-between align-items-center">
                            <span class="badge ${product.inStock ? 'bg-success' : 'bg-danger'}">
                                ${product.inStock ? 'В наличии' : 'Нет в наличии'}
                            </span>
                            <span class="badge bg-info">${getCategoryName(product.category)}</span>
                        </div>
                        <button class="btn btn-primary w-100 mt-2" 
                                ${!product.inStock ? 'disabled' : ''}
                                onclick="addToCart(${product.id})">
                            ${product.inStock ? 'В корзину' : 'Нет в наличии'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
        `;
    }


    function getCategoryName(category) {
        const categories = {
            'clothes': 'Одежда',
            'toys': 'Игрушки',
            'accessories': 'Аксессуары'
        };
        return categories[category] || category;
    }

  
    function displayProducts(productsToShow) {

        productsContainer.innerHTML = '';
        
        if (productsToShow.length === 0) {
            noProductsMessage.style.display = 'block';
            return;
        }
        
        noProductsMessage.style.display = 'none';
        
       
        productsToShow.forEach(product => {
            productsContainer.innerHTML += createProductCard(product);
        });
    }

    function filterProducts() {
        const searchTerm = searchInput.value.toLowerCase();
        const selectedCategory = categoryFilter.value;
        
        const filtered = products.filter(product => {
            const matchesSearch = product.name.toLowerCase().includes(searchTerm) ||
                                 product.description.toLowerCase().includes(searchTerm);
            const matchesCategory = selectedCategory === 'all' || 
                                   product.category === selectedCategory;
            
            return matchesSearch && matchesCategory;
        });
        
        return filtered;
    }

  
    function updateDisplay() {
        const filteredProducts = filterProducts();
        displayProducts(filteredProducts);
    }

 
    function loadProducts() {
        setTimeout(() => {
            loadingIndicator.style.display = 'none';
            updateDisplay();
            
           
            searchInput.addEventListener('input', updateDisplay);
            categoryFilter.addEventListener('change', updateDisplay);
        }, 1000);
    }

    window.addToCart = function(productId) {
        const product = products.find(p => p.id === productId);
        if (product && product.inStock) {
            alert(`Товар "${product.name}" добавлен в корзину!`);
          
        }
    };

 
    loadProducts();
});
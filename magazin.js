document.addEventListener('DOMContentLoaded', function() {
 
async function loadProductsFromJSON() {
    try {
        const response = await fetch('shop.json');
        const data = await response.json();
        // data.products содержит массив товаров
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
            name: "Плюшевый Ёжик",
            description: "Мягкая игрушка Ёжика высотой 30 см",
            price: 1999,
            category: "toys",
            image: "https://files.indiwd.com/app/products/1543/gallery/678ab0b3963ee.jpg",
            inStock: true
        },
        {
            id: 3,
            name: "Рюкзак с Нюшей",
            description: "Школьный рюкзак с принтом Нюши",
            price: 2499,
            category: "accessories",
            image: "https://files.indiwd.com/app/products/1543/gallery/678ab0b3963ee.jpg",
            inStock: false
        },
        {
            id: 4,
            name: "Кепка с Барашем",
            description: "Бейсболка с вышитым Барашем",
            price: 899,
            category: "clothes",
            image: "https://files.indiwd.com/app/products/1543/gallery/678ab0b3963ee.jpg",
            inStock: true
        },
        {
            id: 5,
            name: "Конструктор Смешарики",
            description: "Конструктор из 250 деталей",
            price: 1599,
            category: "toys",
            image: "https://files.indiwd.com/app/products/1543/gallery/678ab0b3963ee.jpg",
            inStock: true
        },
        {
            id: 6,
            name: "Кружка с Кар-Карычем",
            description: "Керамическая кружка 350 мл",
            price: 699,
            category: "accessories",
            image: "https://files.indiwd.com/app/products/1543/gallery/678ab0b3963ee.jpg",
            inStock: true
        },
        {
            id: 7,
            name: "Толстовка Совунья",
            description: "Теплая толстовка на флисе",
            price: 2899,
            category: "clothes",
            image: "https://files.indiwd.com/app/products/1543/gallery/678ab0b3963ee.jpg",
            inStock: true
        },
        {
            id: 8,
            name: "Пазл 1000 деталей",
            description: "Пазл с героями Смешариков",
            price: 1199,
            category: "toys",
            image: "https://files.indiwd.com/app/products/1543/gallery/678ab0b3963ee.jpg",
            inStock: true
        },
        {
            id: 9,
            name: "Брелок Лосяш",
            description: "Металлический брелок",
            price: 399,
            category: "accessories",
            image: "https://files.indiwd.com/app/products/1543/gallery/678ab0b3963ee.jpg",
            inStock: true
        },
        {
            id: 10,
            name: "Шапка Копатыч",
            description: "Вязаная зимняя шапка",
            price: 1499,
            category: "clothes",
            image: "https://files.indiwd.com/app/products/1543/gallery/678ab0b3963ee.jpg",
            inStock: false
        },
        {
            id: 11,
            name: "Набор наклеек",
            description: "Набор из 50 наклеек",
            price: 299,
            category: "accessories",
            image: "https://files.indiwd.com/app/products/1543/gallery/678ab0b3963ee.jpg",
            inStock: true
        },
        {
            id: 12,
            name: "Фигурка Пина",
            description: "Фигурка из коллекции",
            price: 899,
            category: "toys",
            image: "https://files.indiwd.com/app/products/1543/gallery/678ab0b3963ee.jpg",
            inStock: true
        }
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
        
        // Добавляем карточки
        productsToShow.forEach(product => {
            productsContainer.innerHTML += createProductCard(product);
        });
    }

    // Функция фильтрации товаров
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

    // Функция обновления отображения
    function updateDisplay() {
        const filteredProducts = filterProducts();
        displayProducts(filteredProducts);
    }

    // Имитация загрузки данных
    function loadProducts() {
        setTimeout(() => {
            loadingIndicator.style.display = 'none';
            updateDisplay();
            
            // Инициализация поиска и фильтров
            searchInput.addEventListener('input', updateDisplay);
            categoryFilter.addEventListener('change', updateDisplay);
        }, 1000);
    }

    // Функция добавления в корзину (заглушка)
    window.addToCart = function(productId) {
        const product = products.find(p => p.id === productId);
        if (product && product.inStock) {
            alert(`Товар "${product.name}" добавлен в корзину!`);
            // Здесь можно добавить логику добавления в корзину
        }
    };

    // Начинаем загрузку
    loadProducts();
});
const bar_icon = document.querySelector('.bar_icon');
const navbar = document.querySelector('.navbar');
const card_container = document.querySelector('.card_container');
const loader = document.getElementById('loader');
const view_all = document.querySelector('.view_all');
const slide_card = document.querySelector('.swiper-wrapper');

bar_icon.addEventListener('click', () => {
    bar_icon.classList.toggle("fa-xmark");
    navbar.classList.toggle('active');
});

const FetchApI = (url) => {
    return new Promise((resolve, reject) => {
        fetch(url)
            .then((res) => {
                if (res.ok) {
                    res.json().then((data) => resolve(data));
                } else {
                    reject(new Error(`Failed to fetch: ${res.status} ${res.statusText}`));
                }
            });
    });
};

let allproducts = [];
const fecthUrl = 'https://fakestoreapi.com/products';

const getData = async () => {
    try {
        loader.style.display = 'block';
        const Product_data = await FetchApI(fecthUrl);
        allproducts = Product_data;
        const topProducts = Product_data.slice(9, 20);
        const products = Product_data.slice(0, 8);
        display(products);
        Show(topProducts);
    } catch (err) {
        console.log(err);
    } finally {
        loader.style.display = 'none'; // Hide loader after data is loaded
    }
};

getData();

const display = (items) => {
    card_container.innerHTML = "";
    items.forEach(prod => {
        let cards = `
        <div class="card">
            <div class="card_wrapper">
                <img src="${prod.image}" alt="images" class="img">
            </div>
            <div class="card_body">
                <div class="card_title">${prod.title}</div>
                <p class="ratings line_hgt"><b>Rating:</b>&nbsp;${prod.rating.rate}/5</p>
                <p class="price line_hgt">$<span>${prod.price}</span></p>
            </div>
        </div>`;
        card_container.innerHTML += cards;
    });

    view_all.addEventListener('click', (e) => {
        e.preventDefault();
        display(allproducts);
    });
};

const Show = (product_list) => {
    product_list.forEach(item => {
        // Appending new slides to the swiper container
        const slideHTML = `
        <div class="swiper-slide">
            <div class="card">
                <div class="card_wrapper">
                    <img src="${item.image}" alt="images" class="img">
                </div>
                <div class="card_body">
                    <div class="card_title">${item.title}</div>
                    <p class="ratings line_hgt"><b>Rating:</b>&nbsp;${item.rating.rate}/5</p>
                    <p class="price line_hgt">$<span>${item.price}</span></p>
                </div>
            </div>
        </div>`;


        slide_card.insertAdjacentHTML('beforeend', slideHTML);
    });

    swiper.update();  
};

// Swiper initialization
const swiper = new Swiper(".mySwiper", {
    spaceBetween: 20,
    centeredSlides: true,
    autoplay: {
        delay: 3000,
        disableOnInteraction: false,
    },
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
    breakpoints: {
        // When aspect ratio is wide (landscape)
        1024: {
            slidesPerView: 4,
            spaceBetween: 20,
        },
        // When aspect ratio is tall (portrait)
        768: {
            slidesPerView: 2,
            spaceBetween: 20,
        },
        // For very small screens or square screens
        480: {
            slidesPerView: 1,
            spaceBetween: 10,
        },
    },
});

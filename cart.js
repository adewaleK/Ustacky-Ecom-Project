const products = [
    {
        id: 1,
        title: "SAMSUNG TV",
        image: "product1.png",
        price: "500,000",
        quantity:1
    },
    {
        id: 2,
        title: "PIXEL 4a",
        image: "product2.png",
        price: "300,000",
        quantity:1
    },
    {
        id: 3,
        title: "PS 5",
        image: "product3.png",
        price: "250,000",
        quantity:1
    },
    {
        id: 4,
        title: "MACBOOK AIR",
        image: "product4.png",
        price: "400,000",
        quantity:1
    },
    {
        id: 5,
        title: "APPLE WATCH",
        image: "product5.png",
        price: "200,000",
        quantity:1
    },
    {
        id: 6,
        title: "AIR PODS",
        image: "product6.png",
        price: "300,000",
        quantity:1
    },
];


function loadProducts(){
    products.map(product => {
        var products = document.getElementById('products'); 
        products.classList.add("products"); 
        products.innerHTML += `
            <div class="product-card" id="product-box"> 
                <div class="prod${product.id}-img prod${product.id}-details prod-feature">
                    <p class="price">Price</p>
                    <p>&#8358;${product.price}</p>   
                </div>
                <h3 id="title">${product.title}</h3>
                <button type="button" class="add-to-cart" data-id="${product.id}" >ADD TO CART</button>
            </div>
            `; 
        })
    }


window.onload = loadProducts;

let modalBg = document.querySelector('.modal-bg');
let cartBtn = document.querySelector('.cart');
cartBtn.addEventListener('click', cartModal);
window.addEventListener('click', removeModal)

function cartModal(){
    modalBg.classList.add('active-bg');
}

function removeModal(event){
    if(event.target == modalBg){
       modalBg.classList.remove('active-bg');
    }
}

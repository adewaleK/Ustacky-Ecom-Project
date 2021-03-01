const modalBg = document.querySelector('.modal-bg');
const cartBtn = document.querySelector('.cart');
const backToShop = document.getElementById('continue');
const cartBox = document.getElementById('cart-list');
const total = document.getElementById('total-price');
var productsCon = document.getElementById('products'); 
let cart = [];
let buttonsDOM = [];

var addBtns;
products = [
    {
        id: 1,
        title: "SAMSUNG TV",
        image: "product1.png",
        price: 500000
    },
    {
        id: 2,
        title: "PIXEL 4a",
        image: "product2.png",
        price: 300000
    },
    {
        id: 3,
        title: "PS 5",
        image: "product3.png",
        price: 250000,
    },
    {
        id: 4,
        title: "MACBOOK AIR",
        image: "product4.png",
        price: 400000,
    },
    {
        id: 5,
        title: "APPLE WATCH",
        image: "product5.png",
        price: 200000
    },
    {
        id: 6,
        title: "AIR PODS",
        image: "product6.png",
        price: 300000
    },
];


function loadProducts(products){
    let res='';
    productsCon.classList.add("products"); 
    products.forEach(product => {
        res += `
            <div class="product-card" id="product-box"> 
                <div class="prod${product.id}-img prod${product.id}-details prod-feature">
                    <p class="price">Price</p>
                    <p>&#8358;${product.price}</p>   
                </div>
                <h3 id="title">${product.title}</h3>
                <button type="button" class="add-to-cart" data-id="${product.id}">ADD TO CART</button>
            </div>
        `; 
    });
    productsCon.innerHTML = res;

    addBtns = document.querySelectorAll('.add-to-cart');
    
}

function getProduct(id){
    return products.find(product => product.id == id)  
}

function getButtons(){
    const buttons = Array.from(addBtns);
    buttonsDOM = buttons;

    buttons.forEach(btn => {
        //console.log(btn.dataset.id);
        let id = btn.dataset.id;
        let inCart = cart.find(item => item.id == id)
        // if(inCart){
        //     btn.innerHTML = 'REMOVE FROM CART';
        //     btn.classList.add('remove-from-cart');  
        //     btn.style.backgroundColor = '#FFE9D6'; 
        //     btn.disabled = true;  
        
        // }
        let cartItem = getProduct(id);
            btn.addEventListener('click', (e)=>{
                e.target.innerHTML = 'ADD TO CART';
                
                if(cart.indexOf(inCart) == -1){
                    cart.push(cartItem);
                    console.log(cart);
                }
                

            })
        
    })
    
}


document.addEventListener('DOMContentLoaded', ()=>{
    loadProducts(products);
    getButtons();
    
    
})
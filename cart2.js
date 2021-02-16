//All Products List
products = [
    {
        id: 1,
        title: "SAMSUNG TV",
        image: "product1.png",
        price: 500000,
        quantity:1
    },
    {
        id: 2,
        title: "PIXEL 4a",
        image: "product2.png",
        price: 300000,
        quantity:1
    },
    {
        id: 3,
        title: "PS 5",
        image: "product3.png",
        price: 250000,
        quantity:1
    },
    {
        id: 4,
        title: "MACBOOK AIR",
        image: "product4.png",
        price: 400000,
        quantity:1
    },
    {
        id: 5,
        title: "APPLE WATCH",
        image: "product5.png",
        price: 200000,
        quantity:1
    },
    {
        id: 6,
        title: "AIR PODS",
        image: "product6.png",
        price: 300000,
        quantity:1
    },
];

//Variables
var id = 0;
var quantity=1;
var totalPrice=0;
let modalBg = document.querySelector('.modal-bg');
let actionBtns;
let cartBtn = document.querySelector('.cart');
var inc= document.getElementById('inc');
var dec = document.getElementById('dec');
var btns;
var btns_arr;
var removeBtns;
var removeArr;
var myCart = [];
var backToShop = document.getElementById('continue');
var cartBox = document.getElementById('cart-list');
var total = document.getElementById('total-price');
var productsCon = document.getElementById('products'); 
var revList = document.getElementById('cart-list');
var qtyBtns;

//Load and Display All Shop Products
function loadProducts(){
    products.map(product => {
        productsCon.classList.add("products"); 
        productsCon.innerHTML += `
            <div class="product-card" id="product-box"> 
                <div class="prod${product.id}-img prod${product.id}-details prod-feature">
                    <p class="price">Price</p>
                    <p>&#8358;${product.price}</p>   
                </div>
                <h3 id="title">${product.title}</h3>
                <button type="button" class="add-to-cart" data-id="${product.id}">ADD TO CART</button>
            </div>
        `; 
    })

    btns = document.querySelectorAll(".add-to-cart");
}

//Display Add to Cart Modal
function cartModal(){
    modalBg.classList.add('active-bg');
    //console.log(revList);
    removeFromDom();
    inc();
    
}

//Dismiss Add to Cart Modal
function removeModal(event){
    if(event.target == modalBg){
       modalBg.classList.remove('active-bg');
    }
}

//Add Item to Cart and Remove if Present
function addToCart(item, bt){     
    if (!myCart.includes(item)){       
        myCart.push(item);
        displayCart(item);
        bt.innerHTML = 'REMOVE FROM CART'; 
        bt.classList.add('remove-from-cart');  
        bt.style.backgroundColor = '#FFE9D6';        
    }else{
        removeFromCart(item);
        bt.classList.remove('remove-from-cart');  
        bt.style.backgroundColor = '#FF9A3D';
        bt.style.outline = 'none';
        bt.innerHTML = 'ADD TO CART';
    }
}

//Display All Cart Items
function displayCart(pd){  
    id++;
        cartBox.innerHTML += `
            <tr>
            <td>${id}</td>
            <td>${pd.title}</td>
            <td>${pd.price}</td>
            <td class="qty-btn">
                <button type="button" id="dec" class="action-btns"> - </button>
                <span>${pd.quantity}</span>
                <button type="button" id="inc" class="action-btns"> + </button>
            </td>
            <td><button type="button" class="remove-btn" data-id="${pd.id}">Remove</button></td>
            </tr>
        `;

        sum(myCart);
        actionBtns = document.querySelectorAll('.action-btns');
        removeBtns = document.querySelectorAll(".remove-btn");
        qtyBtns = document.getElementById('qty-btn');
        removeArr = Array.from(removeBtns);
        actionBtnsArr = Array.from(actionBtns);
}

//Remove an Item from Cart
function removeFromCart(item){
   var itemsLeft;
   for (var i = 0; i < myCart.length; i++) { 
        if (myCart[i] === item) { 
            var removed = myCart.splice(i, 1); 
            console.log(removed);
            itemsLeft = myCart;
            sum(itemsLeft);
        } 
    }  

}

//Remove Cart Items From DOM and Update Price
function removeFromDom(){
    revList.addEventListener('click', function(e){
        if(e.target.className == 'remove-btn'){
            var row = e.target.parentElement.parentElement; 
            revList.removeChild(row);
            var toRemove = myCart.filter(prod=>prod.id == e.target.dataset.id);
            console.log(toRemove[0]);
            removeFromCart(toRemove[0]);
        }   
    })
}

//Get Total Price of Cart Items
function sum(arr){
    let sum = 0;
    for(let i=0; i<arr.length; i++){
        sum += arr[i].price * quantity;
    }
    total.innerHTML = sum;
    document.getElementById('num').innerHTML = arr.length;
    return sum;
}

//Increase Quantity
function inc(){
  revList.addEventListener('click', function(e){
    //   if(e.target.className == ){

    //   }
    console.log(e.target);
  })
}

//Decrease Quantity
function dec(){
    
}

//Continue Shopping
function continueShopping(){
    modalBg.classList.remove('active-bg');
}

//Event Listeners
document.addEventListener('DOMContentLoaded', function(){
    
    
    loadProducts();
    
    cartBtn.addEventListener('click', cartModal);

    modalBg.addEventListener('click', removeModal);

    backToShop.addEventListener('click', continueShopping);

    btns.forEach(function(btn){
        var prod = products.filter(p => p.id == parseInt(btn.dataset.id));
        btn.addEventListener('click', ()=>addToCart(prod[0],btn));
    }); 

    removeArr.forEach(function(btn){
        var prod = myCart.filter(p => p.id == parseInt(btn.dataset.id));
        btn.addEventListener('click', ()=>removeFromCart(prod[0]));
    }); 

  
     
})

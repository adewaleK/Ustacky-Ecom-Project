//All Products List
products = [
    {   index:1,
        id: 1,
        title: "SAMSUNG TV",
        image: "product1.png",
        price: 500000,
        quantity:1
    },
    {   
        index:2,
        id: 2,
        title: "PIXEL 4a",
        image: "product2.png",
        price: 300000,
        quantity:1
    },
    {   
        index:3,
        id: 3,
        title: "PS 5",
        image: "product3.png",
        price: 250000,
        quantity:1
    },
    {   
        index: 4,
        id: 4,
        title: "MACBOOK AIR",
        image: "product4.png",
        price: 400000,
        quantity:1
    },
    {   
        index: 5,
        id: 5,
        title: "APPLE WATCH",
        image: "product5.png",
        price: 200000,
        quantity:1
    },
    {   
        index: 6,
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
var btns;
//var btns = document.querySelectorAll(".add-to-cart");
var btns_arr;
var removeBtns;
var removeArr;
var myCart = [];
var backToShop = document.getElementById('continue');
//var cartBox = document.getElementById('cart-list');
var total = document.getElementById('total-price');
var productsCon = document.getElementById('products'); 
var revList = document.getElementById('cart-list');
var qtyBtns;

//Load and Display All Shop Products
function loadProducts(){
    let res='';
    productsCon.classList.add("products"); 
    products.map(product => {   
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

        productsCon.innerHTML = res; 
    })

    btns = document.querySelectorAll(".add-to-cart");
    btns_arr = Array.from(btns);
}

//Display Add to Cart Modal
function cartModal(){
    modalBg.classList.add('active-bg');
    //console.log(revList);
    removeFromDom();
    //inc();
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
        //displayCart(item);
        showCartItems(myCart);
        bt.innerHTML = 'REMOVE FROM CART'; 
        bt.classList.add('remove-from-cart');  
        bt.style.backgroundColor = '#FFE9D6';        
    }else{
        let rem;
        //rem = removeFromCart(item);
        removeFromCart(item);
        //showCartItems(rem);
        //console.log(rem);
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
                <button type="button" id="dec" class="dec-btn" data-id="${pd.id}"> - </button>
                <span>${pd.quantity}</span>
                <button type="button" id="inc" class="inc-btn" data-id="${pd.id}"> + </button>
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
   let itemsLeft;
   for (let i = 0; i < myCart.length; i++) { 
        if (myCart[i] === item) { 
            let removed = myCart.splice(i, 1); 
            
            itemsLeft = myCart;
            sum(itemsLeft);

            if(itemsLeft.length==0){
                revList.innerHTML='';
            }
            showCartItems(itemsLeft);
        } 
    }  
    return itemsLeft;
}


//Update Cart DOM when Cart Items Are Removed from SHOP

function showCartItems(items){
    let result='';
    items.forEach((c,i) => {
        result += `
        <tr>
        <td>${i+1}</td>
        <td>${c.title}</td>
        <td>${c.price}</td>
        <td class="qty-btn">
            <button type="button" id="dec" class="dec-btn" data-id="${c.id}"> - </button>
            <span>${c.quantity}</span>
            <button type="button" id="inc" class="inc-btn" data-id="${c.id}"> + </button>
        </td>
        <td><button type="button" class="remove-btn" data-id="${c.id}">Remove</button></td>
        </tr>
  `;
  
   revList.innerHTML = result; 
  //sum(items);
  
  sum(items);
  
        // actionBtns = document.querySelectorAll('.action-btns');
        // removeBtns = document.querySelectorAll(".remove-btn");
        // qtyBtns = document.getElementById('qty-btn');
        // removeArr = Array.from(removeBtns);
        // actionBtnsArr = Array.from(actionBtns);
  })
}

//Remove Cart Items From DOM and Update Price
function removeFromDom(){
    revList.addEventListener('click', function(e){
        if(e.target.className == 'remove-btn'){
            let row = e.target.parentElement.parentElement; 
            revList.removeChild(row);
            let toRemove = myCart.filter(prod=>prod.id == e.target.dataset.id);
            
            let btnToRem = [...row.children][4].children[0].dataset.id

            let actualBtn = btns_arr.find(bt => bt.dataset.id == btnToRem);
            console.log(actualBtn);
            actualBtn.style.backgroundColor = '#FF9A3D';
            actualBtn.textContent = 'ADD TO CART';


            removeFromCart(toRemove[0]);
        } else if(e.target.className == 'dec-btn'){
            
            var decQty = myCart.filter(cat => cat.id == parseInt(e.target.dataset.id));
            console.log(decQty[0].quantity - 1);
        }else if(e.target.className == 'inc-btn'){
            var incQty = myCart.filter(cat => cat.id == parseInt(e.target.dataset.id));
            
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

    btns_arr.forEach(function(btn){
        var prod = products.find(p => p.id == parseInt(btn.dataset.id));
        btn.addEventListener('click', ()=>addToCart(prod,btn));
    }); 

    // removeArr.forEach(function(btn){
    //     var prod = myCart.filter(p => p.id == parseInt(btn.dataset.id));
    //     btn.addEventListener('click', ()=>removeFromCart(prod[0]));
    // }); 

})

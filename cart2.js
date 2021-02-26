//All Products List
products = [
    {   index:1,
        id: 1,
        title: 'SAMSUNG TV',
        image: 'product1.png',
        price: 500000
    },
    {   
        index:2,
        id: 2,
        title: 'PIXEL 4a',
        image: 'product2.png',
        price: 250000
    },
    {   
        index:3,
        id: 3,
        title: 'PS 5',
        image: 'product3.png',
        price: 300000

    },
    {   
        index: 4,
        id: 4,
        title: 'MACBOOK AIR',
        image: 'product4.png',
        price: 800000
    },
    {   
        index: 5,
        id: 5,
        title: 'APPLE WATCH',
        image: 'product5.png',
        price: 95000
    },
    {   
        index: 6,
        id: 6,
        title: 'AIR PODS',
        image: 'product6.png',
        price: 75000
    }
];

//Variables
//var id = 0;
var totalPrice=0;
let modalBg = document.querySelector('.modal-bg');
//let actionBtns;
var cartBtn = document.querySelector('.cart');
var btns;
var btns_arr;
var removeBtns;
var removeArr;
var myCart = [];
var backToShop = document.getElementById('continue');
var total = document.getElementById('total-price');
var productsCon = document.getElementById('products'); 
var revList = document.getElementById('cart-list');
var x;
//var qtyBtns;

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

    document.querySelector('.name');
    //console.log(x);
    //x.addEventListener('click', () => handleName(e));
}

removeFromDom();

//Dismiss Add to Cart Modal
function removeModal(event){
    if(event.target == modalBg){
       modalBg.classList.remove('active-bg');
    }
}

//Add Item to Cart and Remove if Present
function addToCart(item, bt){   
    if (!myCart.includes(item)){   
        item.quantity=1;
        myCart.push(item);
        showCartItems(myCart);
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
// function displayCart(pd){  
//     id++;
//         cartBox.innerHTML += `
//             <tr>
//             <td>${id}</td>
//             <td>${pd.title}</td>
//             <td>${pd.price}</td>
//             <td class="qty-btn">
//                 <button type="button" id="dec" class="dec-btn" data-id="${pd.id}"> - </button>
//                 <span id="${pd.id}">${pd.quantity}</span>
//                 <button type="button" id="inc" class="inc-btn" data-id="${pd.id}"> + </button>
//             </td>
//             <td><button type="button" class="remove-btn" data-id="${pd.id}">Remove</button></td>
//             </tr>
//         `;

//         sum(myCart);
//         //actionBtns = document.querySelectorAll('.action-btns');
//         removeBtns = document.querySelectorAll(".remove-btn");
//         //qtyBtns = document.getElementById('qty-btn');
//         removeArr = Array.from(removeBtns);
//         //actionBtnsArr = Array.from(actionBtns);
//         //console.log(removeArr);
// }

//Remove an Item from Cart
function removeFromCart(item){
   let itemsLeft;
   for (let i = 0; i < myCart.length; i++) { 
        if (myCart[i] === item) { 
            myCart.splice(i, 1);  
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
            <span id="qty">${c.quantity}</span>
            <button type="button" id="inc" class="inc-btn" data-id="${c.id}"> + </button>
        </td>
        <td><button type="button" class="remove-btn" data-id="${c.id}">Remove</button></td>
        </tr>
    `;
   revList.innerHTML = result; 
  sum(items);
  })
}

//Remove Cart Items From DOM and Update Price and Stylings
function removeFromDom(){
    revList.addEventListener('click', function(e){
        if(e.target.className == 'remove-btn'){
            let row = e.target.parentElement.parentElement; 
            revList.removeChild(row);
            let toRemove = myCart.filter(prod=>prod.id == e.target.dataset.id);
            let btnToRem = [...row.children][4].children[0].dataset.id
            let actualBtn = btns_arr.find(bt => bt.dataset.id == btnToRem);
            actualBtn.style.backgroundColor = '#FF9A3D';
            actualBtn.textContent = 'ADD TO CART';
            removeFromCart(toRemove[0]);
         } else if(e.target.className == 'dec-btn'){     
            const qtyValue = e.target.parentElement.children[1];
            const priceDom = e.target.parentElement.previousElementSibling;
            var decQty = myCart.find(cat => cat.id == parseInt(e.target.dataset.id));
                if(decQty.quantity > 1){
                    decQty.quantity = decQty.quantity - 1;
                    priceDom.innerHTML = decQty.price * decQty.quantity;
                    qtyValue.innerHTML = decQty.quantity;
                    sum(myCart);
                   }
                else{
                    alert(`You cannot have less than 1 item. If you wish to remove the item click remove`);
                }

        }else if(e.target.className == 'inc-btn'){   
            const qtyValue = e.target.parentElement.children[1]; 
            const priceDom = e.target.parentElement.previousElementSibling;
            const incQty = myCart.find(cat => cat.id == parseInt(e.target.dataset.id));  
            incQty.quantity = incQty.quantity + 1;
            priceDom.innerHTML = incQty.price * incQty.quantity;
            sum(myCart);
            qtyValue.innerHTML = incQty.quantity;
    
         }
    })
}

//Input Name Validation
function handleName(e){
    let validName = /[a-zA-Z]+$/;
    let name = e.target.value;
    if(name == ''){
        document.getElementById('name').innerText = 'Please enter your name';
    }else if(!name.match(validName)){
        document.getElementById('name').innerText = 'Invalid name';
    }else{
        document.getElementById('name').innerText = '';
        e.target.style.backgroundColor = '#e8f0fd'; 
    }

    return name;
}

//Input Email Validation
function handleEmail(e){
    let email = e.target.value;
    let validEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if(email == ''){
        document.getElementById('email').innerText = 'Please enter an email';
    }else if(!email.match(validEmail)){
        document.getElementById('email').innerText = 'Invalid email';
    }else{
        document.getElementById('email').innerText = '';
        e.target.style.backgroundColor = '#e8f0fd'; 
    }

    return email;
}

//Input Phone Number Validation
function handlePhone(e){
    let phoneNumber = e.target.value;
    let numbers = /^[0-9]+$/;
    let checkMatch = phoneNumber.match(numbers);

    if(phoneNumber === ''){
        document.getElementById('number').innerText = 'Please enter your telephone number';
    }else if(!checkMatch){
        document.getElementById('number').innerText = 'Phone number can only be number';  
        console.log(phoneNumber.length);
    }else if(checkMatch && phoneNumber.length < 11){
        document.getElementById('number').innerText = 'Phone number cannot be less than 11';  
    }else{
        document.getElementById('number').innerText = ''; 
        e.target.style.backgroundColor = '#e8f0fd'; 
    }

    return phoneNumber;
}

//Get Total Price of Cart Items
function sum(arr){
    let sum = 0;
    for(let i=0; i<arr.length; i++){
        sum += arr[i].price * arr[i].quantity;
    }
    total.innerHTML = sum;
    document.getElementById('num').innerHTML = arr.length;
    return sum;
}

//Continue Shopping
function continueShopping(){
    modalBg.classList.remove('active-bg');
}

//Set Name DOM
function setName(){
    return document.querySelector('.name');
}

//Set Email DOM
function setEmail(){
    return document.querySelector('.email');
}

//Set Phone Number DOM 
function setPhone(){
    return document.querySelector('.number');
}

//Event Listeners
document.addEventListener('DOMContentLoaded', function(){

    loadProducts();
    
    cartBtn.addEventListener('click', cartModal);

    modalBg.addEventListener('click', removeModal);

    setName().addEventListener('blur', handleName);

    setEmail().addEventListener('blur', handleEmail);

    setPhone().addEventListener('blur', handlePhone);
    
    backToShop.addEventListener('click', continueShopping);

    btns_arr.forEach(function(btn){
        var prod = products.find(p => p.id == parseInt(btn.dataset.id));
        btn.addEventListener('click', ()=>addToCart(prod,btn));
    }); 

    removeArr.forEach(function(btn){
        var prod = myCart.filter(p => p.id == parseInt(btn.dataset.id));
        btn.addEventListener('click', ()=>removeFromCart(prod[0]));
    }); 

})

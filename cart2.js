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
    },
    
];

//Variables
var totalPrice=0;
let modalBg = document.querySelector('.modal-bg');
let summaryBg = document.querySelector('.modal-bm');
var cartBtn = document.querySelector('.cart');
var btns;
var btns_arr;
var myCart = [];
var backToShop = document.getElementById('continue');
var total = document.getElementById('total-price');
var productsCon = document.getElementById('products'); 
var revList = document.getElementById('cart-list');
var orderDetails = document.querySelector('.orders-summary');
var checkoutBtn;
var okayBtn = document.getElementById('ok');
var cname;
var cemail;
var cphone;

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
}

//Displays summary Modal
function summaryModal(){
    document.getElementById('cus-name').innerText = cname;
    summaryBg.classList.add('active-bg');
    showSummary(myCart);
    okayBtn = document.getElementById('ok');
}

//Create Checkout Element
checkoutBtn = document.getElementById('pay');

//Controls Payment Functionality Through Paystack Method
function handlePayment(e){
   if(myCart.length < 1){
      alert('Please select a product');
      return
   }else{
     clear();
     payWithPaystack();
   }
}

//Remove cart Item from DOM and Update Css
removeFromDom();

//Clear Modal
function clear(){
    modalBg.classList.remove('active-bg');
}

//Dismiss Add to Cart Modal
function removeModal(event){
    if(event.target == modalBg){
       clear();
    }
}

//Remove Summary Modal When The Background Is Clicked
function removeBg(event){
    if(event.target == summaryBg){
       summaryBg.classList.remove('active-bg');
       resetCart();
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
        updateBtn(bt);
    }
}

function updateBtn(btn){
    btn.style.backgroundColor = '#FF9A3D';
    btn.style.outline = 'none';
    btn.innerHTML = 'ADD TO CART';
}

//Remove an Item from cart(Data structure)
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

//Show list of orderd items
function showSummary(items){
    let result='';
    items.forEach((c,i) => {
        result += `
        <tr>
            <td>${i+1}</td>
            <td>${c.title}</td>
            <td>${c.quantity}</td>
       </tr>   
    `;
   orderDetails.innerHTML = result; 
  })
}

//Close Summary Modal
okayBtn.addEventListener('click', function(){
    summaryBg.classList.remove('active-bg');
    resetCart();
});

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
                    alert('You cannot have less than 1 item. If you wish to remove the item click remove');
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


//Reset Cart After a Successful Checkout
function resetCart(){
    myCart = [];
    document.getElementById('num').innerHTML = myCart.length;
    setName().value = '';
    setEmail().value = '';
    setPhone().value = '';
    revList.innerHTML = ''; 
    total.innerHTML = 0;
    btns_arr.forEach(btn =>
        updateBtn(btn)
    );
}

//Input Name Validation
function handleName(e){
    let validName = /[a-zA-Z]+$/;
    //let name = e.target.value;
    cname = e.target.value;
    if(cname == ''){
        document.getElementById('name').innerText = 'Please enter your name';
        document.querySelector('.name').classList.add('invalid-input');
    }else if(!cname.match(validName)){
        document.getElementById('name').innerText = 'Invalid name';
        document.querySelector('.name').classList.add('invalid-input');
    }else{
        document.getElementById('name').innerText = '';
        e.target.style.backgroundColor = '#e8f0fd'; 
        document.querySelector('.name').classList.add('valid-input');
    }

    return cname;
}

//Input Email Validation
function handleEmail(e){
    //let email = e.target.value;
    cemail = e.target.value;
    let validEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if(cemail == ''){
        document.getElementById('email').innerText = 'Please enter an email';
        document.querySelector('.email').classList.add('invalid-input');
        
    }else if(!cemail.match(validEmail)){
        document.getElementById('email').innerText = 'Invalid email';
        document.querySelector('.email').classList.add('invalid-input');
    }else{
        document.getElementById('email').innerText = '';
        e.target.style.backgroundColor = '#e8f0fd'; 
        document.querySelector('.email').classList.add('valid-input');
    }

    return cemail;
}

//Input Phone Number Validation
function handlePhone(e){
    //let phoneNumber = e.target.value;
    cphone = e.target.value;
    let numbers = /^[0-9]+$/;
    let checkMatch = cphone.match(numbers);

    if(cphone === ''){
        document.getElementById('number').innerText = 'Please enter your telephone number';
        document.querySelector('.number').classList.add('invalid-input');
    }else if(!checkMatch){
        document.getElementById('number').innerText = 'Phone number can only be number';  
        document.querySelector('.number').classList.add('invalid-input');
    }else if(checkMatch && cphone.length < 11){
        document.getElementById('number').innerText = 'Phone number cannot be less than 11 characters';  
    }else{
        document.getElementById('number').innerText = ''; 
        e.target.style.backgroundColor = '#e8f0fd'; 
        document.querySelector('.number').classList.add('valid-input');
    }

    return cphone;
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

//Paystack Function to hzndle Payment
function payWithPaystack() {
  let handler = PaystackPop.setup({
    key: 'pk_test_bebb7f2304810763defe6e4c769f7e5b0cd80a04', // Replace with your public key
    // email: document.getElementById("email-address").value,
    // amount: document.getElementById("amount").value * 100,
    email: cemail,
    amount: sum(myCart)*100,
    ref: ''+Math.floor((Math.random() * 1000000000) + 1), // generates a pseudo-unique reference. Please replace with a reference you generated. Or remove the line entirely so our API will generate one for you
    // label: "Optional string that replaces customer email"
    onClose: function(){
      alert('Window closed.');
    },
    callback: function(response){
    //   let message = 'Payment complete! Reference: ' + response.reference;
    //   alert(message);
    summaryModal();
;    }
  });
  handler.openIframe();
}

//Event Listeners
document.addEventListener('DOMContentLoaded', function(){

    loadProducts();
    
    cartBtn.addEventListener('click', cartModal);

    modalBg.addEventListener('click', removeModal);

    checkoutBtn.addEventListener('click', handlePayment);

    summaryBg.addEventListener('click', removeBg);

    okayBtn.addEventListener('click', clear);

    setName().addEventListener('blur', handleName);

    setEmail().addEventListener('blur', handleEmail);

    setPhone().addEventListener('blur', handlePhone);
    
    backToShop.addEventListener('click', continueShopping);

    btns_arr.forEach(function(btn){
        var prod = products.find(p => p.id == parseInt(btn.dataset.id));
        btn.addEventListener('click', ()=>addToCart(prod,btn));
    }); 
})

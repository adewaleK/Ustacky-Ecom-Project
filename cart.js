const products = [
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
                <button type="button" class="add-to-cart" data-id="${product.id}">ADD TO CART</button>
            </div>
        `; 
    })
}


//window.onload = loadProducts;
//document.addEventListener("DOMContentLoaded", loadProducts);
//document.addEventListener("DOMContentLoaded", addToCart);
document.addEventListener("DOMContentLoaded", function(){
    loadProducts();
    addToCart();
//displayCart();
   


});

//document.addEventListener("DOMContentLoaded",  displayCart);





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

//add to cart functionality
   //Click on Add to Cart Button
      //get the product through its ID
      //push the product into an empty cart array

      //Change background of Add to cart button
      //Display the product in the cart

      var btns = document.querySelectorAll(".add-to-cart");
      var btn_arr = Array.from(btns);
    //   btns.forEach(function(bt){
    //       bt.addEventListener('click', function(e){
    //           console.log(bt);
    //       })
    //   });
    //console.log(btn_arr);
    
    let myCart = [];
    function addToCart(){
        var btns = document.querySelectorAll(".add-to-cart");
        var btns_arr = Array.from(btns);
        btns_arr.forEach(function(btn){
            var prod = products.filter(p => p.id == parseInt(btn.dataset.id));
            btn.addEventListener('click', function(e){     
                if (!myCart.includes(prod)){       
                    myCart.push(prod);
                    displayCart(prod[0]);
                }
                
            })     
        });
        
    }
    
    var id = 0;
    
    var totalPrice=0;
    function displayCart(pd){ 
        
        id++;
        //myCart.map(item =>{
          var cartBox = document.getElementById('cart-list');
            cartBox.innerHTML += `
                <tr>
                <td>${id}</td>
                <td>${pd.title}</td>
                <td>${pd.price}</td>
                <td class="qty-btn">
                    <button type="button"> - </button>
                    <span>${pd.quantity}</span>
                    <button type="button"> + </button>
                </td>
                <td><button type="button" class="remove-btn" data-id="${pd.id}">Remove</button></td>
                </tr>
            `;

            totalPrice += pd.price * pd.quantity;
            console.log(totalPrice);
           
         //})
    }
    
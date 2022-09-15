const productApi = 'http://localhost:3000/product';
const evaluatesApi = 'http://localhost:3000/evaluates';
const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)
const btnSearchProduct = $('#btn-search-hidden')
const listProductSale = $('#product-sale')
const listPerfume = $('#perfume')
const listJewelry = $('#jewelry')
const listProductType = $('#product-type')
const btnNextProductSale = $('#btn__productNext--hover')
const btnPrevProductSale = $('#btn__productPrev--hover')
const btnGucciType = $('#type-gucci')
const btnNikeType = $('#type-nike')
const btnAdidasType = $('#type-adidas')
let currentId = 0
let limit = 5
let  arrProductAll


// get api
function getApi (api,callback) {
    fetch(api)
    .then(function (response) {
        return response.json();
    })
    .then(callback)
}
//render
function renderAccessory(data,element,start) {
    currentId = start
    if(currentId == data.length) {
        currentId = 0
    }else if (currentId < 0) {
        currentId = data.length - limit
    }
    else {
        currentId
    }
        let max = currentId + 2
        let htmls = ''
        for(currentId ; currentId < max ; currentId++) {
         let productItem = data[currentId] 
         htmls += `  <div href="#" class="product__item product__item--2" data-product = ${productItem.productId}>
         <div class="product__itemImg">
             <button class="hidden" id="btn-search-hidden">
                 <i class="fa-solid fa-magnifying-glass"></i>
             </button>
             <img src=${productItem.productImg} alt="" id="img-visible">
             <img src=${productItem.productImgHover} alt=""  id="img-hidden">
             <button class="product__btnAdds">
                <span class="product__btnAdd">
                 <i class="fa-sharp fa-solid fa-cart-plus"></i>
                </span>
                 <span class="product__btnAddText">thêm vào giỏ</span>
             </button>
         </div>
         <div class="product__detail">
             <!-- name -->
             <h3 class="product__name">
             ${productItem.productName}
             </h3>
             <!-- star -->
             <ul class="product__evaluates">
                 <li class="product__evaluate">
                     <i class="fa-solid fa-star"></i>
                 </li>
                 <li class="product__evaluate">
                     <i class="fa-solid fa-star"></i>
                 </li>
                 <li class="product__evaluate">
                     <i class="fa-solid fa-star"></i>
                 </li>
                 <li class="product__evaluate">
                     <i class="fa-solid fa-star"></i>
                 </li>
                 <li class="product__evaluate">
                     <i class="fa-solid fa-star"></i>
                 </li>
                 <li class="product__evaluate">(0)</li>
             </ul>
             <!-- price -->
             <div class="product__prices">
                 <div class="product__price product__price--sale">
                 ${productItem.productCost} đ
                 </div>
             </div>
         </div>
     </div>`
        }
       element.innerHTML = htmls
        currentId--
}
//render

//render product sale
function renderProductSale(data) {
    if(currentId == data.length) {
        currentId = 0
    }else if (currentId < 0) {
        currentId = data.length - limit
    }
    else {
        currentId
    }
        let max = currentId + limit
        let htmls = ''
        for(currentId ; currentId < max ; currentId++) {
         let productItem = data[currentId] 
         htmls += ` <div href="#" class="product__item" data-product = ${productItem.productId} >
         <div class="product__itemImg">
             <span class="product__sale">
             11%
             </span>
             <button  id="btn-search-hidden">
                 <i class="fa-solid fa-magnifying-glass"></i>
             </button>
             <img src=${productItem.productImg} alt="" id="img-visible">
            <img src=${productItem.productImgHover} alt=""  id="img-hidden">
             <button class="product__btnAdds">
                <span class="product__btnAdd">
                 <i class="fa-sharp fa-solid fa-cart-plus"></i>
                </span>
                 <span class="product__btnAddText">thêm vào giỏ</span>
             </button>
         </div>
         <div class="product__detail">
             <!-- name -->
             <h3 class="product__name">
             ${productItem.productName}
             </h3>
             <!-- star -->
             <ul class="product__evaluates">
                 <li class="product__evaluate">
                     <i class="fa-solid fa-star"></i>
                 </li>
                 <li class="product__evaluate">
                     <i class="fa-solid fa-star"></i>
                 </li>
                 <li class="product__evaluate">
                     <i class="fa-solid fa-star"></i>
                 </li>
                 <li class="product__evaluate">
                     <i class="fa-solid fa-star"></i>
                 </li>
                 <li class="product__evaluate">
                     <i class="fa-solid fa-star"></i>
                 </li>
                 <li class="product__evaluate">(0)</li>
             </ul>
             <!-- price -->
             <div class="product__prices">
                 <div class="product__price product__price--sale">
                 ${productItem.productSale} đ
                 </div>
                 <div class="product__price product__price--cost">
                 ${productItem.productCost} đ
                 </div>
             </div>
         </div>
     </div>`
        }
        listProductSale.innerHTML = htmls
        currentId--
        console.log(currentId)
}
function filterProductSale (data) {
    let arrProducts = data.filter(element => {
        return element.type === 1
    });
    return arrProducts
}
function filterProductType (data,type) {
    let arrProducts = data.filter(element => {
        return element.nsx === type
    });
    return arrProducts
}
function renderProductType(data) {
        currentId = 0
        let max = currentId + 10
        let htmls = ''
        for(currentId ; currentId < max ; currentId++) {
         let productItem = data[currentId] 
         htmls += ` <div href="#" class="product__item" data-product = ${productItem.productId} >
         <div class="product__itemImg">
            
             <button  id="btn-search-hidden">
                 <i class="fa-solid fa-magnifying-glass"></i>
             </button>
             <img src=${productItem.productImg} alt="" id="img-visible">
            <img src=${productItem.productImgHover} alt=""  id="img-hidden">
             <button class="product__btnAdds">
                <span class="product__btnAdd">
                 <i class="fa-sharp fa-solid fa-cart-plus"></i>
                </span>
                 <span class="product__btnAddText">thêm vào giỏ</span>
             </button>
         </div>
         <div class="product__detail">
             <!-- name -->
             <h3 class="product__name">
             ${productItem.productName}
             </h3>
             <!-- star -->
             <ul class="product__evaluates">
                 <li class="product__evaluate">
                     <i class="fa-solid fa-star"></i>
                 </li>
                 <li class="product__evaluate">
                     <i class="fa-solid fa-star"></i>
                 </li>
                 <li class="product__evaluate">
                     <i class="fa-solid fa-star"></i>
                 </li>
                 <li class="product__evaluate">
                     <i class="fa-solid fa-star"></i>
                 </li>
                 <li class="product__evaluate">
                     <i class="fa-solid fa-star"></i>
                 </li>
                 <li class="product__evaluate">(0)</li>
             </ul>
             <!-- price -->
             <div class="product__prices">
                 <div class="product__price product__price--sale">
                 ${productItem.productCost} đ
                 </div>
             </div>
         </div>
     </div>`
        }
        listProductType.innerHTML = htmls
}
function handleEvents (data) {
    //onclick next product sale
    nextProductSale(data)
    prevProductSale(data)
    //filter product
    btnGucciType.onclick = function () {
        renderProductType(filterProductType(data,'gucci'))
    handleActiveType('gucci')
    }
    btnNikeType.onclick = function () {
        renderProductType(filterProductType(data,'nike'))
    handleActiveType('nike')
    }
    btnAdidasType.onclick = function () {
        renderProductType(filterProductType(data,'adidas'))
    handleActiveType('adidas')
    }
    //btn accessory
    // btn next perfuma
    $('#btn__jewelrytPrev--hover').onclick = function () {
        console.log('1')
    }
}
function nextProductSale (data) {
    btnNextProductSale.onclick = function () {
        currentId++
        renderProductSale(filterProductSale(data))
    }
}
function prevProductSale (data) {
    btnPrevProductSale.onclick = function () {
        currentId -= (limit*2 - 1)
        renderProductSale(filterProductSale(data))
    }
}
function handleActiveType (type) {
    let btns = $$('.sneaker__type-item')
    btns.forEach(element => {
        element.classList.remove('sneaker__type-item--active')
    }) 
    switch (type) {
      case "adidas":
        btnAdidasType.classList.add('sneaker__type-item--active')
        break;
      case "nike":
        btnNikeType.classList.add('sneaker__type-item--active')
        break;
      case "gucci":
        btnGucciType.classList.add('sneaker__type-item--active')
        break;
    }
}
function start (data) {
    renderProductSale(filterProductSale(data))
    renderProductType(filterProductType(data,'adidas'))
    handleActiveType('adidas')
    renderAccessory(filterProductType(data,'perfume'),listPerfume,0)
    renderAccessory(filterProductType(data,'jewelry'),listJewelry,0)
    handleEvents(data)
}

getApi(productApi,start)
//-----------------
// start

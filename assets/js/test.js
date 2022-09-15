const app = {
    getApi : function (api,callback) {
        fetch(api)
        .then(function (response) {
            return response.json();
        })
        .then(callback)
    },
    sliderProductSale : function (data) {
        let currentId = 0
        const limit = 5
        let max = currentId + limit
        let htmls = ''
        for(currentId;currentId<max;currentId++) {
         let productItem = data[currentId] 
         htmls += ` <div href="#" class="product__item" data-product = ${productItem.productId} >
         <div class="product__itemImg">
             <span class="product__sale">
             11%
             </span>
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
     },
    handleEvents : function () {
      const imgVisible = $$('#img-visible')
      const imgHidden = $$('#')
    },
   
    start : function () {
    // get api
    // render slider product sale
    this.getApi(productApi,this.sliderProductSale)
    // this.getApi(evaluatesApi,this.render)
    // lang nghe va xu ly event
      this.handleEvents()  
    }
}

app.start()
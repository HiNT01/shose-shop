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
let currentIdAccessory
let currentIdType = 0
let btnColorBlack = $('#color--black')
let btnColorDrakBlue = $('#color--drakBlue')
let btnColorViolet = $('#color--violet')
let btnColorBlue = $('#color--blue')
let btnColorBrown = $('#color--brown')
let btnColorRed = $('#color--red')
let btnColorPink = $('#color--pink')
let btnColorGreen = $('#color--green')
let boxDetailBtnClose = $('#box-detail__btn-close')

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
    currentIdAccessory = start
    if(currentIdAccessory == data.length) {
        currentIdAccessory = 0
    }else if (currentIdAccessory < 0) {
        currentIdAccessory = data.length - 2
    }
    else {
        currentIdAccessory
    }
        let max = currentIdAccessory + 2
        let htmls = ''
        for(currentIdAccessory ; currentIdAccessory < max ; currentIdAccessory++) {
         let productItem = data[currentIdAccessory] 
         htmls += `  <div href="#" class="product__item product__item--2" data-product = ${productItem.id}>
         <div class="product__itemImg">
         <button type="button" class="btn btn-primary btn-search-hidden" data-bs-toggle="modal" data-bs-target="#staticBackdrop" >
         <i class="fa-solid fa-magnifying-glass "></i>
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
       handleDotAccessory(data,element,start)
        currentIdAccessory--


}
//render

//render product sale
function renderProductSale(data) {
    if(currentId >= data.length) {
        currentId = 0
    }else if (currentId < -1) {
        currentId = data.length - limit
    }
    else {
        currentId
    }
    
        let max = currentId + limit
        let htmls = ''
        for(currentId ; currentId < max ; currentId++) {
         let productItem = data[currentId] 
         
         htmls += ` <div href="#" class="product__item" data-product =${productItem.id}>
         <div class="product__itemImg">
             <span class="product__sale">
             11%
             </span>
             <button type="button" class="btn btn-primary btn-search-hidden" data-bs-toggle="modal" data-bs-target="#staticBackdrop" >
         <i class="fa-solid fa-magnifying-glass "></i>
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
        currentIdType = 0
        let max = currentIdType + 10
        let htmls = ''
        for(currentIdType ; currentIdType < max ; currentIdType++) {
         let productItem = data[currentIdType] 
         htmls += ` <div href="#" class="product__item" data-product = ${productItem.id} >
         <div class="product__itemImg">
         <button type="button" class="btn btn-primary btn-search-hidden" data-bs-toggle="modal" data-bs-target="#staticBackdrop" >
         <i class="fa-solid fa-magnifying-glass "></i>
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
  nextProductSale(data);
  prevProductSale(data);
  //filter product
  btnGucciType.onclick = function () {
    renderProductType(filterProductType(data, "gucci"));
    handleActiveType("gucci");
    handleModel(data)
  };
  btnNikeType.onclick = function () {
    renderProductType(filterProductType(data, "nike"));
    handleActiveType("nike");
    handleModel(data)
  };
  btnAdidasType.onclick = function () {
    renderProductType(filterProductType(data, "adidas"));
    handleActiveType("adidas");
    handleModel(data)
  };
  //btn accessory
  // btn next jewelry
  $("#btn__jewelrytNext--hover").onclick = function () {
    currentIdAccessory++;
    renderAccessory(
      filterProductType(data, "jewelry"),
      listJewelry,
      currentIdAccessory
    );
    handleModel(data)
  };
  // btn prev jewelry
  $("#btn__jewelrytPrev--hover").onclick = function () {
    let start = currentIdAccessory - 3;
    renderAccessory(filterProductType(data, "jewelry"), listJewelry, start);
    handleModel(data)
  };
  // btn next perfume
  $("#btn__perfumeNext--hover").onclick = function () {
    currentIdAccessory++;
    renderAccessory(
      filterProductType(data, "perfume"),
      listPerfume,
      currentIdAccessory
    );
    handleModel(data)
  };
  // btn prev perfume
  $("#btn__perfumePrev--hover").onclick = function () {
    let start = currentIdAccessory - 3;
    renderAccessory(filterProductType(data, "perfume"), listPerfume, start);
    handleModel(data)
  };
  //btn social
  $("#social__icon-menu").onclick = function () {
    let condition = $("#social__icon-menu").getAttribute("data-active");
    if (condition === "added") {
      $("#social__icon-menu").setAttribute("data-active", "add");
      let listSocial = $$(".social--item");
      listSocial.forEach((element) => {
        element.classList.remove("social--hidden");
      });
      $("#social__icon-menu span:first-child").classList.remove(
        "social__icon--active"
      );
      $("#social__icon-menu span:last-child").classList.add(
        "social__icon--active"
      );
      $("#social__icon-menu span:last-child").classList.remove(
        "social__icon--rotate"
      );
    } else {
      $("#social__icon-menu").setAttribute("data-active", "added");
      let listSocial = $$(".social--item");
      listSocial.forEach((element) => {
        element.classList.add("social--hidden");
      });
      $("#social__icon-menu span:first-child").classList.add(
        "social__icon--active"
      );
      $("#social__icon-menu span:last-child").classList.remove(
        "social__icon--active"
      );
      $("#social__icon-menu span:last-child").classList.add(
        "social__icon--rotate"
      );
    }
  };
  //back to top
  let btnBackTop = $(".btn-back");
  window.onscroll = function () {
    if (
      document.body.scrollTop > 300 ||
      document.documentElement.scrollTop > 300
    ) {
      btnBackTop.classList.remove('hiddenBtnBack')
      btnBackTop.classList.add("showBtnBack");
    } else {
      btnBackTop.classList.remove("showBtnBack");
      btnBackTop.classList.add('hiddenBtnBack')
    }
  };

  btnBackTop.addEventListener("click", function (e) {
    e.preventDefault();
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  });
  // btn setting color
  let btnSettingColor = $("#color__btnSetting");
  let boxListColor = $("#color__boxSetting");

  btnSettingColor.onclick = function () {
    let dk = btnSettingColor.getAttribute("keyActive");
    if (dk === null) {
      dk = "notActive";
    } else {
      dk;
    }
    if (dk === "notActive") {
      boxListColor.classList.remove("colors--notActive");
      boxListColor.classList.add("colors--active");
      btnSettingColor.setAttribute("keyActive", "active");
    } else {
      boxListColor.classList.remove("colors--active");
      boxListColor.classList.add("colors--notActive");
      btnSettingColor.setAttribute("keyActive", "notActive");
    }
  };
  //   line nav
let lineNav = $('.header__navLine')
let navItems = $$('.header__navitem')
let arrWidthNavItem = []
let positionLeft = 0
navItems.forEach((element,index) => {
   arrWidthNavItem.push(element.clientWidth*index)
   element.onmouseover = function () {
    positionLeft = arrWidthNavItem[index] + 12
    lineNav.setAttribute('style','left:'+ positionLeft + 'px')
    }
})

  //change color 
  handlChangeColor()
  // render detail product
  handleModel(data)
}
function handlChangeColor () {
    btnColorBlack.onclick = function () { changeColor(btnColorBlack) }
    btnColorViolet.onclick = function () { changeColor(btnColorViolet) }
    btnColorDrakBlue.onclick = function () { changeColor(btnColorDrakBlue)}
    btnColorRed.onclick = function () { changeColor(btnColorRed) }
    btnColorPink.onclick = function () { changeColor(btnColorPink) }
    btnColorGreen.onclick = function () { changeColor(btnColorGreen)}
    btnColorBlue.onclick = function () { changeColor(btnColorBlue) }
    btnColorBrown.onclick = function () { changeColor(btnColorBrown)}
}
function handleModel(data) {
    let btnSearchHiddens = $$('.btn-search-hidden')
    btnSearchHiddens.forEach(element => {
      element.onclick = function () {
        renderModal(data,element)
      }
    })
}
function changeColor (colorName) {
    let bgColors = $$('.bg-color')
    let textColors = $$('.text-color')
    let bgColorOp = $$('.bg-color-op')
    let code = colorName.getAttribute('code-color')
    bgColors.forEach(element => {
        element.setAttribute('style','background-color: rgba(' + code + ',1)!important')
    })
    textColors.forEach(element => {
        element.setAttribute('style','color: rgba(' + code + ',1)!important')
    })

    bgColorOp.forEach(element => {
        element.setAttribute('style','background-color: rgba(' + code + ',0.8)!important')
    })
    console.log(1)
    // let colors = $$('.color')
    // colors.forEach(element => {
    //     element.classList.remove('color__item--active')
    // })
    colorName.classList.add('color__item--active')
}
function nextProductSale (data) {
    btnNextProductSale.onclick = function () {
        currentId++
        renderProductSale(filterProductSale(data));
        handleModel(data)
    }
}
function prevProductSale (data) {
    btnPrevProductSale.onclick = function () {
        currentId -= (limit*2 - 1)
        
        renderProductSale(filterProductSale(data))
    handleModel(data)

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
function handleDotAccessory (data,accessory,start) {
    let length = data.length
    let countDot = length / 2
    let html = ``
   for(let i = 0 ; i < countDot ; i++) {
        html+= ` <button class="banner__dot"></button>`
   }
   if(accessory === listPerfume) {
    //-------1
    $('#dotPerfume').innerHTML = html
    let dots = $$('#dotPerfume .banner__dot')
    dots.forEach(element => {
        element.classList.remove("color--black");
    })
    let numberDot = Math.floor((start / 2 ) + 1)
    if(numberDot > 5) {
        numberDot = 1
    }else if (numberDot < 1) {
        numberDot = countDot
    }
     // lay element va active
    let elementActive =  $('#dotPerfume .banner__dot:nth-child(' + numberDot + ')')
    elementActive.classList.add('color--black')
   
   }else {
    //----------2
    $('#dotJewelry').innerHTML = html
    let dots = $$('#dotJewelry .banner__dot')
    dots.forEach(element => {
        element.classList.remove("color--black");
    })
    let numberDot = Math.floor((start / 2 ) + 1)
    if(numberDot > 5) {
        numberDot = 1
    }else if (numberDot < 1) {
        numberDot = countDot
    }
    // lay element va active
    let elementActive =  $('#dotJewelry .banner__dot:nth-child(' + numberDot + ')')
    elementActive.classList.add('color--black')
    
   }
   
}
function renderModal (data,elementName) {
   
  let elementModal = $('.modal-body')
  let dataProduct = elementName.parentElement.parentElement.getAttribute('data-product')
  let product = data.filter(element => {
    return element.id == dataProduct
  })

  
  let productItem = product[0]
  let html = ``
  if(productItem.nsx === 'perfume') {
    html =  `
    <div class="box-detail__img col-6">
    <div class="box-detail__controls">
        <button class="box-detail__control bg-color" id="box-detail__control--prev">
            <i
                class="fa-solid fa-angle-left"></i>
        </button>
        <button class="box-detail__control bg-color" id="box-detail__control--next">
            <i class="fa-solid fa-angle-right"></i>
        </button>
    </div>
    <img src= ${productItem.productImg} alt="">
  </div>
  <div class="box-detail__detail col-6">
    <h2 class="box-detail__name">
    ${productItem.productName}
    </h2>
    <div class="box-detail__price">
        <span class="box-detail__sale">${productItem.productCost}₫</span>
    </div>
    <div class="box-detail__size">
        <span class="box-detail__sizeName">Kích thước: 20</span>
        <ul class="box-detail__listSize ">
            <li class="box-detail__sizeItem">
                <button class="box-detail__sizeBtn bg-color">30ml</button>
            </li>
            <li class="box-detail__sizeItem">
                <button class="box-detail__sizeBtn bg-color">50ml</button>
            </li>
            <li class="box-detail__sizeItem">
                <button class="box-detail__sizeBtn bg-color">100ml</button>
            </li>
            <li class="box-detail__sizeItem">
                <button class="box-detail__sizeBtn bg-color">150ml</button>
            </li>
            
        </ul>
    </div>
    <div class="box-detail__btns">
        <div class="box-detail__count">
            <button class="box-detail__btn" id="box-detail__btn--next"><i class="fa-solid fa-plus"></i></button>
            <span class="box-detail__amount">1</span>
            <button class="box-detail__btn" id="box-detail__btn--prev">
                <i class="fa-solid fa-minus"></i>
            </button>
        </div>
        <button class="box-detail__add bg-color">thêm vào giỏ</button>
    </div>
    <button class="box-detail__detailAll bg-color">xem chi tiết
        <i class="fa-solid fa-angles-right"></i>
    </button>
  </div>
    `
  }else if(productItem.nsx === 'jewelry'){
    html =  `
    <div class="box-detail__img col-6">
    <div class="box-detail__controls">
        <button class="box-detail__control bg-color" id="box-detail__control--prev">
            <i
                class="fa-solid fa-angle-left"></i>
        </button>
        <button class="box-detail__control bg-color" id="box-detail__control--next">
            <i class="fa-solid fa-angle-right"></i>
        </button>
    </div>
    <img src= ${productItem.productImg} alt="">
  </div>
  <div class="box-detail__detail col-6">
    <h2 class="box-detail__name">
    ${productItem.productName}
    </h2>
    <div class="box-detail__price">
        <span class="box-detail__sale">${productItem.productCost}₫</span>
    </div>
    
    <div class="box-detail__btns">
        <div class="box-detail__count">
            <button class="box-detail__btn" id="box-detail__btn--next"><i class="fa-solid fa-plus"></i></button>
            <span class="box-detail__amount">1</span>
            <button class="box-detail__btn" id="box-detail__btn--prev">
                <i class="fa-solid fa-minus"></i>
            </button>
        </div>
        <button class="box-detail__add bg-color">thêm vào giỏ</button>
    </div>
    <button class="box-detail__detailAll bg-color">xem chi tiết
        <i class="fa-solid fa-angles-right"></i>
    </button>
  </div>
    `
  }else if(productItem.productSale === ''){
    html =  `
    <div class="box-detail__img col-6">
    <div class="box-detail__controls">
        <button class="box-detail__control bg-color" id="box-detail__control--prev">
            <i
                class="fa-solid fa-angle-left"></i>
        </button>
        <button class="box-detail__control bg-color" id="box-detail__control--next">
            <i class="fa-solid fa-angle-right"></i>
        </button>
    </div>
    <img src= ${productItem.productImg} alt="">
  </div>
  <div class="box-detail__detail col-6">
    <h2 class="box-detail__name">
    ${productItem.productName}
    </h2>
    <div class="box-detail__price">
        <span class="box-detail__sale">${productItem.productCost}₫</span>
    </div>
    <div class="box-detail__size">
        <span class="box-detail__sizeName">Kích thước: 20</span>
        <ul class="box-detail__listSize ">
            <li class="box-detail__sizeItem">
                <button class="box-detail__sizeBtn bg-color">38</button>
            </li>
            <li class="box-detail__sizeItem">
                <button class="box-detail__sizeBtn bg-color">39</button>
            </li>
            <li class="box-detail__sizeItem">
                <button class="box-detail__sizeBtn bg-color">40</button>
            </li>
            <li class="box-detail__sizeItem">
                <button class="box-detail__sizeBtn bg-color">41</button>
            </li>
            <li class="box-detail__sizeItem">
                <button class="box-detail__sizeBtn bg-color">42</button>
            </li>
            <li class="box-detail__sizeItem">
                <button class="box-detail__sizeBtn bg-color">43</button>
            </li>
            <li class="box-detail__sizeItem">
                <button class="box-detail__sizeBtn bg-color">44</button>
            </li>
        </ul>
    </div>
    <div class="box-detail__btns">
        <div class="box-detail__count">
            <button class="box-detail__btn" id="box-detail__btn--next"><i class="fa-solid fa-plus"></i></button>
            <span class="box-detail__amount">1</span>
            <button class="box-detail__btn" id="box-detail__btn--prev">
                <i class="fa-solid fa-minus"></i>
            </button>
        </div>
        <button class="box-detail__add bg-color">thêm vào giỏ</button>
    </div>
    <button class="box-detail__detailAll bg-color">xem chi tiết
        <i class="fa-solid fa-angles-right"></i>
    </button>
  </div>
    `
  }else {
    html =  `
    <div class="box-detail__img col-6">
    <div class="box-detail__controls">
        <button class="box-detail__control bg-color" id="box-detail__control--prev">
            <i
                class="fa-solid fa-angle-left"></i>
        </button>
        <button class="box-detail__control bg-color" id="box-detail__control--next">
            <i class="fa-solid fa-angle-right"></i>
        </button>
    </div>
    <img src= ${productItem.productImg} alt="">
  </div>
  <div class="box-detail__detail col-6">
    <h2 class="box-detail__name">
    ${productItem.productName}
    </h2>
    <div class="box-detail__price">
        <span class="box-detail__sale"> ${productItem.productSale}₫</span>
        <span class="box-detail__cost">${productItem.productCost}₫</span>
    </div>
    <div class="box-detail__size">
        <span class="box-detail__sizeName">Kích thước: 20</span>
        <ul class="box-detail__listSize ">
            <li class="box-detail__sizeItem">
                <button class="box-detail__sizeBtn bg-color">38</button>
            </li>
            <li class="box-detail__sizeItem">
                <button class="box-detail__sizeBtn bg-color">39</button>
            </li>
            <li class="box-detail__sizeItem">
                <button class="box-detail__sizeBtn bg-color">40</button>
            </li>
            <li class="box-detail__sizeItem">
                <button class="box-detail__sizeBtn bg-color">41</button>
            </li>
            <li class="box-detail__sizeItem">
                <button class="box-detail__sizeBtn bg-color">42</button>
            </li>
            <li class="box-detail__sizeItem">
                <button class="box-detail__sizeBtn bg-color">43</button>
            </li>
            <li class="box-detail__sizeItem">
                <button class="box-detail__sizeBtn bg-color">44</button>
            </li>
        </ul>
    </div>
    <div class="box-detail__btns">
        <div class="box-detail__count">
            <button class="box-detail__btn" id="box-detail__btn--next"><i class="fa-solid fa-plus"></i></button>
            <span class="box-detail__amount">1</span>
            <button class="box-detail__btn" id="box-detail__btn--prev">
                <i class="fa-solid fa-minus"></i>
            </button>
        </div>
        <button class="box-detail__add bg-color">thêm vào giỏ</button>
    </div>
    <button class="box-detail__detailAll bg-color">xem chi tiết
        <i class="fa-solid fa-angles-right"></i>
    </button>
  </div>
    `
  }
  elementModal.innerHTML = html
  changeColor(btnColorBlack)
}
function changeColor (colorName) {
  let bgColors = $$('.bg-color')
  let textColors = $$('.text-color')
  let textColorAfters = $$('.text-color:after')
  let bgColorOp = $$('.bg-color-op')
  let code = colorName.getAttribute('code-color')
  bgColors.forEach(element => {
      element.setAttribute('style','background-color: rgba(' + code + ',1)!important')
  })
  textColors.forEach(element => {
      element.setAttribute('style','color: rgba(' + code + ',1)!important')
  })

  bgColorOp.forEach(element => {
      element.setAttribute('style','background-color: rgba(' + code + ',0.8)!important')
  })
  textColorAfters.forEach(element => {
      element.setAttribute('style','background-color: rgba(' + code + ',1)!important')
  })
//   line nav
let lineNav = $('.header__navLine')
let navItems = $$('.header__navitem')
let arrWidthNavItem = []
let positionLeft = 0
navItems.forEach((element,index) => {
 arrWidthNavItem.push(element.clientWidth*index)
 element.onmouseover = function () {
  positionLeft = arrWidthNavItem[index] + 12
  lineNav.setAttribute('style','left:'+ positionLeft + 'px')
  // lineNav.setAttribute('style','width:'+ arrWidthNavItem[1] + 'px')
  }
})

}
function start (data) {
    //render product sale
    renderProductSale(filterProductSale(data))
    // default product type
    renderProductType(filterProductType(data,'adidas'))
    // default btn type
    handleActiveType('adidas')
    //render accessory perfume
    renderAccessory(filterProductType(data,'perfume'),listPerfume,0)
    //render accessory jewelry
    renderAccessory(filterProductType(data,'jewelry'),listJewelry,0)
    // lang nghe va xu ly events
    handleEvents(data)
    //color default
    changeColor(btnColorBlack) 

}
getApi(productApi,start)

//-----------------
// start

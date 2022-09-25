const btnGucciType = $("#type-gucci");
const btnNikeType = $("#type-nike");
const btnAdidasType = $("#type-adidas");
let currentIdBanner = 0;
const bannerApi = "http://localhost:3000/sliderBanner";
let btnNextBanner = document.querySelector("#btn__next");
let btnNextBannerHover = document.querySelector("#btn__next--hover");
let btnPrevBanner = document.querySelector("#btn__prev");
let btnPrevBannerHover = document.querySelector("#btn__prev--hover");
let elementImg = document.getElementById("banner__img");
let eleCountProductAdidas = $('#countAdidas')
let eleCountProductNike = $('#countNike')
let eleCountProductGucci = $('#countGucci')
let eleCountProductPerfume = $('#countPerfume')
let eleCountProductJewelry = $('#countJewelry')
let eleSe = $('#sort')

// get api
function getApi(api, callback) {
  fetch(api)
    .then(function (response) {
      return response.json();
    })
    .then(callback);
}
// render product type
function renderProductType(data) {
  currentIdType = 0;
  let max = currentIdType + 8;
  let htmls = "";
  for (currentIdType; currentIdType < max; currentIdType++) {
    let productItem = data[currentIdType];
    htmls += ` <div href="#" class="product__item product__item--4" data-product = ${productItem.id} >
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
     </div>`;
  }
  listProductType.innerHTML = htmls;
}
//filter
function filterProductType(data, type) {
  let arrProducts = data.filter((element) => {
    return element.nsx === type;
  });
  return arrProducts;
}
//modal
function handleEventsModal() {
  // control img
  let btnNext = $("#box-detail__control--next");
  let btnPrev = $("#box-detail__control--prev");
  btnNext.onclick = function () {
    let productImgHover = $(".box-detail__item .hidden");
    let productImg = $(".box-detail__item .visible");
    productImgHover.classList.remove("hidden");
    productImg.classList.add("hidden");
    productImgHover.classList.add("visible");
    productImg.classList.remove("visible");
  };
  btnPrev.onclick = function () {
    let productImgHover = $(".box-detail__item .hidden");
    let productImg = $(".box-detail__item .visible");
    productImgHover.classList.remove("hidden");
    productImg.classList.add("hidden");
    productImgHover.classList.add("visible");
    productImg.classList.remove("visible");
  };
  //count product
  let btnPlus = $("#box-detail__btn--next");
  let btnMinus = $("#box-detail__btn--prev");

  btnPlus.onclick = function () {
    let result = $(".box-detail__amount");
    let max = Number($(".box-detail__max").innerText);
    let resultNumber = Number(result.innerText);
    resultNumber++;
    resultNumber = resultNumber > max ? max : resultNumber;
    result.innerText = resultNumber;
  };
  btnMinus.onclick = function () {
    let result = $(".box-detail__amount");
    let resultNumber = Number(result.innerText);
    resultNumber--;
    resultNumber = resultNumber < 1 ? 1 : resultNumber;
    result.innerText = resultNumber;
  };
}
function handleModal(data) {
  let btnSearchHiddens = $$(".btn-search-hidden");
  btnSearchHiddens.forEach((element) => {
    element.onclick = function () {
      renderModal(data, element);
    };
  });
}
function renderModal(data, elementName) {
  let elementModal = $(".modal-body");
  let dataProduct =
    elementName.parentElement.parentElement.getAttribute("data-product");
  let product = data.filter((element) => {
    return element.id == dataProduct;
  });
  let productItem = product[0];
  let html = ``;
  if (productItem.nsx === "perfume") {
    html = `
       <div class="box-detail__item row" data-product=${productItem.id}>
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
        <img src= ${productItem.productImg} alt="" class="visible">
        <img src= ${productItem.productImgHover} alt="" class="hidden">
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
                <span class="box-detail__max hidden">${productItem.count}</span>
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
      </div> 
        `;
  } else if (productItem.nsx === "jewelry") {
    html = `
        <div class="box-detail__item row" data-product=${productItem.id}>
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
        <img src= ${productItem.productImg} alt="" class="visible">
        <img src= ${productItem.productImgHover} alt="" class="hidden">
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
                <span class="box-detail__max hidden">${productItem.count}</span>
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
      </div>
        `;
  } else if (productItem.productSale === "") {
    html = `
        <div class="box-detail__item row" data-product=${productItem.id}>
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
        <img src= ${productItem.productImg} alt="" class="visible">
        <img src= ${productItem.productImgHover} alt="" class="hidden">
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
                <span class="box-detail__max hidden">${productItem.count}</span>
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
      </div>
        `;
  } else {
    html = `
        <div class="box-detail__item row" data-product=${productItem.id}>
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
        <img src= ${productItem.productImg} alt="" class="visible">
        <img src= ${productItem.productImgHover} alt="" class="hidden">
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
                <span class="box-detail__max hidden">${productItem.count}</span>
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
      </div>
        `;
  }
  elementModal.innerHTML = html;

  let btnColorActive = $(".color__item--active");
  let codeColor = btnColorActive.getAttribute("code-color");
  let bgColors = $$(".bg-color");
  let textColors = $$(".text-color");
  let bgColorOp = $$(".bg-color-op");
  bgColors.forEach((element) => {
    element.setAttribute(
      "style",
      "background-color: rgba(" + codeColor + ",1)!important"
    );
  });
  textColors.forEach((element) => {
    element.setAttribute("style", "color: rgba(" + codeColor + ",1)!important");
  });

  bgColorOp.forEach((element) => {
    element.setAttribute(
      "style",
      "background-color: rgba(" + codeColor + ",0.8)!important"
    );
  });

  handleEventsModal();
}
// product type
function handleActiveType(type) {
  let btns = $$(".sneaker__type-item");
  btns.forEach((element) => {
    element.classList.remove("sneaker__type-item--active");
  });
  switch (type) {
    case "adidas":
      btnAdidasType.classList.add("sneaker__type-item--active");
      break;
    case "nike":
      btnNikeType.classList.add("sneaker__type-item--active");
      break;
    case "gucci":
      btnGucciType.classList.add("sneaker__type-item--active");
      break;
  }
}
let handleProductType = (data) => {
  btnNikeType.onclick = () => {
    renderProductType(filterProductType(data, "nike"));
    handleActiveType("nike");
  };
  btnGucciType.onclick = () => {
    renderProductType(filterProductType(data, "gucci"));
    handleActiveType("gucci");
  };
  btnAdidasType.onclick = () => {
    renderProductType(filterProductType(data, "adidas"));
    handleActiveType("adidas");
  };
};
// count product
let countProduct = (data) => {
  //count product adidas
  let arrAdidas = filterProductType(data,'adidas')
  eleCountProductAdidas.innerHTML = `(${arrAdidas.length})`
  //count product nike
  let arrNike = filterProductType(data,'nike')
  eleCountProductNike.innerHTML = `(${arrNike.length})`
  //count product gucci
  let arrGucci = filterProductType(data,'gucci')
  eleCountProductGucci.innerHTML = `(${arrGucci.length})`
  //count product perfume
  let arrPerfume = filterProductType(data,'perfume')
  eleCountProductPerfume.innerHTML = `(${arrPerfume.length})`
  //count product adidas
  let arrJewelry = filterProductType(data,'jewelry')
  eleCountProductJewelry.innerHTML = `(${arrJewelry.length})`
}
// sort product name : 0 ,price : 1 , asc : 0 , desc : 1
let handleSort = (data) => {
  eleSe.onchange = () => {
   let value = eleSe.value
   switch (value) {
     case "n/a":
       sortProduct(data, "name", "asc");
       break;
     case "n/d":
       sortProduct(data, "name", "desc");
       break;
     case "p/a":
       sortProduct(data, "price", "asc");
       break;
     case "p/d":
       sortProduct(data, "price", "desc");
       break;
   }
  }  
}
let sortProduct = (data,type,sort) => {
  let result
  if(type === 'name' && sort === 'asc'){
    result = data.sort()
  }else  if(type === 'name' && sort === 'desc'){
    result = data.sort().reverse()
   }else  if(type === 'price' && sort === 'asc'){
    result = data.sort().reverse()
   }else  if(type === 'price' && sort === 'desc'){
    result = data.sort().reverse()
   }
   return result
}
//-------start 
let startProduct = (data) => {
  //
  renderProductType(filterProductType(data, "adidas"));
  // default btn type
  handleActiveType("adidas");
  //
  handleProductType(data);
  
  handleModal(data);
  //count product
  countProduct(data)
};

getApi(productApi, startProduct);

//----------banner

// function btn hover
function btnHover(btn1, btn2) {
  btn1.onmouseover = function () {
    btn2.classList.add("btn--hover");
  };
  btn2.onmouseout = function () {
    btn2.classList.remove("btn--hover");
  };
}
//render dot
let renderDot = (data) => {
  let text = "";
  let lengthData = data.length;
  for (let i = 0; i < lengthData; i++) {
    text += `<button class="banner__dot"></button>`;
  }
  document.getElementById("dot").innerHTML = text;
};
//render banner
let renderBanner = (data) => {
  let objBanner = data[currentIdBanner];
  let elementDots = document.querySelectorAll(".banner__dot");
  let elementDotNA = document.querySelector("#dot button:not(.bg-color)");
  let qs = ".banner__dot:nth-child(" + (currentIdBanner + 1) + ")";
  let elementDot = document.querySelector(qs);
  elementImg.setAttribute("src", objBanner.src);
  elementDots.forEach((element) => {
    element.classList.remove("bg-color");
    element.setAttribute("style", "background-color: yellow");
  });
  elementDot.classList.add("bg-color");
  colorDefault();
};
//control banner
let controlBanner = (data) => {
  btnNextBannerHover.onclick = () => {
    nextBanner(data);
  };
  btnPrevBannerHover.onclick = () => {
    prevBanner(data);
  };
};
let nextBanner = (data) => {
  let lengthData = data.length;
  currentIdBanner++;
  currentIdBanner = currentIdBanner == lengthData ? 0 : currentIdBanner;
  renderBanner(data);
};
let prevBanner = (data) => {
  let lengthData = data.length;
  currentIdBanner++;
  currentIdBanner = currentIdBanner == lengthData ? 0 : currentIdBanner;
  renderBanner(data);
};
const starBanner = (data) => {
  btnHover(btnNextBanner, btnNextBannerHover);
  btnHover(btnPrevBanner, btnPrevBannerHover);
  renderDot(data);
  renderBanner(data);
  controlBanner(data);
  setInterval(() => {
    nextBanner(data);
  }, 10000);
};
//------------
getApi(bannerApi, starBanner);
///



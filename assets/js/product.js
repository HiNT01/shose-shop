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
let eleNavi = $('#pagination')
let limitType
// get api
function getApi(api, callback) {
  fetch(api)
    .then(function (response) {
      return response.json();
    })
    .then(callback);
}
const setLimit = () => {
  let widthWindow  = window.innerWidth
  if(widthWindow > 992)  {
    limitSale = 5
    limitAccessory = 2
    limitType = 8
  }else if(widthWindow > 767) {
    limitSale = 4
    limitAccessory = 1
    limitType = 9
  } else if( widthWindow <= 767) {
    limitSale = 2
    limitAccessory = 1
    limitType = 6
  }
}
// render product type
function renderProductType(data) {
  setLimit()
  limitType = data.length >= limitType  ? limitType : data.length
  let max = currentIdType + limitType;
  max = max > data.length ? data.length : max
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
             <button  type="button" class="btn btn-primary product__btnAdds" data-bs-toggle="modal" data-bs-target="#staticBackdrop" >
             
                <span class="product__btnAdd">
                 <i class="fa-sharp fa-solid fa-cart-plus"></i>
                </span>
                 <span class="product__btnAddText">thêm vào giỏ</span>
             </button>
         </div>
         <div class="product__detail">
             <!-- name -->
             <a href="./detail.html?data=${productItem.id}">
                 <h3 class="product__name">
                 ${productItem.productName}
                 </h3>
                 </a>
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
                 ${Number(productItem.productCost).toLocaleString('vi', {style : 'currency', currency : 'VND'})}
                 </div>
             </div>
         </div>
     </div>`;
  }
  listProductType.innerHTML = htmls;
  let totalPage = Math.ceil(data.length / limitType )
  handleModal(data);
  navigation(data,limitType,eleNavi)
  playNavigation(data)
  handlePageActive(max, limitType ,totalPage)
}
//filter
function filterProductType(data, type,dk) {
  let arrProducts = data.filter((element) => {
    if(dk) {
      return element.nsx === type
    }else {
       return Number(element.productCost) <= type;
    }
  });
  return arrProducts;
  
}
//modal
function handleEventsModal() {
  //inner size
  const innerSize = () => {
    let size = $('.box-detail__sizeName')
    let sizeValue = $('.box-detail__sizeBtn.active').innerText
    size.innerHTML = `kích thước :${sizeValue}`
  }
  innerSize()
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
  //control product
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
  //check size
  let listSizes = $$('.box-detail__sizeBtn')
  listSizes.forEach(item => {
    item.onclick = () => {
      listSizes.forEach(element => {
        element.classList.add('bg-color')
        element.classList.remove('active')
      })
      item.classList.remove('bg-color')
      item.classList.add('active')
      innerSize()
    }
  })
}
function handleModal(data) {
  let btnSearchHiddens = $$(".btn-search-hidden");
  let btnAdds = $$('.product__btnAdds')
  btnSearchHiddens.forEach((element) => {
    element.onclick = function () {
      renderModal(data, element);
    };
  });
  btnAdds.forEach((item) => {
    item.onclick = function () {
      renderModal(data, item);
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
            <span class="box-detail__sale">${Number(productItem.productCost).toLocaleString('vi', {style : 'currency', currency : 'VND'})}</span>
        </div>
        <div class="box-detail__size">
            <span class="box-detail__sizeName"></span>
            <ul class="box-detail__listSize ">
                <li class="box-detail__sizeItem">
                    <button class="box-detail__sizeBtn active bg-color">30ml</button>
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
        <a href="./detail.html?data=${productItem.id}" class="box-detail__detailAll bg-color">xem chi tiết
            <i class="fa-solid fa-angles-right"></i>
        </a>
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
            <span class="box-detail__sale">${Number(productItem.productCost).toLocaleString('vi', {style : 'currency', currency : 'VND'})}</span>
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
        <a href="./detail.html?data=${productItem.id}" class="box-detail__detailAll bg-color">xem chi tiết
        <i class="fa-solid fa-angles-right"></i>
    </a>
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
            <span class="box-detail__sale">${Number(productItem.productCost).toLocaleString('vi', {style : 'currency', currency : 'VND'})}</span>
        </div>
        <div class="box-detail__size">
            <span class="box-detail__sizeName"></span>
            <ul class="box-detail__listSize ">
                <li class="box-detail__sizeItem">
                    <button class="box-detail__sizeBtn active bg-color">38</button>
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
        <a href="./detail.html?data=${productItem.id}" class="box-detail__detailAll bg-color">xem chi tiết
            <i class="fa-solid fa-angles-right"></i>
        </a>
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
            <span class="box-detail__sale"> ${Number(productItem.productSale).toLocaleString('vi', {style : 'currency', currency : 'VND'})}</span>
            <span class="box-detail__cost">${Number(productItem.productCost).toLocaleString('vi', {style : 'currency', currency : 'VND'})}</span>
        </div>
        <div class="box-detail__size">
            <span class="box-detail__sizeName">Kích thước: 20</span>
            <ul class="box-detail__listSize ">
                <li class="box-detail__sizeItem">
                    <button class="box-detail__sizeBtn active bg-color">38</button>
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
        <a href="./detail.html?data=${productItem.id}" class="box-detail__detailAll bg-color">xem chi tiết
            <i class="fa-solid fa-angles-right"></i>
        </a>
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
      "background-color: rgba(" + codeColor + ",1)"
    );
  });
  textColors.forEach((element) => {
    element.setAttribute("style", "color: rgba(" + codeColor + ",1)");
  });

  bgColorOp.forEach((element) => {
    element.setAttribute(
      "style",
      "background-color: rgba(" + codeColor + ",0.8)"
    );
  });
  handleEventsModal();
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
  let arrAdidas = filterProductType(data,'adidas',1)
  eleCountProductAdidas.innerHTML = `(${arrAdidas.length})`
  //count product nike
  let arrNike = filterProductType(data,'nike',1)
  eleCountProductNike.innerHTML = `(${arrNike.length})`
  //count product gucci
  let arrGucci = filterProductType(data,'gucci',1)
  eleCountProductGucci.innerHTML = `(${arrGucci.length})`
  //count product perfume
  let arrPerfume = filterProductType(data,'perfume',1)
  eleCountProductPerfume.innerHTML = `(${arrPerfume.length})`
  //count product adidas
  let arrJewelry = filterProductType(data,'jewelry',1)
  eleCountProductJewelry.innerHTML = `(${arrJewelry.length})`
}
// sort product 
let handleSort = (data) => {
  // type = getProductType()
  let arr
  eleSe.onchange = () => {
   let value = eleSe.value
   type = getProductType()
   let isNumber = Number(type)
   let sortType = isNumber ? 0 : 1
   switch (value) {
     case "n/a":
      arr = sortProduct(filterProductType(data, type,sortType), "name", "asc");
       break;
     case "n/d":
      arr = sortProduct(filterProductType(data, type,sortType), "name", "desc");
       break;
     case "p/a":
      arr = sortProduct(filterProductType(data, type,sortType), "price", "asc");
       break;
     case "p/d":
      arr = sortProduct(filterProductType(data, type,sortType), "price", "desc");
       break;
   }
   currentIdType = 0
   renderProductType(arr)
  }  
}
let sortProduct = (data,type,sort) => {
  let result
  if(type === 'name' && sort === 'asc'){
    result = data.sort((a, b) => {
      let fa = a.productName.toLowerCase(),
        fb = b.productName.toLowerCase();
      if (fa < fb) {
        return -1;
      }
      if (fa > fb) {
        return 1;
      }
      return 0;
    });
  }else  if(type === 'name' && sort === 'desc'){
    result = data.sort((a, b) => {
      let fa = a.productName.toLowerCase(),
        fb = b.productName.toLowerCase();
      if (fa < fb) {
        return -1;
      }
      if (fa > fb) {
        return 1;
      }
      return 0;
    }).reverse()
   }else  if(type === 'price' && sort === 'asc'){
    result = data.sort((a,b) => Number(a.productCost) - Number(b.productCost))
   }else  if(type === 'price' && sort === 'desc'){
    result = data.sort((a,b) => Number(a.productCost) - Number(b.productCost)).reverse()
   }
   return result
}
let checkProduct = (name) => {
  let ele = $('input[filter-data=' + name + ']')
  ele.setAttribute('checked','checked')
}
let handleFilter = (data) => {
  let filter = $$('input[type="radio"]')
  let type
  setLimit()
 filter.forEach(ele => {
  ele.onclick = () => {
    type = ele.getAttribute('filter-data')
    currentIdType = 0
    renderProductType(sortProduct(filterProductType(data, type,1),'name','asc'));
  }
 })
}
// filter price
let handleFilterPrice = (data) => {
  let filter = $$('.filter-price')
  let type
 filter.forEach(ele => {
  setLimit()
  ele.onclick = () => {
    type = Number(ele.getAttribute('filter-data'))
    currentIdType = 0
    let dataRender = sortProduct(filterProductType(data,type,0),'name','asc')
    renderProductType(dataRender);
  }
 })
}
//navigation
const renderPage = (number,data) => {
  setLimit()
  typeProduct = getProductType()
  isNumber = Number(typeProduct)
  currentIdType = number === 1 ? 0 : (number - 1) *  limitType
  let value = eleSe.value
  
  if(isNumber) {
    switch (value) {
      case "n/a":
       arr = sortProduct(filterProductType(data,typeProduct,0), "name", "asc");
        break;
      case "n/d":
       arr = sortProduct(filterProductType(data,typeProduct,0), "name", "desc");
        break;
      case "p/a":
       arr = sortProduct(filterProductType(data,typeProduct,0), "price", "asc");
        break;
      case "p/d":
       arr = sortProduct(filterProductType(data,typeProduct,0), "price", "desc");
        break;
    }
   
    renderProductType(arr);
  }else {
    switch (value) {
      case "n/a":
       arr = sortProduct(filterProductType(data,typeProduct,1), "name", "asc");
        break;
      case "n/d":
       arr = sortProduct(filterProductType(data,typeProduct,1), "name", "desc");
        break;
      case "p/a":
       arr = sortProduct(filterProductType(data,typeProduct,1), "price", "asc");
        break;
      case "p/d":
       arr = sortProduct(filterProductType(data,typeProduct,1), "price", "desc");
        break;
    }
    renderProductType(arr);
  }
}
const playNavigation = (data) => {
  let pages = $$(".pagination__page.pagination__page-number");
  pages.forEach((page) => {
    page.onclick = () => {
      let pageNumber = Number(page.innerText)
      renderPage(pageNumber,data)
    };
  });
  nextPage(data)
  prevPage(data)
};
const nextPage = (data) => {
  let nextBtn = $('.pagination__page:last-child .pagination__btn')
  nextBtn.onclick = () => {
    let page = Number($('.pagination__btn.active').innerText) + 1
    renderPage(page,data)
  }
}
const prevPage = (data) => {
  let prevBtn = $('.pagination__page:first-child .pagination__btn')
  prevBtn.onclick = () => {
  let page = Number($('.pagination__btn.active').innerText) - 1

    renderPage(page,data)
  }
}
let navigation = (data, number, ele) => {
  let numberPage = Math.ceil(data.length / number);
  let html = "";
  for (let i = 1; i <= numberPage; i++) {
    html += ` <li class="pagination__page pagination__page-number">
    <button class="pagination__btn">${i}</button>
 </li>`;
  }
  let htmls = ` <ul class="pagination__list">
  <li class="pagination__page">
    <button class="pagination__btn">
      prev
    </button>
  </li>
 ${html}
  <li class="pagination__page">
    <button class="pagination__btn">next</button>
  </li>
</ul>`;
  ele.innerHTML = htmls;
};

let handlePageActive = (number,max,totalPage) => {
  let nextBtn = $('.pagination__page:last-child .pagination__btn')
  let prevBtn = $('.pagination__page:first-child .pagination__btn')
  let page = number % max === 0 ? number / max : Math.ceil(number / max)
  let listItem = $$('.pagination__btn')
  // console.log(listItem,page)
  listItem.forEach(ele=> {
    ele.classList.remove('active')
  })
  listItem[page].classList.add('active')
  page === 1 ? prevBtn.classList.add('disble') : prevBtn.classList.remove('disble')
  page === totalPage ? nextBtn.classList.add('disble') : nextBtn.classList.remove('disble')
}
//function get checked input 
const getProductType = () => {
  let result
  let listInput = $$('input[type=radio]')
  listInput.forEach(item => {
    if(item.checked) {
      result = item.getAttribute('filter-data')
    }
  })
  return result
}
const btnSort = () => {
  let btn = $('.btn__sort')
  let btnClose = $('.btn__sort-close')
  btn.onclick = () => {
    $('.content__left').classList.add('sort__open')
    $('.content__left').classList.remove('nav__mobile-out')
  }
  btnClose.onclick = () => {
    $('.content__left').classList.remove('sort__open')
    $('.content__left').classList.add('nav__mobile-out')
  }
}
//-------start 
let startProduct = (data,typeProduct) => {
  // responsive limit product
  setLimit()
  // navigation(sortProduct(filterProductType(data, typeProduct,1),'name','asc'),limitType,eleNavi)
  renderProductType(sortProduct(filterProductType(data, typeProduct,1),'name','asc'));
  // render modal + control model
  handleModal(data);
  //count product
  countProduct(data)
  //sort product
  handleSort(data)
  // set checked
  checkProduct(typeProduct)
  //filter type
  handleFilter(data)
  //filter price
  handleFilterPrice(data)
  //
  btnSort()
};
// let startProductAdidas = (data) => {
//   //
//   navigation(sortProduct(filterProductType(data, "adidas",1),'name','asc'),8,eleNavi)
//   renderProductType(sortProduct(filterProductType(data, "adidas",1),'name','asc'));
  
//   // default btn type
//   handleActiveType("adidas");
//   //
//   handleProductType(data);
//   // render modal + control model
//   handleModal(data);
//   //count product
//   countProduct(data)
//   //sort product
//   handleSort(data,'adidas')
//   // set checked
//   checkProduct('adidas')
//   //filter type
//   handleFilter(data)
//   //filter price
//   handleFilterPrice(data)
//   //
//   playNavigation(data);
 
 
// };
// let startProductNike = (data) => {
//   //
//   renderProductType(sortProduct(filterProductType(data, "nike"),'name','asc'));
//   // default btn type
//   handleActiveType("adidas");
//   //
//   handleProductType(data);
  
//   handleModal(data);
//   //count product
//   countProduct(data)
//   //sort
//   handleSort(data,'nike')
//   //
//   checkProduct('nike')
// };
// let startProductGucci = (data) => {
//   //
//   renderProductType(sortProduct(filterProductType(data, "gucci"),'name','asc'));
//   // default btn type
//   handleActiveType("adidas");
//   //
//   handleProductType(data);
  
//   handleModal(data);
//   //count product
//   countProduct(data)
//   //sort
//   handleSort(data,'gucci')
//   //
//   checkProduct('gucci')
// };
let urlPage = window.location.href
if(urlPage.includes('?adidas')) {
  getApi(productApi, (data) => { startProduct(data,'adidas')});
}else if(urlPage.includes('?nike')) {
  getApi(productApi,  (data) => { startProduct(data,'nike')});
}else if(urlPage.includes('?gucci')) {
  getApi(productApi,  (data) => { startProduct(data,'gucci')});
}else if(urlPage.includes('?perfume')) {
  getApi(productApi,  (data) => { startProduct(data,'perfume')});
}else if(urlPage.includes('?jewelry')) {
  getApi(productApi,  (data) => { startProduct(data,'jewelry')});
}
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

////
handleLoading()
//------------
getApi(bannerApi, starBanner);
///



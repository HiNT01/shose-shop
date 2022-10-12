let listNavTabsBtn = document.querySelectorAll('.nav-tabs__btn')
let navTabsContent = document.querySelector('.nav-tabs__content')
let elementDetail = document.querySelector('.detail__info')
let ct1 

let ct2 = '<p><strong>1. Các hình thức thanh toán</strong></p><p>Khách hàng có thể lựa chọn các hình thức thanh toán sau để thanh toán cho đơn hàng của mình khi mua sản phẩm trên website Wd Shoes scofield</p><p>1.1.&nbsp;Thanh toán trả trước: là hình thức thanh toán trực tuyến mà khách hàng sử dụng để thanh toán cho đơn hàng, bao gồm:&ZeroWidthSpace;&ZeroWidthSpace;</p><ul><li>&nbsp;Thẻ ATM (Thẻ ghi nợ/thanh toán/trả trước nội địa);</li><li>&nbsp;Thẻ thanh toán quốc tế, thẻ tín dụng.</li></ul><p>1.2.&nbsp;Thanh toán trả sau: là hình thức mà khách hàng sử dụng để thanh toán cho đơn hàng khi Nam An Market giao hàng, bao gồm:</p><ul><li>Tiền mặt</li><li>Thẻ ATM (thẻ ngân hàng, thẻ thanh toán nội địa), thẻ tín dụng và thẻ thanh toán quốc tế (Visa, Master, JCB, UnionPay…) qua máy quẹt thẻ (POS, mPOS) của Ngân hàng</li></ul></div>';

let ct3 = '<p><strong>1. Điều kiện đổi trả</strong></p><p>Quý Khách hàng cần kiểm tra tình trạng hàng hóa và có thể đổi hàng/ trả lại hàng&nbsp;ngay tại thời điểm giao/nhận hàng&nbsp;trong những trường hợp sau:</p><ul><li>Hàng không đúng chủng loại, mẫu mã trong đơn hàng đã đặt hoặc như trên website tại thời điểm đặt hàng.</li><li>Không đủ số lượng, không đủ bộ như trong đơn hàng.</li><li>Tình trạng bên ngoài bị ảnh hưởng như rách bao bì, bong tróc, bể vỡ…</li></ul><p>&nbsp;Khách hàng có trách nhiệm trình giấy tờ liên quan chứng minh sự thiếu sót trên để hoàn thành việc&nbsp;hoàn trả/đổi trả hàng hóa.&nbsp;</p><p>&nbsp;</p><p><strong>2. Quy định về thời gian thông báo và gửi sản phẩm đổi trả</strong></p><ul><li><strong>Thời gian thông báo đổi trả</strong>:&nbsp;trong vòng 48h kể từ khi nhận sản phẩm đối với trường hợp sản phẩm thiếu phụ kiện, quà tặng hoặc bể vỡ.</li><li><strong>Thời gian gửi chuyển trả sản phẩm</strong>: trong vòng 14 ngày kể từ khi nhận sản phẩm.</li><li><strong>Địa điểm đổi trả sản phẩm</strong>: Khách hàng có thể mang hàng trực tiếp đến văn phòng/ cửa hàng của chúng tôi hoặc chuyển qua đường bưu điện.</li></ul><p>Trong trường hợp Quý Khách hàng có ý kiến đóng góp/khiếu nại liên quan đến chất lượng sản phẩm, Quý Khách hàng vui lòng liên hệ đường dây chăm sóc khách hàng&nbsp;của chúng tôi.</p>'
let ct4 = '<iframe name="f8dd718c7d8878" width="1000px" height="100px" data-testid="fb:comments Facebook Social Plugin" title="fb:comments Facebook Social Plugin" frameborder="0" allowtransparency="true" allowfullscreen="true" scrolling="no" allow="encrypted-media" src="https://www.facebook.com/v2.0/plugins/comments.php?app_id=&amp;channel=https%3A%2F%2Fstaticxx.facebook.com%2Fx%2Fconnect%2Fxd_arbiter%2F%3Fversion%3D46%23cb%3Df3d62bc77982e48%26domain%3Dwd-shoes-scofield.myharavan.com%26is_canvas%3Dfalse%26origin%3Dhttps%253A%252F%252Fwd-shoes-scofield.myharavan.com%252Ff352fa6b07bf5a%26relation%3Dparent.parent&amp;color_scheme=light&amp;container_width=0&amp;height=100&amp;href=https%3A%2F%2Fwd-shoes-scofield.myharavan.com%2Fproducts%2Fgiay-nike-jordan-1-retro-high-og-sp-utility-stash-dn4336-001&amp;locale=vi_VN&amp;mobile=true&amp;numposts=5&amp;sdk=joey&amp;version=v2.0&amp;width=" class="" style="border: none; visibility: visible; width: 100%; height: auto;"></iframe>'

let arrContent = [ct1,ct2,ct3,ct4]
const handleNavTabsBtn = (element) => {
  listNavTabsBtn.forEach(item => {
    item.classList.remove('active')
  })
  element.classList.add('active')
}
const activeNavTabsBtn = () => {
    let item = document.querySelector('.nav-tabs__btn.active')
    let index = Number(item.getAttribute('data-content')) - 1
    navTabsContent.innerHTML = arrContent[index]
}
const handleNavTabs = () => {
  listNavTabsBtn.forEach(item=> {
    item.onclick = function () {
     //handle btn active
     handleNavTabsBtn(item)
    // inner HTml
    activeNavTabsBtn()
    }
  })
}
// get api
function getApi(api, callback) {
  fetch(api)
    .then(function (response) {
      return response.json();
    })
    .then(callback);
}
const getData = (url) => {
  let data= url.substr(39)
  return data
} 
const a = (productItem) => {
    ct1 = `Mua ${productItem.productName} chính hãng 100% có sẵn tại Authentic Shoes. Giao hàng miễn phí trong 1 ngày. Cam kết đền tiền X5 nếu phát hiện Fake. Đổi trả miễn phí size. MUA NGAY!`
    arrContent = [ct1,ct2,ct3,ct4]
}
const renderDetail = (data) => {
  productItem = data.find(item=> item.id == idProduct )
  let value = productItem.type ? productItem.productSale : productItem.productCost
  let valueFormat = Number(value).toLocaleString('vi', {style : 'currency', currency : 'VND'});
  elementDetail.innerHTML = `
  <div class="detail__item row" data-product=${productItem.id}>
  <div class="detail__img col-6">
      <div class="row">
          <div class="detail__listImg col-4">
              <img src=${productItem.productImg} alt="" class="visible"> 
              <img src=${productItem.productImg} alt="" class="visible">
              <img src=${productItem.productImg} alt="" class="visible">
              <img src=${productItem.productImg} alt="" class="visible">
          </div>
          <div class="detail__bigImg col-8">
              <div class="detail__controls">
                  <button class="detail__control bg-color" id="detail__control--prev">
                      <i
                          class="fa-solid fa-angle-left"></i>
                  </button>
                  <button class="detail__control bg-color" id="detail__control--next">
                      <i class="fa-solid fa-angle-right"></i>
                  </button>
              </div>
              <img src=${productItem.productImg} alt="" class="visible">
          </div>
      </div>
  
</div>
<div class="detail__detail col-6">
  <div class="detail__detail-wrapper">
      <h2 class="detail__name">
      ${productItem.productName}
      </h2>
      <div class="detail__price">
          <span class="detail__sale"> ${valueFormat}</span>
      </div>
      <div class="detail__size">
          <span class="detail__sizeName">Kích thước: 20</span>
          <ul class="detail__listSize ">
              <li class="detail__sizeItem">
                  <button class="detail__sizeBtn active bg-color">38</button>
              </li>
              <li class="detail__sizeItem">
                  <button class="detail__sizeBtn bg-color">39</button>
              </li>
              <li class="detail__sizeItem">
                  <button class="detail__sizeBtn bg-color">40</button>
              </li>
              <li class="detail__sizeItem">
                  <button class="detail__sizeBtn bg-color">41</button>
              </li>
              <li class="detail__sizeItem">
                  <button class="detail__sizeBtn bg-color">42</button>
              </li>
              <li class="detail__sizeItem">
                  <button class="detail__sizeBtn bg-color">43</button>
              </li>
              <li class="detail__sizeItem">
                  <button class="detail__sizeBtn bg-color">44</button>
              </li>
          </ul>
      </div>
      <div class="detail__btns">
          <div class="detail__count">
              <button class="detail__btn" id="detail__btn--next"><i class="fa-solid fa-plus"></i></button>
              <span class="detail__amount">1</span>
              <span class="detail__max hidden">${productItem.count}</span>
              <button class="detail__btn" id="detail__btn--prev">
                  <i class="fa-solid fa-minus"></i>
              </button>
          </div>
          <div class="detail__buttons">
          <button class="detail__add bg-color">thêm vào giỏ</button>
          <button class="detail__buy bg-color">mua ngay</button>
          </div>
          
      </div>
  </div>
</div>
</div>
  `
  a(productItem)
  function handleEventsModal() {
    //inner size
    const innerSize = () => {
      let size = $('.detail__sizeName')
      let sizeValue = $('.detail__sizeBtn.active').innerText
      size.innerHTML = `kích thước :${sizeValue}`
    }
    innerSize()
    // control img
    let btnNext = $("#detail__control--next");
    let btnPrev = $("#detail__control--prev");
    btnNext.onclick = function () {
      let productImgHover = $(".detail__item .hidden");
      let productImg = $(".detail__item .visible");
      productImgHover.classList.remove("hidden");
      productImg.classList.add("hidden");
      productImgHover.classList.add("visible");
      productImg.classList.remove("visible");
    };
    btnPrev.onclick = function () {
      let productImgHover = $(".detail__item .hidden");
      let productImg = $(".detail__item .visible");
      productImgHover.classList.remove("hidden");
      productImg.classList.add("hidden");
      productImgHover.classList.add("visible");
      productImg.classList.remove("visible");
    };
    //control product
    let btnPlus = $("#detail__btn--next");
    let btnMinus = $("#detail__btn--prev");
  
    btnPlus.onclick = function () {
      let result = $(".detail__amount");
      let max = Number($(".detail__max").innerText);
      let resultNumber = Number(result.innerText);
      resultNumber++;
      resultNumber = resultNumber > max ? max : resultNumber;
      result.innerText = resultNumber;
    };
    btnMinus.onclick = function () {
      let result = $(".detail__amount");
      let resultNumber = Number(result.innerText);
      resultNumber--;
      resultNumber = resultNumber < 1 ? 1 : resultNumber;
      result.innerText = resultNumber;
    };
    //check size
    let listSizes = $$('.detail__sizeBtn')
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
  activeNavTabsBtn();
    handleNavTabs();
    //color
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
    handleEventsModal()
}
//modal

let idProduct = getData(window.location.href)
const startDetail = (data) => {
  renderDetail(data); 

}
handleLoading()
getApi(productApi,startDetail)

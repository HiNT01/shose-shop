const productApi = "http://localhost:3000/product";
const evaluatesApi = "http://localhost:3000/evaluates";
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const btnSearchProduct = $("#btn-search-hidden");
const listProductSale = $("#product-sale");
const listPerfume = $("#perfume");
const listJewelry = $("#jewelry");
const listProductType = $("#product-type");
const btnNextProductSale = $("#btn__productNext--hover");
const btnPrevProductSale = $("#btn__productPrev--hover");
let currentId = 0;
let limit = 5;
let arrProductAll;
let currentIdAccessory;
let currentIdType = 0;
let btnColorBlack = $("#color--black");
let btnColorDrakBlue = $("#color--drakBlue");
let btnColorViolet = $("#color--violet");
let btnColorBlue = $("#color--blue");
let btnColorBrown = $("#color--brown");
let btnColorRed = $("#color--red");
let btnColorPink = $("#color--pink");
let btnColorGreen = $("#color--green");
let boxDetailBtnClose = $("#box-detail__btn-close");
const COLOR_STT = "COLOR";
let inputSearch = document.getElementById("input-search");
const arrayText = ["Bạn đang tìm gì ...", "Giày...", "Nước hoa", "Sneaker"];
let textId = 0;
let count = 0;
let lengthText = arrayText.length;
// set color local storage
function setColor(colorName) {
  const colorData = {};
  colorData.name = colorName;
  localStorage.setItem(COLOR_STT, JSON.stringify(colorData));
}
//insert chart search
function insertCh() {
    let valueInput = inputSearch.getAttribute("placeholder");
    if (valueInput == null) {
      valueInput = "";
    } else {
      valueInput;
    }
    if (textId < lengthText) {
      let characters = arrayText[textId].split("");
      let lengthCharacters = characters.length;
      if (count < lengthCharacters) {
        inputSearch.setAttribute("placeholder", valueInput + characters[count]);
        count++;
      } else {
        if (valueInput != "") {
          inputSearch.setAttribute("placeholder", valueInput.slice(0, -1));
        } else {
          textId++;
          count = 0;
        }
      }
    } else {
      textId = 0;
    }
  }
//handle change color
function handleChangeColor() {
  btnColorBlack.onclick = function () {
    changeColor(btnColorBlack);
    setColor("black");
  };
  btnColorViolet.onclick = function () {
    changeColor(btnColorViolet);
    setColor("violet");
  };
  btnColorDrakBlue.onclick = function () {
    changeColor(btnColorDrakBlue);
    setColor("drakBlue");
  };
  btnColorRed.onclick = function () {
    changeColor(btnColorRed);
    setColor("red");
  };
  btnColorPink.onclick = function () {
    changeColor(btnColorPink);
    setColor("pink");
  };
  btnColorGreen.onclick = function () {
    changeColor(btnColorGreen);
    setColor("green");
  };
  btnColorBlue.onclick = function () {
    changeColor(btnColorBlue);
    setColor("blue");
  };
  btnColorBrown.onclick = function () {
    changeColor(btnColorBrown);
    setColor("brown");
  };
}
//change color
function changeColor(colorName) {
  let bgColors = $$(".bg-color");
  let textColors = $$(".text-color");
  let textColorAfters = $$(".text-color:after");
  let bgColorOp = $$(".bg-color-op");
  let code = colorName.getAttribute("code-color");
  bgColors.forEach((element) => {
    element.setAttribute(
      "style",
      "background-color: rgba(" + code + ",1)"
    );
  });
  textColors.forEach((element) => {
    element.setAttribute("style", "color: rgba(" + code + ",1)");
  });

  bgColorOp.forEach((element) => {
    element.setAttribute(
      "style",
      "background-color: rgba(" + code + ",0.8)"
    );
  });
  textColorAfters.forEach((element) => {
    element.setAttribute(
      "style",
      "background-color: rgba(" + code + ",1)"
    );
  });
  let color = $$(".color");
  color.forEach((element) => {
    element.classList.remove("color__item--active");
  });
  colorName.classList.add("color__item--active");
}
//btn social
let btnSocial = () => {
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
};
// btn setting color
let btnSttColor = () => {
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
};
//back to top
let backToTop = () => {
  let btnBackTop = $(".btn-back");
  window.onscroll = function () {
    if (
      document.body.scrollTop > 300 ||
      document.documentElement.scrollTop > 300
    ) {
      btnBackTop.classList.remove("hiddenBtnBack");
      btnBackTop.classList.add("showBtnBack");
    } else {
      btnBackTop.classList.remove("showBtnBack");
      btnBackTop.classList.add("hiddenBtnBack");
    }
  };

  btnBackTop.addEventListener("click", function (e) {
    e.preventDefault();
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  });
};
//line nav
let lineNav = () => {
  let lineNav = $(".header__navLine");
  let navItems = $$(".header__navitem");
  let arrWidthNavItem = [];
  let positionLeft = 0;
  navItems.forEach((element, index) => {
    arrWidthNavItem.push(element.clientWidth * index);
    element.onmouseover = function () {
      positionLeft = arrWidthNavItem[index] + 12;
      lineNav.setAttribute("style", "left:" + positionLeft + "px");
    };
  });
};
let colorDefault = () => {
    const objColor = JSON.parse(localStorage.getItem(COLOR_STT));
let colorNameStt = objColor.name;
colorNameStt = colorNameStt ? colorNameStt : "black";
  switch (colorNameStt) {
    case "black":
      changeColor(btnColorBlack);
      break;
    case "blue":
      changeColor(btnColorBlue);
      break;
    case "brown":
      changeColor(btnColorBrown);
      break;
    case "green":
      changeColor(btnColorGreen);
      break;
    case "pink":
      changeColor(btnColorPink);
      break;
    case "red":
      changeColor(btnColorRed);
      break;
    case "drakBlue":
      changeColor(btnColorDrakBlue);
      break;
    case "violet":
      changeColor(btnColorViolet);
      break;
  }
};
let loading = ()=> {
  $('body').classList.add('notScroll')
  $('.loading').classList.remove('hidden')
}
let notLoading = ()=> {
  $('body').classList.remove('notScroll')
  $('.loading').classList.add('hidden')
}
const handleLoading = () => {
    loading()
    setInterval(notLoading,3000)
}
const handleNavMobile = () => {
  let btnOp = $('.header__btnMobile button')
  let menuMobile = $('.nav__mobile')
  let btnCl = $('.nav__mobile-close')
  btnOp.onclick = () => {
    menuMobile.classList.add('nav__mobile-in')
    menuMobile.classList.remove('nav__mobile-out')
    menuMobile.setAttribute('style','top:' + window.pageYOffset +'px')
    $('body').style.overflowY = 'hidden'
  }
  btnCl.onclick = () => {
    menuMobile.classList.remove('nav__mobile-in')
    menuMobile.classList.add('nav__mobile-out')
    $('body').style.overflowY = 'visible'

  }
}
const closeBtnModal = () => {
  let btns = $$('.btn-close')
  btns.forEach(it => {
    it.onclick = () => {
      let modal = $('.modal')
      modal.classList.remove('show')
      $('.modal-backdrop').classList.remove('show')
      $('body').style.overflow = 'visible'
    }
  })
}
let startMain = () => {
  btnSocial();
  btnSttColor();
  backToTop();
  lineNav();
  handleChangeColor();
  colorDefault();
  setInterval(insertCh, 200);
  handleNavMobile()
  // closeBtnModal()
};
startMain();

function handleEventsProduct(data) {
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
    
      //change color 
      handlChangeColor()
      // render detail product
      handleModel(data)
}
function startProduct (data) {
    // default product type
    renderProductType(filterProductType(data,'adidas'))
    // default btn type
    handleActiveType('adidas')
    // lang nghe va xu ly events
    handleEventsProduct(data)
    //color default
    changeColor(btnColorBlack) 
}
getApi(productApi,startProduct)
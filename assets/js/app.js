let inputSearch = document.getElementById("input-search");
const arrayText = ["Bạn đang tìm gì ...", "Giày...", "Nước hoa", "Sneaker"];
let textId = 0;
let count = 0;
let lengthText = arrayText.length;
setInterval(insertCh, 200);
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
// img banner
// const imgBannerApi = 'http://localhost:3000/sliderBanner'

// function renderImgBanner (data) {
//   data.forEach(element => {
//    imgs.push(element.src)
//  })
// }
//  function getApi (callback) {
//   fetch(imgBannerApi)
//   .then(function (response) {
//       return response.json();
//   })
//   .then(callback)
// }
// getApi(renderImgBanner)
// console.log(imgs)
// ---hover btn banner
let btnNextHover = document.querySelector("#btn__next");
let btnNext = document.querySelector("#btn__next--hover");
let btnPrevHover = document.querySelector("#btn__prev");
let btnPrev = document.querySelector("#btn__prev--hover");
// function btn hover
function btnHover (btn1,btn2) {
  btn1.onmouseover = function () {
    btn2.classList.add("btn--hover");
  };
  btn2.onmouseout = function () {
    btn2.classList.remove("btn--hover");
  };
}
btnHover(btnNextHover,btnNext)
btnHover(btnPrevHover,btnPrev)

let imgs = ["./assets/img/slider1.webp","./assets/img/slider2.webp"]
// ------- số slider
let text = ''
for(let i = 0; i < imgs.length;i++){
    text+=`<button class="banner__dot"></button>`
}
document.getElementById("dot").innerHTML = text
// -------------
let elementImg = document.getElementById("banner__img");
let elementDots = document.querySelectorAll(".banner__dot");
let lengthImgs = imgs.length;
let indexImg = 0;
let nthIndex = 1
let qs = ".banner__dot:nth-child(" + nthIndex + ")";
let elementDot = document.querySelector(qs);
// them slider dau tien
elementImg.setAttribute("src", imgs[indexImg]);
//  xoa class all dot
elementDots.forEach((element) => {
  element.classList.remove("color--black");
});
// thay doi bg color dot
elementDot.classList.add("color--black");
// ham next slider
function nextSlider () {
    indexImg++;
    if ((indexImg == lengthImgs)) {
      indexImg = 0
    } else {
      indexImg;
    }
    nthIndex = indexImg + 1;
    qs = ".banner__dot:nth-child(" + nthIndex + ")";
    elementDot = document.querySelector(qs);
    elementImg.setAttribute("src", imgs[indexImg]);
    elementDots.forEach((element) => {
      element.classList.remove("color--black");
    });
    elementDot.classList.add("color--black");
  };
//  hàm prev slider
  function prevSlider () {
    indexImg--;
    if (indexImg < 0) {
      indexImg = lengthImgs - 1;
    } else {
      indexImg;
    }
    nthIndex = indexImg + 1;
    qs = ".banner__dot:nth-child(" + nthIndex + ")";
    elementDot = document.querySelector(qs);
    elementImg.setAttribute("src", imgs[indexImg]);
    elementDots.forEach((element) => {
      element.classList.remove("color--black");
    });
    elementDot.classList.add("color--black");
  };
btnPrev.onclick = prevSlider
btnNext.onclick = nextSlider
setInterval(nextSlider,10000)
// end

// count down
const TIME_COUNT_DOWN = 'TIME'
// setTime(18,9,9,9)
function setTime (day,hour,minute,second) {
  const timeData = {}
  timeData.day = day
  timeData.hour = hour
  timeData.minute = minute
  timeData.second = second
  localStorage.setItem(TIME_COUNT_DOWN,JSON.stringify(timeData))
}
const objTime = JSON.parse(localStorage.getItem(TIME_COUNT_DOWN))
function countDown (day,hours,minute,second) {
  let liDay = document.getElementById("day")
  let liHours = document.getElementById("hours")
  let liMinute = document.getElementById("minute")
  let liSecond = document.getElementById("second")
  if(hours > 23 ) {
    hours = 23
  }
  if(minute > 59 ) {
    minute = 59
  }
  if(second > 59 ) {
    second = 59
  }
  liDay.innerHTML =  day
  liHours.innerHTML =  hours
  liMinute.innerHTML =  minute
  liSecond.innerHTML =  second

  setInterval(secondDown,1000)
  function secondDown () {
    second--
    liSecond.innerHTML =  second
    if(second == 0) {
      second = 60
      minute--
    liSecond.innerHTML =  second
    liMinute.innerHTML =  minute
    }
    if(minute == 0) {
      minute = 59
      hours--
  liMinute.innerHTML =  minute
      liHours.innerHTML =  hours
    }
    if(hours == 0) {
      hours = 23
      day--
  liHours.innerHTML =  hours
      liDay.innerHTML =  day
    }
    if(day == 0) {
      liDay.innerHTML =  0
  liHours.innerHTML =  0
  liMinute.innerHTML =  0
  liSecond.innerHTML =  0
    }
    setTime(day,hours,minute,second)
  }
  
}

countDown(objTime.day,objTime.hour,objTime.minute,objTime.second)

// ---hover btn product sale
let btnProductNextHover = document.querySelector("#btn__productNext");
let btnProductNext = document.querySelector("#btn__productNext--hover");
let btnProductPrevHover = document.querySelector("#btn__productPrev");
let btnProductPrev = document.querySelector("#btn__productPrev--hover");
btnHover(btnProductNextHover,btnProductNext)
btnHover(btnProductPrevHover,btnProductPrev)


 
  
  
  

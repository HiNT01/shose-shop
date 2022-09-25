let inputSearch = document.getElementById("input-search");
const arrayText = ["Bạn đang tìm gì ...", "Giày...", "Nước hoa", "Sneaker"];
let textId = 0;
let count = 0;
let lengthText = arrayText.length;
setInterval(insertCh, 200);

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







 
  
  
  

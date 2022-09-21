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
countDown(objTime.day,objTime.hour,objTime.minute,objTime.second)

// ---hover btn product sale
let btnProductNextHover = document.querySelector("#btn__productNext");
let btnProductNext = document.querySelector("#btn__productNext--hover");
let btnProductPrevHover = document.querySelector("#btn__productPrev");
let btnProductPrev = document.querySelector("#btn__productPrev--hover");
btnHover(btnProductNextHover,btnProductNext)
btnHover(btnProductPrevHover,btnProductPrev)
//---hover btn product acessery
let btnJewelrytNext = document.querySelector("#btn__jewelrytNext");
let btnJewelrytNextHover = document.querySelector("#btn__jewelrytNext--hover");
let btnJewelrytPrev = document.querySelector("#btn__jewelrytPrev");
let btnJewelrytPrevHover = document.querySelector("#btn__jewelrytPrev--hover");
btnHover(btnJewelrytNext,btnJewelrytNextHover)
btnHover(btnJewelrytPrev,btnJewelrytPrevHover)
//
let btnPerfumeNext = document.querySelector("#btn__perfumeNext");
let btnPerfumeNextHover = document.querySelector("#btn__perfumeNext--hover");
let btnPerfumePrev = document.querySelector("#btn__perfumePrev");
let btnPerfumePrevHover = document.querySelector("#btn__perfumePrev--hover");
btnHover(btnPerfumeNext,btnPerfumeNextHover)
btnHover(btnPerfumePrev,btnPerfumePrevHover)
getApi(productApi,start)
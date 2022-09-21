const arr = [
    [2,3,5],
    [3,6,8],
    [4,6,8]
]

    let isExistEvenNumber = true
    arr.forEach(item => {
        isExistEvenNumber = item.some((it) => it % 2 === 0) ? isExistEvenNumber : false
    } )
    console.log(isExistEvenNumber)

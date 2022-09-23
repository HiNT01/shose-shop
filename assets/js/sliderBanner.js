
//bai A
const arr = [1, 5, 6, 2, 1, 3];
let result = arr.filter((item) => item % 2 !== 0);
console.log("bai A", result);
//bai B
const arr1 = [1, 5, 6, 2, 1, 3];
const arr2 = [4, 5, 5, 5, 8, 10];

let arr12 = arr1.concat(arr2);

let result1 = arr12.filter((item) => item % 2 === 0);
console.log("bai B", result1);
//bai C
let checkNumber = (item) => {
  if(item <= 1) return false
  if(item === 2) return true
  if(item % 2 === 0) return false 
  for (let i = 3; i < item; i = i + 2) {
   if(item % i ===0) {
    return false
   }
  }
  return true;
};
// bai D
const arr3 = [1, 2, 10, 4, 5, 6, 9];
let result3 = [];
arr3.forEach((item) => {
  checkNumber(item) ? result3.push(item) : 1;
});
console.log(result3);
// bai E
let result4 = arr3.reduce((sum, item) => {
  return checkNumber(item) ? (sum = sum + item) : sum;
}, 0);
console.log(result4);
// bai F
let checkNumberPerfect = (item) => {
  let sum = 1;
  for (let i = 2; i < item; i++) {
    sum += item % i ? 0 : i;
  }
  let result = sum === item ? true : false;
  return result;
};

const listStudent = [
  {
    id: 1,
    name: "nguyen van a",
    age: 10,
    email: "nguyenvana@gmail.com",
    scores: [1, 3, 4, 5],
    city: "HN"
  },
  {
    id: 2,
    name: "nguyen van B",
    age: 11,
    email: "nguyenvana@gmail.com",
    scores: [1, 6, 8, 3, 1],
    city: "HY"
  },
  {
    id: 3,
    name: "nguyen van C",
    age: 9,
    email: "nguyenvana@gmail.com",
    scores: [1, 6, 1],
    city: "TB"
  },
  {
    id: 4,
    name: "nguyen van D",
    age: 12,
    email: "nguyenvana@gmail.com",
    scores: [1, 6, 8, 3, 1, 8, 9],
    city: "ND"
  },
  {
    id: 5,
    name: "nguyen van e",
    age: 14,
    email: "nguyenvana@gmail.com",
    scores: [1, 6, 5, 7, 3, 1],
    city: "ND"
  }
];


let sumAge = listStudent.reduce((result,item) => {
  let { age } = item
  return result += age
},0)
console.log('tong so tuoi', sumAge)

const avgScores = (arr) => {
  let length = arr.length;
  let sum = arr.reduce((result, item) => result + item, 0);
  let avg = sum / length;
  return avg;
};
let result2 = listStudent.filter((item) =>  avgScores(item.scores) >= 5 && item.city === 'HN')
console.log('list', result2)

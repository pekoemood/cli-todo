const todo = 'やること'

const data: number[] = [...Array(10).keys()].map((k) => k + 1);


const addData: number[] = [...Array(10).keys()].map((k) => k + 11);

const newData = [...data, ...addData];

console.log(Math.floor(Math.random() * 10));
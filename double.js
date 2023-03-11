// const dbl =(n)=>n*2;

// console.log(dbl(10));

// console.log(global);//Only works on Node JS

// console.log(process.argv);//argv => argument value

// console.log(dbl((process.argv[2])));

const CtoF = (a)=>(a*(9/5)+32).toFixed(3);
const [, , a] = process.argv;
console.log(`Temp in C to F is ${CtoF(a)}`);


// const fs =require("fs");

// const quote="hello world";

// fs.writeFile("./awesome.html",quote,(err)=>{
//     console.log("Completed");
// })

const quote2="Live more, worry less";

console.log(process.argv);
const [, , c] = process.argv;


for(let a=1;a<=c;a++){
    fs.writeFile(`./backup/text${a}.html`,quote2,(err)=>{
        console.log("Completed");
    })
}
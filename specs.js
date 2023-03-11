const os = require('os');
console.log("Free memory",(os.freemem()/1024/1024/1024).toFixed(2),"GB");
console.log("total memory",(os.totalmem()/1024/1024/1024).toFixed(2),"GB");

console.log("Version",os.version());
console.log("CPU",os.cpus());
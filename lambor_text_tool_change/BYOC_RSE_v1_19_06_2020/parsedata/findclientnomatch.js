var fs= require('fs')
const cUs = require('../English_28US29.json');//customer
const map = require('./origintoCmap.json')
var res =[]


function findmapinkey (obj){
    Object.keys(obj).forEach((key)=>{
        var match =false;
        for(i in map){
            if(key == map[i]){
                console.log(key+'   '+i)
                match = true
                break
            }
        }


        if(!match){
            res.push(key)
        }
    })

}

findmapinkey(cUs)
console.log(res)
fs.writeFileSync('./clinetnomatchkey.json',JSON.stringify(res))
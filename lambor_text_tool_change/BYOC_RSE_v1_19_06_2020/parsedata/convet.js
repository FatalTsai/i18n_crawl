const  fs=require('fs')
const merge = require('deepmerge')
const flaten= JSON.parse( fs.readFileSync('flat_en.json'))
const map = require('./origintoCmap.json')
const clientraw = require('../English_28US29.json')
const clientnonmatchkey = require('./clinetnomatchkey.json')
var res = {}
var tmp = {} //save the key that only exist in origin
var client ={}
function convert(flaten){
    Object.keys(flaten).forEach((key)=>{
        if(map[key]!='errorNOmatchQAQ')
        {
            //console.log(map[key])
            res[map[key]] = clientraw[map[key] ]
        }
        else
        {
            tmp[key]= flaten[key]
        }
    })
    //res = merge(res,tmp)

    clientnonmatchkey.forEach(element => {
        client[element] = clientraw[element]
    });
}


convert(flaten)

console.log(res)
fs.writeFileSync('repeat.json',JSON.stringify(res))
fs.writeFileSync('origin.json',JSON.stringify(tmp))
fs.writeFileSync('client.json',JSON.stringify(client))

//console.log(clientraw)
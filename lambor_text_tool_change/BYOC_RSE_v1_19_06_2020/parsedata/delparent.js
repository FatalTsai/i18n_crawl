const new_en =require('./new_en.json')
const repeat = require('./repeat.json')
const origin = require('./origin.json')
const client = require('./client.json')
const fs = require('fs')
const merge = require('deepmerge')
var new_origin = {}
var res={}

Object.keys(origin).forEach((key)=>{
    //console.log(key)
    var tmp = key.split('.')
    //console.log(tmp)
    tmp = tmp[tmp.length-1]
    new_origin[tmp]= origin[key] 
})

//console.log(new_origin)
//console.log(res)
res = merge(repeat,new_origin)
res = merge(res,client)

fs.writeFileSync('delparent.json',JSON.stringify(res) )
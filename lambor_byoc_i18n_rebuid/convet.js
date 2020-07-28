const  fs=require('fs')
const merge = require('deepmerge')
//const flaten= JSON.parse( fs.readFileSync('flat_en.json'))
const map = require('./origintoCmap.json')
//const clientraw = require('./client_json/English_28US29.json')
const clientnonmatchkey = require('./clinetnomatchkey.json')
//const en_US = require('./i18n_old/en_US.json');
const path = require('path')



function traverseAndFlatten(currentNode, target, flattenedKey) {
    for (var key in currentNode) {
        if (currentNode.hasOwnProperty(key)) {
            var newKey;
            if (flattenedKey === undefined) {
                newKey = key;
            } else {
                newKey = flattenedKey + '.' + key;
            }

            var value = currentNode[key];
            if (typeof value === "object") {
                traverseAndFlatten(value, target, newKey);
            } else {
                target[newKey] = value;
            }
        }
    }
}

let flatten = function (obj) {
    var flattenedObject = {};
    traverseAndFlatten(obj, flattenedObject);
    return flattenedObject;
}


var res = {}
var tmp = {} //save the key that only exist in origin
var client ={}
function convert(flaten,clientraw){
    Object.keys(flaten).forEach((key)=>{
        if(map[key]!='errorNOmatchQAQ')
        {
            //console.log(map[key])
            res[map[key]] = clientraw[map[key] ]
        }
        else
        {   
            let shoten_key = key.split('.')
            shoten_key = shoten_key[shoten_key.length-1]

            tmp[shoten_key]= flaten[key]
        }
    })
    //res = merge(res,tmp)

    clientnonmatchkey.forEach(element => {
        client[element] = clientraw[element]
    });
}

const i18nlist = [
    'ar_AE.json',  'cs_CZ.json',
    'da_DK.json',  'de_DE.json',
    'el_GR.json',  'en_US.json',
    'es_ES.json',  'es_MX.json',
    'fr_CA.json',  'fr_FR.json',
    'hu_HU.json',  'it_IT.json',
    'ja_JP.json',  'ko_KR.json',
    'nl_BE.json',  'nn_NO.json',
    'pl_PL.json', 'pt_BR.json',
    'pt_PT.json',  'ro_RO.json',
    'ru_RU.json',  'sv_SE.json',
    'tr_TR.json',  'zh_TW.json'
  ]

i18nlist.forEach(element => {

    console.log(element)
    var i18n_old = JSON.parse ( fs.readFileSync(path.join('./i18n_old',element)) )
    var client = JSON.parse ( fs.readFileSync(path.join('./client_json',element)) )

    //console.log(client)


    let flaten = flatten(i18n_old)
    convert(flaten,client)



    res = merge(res,tmp)
    res = merge(res,client)

    fs.writeFileSync(path.join('./generate',element),JSON.stringify(res,null,2))
    
});



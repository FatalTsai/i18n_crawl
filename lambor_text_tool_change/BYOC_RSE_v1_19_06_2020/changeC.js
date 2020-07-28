// verify our every key 

const cUs = require('./English_28US29.json');//customer
const oUs = require('./parsedata/flat_en.json'); //origin 
const executor = require('child_process').exec;
const  ssim = require('string-similarity');
const fs = require('fs');
//var similarity = stringSimilarity.compareTwoStrings('esaled', 'sealed');

let matchingCnt = 0;
let nonMatchingCnt = 0;
let objCnt = 0;
let res = {}

function compare(a,b) {
  if (a.rate < b.rate)
     return -1;
  if (a.rate > b.rate)
    return 1;
  return 0;
}

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


function flatten(obj) {
    var flattenedObject = {};
    traverseAndFlatten(obj, flattenedObject);
    return flattenedObject;
}

function recursiveJsonParser(obj) {
  objCnt += Object.keys(obj).length;
  // console.log(obj)
  //console.log(` ${Object.keys(obj).length}`)
  Object.keys(obj).forEach((key)=>{
      let match = false
      var matchlist=[]
      for (i in cUs) {
        //console.log(i)
        if (typeof i == 'object') {
            recursiveJsonParser(i)
            //res+= i+'\n'
        }
        //console.log(`i: ${i}   typeof ${typeof(i)}`)
        
        let matchrate = ssim.compareTwoStrings(cUs[i].toLowerCase() ,obj[key].toLowerCase() ) 
          if(matchrate > 0.5){
          match = true
        // console.log(`${i} == ${key} [${obj[key]}]"`)
          //match = true
          //console.log(`${key}  match rate ${matchrate}`)
          matchlist.push({
            key: i ,
            text:cUs[i],
            rate:matchrate
          }) 
        }
      }
      matchlist = matchlist.sort(compare)
      matchlist = matchlist.reverse()

      if(match)
      {
        /*
        res += `${key} match rate ${matchlist[0].rate}\n`
        res += '   '+obj[key]+'\n'
        res += '   '+matchlist[0].text+'\n'
        */

       // console.log(`${key} match rate ${matchlist[0].rate}`)
        //console.log('   '+obj[key])
        //console.log('   '+matchlist[0].text)
        //console.log(res)
      
        res[key] = matchlist[0].key
      }




      match? matchingCnt++:  nonMatchingCnt++;
      if (!match) {
        res[key] = 'errorNOmatchQAQ'
        //console.log('fuck')
        //console.log(key)
        //console.log(res)
        //console.log('   '+obj[key])
 //       console.log('val ' + val);
        //run(`echo ${key}  >> not_match`);
        //console.log(`${key} not match`)
      }
    
  })
   console.log('matching ' + matchingCnt);
   console.log('n matching ' + nonMatchingCnt);
   console.log('origin lenght: ' + objCnt)
};


//console.log( flatten(oUs) )
recursiveJsonParser(flatten(oUs));
//console.log(cUs)
console.log(res)
//res = flatten(oUs)
fs.writeFileSync('./record.json',JSON.stringify(res))

//fs.writeFileSync('./record.json','fuck')


function run(cmd) {
  return new Promise(function(rso, rej) {
    executor(cmd, function(error, stdout, stderr) {
      if (error || stderr) {
        rej(new Error(`error [${error}], stderr[${stderr}]`));
      }
      rso(stdout.replace(/(\r\n|\n|\r)/gm, ''));
    });
  });
}

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
let res = ''

function compare(a,b) {
  if (a.rate < b.rate)
     return -1;
  if (a.rate > b.rate)
    return 1;
  return 0;
}

function recursiveJsonParser(obj) {
  objCnt += Object.keys(obj).length;
  // console.log(obj)
  //console.log(` ${Object.keys(obj).length}`)
  Object.keys(obj).forEach((key)=>{
    if (typeof obj[key] == 'object') {
     recursiveJsonParser(obj[key])
    } else {
      let match = false
      var matchlist=[]
      for (i in oUs) {
        // console.log(`i: ${i}`)
        let matchrate = ssim.compareTwoStrings(oUs[i].toLowerCase() ,obj[key].toLowerCase() ) 
          if(matchrate > 0.5){
            //console.log('fuck')
          match = true
          // console.log(`${i} == ${key} [${obj[key]}]"`)
          //match = true
          //console.log(`${key}  match rate ${matchrate}`)
          matchlist.push({
            key: i,
            text:oUs[i],
            rate:matchrate
          }) 
        }
      }
      matchlist = matchlist.sort(compare)
      matchlist = matchlist.reverse()

      if(match)
      {
        
        res += `${key} match rate ${matchlist[0].rate}\n`
        res += '   '+obj[key]+'\n'
        res += '   '+matchlist[0].text+'\n'
        console.log(`${key} match rate ${matchlist[0].rate}`)
        console.log('   '+obj[key])
        console.log('   '+matchlist[0].text)
        
      }




      match? matchingCnt++:  nonMatchingCnt++;
      if (!match) {
        res += key+'\n'
        console.log('   '+obj[key])
 //       console.log('val ' + val);
        //run(`echo ${key}  >> not_match`);
        //console.log(`${key} not match`)
      }
    }
  })
   console.log('matching ' + matchingCnt);
   console.log('n matching ' + nonMatchingCnt);
   console.log('origin lenght: ' + objCnt)
};


recursiveJsonParser(cUs);
fs.writeFileSync('recond',res)




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

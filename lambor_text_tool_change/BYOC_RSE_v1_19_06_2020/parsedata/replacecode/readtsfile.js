const fs = require('fs')
const path = require('path')
var directoryPath = 'D:/cheney.tsai/Desktop/desktop_data/BYOC/byoc_hmi/src/app/main/settings/'
var file = 'settings.component.html'



var data =  fs.readFileSync(path.join(directoryPath ,file),'utf8')
data.replace(/\| translate/,'|trasnslate')
console.log(data)
//fs.writeFileSync(path.join(directoryPath ,file),String(data))
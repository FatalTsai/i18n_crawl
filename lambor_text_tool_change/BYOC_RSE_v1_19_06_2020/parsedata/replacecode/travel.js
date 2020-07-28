//requiring path and fs modules
const path = require('path');
const fs = require('fs');
//joining path of directory 
//const directoryPath = '../../../../../'
//const directoryPath = 'C:/'
const directoryPath ='D:/cheney.tsai/Desktop/desktop_data/BYOC/byoc_hmi/src'

//passsing directoryPath and callback function

function travel(directoryPath,depth){
    var space=''
    for(var i=0;i<depth;i++)
        space+='    '

    fs.readdir(directoryPath, function (err, files) {
        //handling error
        if (err) {
            return console.log('Unable to scan directory: ' + err);
        } 
        //listing all files using forEach
        files.forEach(function (file) {
            // Do whatever you want to do with the file
            var filestat = fs.statSync(path.join(directoryPath,file))
            //console.log('fuck')
            //console.log(space + file + '    ' + path.extname(file)  ); 

            if(filestat.isDirectory()){
                travel(path.join(directoryPath,file) , depth+1)

            }
            else if (path.extname(file) ==  '.ts')
            {
                console.log(space + file + '    ' + path.extname(file)  ); 
                
                                
                var data =  fs.readFileSync(path.join(directoryPath ,file),'utf8')
                data = data.replace(/\'Settings\'/g,`'Settings_Headline'`)
                //data = data.replace(/\|\stranslate/,'|trasnslate')

                console.log(data)
                //fs.writeFileSync(path.join(directoryPath ,file),String(data))
                //var data = JSON.stringify ( fs.readFileSync(path.join(directoryPath ,file)) )
                //data.replace(/\| translate/,'|trasnslate')
               // console.log(data)
                fs.writeFileSync(path.join(directoryPath ,file),String(data))
            }
        });
    });
    
}
travel(directoryPath,0)






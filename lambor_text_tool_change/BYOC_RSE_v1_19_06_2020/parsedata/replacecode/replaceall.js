//requiring path and fs modules
const path = require('path');
const fs = require('fs');
const map = require('../origintoCmap.json')
//joining path of directory 
//const directoryPath = '../../../../../'
//const directoryPath = 'C:/'
const directoryPath ='D:/cheney.tsai/Desktop/byoc_hmi/projects/lambor'

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

                Object.keys(map).forEach(key => {
                    if(map[key]!='errorNOmatchQAQ'){
                        //console.log(key+'   '+map[key])
                        //return this.replace(new RegExp(s1,"gm"),s2); 
                        var tmp = `'${key}'`
                        data = data.replace(new RegExp(tmp,"g"),`'${map[key]}'`)
                            
                    }
                    else
                    {
                        var new_key = `'${key}'`
                        var tmp = key.split('.')
                        tmp = `'${tmp[tmp.length-1]}'`
                        data = data.replace(new RegExp(new_key,"g"),tmp)

                        //console.log(key+'   '+tmp)
                    }
                });
                



                //data = data.replace(/\'\'/g,`'${map['user_guid}'e']`)
                //data = data.replace(/\|\stranslate/,'|trasnslate')

                console.log(data)
                fs.writeFileSync(path.join(directoryPath ,file),String(data))
            }
        });
    });
    
}
travel(directoryPath,0)



/*
Object.keys(map).forEach(key => {
    if(map[key]!='errorNOmatchQAQ')
        console.log(key+'   '+map[key])
    else
    {
        var tmp = key.split('.')
        tmp = tmp[tmp.length-1]
        console.log(key+'   '+tmp)
    }
});

*/
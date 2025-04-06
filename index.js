// this file for encrypt with node js
const {Transform} = require('node:stream')
const fs = require('node:fs/promises')

class Encrypt extends Transform{
    _transform(chunk,encoding,callback){
        for (let i = 0; i<chunk.length; i++){
            if(chunk[i] !== 255){
                chunk[i] = chunk[i] +1 
            }
        }
        callback(null,chunk)
    }
}

(async function (){
    const readFileHandle =  await fs.open('read.txt','r')
    const writeFileHandle =  await fs.open('write.txt','w')

    let readStream = readFileHandle.createReadStream()
    let writeStream = writeFileHandle.createWriteStream()

    let encrypt = new Encrypt()
    readStream.pipe(encrypt).pipe(writeStream)

})()
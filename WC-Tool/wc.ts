import fs from 'fs';

/**
 * 
 */

async function readStream(stream:NodeJS.ReadStream | fs.ReadStream) : Promise<Buffer> {
    const chunks: any = [];
    for await(const chunk of stream){
        chunks.push(Buffer.from(chunk));
    }
    return Buffer.concat(chunks);
}

/**
 * 
 */
function byteCount(file:string): number{
    return fs.statSync(file).size;
}

/**
 * 
 */
function lineCnt(text: string) : number {
    return text.split(/\r\n|\r|\n/).length -1;
}



/**
 * 
 */
async function wc(argv:string[], stream?: NodeJS.ReadStream | fs.ReadStream) {
    
}

export {wc};
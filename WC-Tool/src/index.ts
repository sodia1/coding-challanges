import * as fs from "fs";
import {argv, stdin } from "process";
import path from "path";
import Wc from "./wc";

function main(){
    if(stdin && !stdin.isTTY){
        if(argv.length===3){
            const option = argv[2];
            handleInput(stdin, option);
        }else if(argv.length===2){
            handleInput(stdin);
        }
    }

    else if(argv.length>=3){
        if(argv.length===4){
            const filePath = argv[2];
            if(!fs.existsSync(path.join(__dirname,filePath))){
                throw new Error(`File not found at ${path.join(__dirname,filePath)}`);
            }
            const option = argv[3];
            handleFile(filePath, option);
        }else if(argv.length===3){
            const filePath = argv[2];
            if(!fs.existsSync(path.join(__dirname, filePath))){
                throw new Error(`File not found at ${filePath}`);
            }
            handleFile(filePath)
        }
    }else{
        throw new Error(`Please provide file path or pipe Input.`)
    }
}

function handleInput(stream: NodeJS.ReadStream | fs.ReadStream, option?: string){
    Wc.myWC({option: option|| "", stream}).then((out)=> console.log(out))
}

function handleFile(filePath: string, option?: string){
    Wc.myWC({option: option|| "", file: filePath}).then((out)=> console.log(out))
}

main();
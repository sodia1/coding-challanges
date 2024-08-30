import * as fs from "fs";
import * as path from "path";

export default class Wc{

  /**
   * this function read a given stream and returns a promise of string
   * @async
   * @param {NodeJS.ReadStream} stream
   * @returns {Promise<string>}
   */
  static async streamToString(
    stream: NodeJS.ReadStream | fs.ReadStream
  ) : Promise<string> {
    const chunks: any = [];
    for await(const chunk of stream){
      chunks.push(Buffer.from(chunk));
    }

    return Buffer.concat(chunks).toString("utf-8");
  }

  /**
   * this function return the byte of given string
   * @param {string} text
   * @returns {number}
   */
  static getBytesCount(text: string): number{
    return new Blob([text]).size;
  }

  /**
   * this function return the count of lines
   * 
   * @param {string} text
   * @returns {number}
   */
  static getLinesCount(text: string): number {
    return text.split(/\r\n|\r|\n/).length;
  }

  /**
   * this return words in a file
   * @param { string } text 
   * @returns {number}
   */
  static getWordCount(text:string): number {
    if(text.length<=0) return 0;

    return text.trim().split(/\s+/).length
  }

  /**
   * this return count of char in a file
   * @param {string} text 
   * @returns {number}
   */
  static getCharCount(text: string): number {
    return text.length;
  }

  /**
   * 
   * @param option 
   * @param text 
   * @returns 
   */
  static handleOptions(option: string, text: string): string {
    switch (option.toLowerCase()){
      case "-c": 
        return `${this.getBytesCount(text)}`;
      case "-l":
        return `${this.getLinesCount(text)}`;
      case "-w":
        return `${this.getWordCount(text)}`;
      case "-m":
        return `${this.getCharCount(text)}`;
      case "":
        return `${this.getBytesCount(text)} ${this.getLinesCount(text)} ${this.getWordCount(text)} ${this.getCharCount(text)}`;
      default:
        throw new Error("Can't find option");
    }
  }

  static async countFromStream(stream: NodeJS.ReadStream | fs.ReadStream, option: string): Promise<string>{
    const text = await this.streamToString(stream);
    return this.handleOptions(option,text);
  } 

  /**
   * 
   * @param file 
   * @param option 
   * @returns 
   */
  static countFromFile(file: string, option: string): string {
    const filePath = path.join(__dirname, file);
    const text = fs.readFileSync(filePath, "utf8");
    return this.handleOptions(option, text);
  }

/**
 * 
 * @param param0 
 * @returns 
 */
  static async myWC({option, file, stream}: {
    option: string, file? : string, stream? : NodeJS.ReadStream | fs.ReadStream
  }): Promise<string>{
    let text;
    if(stream){
      text = await this.countFromStream(stream, option);
    }else if(file){
      text = await this.countFromFile(file, option);
    }else{
      throw new Error(`Provide file or stream`);
    }

    return text;
  }

}
import Axios from 'axios';
import * as fs from "fs";
import * as path from 'path';
import { uid } from 'uid-ts';
export class Ultilise {
    getRandomInt(low, high): number {
        return Math.floor(Math.random() * (high - low) + low)
    }
    async downloadImage (gallaryId: number,url: string) { 
      let dir = path.join(`${__dirname}/../../img/gallary-${gallaryId}`);
      if (await this.checkFileExists(dir)){
        const fileName = await uid(11);
        const writer = fs.createWriteStream(path.join(`${__dirname}/../../img/gallary-${gallaryId}/${fileName}.jpg`));
        const response = await Axios({
          url,
          method: 'GET',
          responseType: 'stream'
        })
      
        response.data.pipe(writer)
      
        return new Promise((resolve, reject) => {
          response.data.on('end', resolve)
          response.data.on('error', reject)
        })}
      }
    async checkFileExists(file) {
      return fs.promises.access(file, fs.constants.F_OK)
                .then(() => true)
                .catch(() => false)
    }
}

export default new Ultilise();
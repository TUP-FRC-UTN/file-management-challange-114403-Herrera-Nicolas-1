import { Injectable } from '@angular/core';
import { FileItem, FileOwner, FileType } from '../../models/file.item.model';
import { FILE_LIST,OWNERS } from "../../data/file.storage"

@Injectable({
  providedIn: 'root'
})
export class InfoService {

  fileList: FileItem[] = FILE_LIST;
  Owners: FileOwner[] = OWNERS;

  constructor() {

   }

  getFileList(): FileItem[] {
    return this.fileList;
  }
  getFolders(): FileItem[] {
   let folderList: FileItem[] = [];

    for (let file of this.fileList) {
      if (file.type === FileType.FOLDER) {
        folderList.push(file);
      }
    }

    return folderList;
  }
  getOwners(): FileOwner[] {
    return this.Owners;
  }
  addNewFile(file: FileItem) {
    this.fileList.push(file);
  }
}

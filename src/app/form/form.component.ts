import { Component, EventEmitter, Output } from '@angular/core';
import { InfoService } from '../services/info.service';
import { FileItem, FileOwner, FileType } from '../../models/file.item.model';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css',
})
export class FormComponent {

  FileType = FileType;
  contador: number = 1;
  Owners: FileOwner[] = [];
  selectedOwners: FileOwner[] = [];
  selectedOwner: any;
  folderList: FileItem[] = [];
  @Output() openForm = new EventEmitter<boolean>(); 
  get fileTypes(): string[] {
    return Object.values(this.FileType) as string[];
  }

  addOwner() {
    this.selectedOwners.push(this.selectedOwner);
    this.Owners.splice(this.Owners.indexOf(this.selectedOwner), 1);
    console.log(this.selectedOwners);
  }
  removeOwner(owner: FileOwner) {
    this.Owners.push(owner);
    this.selectedOwners.splice(this.selectedOwners.indexOf(owner), 1);
  }
  constructor(private infoService: InfoService) {
    this.Owners = infoService.getOwners();
    this.folderList = infoService.getFolders();
  }
  onSubmit(form: NgForm) {
    if (form.valid) {
      let item: FileItem = {
        name: form.value.name,
        creation: form.value.date,
        type: form.value.type,
        owners: this.selectedOwners,
        parentId: form.value.folder,
        id: this.getRandomId(),
      };
      
      this.infoService.addNewFile(item);
      this.openForm.emit(false);
    }
  }
  getRandomId(): string {
    const randomNumber = Math.floor(Math.random() * 1000000);

    const idString = randomNumber.toString();

    return idString;
  }
}

import { Component, EventEmitter, Output } from '@angular/core';
import { InfoService } from '../services/info.service';
import { FileItem, FileType } from '../../models/file.item.model';
import { CommonModule, DatePipe } from '@angular/common';
import { TruncatePipe } from '../truncate.pipe';



declare const bootstrap: any;
@Component({
  selector: 'app-listado',
  standalone: true,
  imports: [CommonModule,DatePipe, TruncatePipe],
  templateUrl: './listado.component.html',
  styleUrl: './listado.component.css',
})
export class ListadoComponent {
  FileType = FileType;
  fileList: FileItem[];
  selectedFileList: FileItem[]=[];
  @Output() openForm = new EventEmitter<boolean>(); 

  constructor(private infoService: InfoService) {
    this.fileList = infoService.getFileList();
    console.log(this.fileList);
  }
  ngAfterViewInit(): void {
    // Inicializa los tooltips
    const tooltipTriggerList = [].slice.call(
      document.querySelectorAll('[data-bs-toggle="tooltip"]')
    );
    tooltipTriggerList.map(
      (tooltipTriggerEl) => new bootstrap.Tooltip(tooltipTriggerEl)
    );
  }
  selectFile(file: FileItem, event: any) {
   
    if (event.target.checked) {
      this.selectedFileList.push(file);
    } else {
      this.selectedFileList.splice(this.selectedFileList.indexOf(file), 1);
    }
    
  }

  deleteFiles() {
    console.log(this.selectedFileList.length);
    if (this.selectedFileList.length>1) {
      if (confirm('Are you sure you want to delete ' + this.selectedFileList.length + ' files?')) {
        this.selectedFileList.forEach(file => {
          this.fileList.splice(this.fileList.indexOf(file), 1);
        });
      }else{
        alert('No files deleted');
      }
    } else {
      this.fileList.splice(this.fileList.indexOf(this.selectedFileList[0]), 1);
      
    }
  }
}

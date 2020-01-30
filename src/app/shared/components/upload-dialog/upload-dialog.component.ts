import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { FileSystemFileEntry } from 'ngx-file-drop';
import { PageDialogComponent } from 'src/app/shared/components/page-dialog/page-dialog.component';

@Component({
    selector: 'app-upload-dialog',
    templateUrl: './upload-dialog.component.html'
})
export class UploadDialogComponent implements OnInit {

    myReader: FileReader;
    data = {
        name: '',
        storyString: ''
    };

    constructor(
        public dialogRef: MatDialogRef<PageDialogComponent>
    ) {
    }

    ngOnInit() {
        this.myReader = new FileReader();
        this.myReader.onloadend = this.onImageLoaded;
    }

    dropped(files) {
        for (const droppedFile of files) {
            if (droppedFile.fileEntry.isFile) {
                const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
                fileEntry.file((file: File) => {
                    this.data.name = file.name;
                    this.myReader.readAsDataURL(file);
                });
            }
        }
    }

    onImageLoaded = () => {
        const arr = this.myReader.result.toString().split(',');
        const mime = arr[0].match(/:(.*?);/)[1];
        this.data.storyString = atob(arr[1]);
        this.leave();
    }

    leave() {
        this.dialogRef.close(this.data);
    }
}

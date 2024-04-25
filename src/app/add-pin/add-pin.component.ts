
import { Component, EventEmitter, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FileItem, FileUploader } from 'ng2-file-upload';
import { OverlaySidePanelService } from '../overlay-side-panel.service';



@Component({
  selector: 'app-add-pin',
  templateUrl: './add-pin.component.html',
  styleUrls: ['./add-pin.component.css']
})
export class AddPinComponent implements OnInit {
  addPinForm!: FormGroup;
  public uploader!: FileUploader
  public hasBaseDropZoneOver: boolean = false;
  collaborators: any;
  storedPin: any;
  
  constructor(private _overlaySidePanelService: OverlaySidePanelService) {

  }
  ngOnInit(): void {
    this.addPinForm = new FormGroup({
      'title': new FormControl('', [Validators.required]),
      'collaborators': new FormControl(''),
      'selectImage': new FormControl(''),
      'privacy': new FormControl('')
    });
    this.uploader = new FileUploader({
      url: ''
    });
    this.uploader.onAfterAddingFile = (fileItem: FileItem) => {
      console.log('File name:', fileItem);
      this.imageToBase64(fileItem)
        .then(base64String => {
          localStorage.setItem('image', base64String);
          this.addPinForm.get('selectImage')?.setValue(base64String)
          console.log('Image stored in localStorage');
          this.getImage();
        })
    };
    this.getCollaborators();
  }

  public fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  onSubmit() {
    const pins =  localStorage.getItem('pins');
    
    if(pins){
      this.storedPin = JSON.parse(pins)
      this.storedPin.push(this.addPinForm.value)
      localStorage.setItem('pins',JSON.stringify(this.storedPin))
    }
    else {
      let arr = [];
      arr.push(this.addPinForm.value)
      localStorage.setItem('pins',JSON.stringify(arr))
    }
    this._overlaySidePanelService.close()
    this.addPinForm.reset();
    this._overlaySidePanelService.setValue(true)
  }

  imageToBase64(image: FileItem): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
      reader.readAsDataURL(image._file);
    });
  }

  getImage() {
    const base64String = localStorage.getItem('image');

    const imgElement = document.getElementById('imageElement') as HTMLImageElement;
    if (base64String) {
      imgElement.src = base64String;
    } else {
      console.error('Image not found in localStorage');
    }

  }
  getCollaborators() {
    const collaborators = localStorage.getItem('collaborators');
    this.collaborators = collaborators ? JSON.parse(collaborators) : ''

    this.collaborators = this.collaborators.map((item: any) => { return item.name })
  }

}

import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable, every } from 'rxjs';
import { ImageService } from './image.service';
import { BlogImage } from '../../models/blog-image.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-image-selector',
  templateUrl: './image-selector.component.html',
  styleUrl: './image-selector.component.css'
})
export class ImageSelectorComponent implements OnInit {

  private file?: File;
  fileName: string = '';
  title: string = '';
  images$?: Observable<BlogImage[]>;

  @ViewChild('form', { static: false }) imageUploadForm?: NgForm;

  constructor(private imageService: ImageService) {

  }
  ngOnInit(): void {
    this.getImages();
  }

  OnFileUpload(evnet: Event): void {
    const element = event?.target as HTMLInputElement;
    this.file = element.files?.[0];
  }

  uploadImage(): void {
    if (this.file && this.fileName !== '' && this.title !== '') {
      this.imageService.uploadImage(this.file, this.fileName, this.title).
        subscribe({
          next: (resp) => {
            console.log(resp);
            this.imageUploadForm?.resetForm();
            this.getImages();
          }
        });
    }
  }

  selectImage(image: BlogImage): void {
    this.imageService.selectImage(image);
  }

  private getImages() {
    this.images$ = this.imageService.getAllImages();
  }
}

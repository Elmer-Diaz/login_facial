import {
  Component,
  ElementRef,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import * as faceapi from 'face-api.js';
import { ImagenesModel } from 'src/app/models/imagenes.model';
import { FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { ImagenesService } from 'src/app/services/imagenes.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css'],
})
export class UploadComponent implements OnInit {
  imgElement = '';
  imgURL = '../../../assets/img/noimage.png';
  imagen: any;
  imagenesData: ImagenesModel[] = [];
  imgProcess: any;
  btnActive = true;
  file: any;

  @ViewChild('imageFile', { static: true }) imageFile!: ElementRef;

  imagenesForm = this.fb.group({
    nombre: ['', [Validators.required]],
    imgFile: [''],
  });

  constructor(
    private fb: FormBuilder,
    private renderer: Renderer2,
    private imagenesSvc: ImagenesService
  ) {}

  ngOnInit(): void {}

  selectImage(event: any) {
    if (event.target.files.length > 0) {

      this.file = event.target.files;
      const reader = new FileReader();
      reader.readAsDataURL(this.file[0]);

      reader.onloadend = (event: any) => {

        this.imgURL = event.target.result;
        this.imgElement = event.target.result;
        elementImage.src = `${this.imgElement}`;

        this.imagen = {
          archivo: this.file[0],
        };
      };
      this.btnActive = false;

      var containerImage = document.createElement('div');
      var status = document.createElement('p');
      var icon = document.createElement('i');
      var elementImage = document.createElement('img');

      containerImage.classList.add('containerImage');

      elementImage.crossOrigin = 'anonymous';

      icon.classList.add('fa');
      icon.classList.add('fa-3x');
      icon.classList.add('fa-spinner');
      icon.classList.add('fa-pulse');

      status.classList.add('status');

      status.appendChild(icon);

      containerImage.appendChild(status);

      this.imgProcess = elementImage;

      this.renderer.appendChild(this.imageFile.nativeElement, containerImage);

      this.processFace(this.imgProcess, containerImage);

    }
  }



  processFace = async (image: any, imageContainer: any) => {
    await faceapi.nets.tinyFaceDetector.loadFromUri('/assets/models');
    await faceapi.nets.faceLandmark68Net.loadFromUri('/assets/models');
    await faceapi.nets.faceRecognitionNet.loadFromUri('/assets/models');

    const detection = await faceapi
      .detectSingleFace(image, new faceapi.TinyFaceDetectorOptions())
      .withFaceLandmarks()
      .withFaceDescriptor();

    console.log(detection);

  };

  onSubmit() {}
}

import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
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

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {}

  onSubmit() {}
}

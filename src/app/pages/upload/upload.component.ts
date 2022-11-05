import { Component, OnInit } from '@angular/core';
import * as faceapi from 'face-api.js';
import { ImagenesModel } from 'src/app/models/imagenes.model';

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

  constructor() {}

  ngOnInit(): void {}
}

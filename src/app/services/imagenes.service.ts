import { ComponentFactoryResolver, Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { getStorage, ref, uploadBytesResumable, getDownloadURL, deleteObject } from "firebase/storage";
import { ImagenesModel } from '../models/imagenes.model';
import { FileItems } from '../models/file.items';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class ImagenesService {
  private CARPETA_IMAGENES = 'img';

  private imagenesCollection: AngularFirestoreCollection<ImagenesModel>;

  progress: any;

  constructor(private db: AngularFirestore) {
    this.imagenesCollection = db.collection<ImagenesModel>('imagenes');
  }

  getImagenes() {}

  cargarImagenesFirebase(imagen: FileItems, imagesData: ImagenesModel) {

    const storage = getStorage();
    let item = imagen;
    let imagenTrim = imagesData.nombreImagen;

    const storageRef = ref(storage, `${this.CARPETA_IMAGENES}/${imagenTrim.replace(/ /g, '')}`);
    const uploadTask = uploadBytesResumable(storageRef, item.archivo);

    uploadTask.on('state_changed', (snapshot) =>{

      this.progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

      console.log(this.progress);


    },(err)=>{
      console.log('Error al subir archivo', err);
    },()=>{
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL)=>{

        item.url = downloadURL;
        this.guardarImagen({
          nombreImagen: imagesData.nombreImagen,
          imgUrl: item.url,
        });
      });
    }
    
    )


  }

  async guardarImagen(imagen:{nombreImagen:string, imgUrl:string}):Promise<any>{
  }
}

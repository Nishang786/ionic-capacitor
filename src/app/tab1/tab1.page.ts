import { Component} from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
 photo:SafeResourceUrl;
  constructor(private Sanitizer:DomSanitizer) {
    this.takePicture();
  }

  async takePicture() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      resultType: CameraResultType.DataUrl,
      source:CameraSource.Camera,
      saveToGallery : true
    });
  this.photo = this.Sanitizer.bypassSecurityTrustResourceUrl(image && (image.dataUrl));
  console.log(this.photo);
  };

}
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from '../common.service';
import { ModalController, LoadingController, ViewWillEnter } from '@ionic/angular';
import { MediaViewPage } from './media-view/media-view.page';
import { DomSanitizer, SafeHtml, SafeStyle, SafeScript, SafeUrl, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-media',
  templateUrl: './media.page.html',
  styleUrls: ['./media.page.scss'],
})
export class MediaPage implements OnInit {
  type= 'photos'
  mediaList: any = [];
  innerWidth: any;
  yotubeVidId: any;
  serviceList: any = [];
  constructor(
    private router: Router,
    private commonService: CommonService,
    public modalController: ModalController,
    protected _sanitizer: DomSanitizer

  ) {
    this.innerWidth = window.innerWidth;
    this.commonService.getAllMedia('photos').subscribe((media: any) => {
      console.log('here');
      
      this.mediaList = media;
      for(let index=0; index < this.mediaList.length; index++) {
        if(this.mediaList[index].type === 'videos') {
          this.yotubeVidId = this._sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/' + this.mediaList[index].mediaSource)
          console.log(this.yotubeVidId);
          
        }
      }
    })
   }
  
  ngOnInit() {
   this.commonService.getAllServices().subscribe((service: any) => {
    this.serviceList = service;
   })
  }
  exit() {
    navigator['app'].exitApp();
  }

  login() {
    this.router.navigate(['/login'])
  }

  previewImage(image: string) {

  }

  async presentModal(mediaSource) {
    
    const modal = await this.modalController.create({
      component: MediaViewPage,
      breakpoints: [0, 0.3, 0.5, 0.8, 1],
      initialBreakpoint: 0.8,
      componentProps: {
        media: mediaSource
      }
    });
    modal.onDidDismiss().then(() => {
      
    })
    await modal.present();
  }

  showCal() {
    this.router.navigate(['/booking-calendar', false])
  }
 
}

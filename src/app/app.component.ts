import { Component } from '@angular/core';
import { FirebaseX } from '@awesome-cordova-plugins/firebase-x/ngx';
import { Platform } from '@ionic/angular';
import { FingerprintAIO } from '@ionic-native/fingerprint-aio/ngx';
import { UniqueDeviceID } from '@ionic-native/unique-device-id/ngx';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { CommonServiceService } from './common-service.service';
import { FCM } from '@awesome-cordova-plugins/fcm/ngx';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  adminName: any;
  isAuthenticated: boolean;
  uniqueId: any;
  isAdmin: boolean;
  constructor(
    private firebaseX: FirebaseX, 
    private plt: Platform, 
    private faio: FingerprintAIO,
    private uniqueDeviceID: UniqueDeviceID,
    private commonService: CommonServiceService,
    private fcm: FCM,
    private router: Router
    )
     { 
    // this.plt.ready().then((readySource) => {
    //   this.getUniqueDeviceID();
    //   this.showFingerprintAuthDlg();

    // })
    this.isAuthenticated = true;
    this.isAdmin = true;

    this.fcm.onNotification().subscribe(data => {
      if(data.wasTapped){
        console.log("Received in background");
        this.router.navigate(['tab1'])

      } else {
        console.log("Received in foreground");
      };
    });
    
  }

  public showFingerprintAuthDlg() {
    this.faio.isAvailable().then((result: any) => {
      this.faio.show({
        cancelButtonTitle: 'Cancel',
        description: "Please scan your finger",
        disableBackup: true,
        title: 'Maharaja Banquet',
        fallbackButtonTitle: 'FB Back Button',
        subtitle: this.uniqueId
      })
        .then((result: any) => {
          console.log(result)
          this.generateSaveToken();
        })
        .catch((error: any) => {
        
           
        });
    })
      .catch((error: any) => {
        console.log(error)
      });
  }

  generateSaveToken() {
      this.firebaseX.getToken()
    .then(token => {
      this.commonService.addToken({device_id: this.uniqueId, fcm_token: token}).subscribe((res: any) => {
        if(res && res.status) {
            this.isAdmin = res && res.docs && res.docs.admin;
            this.commonService.isAdmin.next(this.isAdmin);
          this.isAuthenticated = true;
        } else {
          navigator['app'].exitApp();
        }
      })
    }) // save the token server-side and use it to push notifications to this device
    .catch(error => console.error('Error getting token', error));

    this.firebaseX.onMessageReceived()
    .subscribe(data => console.log(`User opened a notification ${data}`));

    this.firebaseX.onTokenRefresh()
    .subscribe((token: string) => console.log(`Got a new token ${token}`));
      // Platform now ready, execute any required native code
  }

  getUniqueDeviceID() {
    this.uniqueDeviceID.get()
      .then((uuid: any) => {
        console.log(uuid);
        this.uniqueId = uuid;
      })
      .catch((error: any) => {
        console.log(error);
      });
  }

}

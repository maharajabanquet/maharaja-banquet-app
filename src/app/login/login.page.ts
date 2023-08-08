import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { CommonService } from '../common.service';
import { CommonServiceService } from '../common-service.service';
import { FCM } from '@awesome-cordova-plugins/fcm/ngx';
import { FirebaseX } from '@awesome-cordova-plugins/firebase-x/ngx';

@Component({
	selector: 'app-login',
	templateUrl: './login.page.html',
	styleUrls: ['./login.page.scss']
})
export class LoginPage implements OnInit {
	credentials!: FormGroup;
	uniqueId: any;

	constructor(
		private fb: FormBuilder,
		private alertController: AlertController,
		private router: Router,
		private loadingController: LoadingController,
    private commonService: CommonService,
	private commonServices: CommonServiceService,
    private fcm: FCM,
	private firebaseX: FirebaseX, 
	) {}

	ngOnInit() {
		this.credentials = this.fb.group({
			mobile: ['', [Validators.required]],
			password: ['', [Validators.required]]
		});
		localStorage.clear();
	}

	
	async login() {
		const loading = await this.loadingController.create();
		await loading.present();

		this.commonService.login(this.credentials.value).subscribe(
			async (res: any) => {
				await loading.dismiss();
        localStorage.setItem('user', JSON.stringify(res.user))
		this.firebaseX.getToken()
		.then(token => {
			const user = JSON.parse(localStorage.getItem('user'))
		  this.commonServices.addToken({device_id: this.uniqueId, fcm_token: token, phoneNumber: user.mobile, isAdmin: user.isAdmin}).subscribe((res: any) => {
		  })
		}) // save the token server-side and use it to push notifications to this device
		.catch(error => console.error('Error getting token', error));
	
		this.firebaseX.onMessageReceived()
		.subscribe(data => console.log(`User opened a notification ${data}`));
	
		this.firebaseX.onTokenRefresh()
		.subscribe((token: string) => console.log(`Got a new token ${token}`));
		const user = JSON.parse(localStorage.getItem('user'))
				if(user && user.isAdmin) {
					this.router.navigateByUrl('/tabs', { replaceUrl: true });

				} else if(user && user.isDj) {
					this.router.navigateByUrl('/dj',{ replaceUrl: true})					
				}
				else {
					this.router.navigateByUrl('/home', { replaceUrl: true });
				}
			},
			async (res) => {
				await loading.dismiss();
				const alert = await this.alertController.create({
					header: 'Login failed',
					message: res.error.error,
					buttons: ['OK']
				});

				await alert.present();
			}
		);
	}

	// Easy access for form fields
	get mobile() {
		return this.credentials.get('mobile');
	}

	get password() {
		return this.credentials.get('password');
	}

	skip() {
		localStorage.setItem('userType', 'guest')
		this.router.navigate(['/media'])
	}
}
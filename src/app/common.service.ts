import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ApiServiceService } from './api-service.service';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(
    private apiService: ApiServiceService
  ) { }


  getServices() {
    const url = `${environment.host}/api/v1/service/get-services`;
    return this.apiService.get(url)
  }

  login(credentials:any) {
		return this.apiService.post(`${environment.host}/api/v1/app-user/login`, credentials)
	}

  getUserDetails() {
    return JSON.parse(localStorage.getItem('user'));
  }
  
  updateUser(mobile, payload) {
    const url = `${environment.host}/api/v1/app-user/update?mobile=${mobile}`;
    return this.apiService.post(url, payload)
  }

  getSelectedItem(categoryName: string, mobile: string) {
    const url = `${environment.host}/api/v1/app-user/get-cart?mobile=${mobile}&category=${categoryName}`;
    return this.apiService.get(url);
  }

  getUserBookingDetails(mobile: string) {
    const url = `${environment.host}/api/v1/booking/get-user-booking?mobile=${mobile}`;
    return this.apiService.get(url);
  }

  getAllMedia(type: any) {
    const url = `${environment.host}/api/v1/media/get-all-media?type=all`;
    return this.apiService.get(url);
  }

  getAllServices() {
    const url = `${environment.host}/api/v1/service/service-list`;
    return this.apiService.get(url);
  }
}

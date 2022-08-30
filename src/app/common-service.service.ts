import { ApiServiceService } from './api-service.service';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CommonServiceService {

  constructor(
    private apiService: ApiServiceService
  ) { }


  addToken(body) {
    const url = `${environment.host}/api/v1/token/add_tokens`;
    return this.apiService.post(url, body);
  }

  getConfig() {
    const URL = `${environment.host}/api/v1/config/get-config`;
    return this.apiService.get(URL);
  }

  getAllBooking(status) {
    const URL = `${environment.host}/api/v1/booking/get-booking-list?status=${status}`;
    return this.apiService.get(URL);
  }

  confirmBooking(id, status) {
    const URL =  `${environment.host}/api/v1/booking/confirm-booking?id=${id}&status=${status}`;
    return this.apiService.get(URL);
  }

  updateConfig(payload) {
    const URL = `${environment.host}/api/v1/config/update-config`;
    return this.apiService.post(URL, payload)
    
  }


}

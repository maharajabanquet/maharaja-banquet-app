import { Injectable } from '@angular/core';
import { CommonService } from '../common.service';

export interface Message {
  id: Number
  category: string;
  discription: string,
  img: string,
  categoryList: any,
}



@Injectable({
  providedIn: 'root'
})
export class DataService {
  public messages: Message[] = [];

  constructor(
    private commonService: CommonService
  ) {
    this.commonService.getServices().subscribe((services: any) => {
      const elements = (services && services.services) || [];
      const mapElements = elements.map((element: Message) => ({
        id: Number(element.id),
        category: element.category,
        discription: element.discription,
        img: element.img,
        categoryList: element.categoryList,
      }))
      
      this.messages = mapElements;
    })
   }

  public getMessages(): Message[] {
    return this.messages;
  }

  public getMessageById(id: number): Message {
    return this.messages[id];
  }
}

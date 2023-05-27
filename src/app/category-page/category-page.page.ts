import { Component, OnInit, inject } from '@angular/core';
import { DataService, Message } from '../services/data.service';
import { ActivatedRoute } from '@angular/router';
import { CommonService } from '../common.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-category-page',
  templateUrl: './category-page.page.html',
  styleUrls: ['./category-page.page.scss'],
})
export class CategoryPagePage implements OnInit {
  public item!: Message;
  private data = inject(DataService);
  private activatedRoute = inject(ActivatedRoute);
  userDetails: any;
  userSelectedItem: any;  
  constructor(
    private commonService: CommonService,
    private location: Location
  ) { 
   this.userDetails = this.commonService.getUserDetails();
  
  }

  ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get('id') as string;
    this.item = this.data.getMessageById(parseInt(id, 10));
    console.log(this.item);
    this.getSelectedItem();
    
  }

  getSelectedItem() {
    this.commonService.getSelectedItem(this.item.category, this.userDetails.mobile).subscribe((resp:any) => {
      this.userSelectedItem = resp && resp.userItem;
     })
  }

  getQuantityRange(range: any) {
    return [...Array(range).keys()]; + 1
  }

  onItemSelect(qnt: any, item: any , idx: any) {
    // if(this.item.categoryList)
    this.item.categoryList[idx].orderQuant = qnt.target.value;
    const loggedInUserMobile = this.userDetails.mobile;
    this.commonService.updateUser(loggedInUserMobile, item).subscribe(res => {
      this.getSelectedItem();
      
    })
    
  }

  goBack() {
    this.location.back();
  }
}

import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-media-view',
  templateUrl: './media-view.page.html',
  styleUrls: ['./media-view.page.scss'],
})
export class MediaViewPage implements OnInit {
  @Input() media : any;
  constructor() { }

  ngOnInit() {
  }

}

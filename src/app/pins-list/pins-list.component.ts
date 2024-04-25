
import { OverlaySidePanelService } from '../overlay-side-panel.service';
import { AddCustomerComponent } from '../add-customer/add-customer.component';
import { AddPinComponent } from '../add-pin/add-pin.component';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pins-list',
  templateUrl: './pins-list.component.html',
  styleUrls: ['./pins-list.component.css']
})
export class PinsListComponent implements OnInit {
  isMenuOpen: boolean = false;
  isOpen = false;
  pinsList: any;
  value: any;
  constructor(
    private _overlaySidePanelService: OverlaySidePanelService
  ) { }
  ngOnInit(): void {
    const pinsList = localStorage.getItem('pins');
    this.pinsList = pinsList ? JSON.parse(pinsList) : ''
    this._overlaySidePanelService.onValueChange().subscribe(data=>{
      if(data == true){
        const pinsList = localStorage.getItem('pins');
        this.pinsList = pinsList ? JSON.parse(pinsList) : ''
      }
      
    })
    
  }


  addCustomer(){
    this._overlaySidePanelService.setContent(AddCustomerComponent);
    this._overlaySidePanelService.show();
  }
  addPin(){
    this._overlaySidePanelService.setContent(AddPinComponent);
    this._overlaySidePanelService.show();
  }
}


import { HttpClient } from '@angular/common/http';

import { OverlaySidePanelService } from '../overlay-side-panel.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.css'],
  
})
export class AddCustomerComponent implements OnInit {
  addCustomerForm!:FormGroup;
  public selectItems:any
  regionData: any;
  regionCountryData: any;
  countryData: any;
  storedCollab: any[] = [];
  constructor(private http: HttpClient,private _overlaySidePanelService: OverlaySidePanelService){}
  ngOnInit(): void {
    this.addCustomerForm = new FormGroup({
          'name':new FormControl('',[Validators.required]),
          'email':new FormControl('',[Validators.required,Validators.email]),
          'region': new FormControl(''),
          'country': new FormControl('')
    });

    this.http.get('https://api.first.org/data/v1/countries').subscribe(res=>{
      this.selectItems = res
      this.regionCountryData = this.selectItems.data  
      this.regionCountryData = Object.values(this.regionCountryData);
      this.regionData =this.regionCountryData.map((item:any)=>{ return item.region })
     this.regionData = this.regionData.filter((item:any, index:any, self:any) =>
      index === self.indexOf(item)
    )
     
    })

    this.addCustomerForm.get('region')?.valueChanges
    .subscribe((region: any) => {
      console.log(region)
      this.countryData = this.regionCountryData.filter((item:any) => item.region === region);
      console.log(this.countryData)
    });

  }
  onSubmit(){
    
    const collab =  localStorage.getItem('collaborators');
    
    if(collab){
      this.storedCollab = JSON.parse(collab)
      this.storedCollab.push(this.addCustomerForm.value)
      localStorage.setItem('collaborators',JSON.stringify(this.storedCollab))
    }
    else {
      let arr = [];
      arr.push(this.addCustomerForm.value)
      localStorage.setItem('collaborators',JSON.stringify(arr))
    }
    
    this._overlaySidePanelService.close()
    this.addCustomerForm.reset();
  }
 
  
}

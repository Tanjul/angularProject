
import { CommonModule } from '@angular/common';
import { OverlaySidePanelComponent } from './overlay-side-panel.component';
import { OverlaySidePanelService } from '../../overlay-side-panel.service';
import { NgModule } from '@angular/core';



@NgModule({
  declarations: [
    OverlaySidePanelComponent
  ],
  imports: [
    CommonModule
  ],
  providers:[
    OverlaySidePanelService
  ],
  exports:[
    OverlaySidePanelComponent
  ]
})
export class OverlaySidePanelModule { }

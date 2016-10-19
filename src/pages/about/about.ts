import { Component } from '@angular/core';

import { PopoverController } from 'ionic-angular';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
  conferenceDate = '2016-10-05';

  constructor(public popoverCtrl: PopoverController) { }
}

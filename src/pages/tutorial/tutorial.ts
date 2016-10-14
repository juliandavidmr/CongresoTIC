import { Component } from '@angular/core';

import { MenuController, NavController } from 'ionic-angular';

import { TabsPage } from '../tabs/tabs';


export interface Slide {
  title: string;
  description: string;
  image: string;
}

@Component({
  selector: 'page-tutorial',
  templateUrl: 'tutorial.html'
})
export class TutorialPage {
  slides: Slide[];
  showSkip = true;

  constructor(public navCtrl: NavController, public menu: MenuController) {
    this.slides = [
      {
        title: 'Bienvenido al primer congreso internacional <b>TIC</b>',
        description: 'La Universidad de la Amazonia presenta el primer congreso internacional en TIC en Florencia, Caquetá, Colombia, con el objetivo de intercambiar experiencias académicas e investigativas relacionadas con las Tecnologías de la Información y las Comunicaciones para generar un desarrollo sustentable en la región Amazónica y el País.',
        image: 'assets/img/ica-slidebox-img-1.png',
      },
      {
        title: 'Acerca de los participantes',
        description: 'Se tendrá la presencia y la participación de profesionales expertos tanto nacionales como internacionales y se convocará a la comunidad de investigadores para presentar sus ponencias y ser seleccionadas por pares evaluadores.',
        image: 'assets/img/ica-slidebox-img-2.png',
      },
      {
        title: 'Revista Científica',
        description: 'Las ponencias seleccionadas se publicaran en una edición especial de la Revista Científica ISSN 0124-2253 Categoría B índice de Colciencias (Siempre y cuando cumplan lo requerido por la revista para su publicación).',
        image: 'assets/img/ica-slidebox-img-3.png',
      }
    ];
  }

  startApp() {
    this.navCtrl.push(TabsPage);
  }

  onSlideChangeStart(slider) {
    this.showSkip = !slider.isEnd;
  }

  ionViewDidEnter() {
    // the root left menu should be disabled on the tutorial page
    this.menu.enable(false);
  }

  ionViewWillLeave() {
    // enable the root left menu when leaving the tutorial page
    this.menu.enable(true);
  }

}

import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-resultado',
  templateUrl: 'resultado.html',
})

export class ResultadoPage {
  resultadoBoolean: Boolean;
  resultado: String ;
  diametroA: number;
  diametroB: number ;
  diferenca_mm: number ;
  diferenca_perc : number;   

  constructor(public navCtrl: NavController, public navParams: NavParams) {
   this.resultado = navParams.get('resultado');
   this.diametroA = navParams.get('diametroA');
   this.diametroB = navParams.get('diametroB');
   this.diferenca_mm= navParams.get('diferenca_mm');
   this.diferenca_perc= navParams.get('diferenca_perc');
   if (this.resultado==='Sim'){
    this.resultadoBoolean= true;
   }else{
     this.resultadoBoolean = false;
   }
   console.log(this.diametroA, this.diametroB , this.resultado, this.resultadoBoolean);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ResultadoPage');
  }

}

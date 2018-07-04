import { AdMobFree, AdMobFreeBannerConfig } from '@ionic-native/admob-free';

import { ResultadoPage } from './../resultado/resultado';
import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  inputLarguraA: number;
  inputAlturaA: number;
  inputAroA: number;
  inputLarguraB: number;
  inputAlturaB: number;
  inputAroB: number;
  diametro_diferenca_mm: number;
  diametro_diferenca_perc: number;
  outputResultado: String = "";
  outputDiametroA: number;
  outputDiametroB: number;

  constructor(public navCtrl: NavController, private toastCtrl: ToastController,
    public admob: AdMobFree) {
    this.showBanner();
  }

  showBanner() {

    let bannerConfig: AdMobFreeBannerConfig = {
      id: 'ca-app-pub-9146010147596764/2069660183',
      isTesting: false,
      autoShow: true,
      bannerAtTop:true
    };

    this.admob.banner.config(bannerConfig);

    this.admob.banner.prepare().then(() => {
      // success
    }).catch(e => console.log(e));

  }

  defineDiametroA(): number {
    console.log(this.inputAlturaA, this.inputAroA, this.inputAlturaA);
    if (this.inputLarguraA != null && this.inputAlturaA != null && this.inputAroA != null) {
      return ((this.inputLarguraA * (this.inputAlturaA / 100) * 2) + (this.inputAroA * 25.4));
    } else {
      return 0;
    }
  }

  defineDiametroB(): number {
    console.log(this.inputAlturaB, this.inputAroB, this.inputAlturaB);
    if (this.inputLarguraB != null && this.inputAlturaB != null && this.inputAroB != null) {
      return ((this.inputLarguraB * (this.inputAlturaB / 100) * 2) + (this.inputAroB * 25.4));
    } else {
      return 0;
    }
  }

  presentToast(texto: String) {
    let toast = this.toastCtrl.create({
      message: '' + texto,
      duration: 3000,
      position: 'down'
    });

    toast.onDidDismiss(() => {
      console.log('falha');
    });

    toast.present();
  }
  calcularDiferencas() {
    this.outputDiametroA = this.defineDiametroA();
    this.outputDiametroB = this.defineDiametroB();
    console.log(this.outputDiametroA, this.outputDiametroB);

    if (this.outputDiametroA == 0 && this.outputDiametroB == 0) {
      this.presentToast('Por favor, preencha todos os campos!');
    } else if (this.outputDiametroA == 0 && this.outputDiametroB != 0) {
      this.presentToast('Por favor, preencha  todos os campos do Pneu Original');
    } else if (this.outputDiametroA != 0 && this.outputDiametroB == 0) {
      this.presentToast('Por favor, preencha  todos os campos do Pneu Desejado');
    } else {
      this.diametro_diferenca_mm = this.outputDiametroA - this.outputDiametroB;
      this.diametro_diferenca_perc = (this.outputDiametroA - this.outputDiametroB) / this.outputDiametroA;
      if (this.diametro_diferenca_perc <= -0.03 || this.diametro_diferenca_perc >= 0.03) {
        this.outputResultado = 'Não';
      } else {
        this.outputResultado = 'Sim';
      }
      this.pushPage();
    }

  }

  pushPage() {
    this.navCtrl.push(ResultadoPage, {
      resultado: this.outputResultado,
      diametroA: this.outputDiametroA,
      diametroB: this.outputDiametroB,
      diferenca_mm: this.diametro_diferenca_mm,
      diferenca_perc: this.diametro_diferenca_perc


    });
  }

  limparCampos() {
    this.inputLarguraA = null;
    this.inputAlturaA = null;
    this.inputAroA = null;
    this.inputLarguraB = null;
    this.inputAlturaB = null;
    this.inputAroB = null;
  }
}

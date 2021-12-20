import { Component, ViewChild } from '@angular/core';
import { Platform, ModalController, AlertController } from '@ionic/angular';
import { SpeechRecognition } from '@ionic-native/speech-recognition/ngx';
import { Router } from '@angular/router';
import { HTTP } from '@awesome-cordova-plugins/http/ngx';
import { TextToSpeechAdvanced } from '@awesome-cordova-plugins/text-to-speech-advanced/ngx';
import { PoiDetailPage } from '../poi-detail/poi-detail.page';

@Component({
  templateUrl: 'conversation.page.html',
  selector: 'page-conversation',
  styleUrls: ['conversation.page.scss']
})
export class ConversationPage {
  @ViewChild('imessage', { static: false }) private imessage: any;
  private isRecording: boolean = false;   /** Mostrar al usuario si se está grabando */
  private microphone: boolean = true;     /** Mostrar micrófono o textbox */

  public messages: any = [];              /** Cola de mensajes */
  public myMessage: string;               /** Mensaje actual (el que se está grabando o tecleando) */

  public session: string;                 /** Sesión de DialogFlow */

  constructor(
    private speechRecognition: SpeechRecognition,   // servicio speech recognition
    private http: HTTP,                             // servicio para petición GET
    private tts: TextToSpeechAdvanced,              // servicio text-to-speech
    private platform: Platform,                     // servicio platform (para controlar back button)
    private router: Router,                         // router (volver a homepage)
    private alertController: AlertController,       // controlador de alertas (abrir alerta para emulador de llamadas)
    private modalCtrl: ModalController              // controlador de modales (abrir modales de PoIs)
  ) { }
  
  async ngOnInit() {
    // generar ID de sesión aleatorio
    // de: https://stackoverflow.com/questions/1349404/generate-random-string-characters-in-javascript
    this.session = (Math.random() + 1).toString(36).substring(7);

    // tomar permisos para speech recognizer
    this.getSpeechPermission();

    // back button
    this.platform.backButton.subscribeWithPriority(10, () => {
      this.router.navigate(['/']);
    });
  }

  /**
   * Tomar permisos de speech recognition
   */
  public getSpeechPermission() {
    this.speechRecognition.hasPermission().then((hasPermission: boolean) => {
      if (!hasPermission) {
        this.speechRecognition.requestPermission();
      }
    });
  }

  /**
   * Iniciar servicio de speech recognition
   */
  public startSpeechRecognition() {
    this.isRecording = true;
    let options = {
      language: 'es-ES',
      matches: 1,
      showPopup: false
    }
    this.speechRecognition.startListening(options).subscribe(matches => {
      this.myMessage = matches[0];
      this.sendMessage();
      this.isRecording = false;
    });
  }

  /**
   * Feedback de micrófono
   */
  public triggerMicrophone() {
    this.microphone = !this.microphone;
    this.isRecording = false;
  }

  /**
   * Abre el Punto de Interés del número (ID) pasado como parámetro
   * @param id ID del punto de interés
   * @returns modal present (for await)
   */
  public async openPoi(id: number): Promise<void> {
    const modal = await this.modalCtrl.create({
      component: PoiDetailPage,
      cssClass: 'modal-half-space',
      animated: true,
      componentProps: {
        'id': id
      }
    });
    return await modal.present();
  }

  /**
   * Simular una llamada
   * @param callText Texto de llamada (mostará alerta con "Llamando a <callText>")
   */
  public async emulateCall(callText: string) {
    // abrir una alerta para simular una llamada
    const alert = await this.alertController.create({
      header: 'Simulando llamada',
      message: `Llamando a ${callText}...`,
      buttons: ['OK'],
    });

    await alert.present();
  }

  /**
   * Parsea un intent para mostrar un popup de PoI o simular una llamada
   * @param intent Intent a parsear
   */
  public async parseIntent(intent: string) {
    if (intent.startsWith("goto: ")) {
      // abrir popup de PoI
      this.openPoi(parseInt(intent.slice(6), 10));
    } else if (intent.startsWith("call:")) {
      // simular una llamada
      this.emulateCall(intent.slice(5));
    }
  }

  /**
   * Enviar un mensaje a DialogFlow
   * @param speak Determina si usar el text-to-speech
   */
  public sendMessage(speak: boolean = true) {
    // añadir mensaje del usuario a cola de mensajes
    this.messages.push({
      text: this.myMessage
    });
    this.imessage.scrollToBottom(300); // hacer scroll hacia el final de los mensajes
    // usar API de Flask para las llamadas a DialogFlow
    this.http.get(`http://mianfg.me:5000/npi-dialogflow/${this.session}/${this.myMessage}`, {}, {})
      .then(data => {
        // parsear datos de JSON a diccionario
        const response = JSON.parse(data.data);

        /*
          Las respuestas de DialogFlow tienen el formato:
            <mensaje>|<intent>
          
          Por pantalla se mostrará (y el tts hablará) <mensaje>
          <intent> será usado en parseIntent()
        */
        const fulfilText = response.fulfillment_text.split("|");

        // añadir mensaje de DialogFlow a la cola de mensajes
        this.messages.push({
          text: fulfilText[0],
          answer: true
        });
        // parseamos intent sólo si existe
        this.parseIntent(fulfilText.length > 1 && fulfilText[1])

        this.imessage.scrollToBottom(300); // hacer scroll hacia el final de los mensajes
        if (speak) this.tts.speak(fulfilText[0]).then(function () {
          console.log('success');
        }, function (reason) {
          console.log(reason);
        });
      })
      .catch(error => {
        console.log(error);
      });
    this.myMessage = ''; // resetear myMessage
  }
}

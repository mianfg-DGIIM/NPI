import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { ApiAiClient } from 'api-ai-javascript/es6/ApiAiClient';
import { BehaviorSubject} from 'rxjs';
import { async } from '@angular/core/testing';

export class Message {  
  constructor(
    public content: string,
    public sentBy: string,
    public placeholder : boolean = false,
    public action: string = null,
  ) { }
}

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  //Get API Key
  readonly token = environment.dialogFlow.botKey;
  readonly client = new ApiAiClient({ accessToken: this.token });
  conversation = new BehaviorSubject<Message[]>([]);
  responseHandler;

  constructor() {}

  const getToken = async() => {
    return new Promise((resolve) => {
      googleAuth.authenticate({
        email: process.env.private_key,
        key: process.env.private_key,
        scopes: [
          'https://www.googleapis.com/auth/cloud-platform',
          'https://www.googleapis.com/auth/dialogflow'
        ]
      }, (err, token) => {
        resolve(token);
      });
    });
  }

  

  setResponseHandler(responseHandler) {
    this.responseHandler = responseHandler; 
  }

  // Send and receive messages via DialogFlow
  sendMessage(msg: string) {

    const userMessage = new Message(msg, 'user');    
    this.update(userMessage);
    return this.client.textRequest(msg).then(res => {
      // get text of message
      const speech = res.result.fulfillment.speech;
      // create new message
      const botMessage = new Message(
        speech, 
        'bot',
        false,
        res.result.action
      );
      this.update(botMessage);
    });
  }


  // Add message to source
  update(msg: Message) {
    console.log(Message);
    this.conversation.next([msg]);
  }

}

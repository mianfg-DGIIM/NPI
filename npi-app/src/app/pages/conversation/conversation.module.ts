import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { ConversationPage } from './conversation.page';

@NgModule({
    declarations: [
        ConversationPage
    ],
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        RouterModule.forChild([{
            path: '',
            component: ConversationPage
        }]),
    ],
    exports: [
        ConversationPage
    ]
})
export class ConversationPageModule {}

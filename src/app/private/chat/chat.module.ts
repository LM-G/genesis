import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { ChatComponent } from './chat.component';
import { chatRouting } from './chat.route';

@NgModule({
    imports: [
        CommonModule,
        chatRouting
    ],
    declarations: [
        ChatComponent
    ],
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})

export class ChatModule {
}

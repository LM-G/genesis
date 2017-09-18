import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { ChatComponent } from './chat.component';
import { chatRouting} from './chat.route';
import { MaterialModule } from '@angular/material';
import { CommonModule } from '@angular/common';

@NgModule({
    imports: [
        CommonModule,
        MaterialModule,
        chatRouting
    ],
    declarations: [
        ChatComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class ChatModule {}

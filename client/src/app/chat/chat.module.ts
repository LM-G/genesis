import { NgModule } from '@angular/core';
import { ChatComponent } from './chat.component';
import { chatRouting} from './chat.route';

@NgModule({
    imports: [
        chatRouting
    ],
    declarations: [
        ChatComponent
    ]
})

export class ChatModule {}

import { Module,forwardRef } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { MessagesResolver } from './messages.resolver';
import {ChatsModule} from '../chats.module'
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    forwardRef(() => ChatsModule),
    ConfigModule,
  ],
  providers: [MessagesResolver, MessagesService],
})
export class MessagesModule {}

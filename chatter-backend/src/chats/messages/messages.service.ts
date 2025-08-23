import { Injectable, Inject, Logger, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CreateMessageInput } from './dto/create-message.input';
import { Message } from './enteties/message.entity';
import { Types } from 'mongoose';
import { GetMessagesArgs } from './dto/get-messages.args';
import { PUB_SUB } from '../../common/cosntants/injection-token';
import { PubSubEngine } from 'graphql-subscriptions';
import { MESSAGE_CREATED } from './constatnts/pubsub-triggers';
import { MessageCreatedArgs } from './dto/message-created.args';
import { ChatsRepository } from '../chats.repository';
import { ChatsService } from '../chats.service';
import { encrypt, decrypt, validateKey } from '../../common/encryption/encryption.util';

@Injectable()
export class MessagesService implements OnModuleInit {
  private encryptionKey: string;
  private readonly logger = new Logger(MessagesService.name);

  constructor(
    private readonly chatsRepository: ChatsRepository,
    private readonly chatsService: ChatsService,
    @Inject(PUB_SUB) private readonly pubSub: PubSubEngine,
    private readonly configService: ConfigService,
  ) {}

  async onModuleInit() {
    this.encryptionKey = this.configService.get<string>('ENCRYPTION_KEY');
    if (!this.encryptionKey) {
      throw new Error('ENCRYPTION_KEY missing in environment');
    }
    await validateKey(this.encryptionKey);
  }

  private chatAccessFilter(userId: string) {
    return {
      $or: [
        { userId: userId },
        { userIds: userId },
        { isPrivate: false },
      ],
    };
  }

  async createMessage({ content, chatId }: CreateMessageInput, userId: string) {
    try {
      if (!this.encryptionKey) throw new Error('Encryption key not initialized');
      const encryptedContent = await encrypt(content, this.encryptionKey);

      const message: Message = {
        _id: new Types.ObjectId(),
        content: encryptedContent,
        userId,
        chatId,
        createdAt: new Date(),
      };

      const updatedChat = await this.chatsRepository.findOneAndUpdate(
        { _id: chatId, ...this.chatAccessFilter(userId) },
        { $push: { messages: message } }
      );

      if (!updatedChat) {
        throw new Error('Chat not found or access denied');
      }

      const plainForClient = { ...message, content };
      await this.pubSub.publish(MESSAGE_CREATED, { messageCreated: plainForClient });
      return plainForClient;
    } catch (e) {
      this.logger.error(e);
      throw new Error(e.message || 'Failed to create message');
    }
  }

  async getMessages({ chatId }: GetMessagesArgs, userId: string) {
    try {
      const chat = await this.chatsRepository.findOne({
        _id: chatId,
        ...this.chatAccessFilter(userId),
      });
      
      if (!chat || !chat.messages) {
        return [];
      }
      
      // Decrypt all messages before returning
      const decryptedMessages = await Promise.all(chat.messages.map(async message => {
        try {
          const decryptedContent = await decrypt(message.content, this.encryptionKey);
          return {
            ...message,
            content: decryptedContent,
          };
        } catch (error) {
          this.logger.warn(`Failed to decrypt message ${message._id}: ${error.message}`);
          return {
            ...message,
            content: '[Encrypted message - unable to decrypt]',
          };
        }
      }));
      
      return decryptedMessages;
    } catch (error) {
      this.logger.error(`Error retrieving messages: ${error.message}`);
      throw new Error('Failed to retrieve messages');
    }
  }

  async messageCreated({ chatId }: MessageCreatedArgs, userId: string) {
    await this.chatsRepository.findOne({
      _id: chatId,
      ...this.chatAccessFilter(userId),
    });
    
    // Use type assertion for asyncIterator
    const engine: any = this.pubSub;
    if (typeof engine.asyncIterator === 'function') {
      return engine.asyncIterator(MESSAGE_CREATED);
    }
    return engine.asyncIterableIterator(MESSAGE_CREATED);
  }
}
import { Injectable } from '@nestjs/common';
import { CreateChatInput } from './dto/create-chat.input';
import { UpdateChatInput } from './dto/update-chat.input';
import { ChatsRepository } from './chats.repository';

@Injectable()
export class ChatsService {
  constructor(private readonly chatsRepository: ChatsRepository) {}

  async create(createChatInput: CreateChatInput, userId: string) {
    return this.chatsRepository.create({
      ...createChatInput,
      userId,
      userIds: createChatInput.userIds || [],
      messages: [],
    });
  }

  async findAll(userId: string) {
    return this.chatsRepository.find({
      ...this.userChatFilter(userId),
    });
  }

  async findOne(_id: string) {
    // Fix: Use _id instead of id
    return this.chatsRepository.findOne({ _id });
  }

  private userChatFilter(userId: string) {
    return {
      $or: [
        { userId: userId },      // creator / owner
        { userIds: userId },     // participant (Mongo matches element in array)
        { isPrivate: false },    // public chat
      ],
    };
  }

  update(id: number, updateChatInput: UpdateChatInput) {
    return `This action updates a #${id} chat`;
  }

  remove(id: number) {
    return `This action removes a #${id} chat`;
  }
}
import { Chat, Message } from "../../types/payload";
import { privateApi } from "../instances";

export default class ChatApi {
  static async getUserChat(userId: string){
    const result =  await privateApi.get<Array<Partial<Chat>>>(`/chat/${userId}`);
    return result.data;
  }

  static async getChatById(chatId: string){
    const result = await privateApi.get<Chat>(`/chat/${chatId}/messages`);
    return result.data;
  }
  static async sendMessage({message,receiverId, senderId , chatId }: Partial<Message> & {chatId: string}){
    const result = await privateApi.post<Message>(`/chat/${chatId}`,{
      message, receiverId, chatId, senderId
    });
    return result.data;
  }
}
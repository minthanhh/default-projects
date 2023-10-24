export interface IUser {
   id?: number;
   username: string;
   email: string;
   accessToken?: string;
   password?: string;
   messages?: IMessage[] | null;
}

export interface IMessage {
   id?: number;
   content: string;
   senderId: number;
   receiverId: number;
}

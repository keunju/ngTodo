export class ChatVO {
  member_id?: number;
  from?: string; // nickname
  command?: string; // 프로토콜
  message?: string;
  date?: number; // timestamp
}

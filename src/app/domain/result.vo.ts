export class ResultVO {
  result: number;
  value: string;
  data?: any;   // optional 연산자(?)를 쓰면 있어도 되고 없어도 된다.) , 실제 데이터
  total?: number; // 전체 갯수 : 페이지네이션을 구현하기 위한 변수
}

export class PageVO {
//  pageIndex: number;
//  pageSize: number;
//  totalCount: number;
//  pageSizeOptions: number[];

  // JAVA 스타일
/*  constructor(pageIndex: number, pageSize: number, totalCount: number) {
    this.pageIndex = pageIndex;
    this.pageSize = pageSize;
    this.totalCount = totalCount;
  }*/

  // 접근제어절 (private) 을 붙이면 로컬 변수가아니라 인스턴스 멤버가 된다. 바로 접근 가능 (Type Scirpt 문법) , constructor는 es6문법
  // ? : optional 연산자를 붙이면 파라미터가 있어도 되고 없어도 된다. 오버로딩이 안되기때문에 ?연산자를 이용한다.
  constructor(public pageIndex: number, public pageSize: number, public totalCount: number,
              public pageSizeOptions?: number[]) {
    if (!pageSizeOptions) {
      this.pageSizeOptions = [5, 15, 30, 60, 90];
    }
  }
}

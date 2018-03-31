import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {environment} from '../environments/environment';
import {TodoVO} from './domain/todo.vo';
import {Observable} from 'rxjs/Observable';
import {ResultVO} from './domain/result.vo';
import {MemberVO} from './domain/member.vo';

@Injectable()
export class UserService {

  private SERVER: string;
  private headers: HttpHeaders;

  constructor(private http: HttpClient) {
    this.SERVER = `${environment.HOST}`;
    this.headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
  }

  getTodoList(): Observable<TodoVO[]> {
    return this.http.get<TodoVO[]>(this.SERVER + '/api/todo');
  }

  addTodo(todo: TodoVO): Observable<TodoVO> {
    return this.http.post<TodoVO>(this.SERVER + '/api/todo', todo, {headers: this.headers});
  }

  modifyTodo(todo: TodoVO): Observable<TodoVO> {
    return this.http.put<TodoVO>(this.SERVER + '/api/todo', todo, {headers: this.headers});
  }

  removeTodo(todo_id: number): Observable<ResultVO> {
    return this.http.delete<ResultVO>(this.SERVER + `/api/todo?todo_id=${todo_id}`);
  }

  // social login  -----------------------------------------------------------------------------------------------------
  getSocial(site: string) {
    return this.http.get(this.SERVER + '/api/social?site=' + site);
  }


  // login & signUp
  signUp(params: MemberVO): Observable<ResultVO> {
    return this.http.post<ResultVO>(this.SERVER + '/api/signUp', JSON.stringify(params), {headers: this.headers});
  }

  // 인증이 필요한 API ===========================================================================
  getMember(member_id: number): Observable<HttpResponse<MemberVO>> {
    const header = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('token')
    });

    return this.http.get<MemberVO>(this.SERVER + '/member/api/member?member_id=' + member_id,
      {headers: header, observe: 'response'});
  }

  modifyMember(member: MemberVO): Observable<HttpResponse<ResultVO>> {
    const header = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('token')
    });
    return this.http.put<ResultVO>(this.SERVER + '/member/api/member', member, {headers: header, observe: 'response'});
  }
}

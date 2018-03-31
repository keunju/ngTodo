import { Component, OnInit } from '@angular/core';
import {UserService} from '../../user.service';
import {MemberVO} from '../../domain/member.vo';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthGuardService} from '../auth-guard.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  naverUrl: string;
  member = new MemberVO();

  constructor(private userService: UserService, private route: ActivatedRoute,
              private authGuard: AuthGuardService, private router: Router) { }

  ngOnInit() {
    // naver login url 얻기 (그림 1번)
    this.userService.getSocial("naver2")
      .subscribe(value => {
        this.naverUrl = value['url'];
      });


    // naver login url 얻기: 교육용 localhost, production은 naver3
    this.userService.getSocial("naver2")
      .subscribe(value => {
        this.naverUrl = value['url'];
      });

    // 로그인 결과의 토큰이 오는지 체크
    this.route.queryParams.subscribe(params => {
      const result = +params['result'];
      if (result === 0) { // 로그인 성공, 회원정보 있음
        console.log('login success:' + params['token']);
        localStorage.setItem('token', params['token']);
        if (this.authGuard.redirectUrl) {
          this.router.navigateByUrl(this.authGuard.redirectUrl);
        } else {
          this.router.navigateByUrl('/');
        }
      } else if (result === 100) { // 로그인 실패. 회원 정보 없음
        console.log('login fail');
        this.member.join_path = params['join_path'];
        this.member.email = params['email'];
        this.member.photo_url = params['photo_url'];
        localStorage.setItem('member', JSON.stringify(this.member));
        this.router.navigateByUrl('/register');
      }
    });
  }
}

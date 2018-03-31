import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {AdminService} from '../../admin.service';
import {NewsVO} from '../../../domain/news.vo';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {
  news: NewsVO;
  constructor(private route: ActivatedRoute, private adminService: AdminService) { }

  ngOnInit() {
    // news_id 얻기
    // 부모객체가 죽기전까지는 view component는 한번만 생성됨
    // 그래서 parms객체를 이용해서 uri parameter (Observale) 를 얻어와야 한다.
    // route ActivatedRoute를 이용해 url 파라미터를 감지..
    this.route.params
      .subscribe(params => {
        const news_id = +params['news_id']; // +를 붙이면 숫자타입이 된다.
        console.log("news_id : " + news_id);
        this.adminService.findOneNews(news_id)
          .subscribe(body => this.news = body);
      });
    // 뉴스상세보기 api 호출

  }

}

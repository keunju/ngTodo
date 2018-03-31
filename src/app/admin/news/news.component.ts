import { Component, OnInit } from '@angular/core';
import {AdminService} from '../admin.service';
import {NewsVO} from '../../domain/news.vo';
import {PageVO} from '../../domain/page.vo';
import {Router} from '@angular/router';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {
  newsList: NewsVO[];
  page: PageVO;
  constructor(private adminService: AdminService, private  router: Router) {
    this.page = new PageVO(0, 5, 0); // 4번째 인자는 옵셔널하기(? 사용)때문에 없어도 에러가 안난다.
  }

  ngOnInit() {
    this.findNews();
  }

  findNews() {
    const page = {
      start_index: this.page.pageSize * this.page.pageIndex,  // 페이지사이즈 * (현재페이지-1)
      page_size: this.page.pageSize
    };

    this.adminService.findNews(page)
      .subscribe(body => {
        console.log(body);
        this.newsList = body.data;
        // total 값 저장
        this.page.totalCount = body.total;
      });
  }

  pageChanged (event: any) {
    console.log(event);
    this.page.pageIndex = event.pageIndex;
    this.page.pageSize = event.pageSize;
    this.findNews();
  }

  gotoView(news_id: number) {
    this.router.navigateByUrl(`/admin/news/view/${news_id}`);
  }

  gotoWrite() {
    this.router.navigateByUrl(`/admin/news/write`);
  }
}

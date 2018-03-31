import { Component, OnInit } from '@angular/core';
import {NewsVO} from '../../../domain/news.vo';
import {AdminService} from '../../admin.service';

@Component({
  selector: 'app-write',
  templateUrl: './write.component.html',
  styleUrls: ['./write.component.scss']
})
export class WriteComponent implements OnInit {
  news: NewsVO = new NewsVO();

  fileList: FileList;

  constructor(private adminService: AdminService) { }

  ngOnInit() {
  }

  addNews() {
    this.adminService.addNews(this.news)
      .subscribe(body => {
        console.log(body);
        // 글쓰기가 성공하면 입력폼을 초기화 or 부모 리스트로 돌아기
      });
  }

  fileChange(event: any) {
    this.fileList = event.target.files;
    console.log(this.fileList);
    // show thumbnail
    const reader = new FileReader();
    reader.readAsDataURL((this.fileList[0]));
    reader.onload = () => {
      // this.thumbnailSrc = reader.result;
      this.imageUpload();
    };
  }

  imageUpload() {
    const formData: FormData = new FormData();

    if (this.fileList && this.fileList.length > 0) {
      const file: File = this.fileList[0];
      formData.append('file', file, file.name);
    }

    this.adminService.imageUpload(formData)
      .subscribe(body => {
        if (body['result'] === 0) {
          // 이미지 경로를  editor에 추가한다.
          console.log(body['value']);
          if (this.news.content) {
            this.news.content += `<img src="http://www.javabrain.kr${body['value']}" style="max-width: 100%;">`;
          } else {
            this.news.content = `<img src="http://www.javabrain.kr${body['value']}" style="max-width: 100%;">`;
          }
        }
      });
  }
}

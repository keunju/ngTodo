import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  selected: String;

  // 상단 툴바와 좌측 사이드 메뉴를 담당
  constructor() { }

  ngOnInit() {
  }

}

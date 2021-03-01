import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-article-remove-dialog',
  templateUrl: './article-remove-dialog.component.html',
  styleUrls: ['./article-remove-dialog.component.scss']
})
export class ArticleRemoveDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
  }

}

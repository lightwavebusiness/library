import { Component } from '@angular/core';
import { BookService } from '../service/Book.service';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  books:any[] = []


  constructor(private bookService: BookService, private platform: Platform) {
    this.books = [];
  }

  ngOnInit()  
  {
    this.platform.ready().then(() => {
      this.bookService.getBooks().then((books) => this.books = books);
    })
  }

}

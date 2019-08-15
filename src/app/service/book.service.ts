import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, filter } from 'rxjs/operators';
import { Storage } from '@ionic/storage';
@Injectable({
  providedIn: 'root'
})
export class BookService {

  books=[];

  book = null;

  constructor(private http: HttpClient, private storage: Storage) {
    this.getStorage();
   }
    
   getBooks() {
    return this.books.map(
      book => { console.log(book); 
        return book; }
    )
  }



  async addBook(name_, author_, blurb_) {
    console.log("Dictionary Service - Add Word: ", name_, author_, blurb_)

    var foundBook = await this.getBook(name_)
console.log(foundBook)

    if(foundBook) {

      console.log("found word")
      return false;
    } 
  this.books.push({name: name_, author: author_, blurb: blurb_})

  this.storage.set("Book", this.books)
  return true;
  }
  //console.log(this.words)

  async getStorage() {
    this.books = await this.storage.get("Book");
    if(this.books === null) this.books = []
   // console.log(this.words)
  }
}

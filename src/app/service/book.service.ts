import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, filter } from 'rxjs/operators';
import { Storage } from '@ionic/storage';
@Injectable({
  providedIn: 'root'
})
export class BookService {

  books=null;

//book = null;

  constructor(private http: HttpClient, private storage: Storage) {
    if(this.books==null)
      this.getStorage();
  }
    
  async getBooks() {
    if(this.books==null)
      await this.getStorage();

    return this.books.map(
      book => { console.log(book); 
        return book; }
    )
  }



  async AddBook(number_, name_, author_, blurb_) {
    console.log("Book Service - Add Book: ", number_, name_, author_, blurb_)

    var foundBook = await this.getBook(name_)
    console.log(foundBook)

    if(foundBook) {

      console.log("found word")
      return false;
    } else {
      this.books.push({number: number_, name: name_, author: author_, blurb: blurb_})

      this.storage.set("Book", this.books)
      return true;
    }
    return false  //console.log(this.words)
  }

  async getStorage() {
    this.books = await this.storage.get("Book");
    if(this.books === null) this.books = []
    console.log(this.books)
  }

  async getBook(findBook: string) {
      await this.getStorage()
      
      let book = this.books.filter((book) => { 
        //console.log("Book: ", book); 
        return (book.number === findBook)
      })[0];
      
      return book
  }
}

import { Component, OnInit } from '@angular/core';
import { IonicStorageModule } from '@ionic/storage';
import { BookService } from '../service/Book.service';
import { FormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-form',
  templateUrl: './form.page.html',
  styleUrls: ['./form.page.scss'],
})
export class FormPage implements OnInit {
  public addForm: FormGroup
  constructor(
    private storage: IonicStorageModule,
    private bookService: BookService,
    private formBuilder: FormBuilder,
    private router: Router,
    private alert: AlertController,
  )  {
    
    this.addForm = formBuilder.group({
        Name: ['', Validators.compose([Validators.required, Validators.minLength(2)])],
        Author: ['', Validators.compose([Validators.required])],
        Blurb: ['', Validators.compose([Validators.required])]
    }) 
  }

  ngOnInit() {
  }
  async AddBook(){
    console.log("Add Books")

   if(await this.bookService.AddBook(
    this.addForm.value.Name, 
    this.addForm.value.Author,
    this.addForm.value.Blurb)) {
      this.router.navigateByUrl('/Tab1');
    }


  }
}

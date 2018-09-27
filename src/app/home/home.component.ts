import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { MaratonService } from '../maraton.service';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  @ViewChild('content') modal : ViewContainerRef;
  form: FormGroup;
  result: any;
  fileInput: string = 'Seleccione un archivo...';
  showSpinner = false;

  constructor(private fb : FormBuilder, private service : MaratonService, 
    private modalService : NgbModal, config: NgbModalConfig) {
    this.form = this.fb.group({
      user: ['', Validators.required],
      file: null
    });
    config.backdrop = 'static';
    config.keyboard = false;
   }

   onFileChange(event) {
    if(event.target.files.length > 0) {
      let file = event.target.files[0];
      this.form.get('file').setValue(file);
      this.fileInput = file.name;
    }
  }

  onRegister() {
    const formModel = this.prepareSave();
    this.service.register(formModel).subscribe(data => {
      console.log(data);
      this.showSpinner = false;
      this.openModal(data.result);
    }, err => {
      this.showSpinner = false;
      this.openModal(err.error.message);
    });
  }

  onCompare() {
    const formModel = this.prepareSave();
    this.service.compare(formModel).subscribe(data => {
      this.showSpinner = false;
      this.openModal(data.result);
    }, err => {
      this.showSpinner = false;
      this.openModal(err.error.message);
    });
  }

  private prepareSave(): any {
    this.showSpinner = true;
    let input = new FormData();
    input.append('user', this.form.get('user').value);
    input.append('file', this.form.get('file').value);
    return input;
  }

  private openModal(message){
    this.result = message;
    this.modalService.open(this.modal);
  }

  ngOnInit() {
  }

}

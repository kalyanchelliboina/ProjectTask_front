import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../shared/project.service'
import { ActivatedRoute, Router } from '@angular/router'
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/auth.service';

import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {ElementRef, ViewChild} from '@angular/core';
import {FormControl} from '@angular/forms';
import {MatAutocompleteSelectedEvent, MatAutocomplete, MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatChipInputEvent} from '@angular/material/chips';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

@Component({
  selector: 'app-view-task',
  templateUrl: './view-task.component.html',
  styleUrls: ['./view-task.component.scss']
})
export class ViewTaskComponent implements OnInit {
  data;
  id;
  logTime = false;
  showDescription = false;
  sendData2:any = {
    startDate : "",
    endDate : "",
    description : "",
    workHours : ""
  }
  taskTitle;
  sendData = {
    comment : "",
    timeLog : "",
    billOrNonbill: ""
  }
  commentsData;
  public values = [
    { "value": 1, "text": "Billable" },
    { "value": 2, "text": "Non Billable" }
];
title = 'fileUpload';
  images;

  visible = true;
  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  fruitCtrl = new FormControl();
  filteredFruits: Observable<string[]>;
  fruits: string[];
  allFruits: string[];
  projectId;
  projectName;
  currentUrl = "";

  @ViewChild('fruitInput') fruitInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;

  constructor(private projectservice: ProjectService,
              private route: ActivatedRoute,
              private router: Router) {

                this.getUserEmails();
               }      
    


  ngOnInit() {
    this.data = this.route.params;
    console.log(window.location.href)
    this.currentUrl = window.location.href;
    // console.log(this.data._value.id);
    this.id = this.data._value.id;
    // console.log(this.id);
    this.projectservice.viewTask(this.id).subscribe(
      res => {
        this.taskTitle = res['name']; 
        this.projectId = res.projectId;
        console.log(this.projectId)
        console.log(res)
        this.commentsData = res.comments;
        this.sendData2 = res;
        this.fruits = res.assigned;
      },
      err => console.log(err)
    )
      console.log(this.allFruits)
    setTimeout(() => {this.filteredFruits = this.fruitCtrl.valueChanges.pipe(
      startWith(null),
      map((fruit: string | null) => fruit ? this._filter(fruit) : this.allFruits.slice()));
    }, 4000)

    setTimeout(() => {this.projectservice.viewProject(this.projectId).subscribe(
      res => {
        console.log(res)
        console.log('innn')
        this.projectName = res[0].name;
        console.log(this.projectName)
      },
      err => console.log(err)
    )}, 2000)
    console.log('here')
  }

  createComment() {
    this.projectservice.createComment(this.id, this.sendData).subscribe(
      res => {
        console.log(res);
        this.logTime = false;
      },
      err => console.log(err)
    )
  }

  updateDateDescription() {
    this.projectservice.updateDateDescription(this.id, this.sendData2).subscribe(
      res => {
        console.log(res);
      },
      err => console.log(err)
    )
  }


  showlogTime(){
    this.logTime = true;
  }

  closelogTime(){
    this.logTime = false;
  }

  ShowDescription(){
    this.showDescription = true;
  }

  closeDescription(){
    this.showDescription = false;
  }

  selectImage(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.images = file;
    }
  }
  onSubmit(){
    const formData = new FormData();
    formData.append('file', this.images);

    this.projectservice.fileupload(this.id, formData).subscribe(
      (res) => console.log(res),
      (err) => console.log(err)
    );
  }



  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;
  

    // Add our fruit
    if ((value || '').trim()) {
      this.fruits.push(value.trim());
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }

    this.fruitCtrl.setValue(null);
  }

  remove(fruit: string): void {
    const index = this.fruits.indexOf(fruit);
console.log(index)
    if (index >= 0) {
      this.fruits.splice(index, 1);
    }
    console.log(this.fruits)
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.fruits.push(event.option.viewValue);
    this.fruitInput.nativeElement.value = '';
    this.fruitCtrl.setValue(null);
    console.log(this.fruits)
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allFruits.filter(fruit => fruit.toLowerCase().indexOf(filterValue) === 0);
  }

  assignedData(){
    console.log(this.fruits)
    this.projectservice.assignedData(this.id, this.fruits).subscribe(
      res => {
        console.log(res)
        console.log('in res')
      },
      err => {
        console.log(err)
        console.log('in error')
      }
    )
    this.projectservice.sendEmailAfterAssign(this.fruits, this.taskTitle, this.projectName).subscribe(
      res => {
        console.log(res)
        console.log('in frontemail')
      },
      err => {
        console.log(err)
        console.log('in fronterror')
      }
    )
  }

  getUserEmails(){
    this.projectservice.getUserEmails().subscribe(
      res => {
        // console.log(this.allFruits)
        console.log(res)
       this.allFruits= res.map(element => element.fullName);
        console.log(this.allFruits)
      },
      err => {
        console.log(err)
      }
    )
  }

}

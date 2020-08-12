import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../shared/project.service'
import { ActivatedRoute, Router } from '@angular/router'

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
  constructor(private projectservice: ProjectService,
              private route: ActivatedRoute,
              private router: Router) { }          

  ngOnInit() {
    this.data = this.route.params;
    console.log(this.data._value.id);
    this.id = this.data._value.id;
    console.log(this.id);
    this.projectservice.viewTask(this.id).subscribe(
      res => {
        this.taskTitle = res['name']; 
        console.log(res)
        this.commentsData = res.comments;
        this.sendData2 = res;
      },
      err => console.log(err)
    )
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

}

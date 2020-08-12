import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../shared/project.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-project',
  templateUrl: './view-project.component.html',
  styleUrls: ['./view-project.component.scss']
})
export class ViewProjectComponent implements OnInit {
data;
gotId;
projectData;
viewAllTask;
  viewData;
  constructor(private router: Router,
              private projectservice: ProjectService,
              private route: ActivatedRoute ) { }

  ngOnInit() {
    this.getParams();
    this.viewAllTasks();
    this.viewProjectData();
  }


getParams(){
  this.data = this.route.params;
  this.gotId = this.data._value.id
}

viewProjectData() {
  this.projectservice.viewProject(this.gotId).subscribe(
    res => {
      this.projectData = res;
    },
    err => {
      console.log(err)
    }
  )
}

viewAllTasks(){
  this.projectservice.viewAllTasks(this.gotId).subscribe(
    res => {
      this.viewAllTask = res
    },
    err => {
      console.log(err)
    }
  )
}
  

}

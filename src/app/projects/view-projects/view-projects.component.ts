import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../shared/project.service';
import { Router } from '@angular/router'

@Component({
  selector: 'app-view-projects',
  templateUrl: './view-projects.component.html',
  styleUrls: ['./view-projects.component.scss']
})
export class ViewProjectsComponent implements OnInit {
viewData;
  constructor(private projectservice: ProjectService) { }

  ngOnInit() {
    console.log('what')
    this.viewProjects();
  }

  viewProjects(){
    this.projectservice.viewProjects().
      subscribe(
        data => {
          console.log('here')
          console.log(data)
          this.viewData = data;
        },
        err => {
          console.log(err)
        }
      )
  }

}

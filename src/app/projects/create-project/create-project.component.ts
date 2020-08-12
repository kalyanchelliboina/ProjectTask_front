import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../shared/project.service';
import { Router } from '@angular/router'

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.scss']
})
export class CreateProjectComponent implements OnInit {
  project = {}
  constructor(private projectservice:ProjectService,
              private router: Router) { }

  ngOnInit() {
  }

 createProject(){
   console.log(this.project)
   this.projectservice.createProject(this.project).
      subscribe(
        res => {
          console.log(res)
        },
        err => {
          console.log(err)
        }
      )
 }

}

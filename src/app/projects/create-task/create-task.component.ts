import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../shared/project.service'
import { Router, ActivatedRoute } from '@angular/router'
@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.scss']
})
export class CreateTaskComponent implements OnInit {
data;
paramData;
result;
createtask = {}
  constructor(private projectservice: ProjectService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.data = this.route.params;
    this.paramData = this.data._value.id;
  }

  createTask(){
    this.projectservice.createTask(this.createtask, this.paramData).subscribe(
      data => {
        console.log(data)
      },
      err => {
        console.log(err)
      }
    )

  }

}

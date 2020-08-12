import { Component } from '@angular/core';
import { AuthService } from '../app/auth.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'front';

  constructor(private auth: AuthService){}
}

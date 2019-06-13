import { Component } from '@angular/core';
import { EmpleadoComponent} from './components/empleado/empleado.component';
import { HeaderComponent } from './components/header/header.component';
import { FormComponent } from './components/form/form.component'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ExitFeedbackFront';
}

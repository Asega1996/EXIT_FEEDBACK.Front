import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule, MatCheckboxModule, MAT_DATE_LOCALE } from '@angular/material';
import { MatInputModule } from '@angular/material/input'; 
import { MatDatepickerModule } from '@angular/material/datepicker'; 
import { MatNativeDateModule } from '@angular/material';
import { MatCardModule } from '@angular/material/card'; 
import { MatStepperModule } from '@angular/material/stepper'; 
import { MatSelectModule } from '@angular/material/select';
import { FormsModule,  ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { DatePipe } from '@angular/common';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';



import { AppComponent } from './app.component';
import { EmpleadoComponent } from './components/empleado/empleado.component';
import { HeaderComponent } from './components/header/header.component';
import { FormComponent } from './components/form/form.component';
import { LogComponent } from './components/log/log.component';
import { ViewFormComponent } from './components/view_form/viewform.component';
import { NgbdModalContent } from './components/empleado/empleado.component';
import { ContinueFormComponent } from './components/contunue_form/continueform.component';


import { EmpleadoService } from './components/empleado/empleado.service';
import { FormService } from './components/form/form.service';
import { LogService } from './components/log/log.service';
import { ViewFormService } from './components/view_form/viewform.service';
import { ContinueFormService} from './components/contunue_form/continueform.service';


const routes = [
  { path: 'nuevoregistro', component: EmpleadoComponent},
  { path: 'form', component: FormComponent},
  { path: '', component: LogComponent},
  { path: 'view', component: ViewFormComponent},
  { path: 'continueform', component: ContinueFormComponent}

]

@NgModule({
  declarations: [
    AppComponent,
    EmpleadoComponent,
    HeaderComponent,
    FormComponent,
    LogComponent,
    ViewFormComponent,
    NgbdModalContent,
    ContinueFormComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,    
    MatButtonModule,
    MatCheckboxModule,
    MatInputModule,
    MatCardModule,
    MatSelectModule,
    MatDatepickerModule,
    FormsModule,
    HttpClientModule,
    NgbModule,
    RouterModule,
    MatStepperModule,
    RouterModule.forRoot(routes),
    ReactiveFormsModule,
    MatNativeDateModule,
    MatTableModule,
    MatPaginatorModule,
    
  ],
  entryComponents: [NgbdModalContent],
  providers: [EmpleadoService,
              FormService,
              LogService,
              ContinueFormService,
              ViewFormService,
              DatePipe,
              {provide: MAT_DATE_LOCALE, useValue: 'es-ES'}
             ],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { Component } from '@angular/core';
import { EmpleadoService } from './empleado.service';
import { Input } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'ngbd-modal-content',
    templateUrl: './empleadomodal.component.html'
  })
  export class NgbdModalContent {
    @Input() empleados;
  
    constructor(public activeModal: NgbActiveModal, private empleadoService: EmpleadoService) {}

    goToForm(numEmpleado){
        this.empleadoService.getEmpleado(numEmpleado);
        this.activeModal.close();
    }
  }

@Component({
    selector: 'empleado',
    templateUrl: './empleado.component.html'
})
export class EmpleadoComponent{

    numEmpleado = {};
    empleados;

    constructor(private api: EmpleadoService,private modalService: NgbModal){}

    open() {
        const modalRef = this.modalService.open(NgbdModalContent);
        modalRef.componentInstance.empleados = this.empleados;
      }

    async getEmpleado(numEmpleado){
        if(numEmpleado.Text){
            this.api.getEmpleado(numEmpleado.Text);
        }else
        {
            await this.api.getEmpleados(numEmpleado.Nombre,numEmpleado.Apellidos).then(
                res => {
                    console.log(res);
                    this.empleados = res;
                    if(this.empleados.length == 1){
                        this.api.getEmpleado(this.empleados[0].numEmpleado);
                    }
                    else{
                        let element: HTMLElement = document.getElementById('openModal') as HTMLElement;
                        element.click();
                    }
                })
        }
            

    }
        
}

export interface Empleado{
    numEmpleado: number;
    nombreEmpleado: string;
    apellidoEmpleado: string;
    categoriaId: number;
    lineaId: number;
    celdaId: number;
    centroId: number;
}
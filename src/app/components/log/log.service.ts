import { Injectable, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment} from '../../../environments/environment';
import { Subject, Observable } from 'rxjs'
import { HttpHeaders } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router'
import { CustomReg } from './log.component';


const rutaApiCelda = '/api/celda';
const rutaApiLinea = '/api/linea';
const rutaApiCentro = '/api/centro';
const rutaApiTipoEmpresa = '/api/tipoempresa';
const rutaApiTipoSalida = '/api/tiposalida';
const rutaApiRegistro = '/api/registro';
const rutaApiCustomReg = '/api/fetchregistro';

const rutaApiForm = '/api/empleado/numempleado/';

const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': 'my-auth-token'
    })
  };

@Injectable()
export class LogService { 

    constructor(private http: HttpClient, private router: Router) {}

    getCelda(){
        var url = environment.urlBase + rutaApiCelda;
        return this.http.get(url);
    }

    getLinea(){
        var url = environment.urlBase + rutaApiLinea;
        return this.http.get(url); 
    }

    getCentro(){
        var url = environment.urlBase + rutaApiCentro;
        return this.http.get(url); 
    }

    getTipoSalida(){
        var url = environment.urlBase + rutaApiTipoSalida;
        return this.http.get(url); 
    }

    getTipoEmpresa(){
        var url = environment.urlBase + rutaApiTipoEmpresa;
        return this.http.get(url); 
    }

    getRegistros(){
        var url = environment.urlBase + rutaApiRegistro;
        return this.http.get(url); 
    }

    getFetchData(){
        var url = environment.urlBase + rutaApiCustomReg;
        return this.http.get(url).toPromise();
    }

    postFetchData(filterForm){
        var url = environment.urlBase + rutaApiCustomReg;
        let data = {} as CustomReg;
        if(filterForm.value.numeroEmpleado){
            data.numempleado = filterForm.value.numeroEmpleado;
        }else{
            data.numempleado = 0
        }
        console.log(filterForm.value.finalizado);
        data.nombre = filterForm.value.nombreEmpleado;
        data.apellidos = filterForm.value.apellidosEmpleado;
        data.celda = filterForm.value.celdaEmpleado;
        data.linea = filterForm.value.lineaEmpleado;
        if(!filterForm.value.finalizado){
            data.finalizado = false;
        }else{
            data.finalizado = filterForm.value.finalizado;
        }
        data.centro = filterForm.value.centroEmpleado;
        data.sectorEmpresaDestino = filterForm.value.sectorEmpresaEmpleado;
        data.tipoSalida = filterForm.value.tipoSalidaEmpleado;
        



        return this.http.post(url,data,httpOptions).toPromise();
    }

    getEmpleado(numEmpleado: number){
        var url = environment.urlBase + rutaApiForm + numEmpleado;
        this.http.get(url).subscribe(
                res =>{
                    this.router.navigate(['/form', res],{ skipLocationChange: true });
                    }
            )
    }

    getViewForm(numEmpleado: number){
        var url = environment.urlBase + rutaApiForm + numEmpleado;
        this.http.get(url).subscribe(
                res =>{
                    this.router.navigate(['/view', res],{ skipLocationChange: true });
                    }
            )
    }

    continueForm(numEmpleado:number){
        var url = environment.urlBase + rutaApiForm + numEmpleado;
        this.http.get(url).subscribe(
                res =>{
                    this.router.navigate(['/continueform', res],{skipLocationChange: true});
                    }
            )
    }

    

}
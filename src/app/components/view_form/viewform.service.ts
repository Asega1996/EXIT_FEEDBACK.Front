import { Injectable, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment} from '../../../environments/environment';
import { Subject, Observable } from 'rxjs'
import { HttpHeaders } from '@angular/common/http';
import { DatePipe } from '@angular/common';


const rutaApiTitulacion = '/api/titulacion';
const rutaApiTiempoEnProyecto = '/api/tiempoenproyecto';
const rutaApiTecnologia = '/api/tecnologia';
const rutaApiCelda = '/api/celda';
const rutaApiProyecto = '/api/proyecto';
const rutaApiCategoriaActual = '/api/categoriaactual';
const rutaApiCentro = '/api/centro';
const rutaApiLinea = '/api/linea';
const rutaApiIncrementoSalarial = '/api/incrementosalarial';
const rutaApiTipoSalida = '/api/tiposalida';
const rutaApiSectorEmpresa = '/api/sector';
const rutaApiTipoBusqueda = '/api/tipobusqueda';
const rutaApiTipoEmpresa = '/api/tipoempresa';
const rutaApiDatoEmpleado = '/api/datoempleados';
const rutaApiDatoEmpleadoGet = '/api/datoempleados/';
const rutaApiDatoSalida = '/api/datosalidas';
const rutaApiDatoSalidaGet = '/api/datosalidas/';
const rutaApiDatoEntrevista = '/api/datoentrevistas';
const rutaApiDatoEntrevistaGet = '/api/datoentrevistas/';
const rutaApiDatoCalificacion = '/api/datocalificaciones';
const rutaApiDatoCalificacionGet = '/api/datocalificaciones/';
const rutaApiRegistro = '/api/registro';
const rutaApiRegistroBusqueda = '/api/registro/';
const rutaApiMotivoSalida = '/api/motivosalida'; 
const rutaApiSubmotivoSalida = '/api/submotivosalida/'

const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': 'my-auth-token'
    })
  };


@Injectable()
export class ViewFormService {

    //private titulaciones = new Subject<any>();
    //titulaciones = this.getTitulacion();

    constructor(private http: HttpClient, public datepipe: DatePipe) {}
    
    getTitulacion(){
        var url = environment.urlBase + rutaApiTitulacion;
        /*return this.http.get(url).subscribe(
                res =>{ 
                    console.log(res); 
                    res;}
            )*/
        return this.http.get(url);
    }

    getTiempoEnProyecto(){
        var url = environment.urlBase + rutaApiTiempoEnProyecto;
        return this.http.get(url);
    }
    
    getTecnologia(){
        var url = environment.urlBase + rutaApiTecnologia;
        return this.http.get(url);
    }
    
    getCelda(){
        var url = environment.urlBase + rutaApiCelda;
        return this.http.get(url);
    }
    
    getProyecto(){
        var url = environment.urlBase + rutaApiProyecto;
        return this.http.get(url); 
    }

    getCategoriaActual(){
        var url = environment.urlBase + rutaApiCategoriaActual;
        return this.http.get(url); 
    }

    getCentro(){
        var url = environment.urlBase + rutaApiCentro;
        return this.http.get(url); 
    }

    getLinea(){
        var url = environment.urlBase + rutaApiLinea;
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

    getSectorEmpresa(){
        var url = environment.urlBase + rutaApiSectorEmpresa;
        return this.http.get(url); 
    }

    getTipoBusqueda(){
        var url = environment.urlBase + rutaApiTipoBusqueda;
        return this.http.get(url); 
    }

    getIncrementoSalarial(){
        var url = environment.urlBase + rutaApiIncrementoSalarial;
        return this.http.get(url);
    }

    getMotivoSalarial(){
        var url = environment.urlBase + rutaApiMotivoSalida;
        return this.http.get(url);
    }

    getSubmotivo(id){
        var url = environment.urlBase + rutaApiSubmotivoSalida + id;
        return this.http.get(url);
    }

    getRegistroId(empleadoId){
        var url = environment.urlBase + rutaApiRegistroBusqueda + empleadoId;
        return this.http.get(url); 
    }

    getDatoEmpleado(id){
        var url = environment.urlBase + rutaApiDatoEmpleadoGet + id;
        return this.http.get(url);
    }

    getDatoCalificacion(id){
        var url = environment.urlBase + rutaApiDatoCalificacionGet + id;
        return this.http.get(url);
    }

    getDatoEntrevista(id){
        var url = environment.urlBase + rutaApiDatoEntrevistaGet + id;
        return this.http.get(url);
    }

    getDatoSalida(id){
        var url = environment.urlBase + rutaApiDatoSalidaGet + id;
        return this.http.get(url);
    }



}
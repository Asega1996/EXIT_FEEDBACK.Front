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
export class FormService {

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

    postFormDatoEmpleado(formControl){

        var url = environment.urlBase + rutaApiDatoEmpleado;   
        let formData: FormData = new FormData(); 
        formData.append('carreraId',formControl.get('firstCtrlTitulacionEmpleado').value);
        formData.append('titulacionId',formControl.get('firstCtrlTitulacionEmpleado').value);
        formData.append('tecnologiaId',formControl.get('firstCtrlTecnologiaEmpleado').value);
        formData.append('proyectoId',formControl.get('firstCtrlProyectoEmpleado').value);
        formData.append('tiempoProyectoId',formControl.get('firstCtrlTiempoEnProyectoEmpleado').value);
        formData.append('supervisor',formControl.get('firstCtrlSupervisorEmpleado').value);
        formData.append('tutor',formControl.get('firstCtrlTutorEmpleado').value);
        formData.append('TitulacionTipificadaId',formControl.get('firstCtrlTitulacionEmpleado').value);
        formData.append('numEmpleado',formControl.get('firstCtrlNumEmpleado').value);
        if(Number((<HTMLInputElement> document.getElementById("idDatoEmpleado")).value) != 0){
            formData.append('datoEmpleadoId',(<HTMLInputElement> document.getElementById("idDatoEmpleado")).value);
        }


        var object = {};
        formData.forEach((value, key) => {object[key] = value});
        var json = JSON.stringify(object);
        console.log(json);

        this.http.post(url, json, httpOptions).subscribe(res => {
            console.log(res)
            let array = Object.values(res);
            console.log(array[0]);
            
            let formDataReg: FormData = new FormData();
            (<HTMLInputElement>document.getElementById("idDatoEmpleado")).value = array[0];
            formDataReg.append('registroId', (<HTMLInputElement> document.getElementById("idRegistro")).value);
            formDataReg.append('datosEmpleadoId',array[0]);

            var object = {};
            formDataReg.forEach((value, key) => {object[key] = value});
            var json = JSON.stringify(object);

            let urlUpdateReg =environment.urlBase + rutaApiRegistro;

            this.http.post(urlUpdateReg, json, httpOptions).subscribe(res => { console.log(res) });
        });
        
    }

    postFormDatoSalida(formControl){

        var url = environment.urlBase + rutaApiDatoSalida;   
        let formData: FormData = new FormData(); 
        formData.append('tipoSalidaId',formControl.get('secondCtrlTipoSalida').value);
        formData.append('motivoSalida1',formControl.get('secondCtrlMotivoSalida1').value);
        formData.append('subMotivo1',formControl.get('secondCtrlSubMotivo1').value);
        formData.append('motivoSalida2',formControl.get('secondCtrlMotivoSalida2').value);
        formData.append('subMotivo2',formControl.get('secondCtrlSubMotivo2').value);
        formData.append('tipoBusquedaId',formControl.get('secondCtrlTipoBusqueda').value);
        formData.append('sectorEmpresaDestinoId',formControl.get('secondCtrlSectorEmpresaDestino').value);
        formData.append('tipoEmpresaDestinoId',formControl.get('secondCtrlTipoEmpresaDestino').value);
        formData.append('empresaDestino',formControl.get('secondCtrlEmpresaDestino').value);
        formData.append('incrementoSalarial',formControl.get('secondCtrlIncrementoSalarial').value);
        formData.append('nuevoPuesto',formControl.get('secondCtrlNuevoPuesto').value);
        formData.append('ubicacion',formControl.get('secondCtrlUbicacion').value);
        formData.append('observacionesNuevoEmpleo',formControl.get('secondCtrlObservaciones').value);
        //formData.append('fechaBaja',formControl.get('secondCtrlFechaBaja').value);
        if(Number((<HTMLInputElement> document.getElementById("idDatoSalida")).value) != 0){
            formData.append('datoSalidaId',(<HTMLInputElement> document.getElementById("idDatoSalida")).value);
        }

        var date = this.datepipe.transform(formControl.get('secondCtrlFechaBaja').value,'MM/dd/yyyy hh:mm:ss');
        formData.append('fechaBaja',date);

        var object = {};
        formData.forEach((value, key) => {object[key] = value});
        var json = JSON.stringify(object);
        console.log(json);

        this.http.post(url, json, httpOptions).subscribe(res => {
            console.log(res)
            let array = Object.values(res);
            console.log(array[0]);
            
            let formDataReg: FormData = new FormData();
            (<HTMLInputElement>document.getElementById("idDatoSalida")).value = array[0];
            formDataReg.append('registroId', (<HTMLInputElement> document.getElementById("idRegistro")).value);
            formDataReg.append('datosSalidaId',array[0]);

            var object = {};
            formDataReg.forEach((value, key) => {object[key] = value});
            var json = JSON.stringify(object);

            let urlUpdateReg =environment.urlBase + rutaApiRegistro;

            this.http.post(urlUpdateReg, json, httpOptions).subscribe(res => { console.log(res) });
        });


    }

    postFormDatoCalificacion(formControl){

        var url = environment.urlBase + rutaApiDatoCalificacion;   
        let formData: FormData = new FormData(); 
        formData.append('procesoSeleccionNota',formControl.get('thirdCtrlProcesoSeleccionNota').value);
        formData.append('procesoSeleccionComentario',formControl.get('thirdCtrlProcesoSeleccionComentario').value);
        formData.append('integracionNota',formControl.get('thirdCtrlIntegracionNota').value);
        formData.append('integracionComentario',formControl.get('thirdCtrlIntegracionComentario').value);
        formData.append('tutorNota',formControl.get('thirdCtrlTutorNota').value);
        formData.append('tutorComentario',formControl.get('thirdCtrlTutorComentario').value);
        formData.append('retribucionNota',formControl.get('thirdCtrlRetribucionNota').value);
        formData.append('retribucionComentario',formControl.get('thirdCtrlRetribucionComentario').value);
        formData.append('horarioNota',formControl.get('thirdCtrlHorarioNota').value);
        formData.append('horarioComentario',formControl.get('thirdCtrlHorarioComentario').value);
        formData.append('formacionNota',formControl.get('thirdCtrlFormacionNota').value);
        formData.append('formacionComentario',formControl.get('thirdCtrlFormacionComentario').value);
        formData.append('supervisoresNota',formControl.get('thirdCtrlSupervisoresNota').value);
        formData.append('supervisoresComentario',formControl.get('thirdCtrlSupervisoresComentario').value);
        formData.append('comunicacionInternaNota',formControl.get('thirdCtrlComunicacionInternaNota').value);
        formData.append('comunicacionInternComentario',formControl.get('thirdCtrlComunicacionInternComentario').value);
        if(Number((<HTMLInputElement> document.getElementById("idDatoCalificacion")).value) != 0){
            formData.append('datoCalificacionId',(<HTMLInputElement> document.getElementById("idDatoCalificacion")).value);
        }

        var object = {};
        formData.forEach((value, key) => {object[key] = value});
        var json = JSON.stringify(object);
        console.log(json);

        this.http.post(url, json, httpOptions).subscribe(res => {
            console.log(res)
            let array = Object.values(res);
            console.log(array[0]);
            
            let formDataReg: FormData = new FormData();
            (<HTMLInputElement>document.getElementById("idDatoCalificacion")).value = array[0];
            formDataReg.append('registroId', (<HTMLInputElement> document.getElementById("idRegistro")).value);
            formDataReg.append('datosCalificacionesId',array[0]);

            var object = {};
            formDataReg.forEach((value, key) => {object[key] = value});
            var json = JSON.stringify(object);

            let urlUpdateReg =environment.urlBase + rutaApiRegistro;

            this.http.post(urlUpdateReg, json, httpOptions).subscribe(res => { console.log(res) });
        });

    }

    postFormDatoEntrevista(formControl){

        var url = environment.urlBase + rutaApiDatoEntrevista;   
        let formData: FormData = new FormData(); 
        formData.append('nombreEntrevistador',formControl.get('quarterCtrlNombreEntrevistador').value);
        formData.append('comentarioEntrevistador',formControl.get('quarterCtrlComentarioEntrevistador').value);
        formData.append('informacionSupervisor',formControl.get('quarterCtrlInformacionEntrevistador').value);
        //formData.append('fechaEntrevista',formControl.get('quarterCtrlFechaEntrevista').value);
        if(Number((<HTMLInputElement> document.getElementById("idDatoEntrevista")).value) != 0){
            formData.append('datoEntrevistaId',(<HTMLInputElement> document.getElementById("idDatoEntrevista")).value);
        }

        var date = this.datepipe.transform(formControl.get('quarterCtrlFechaEntrevista').value,'MM/dd/yyyy hh:mm:ss');
        formData.append('fechaEntrevista',date);

        var object = {};
        formData.forEach((value, key) => {object[key] = value});
        var json = JSON.stringify(object);
        console.log(json);

        this.http.post(url, json, httpOptions).subscribe(res => {
            console.log(res)
            let array = Object.values(res);
            console.log(array[0]);
            
            let formDataReg: FormData = new FormData();
            (<HTMLInputElement>document.getElementById("idDatoEntrevista")).value = array[0];
            formDataReg.append('registroId', (<HTMLInputElement> document.getElementById("idRegistro")).value);
            formDataReg.append('datosEntrevistaId',array[0]);

            var object = {};
            formDataReg.forEach((value, key) => {object[key] = value});
            var json = JSON.stringify(object);

            let urlUpdateReg =environment.urlBase + rutaApiRegistro;

            this.http.post(urlUpdateReg, json, httpOptions).subscribe(res => { console.log(res) });
        });
        

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
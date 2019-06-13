import {Component, OnInit, Input} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ViewFormService } from './viewform.service';
import { ActivatedRoute } from '@angular/router';
import {FormControl} from '@angular/forms';

@Component({
    selector: 'formulario',
    templateUrl: './viewform.component.html'
})

export class ViewFormComponent implements OnInit{

    disableSelect = new FormControl(true);
    isLinear = false;
    firstFormGroup: FormGroup;
    secondFormGroup: FormGroup;
    thirdFormGroup: FormGroup;
    quarterFormGroup: FormGroup;
    
    titulacion = {};
    titulaciones;
    tiempoEnProyecto;
    tecnologias;
    celdas;
    proyectos;
    categoriaActual;
    centros;
    lineas;
    salidas;
    empresas;
    sectores;
    busquedas;
    incrementos;
    motivoSalida;
    submotivo1;
    submotivo2;


    registro;
    datoSalida;
    datoEmpleado;
    datoEntrevista;
    datoCalificaciones;

    @Input() empleado;

    constructor(private _formBuilder: FormBuilder,private api: ViewFormService, private activeRoute: ActivatedRoute) {
       
    }


    //GETTERS TABLAS MAESTRO
    getTitulacion(){
      this.api.getTitulacion().subscribe(res => {this.titulaciones = res});
    }

    getTiempoEnProyecto(){
      this.api.getTiempoEnProyecto().subscribe(res => {this.tiempoEnProyecto = res});
    }

    getTecnologia(){
      this.api.getTecnologia().subscribe(res => {this.tecnologias = res});
    }

    getCelda(){
      this.api.getCelda().subscribe(res => {this.celdas = res});
    }

    getProyecto(){
      this.api.getProyecto().subscribe(res => {this.proyectos = res});
    }

    getCategoriaActual(){
      this.api.getCategoriaActual().subscribe(res => {this.categoriaActual = res});
    }

    getCentro(){
      this.api.getCentro().subscribe(res => {this.centros = res});
    }
  
    getLinea(){
      this.api.getLinea().subscribe(res => {this.lineas = res});
    }

    getTipoSalida(){
      this.api.getTipoSalida().subscribe(res => {this.salidas = res});
    }

    getTipoEmpresa(){
      this.api.getTipoEmpresa().subscribe(res => {this.empresas = res});
    }

    getSectorEmpresa(){
      this.api.getSectorEmpresa().subscribe(res => {this.sectores = res});
    }

    getTipoBusqueda(){
      this.api.getTipoBusqueda().subscribe(res => {this.busquedas = res});
    }

    getIncrementoSalarial(){
      this.api.getIncrementoSalarial().subscribe(res => {this.incrementos = res})
    }

    getMotivoSalida(){
      this.api.getMotivoSalarial().subscribe(res => {this.motivoSalida = res})
    }

    getSubMotivo1(formControl){
      let id = formControl.get('secondCtrlMotivoSalida1').value;
      this.api.getSubmotivo(id).subscribe(res => {this.submotivo1 = res; })
    }

    getSubMotivo2(formControl){
      let id = formControl.get('secondCtrlMotivoSalida2').value;
      this.api.getSubmotivo(id).subscribe(res => {this.submotivo2 = res; });
    }



    //Resto funciones
    getRegistroId(empleadoId){
      this.api.getRegistroId(empleadoId).subscribe(
        res => {
          console.log(res);
          this.registro = res;
          //let arrayNames = Object.getOwnPropertyNames(res);
          let arrayValues = Object.values(res);

         

          if(arrayValues[3] != null){
            this.getDatoCalificaciones(arrayValues[3]);
          }

          if(arrayValues[4] != null){
            this.getDatoSalida(arrayValues[4]);
          }

          if(arrayValues[5] != null){
            this.getDatoEntrevista(arrayValues[5]);
          }

          if(arrayValues[2] != null){
            this.getDatoEmpleado(arrayValues[2]);
          }

        });
    }
    
    getDatoEmpleado(id){
      this.api.getDatoEmpleado(id).subscribe(res =>{ this.datoEmpleado = res; this.loadDatoEmpleado()})
    }

    getDatoCalificaciones(id){
      this.api.getDatoCalificacion(id).subscribe(res =>{ this.datoCalificaciones = res;this.loadDatoCalificacion()})
    }

    getDatoSalida(id){
      this.api.getDatoSalida(id).subscribe(res =>{ this.datoSalida = res;  this.loadDatoSalida()})
    }

    getDatoEntrevista(id){
      this.api.getDatoEntrevista(id).subscribe(res =>{ this.datoEntrevista = res; this.loadDatoEntrevista()})
    }


    loadDatoEmpleado(){
      var data = Object.values(this.datoEmpleado);
      this.firstFormGroup.patchValue({
        firstCtrlTecnologiaEmpleado: data[2],
        firstCtrlTitulacionEmpleado: data[3],
        firstCtrlTutorEmpleado: data[9],
        firstCtrlSupervisorEmpleado: data[8],
        firstCtrlProyectoEmpleado: data[6],
        firstCtrlTiempoEnProyectoEmpleado: data[5]
      });
      (<HTMLInputElement>document.getElementById("idDatoEmpleado")).value = this.datoEmpleado.datoEmpleadoId;
    }

    loadDatoSalida(){
      var data = Object.values(this.datoSalida);
      this.secondFormGroup.patchValue({
        secondCtrlTipoSalida: data[1],
        secondCtrlMotivoSalida1:  data[2],
        secondCtrlMotivoSalida2: data[4],
        secondCtrlSubMotivo1: data[3],
        secondCtrlSubMotivo2: data[5],
        secondCtrlTipoBusqueda: data[6],
        secondCtrlSectorEmpresaDestino: data[7],
        secondCtrlTipoEmpresaDestino: data[8],
        secondCtrlEmpresaDestino: data[9],
        secondCtrlIncrementoSalarial: data[10],
        secondCtrlNuevoPuesto: data[11],
        secondCtrlUbicacion: data[12],
        secondCtrlObservaciones: data[13],
        secondCtrlFechaBaja: data[14]
      });
      (<HTMLInputElement>document.getElementById("idDatoSalida")).value = this.datoSalida.datoSalidaId;
      
      this.getSubMotivo1(this.secondFormGroup);
      this.getSubMotivo2(this.secondFormGroup);
    }

    loadDatoCalificacion(){
      let data = Object.values(this.datoCalificaciones);
      this.thirdFormGroup.patchValue({
        thirdCtrlProcesoSeleccionNota: data[1],
        thirdCtrlIntegracionNota:  data[3],
        thirdCtrlTutorNota:  data[5],
        thirdCtrlProcesoSeleccionComentario:  data[2],
        thirdCtrlIntegracionComentario:  data[3],
        thirdCtrlTutorComentario:  data[6],
        thirdCtrlRetribucionNota:  data[7],
        thirdCtrlHorarioNota:  data[9],
        thirdCtrlFormacionNota:  data[11],
        thirdCtrlRetribucionComentario:  data[8],
        thirdCtrlHorarioComentario: data[10],
        thirdCtrlFormacionComentario:  data[12],
        thirdCtrlSupervisoresNota: data[13],
        thirdCtrlSupervisoresComentario:  data[14],
        thirdCtrlComunicacionInternaNota:  data[15],
        thirdCtrlComunicacionInternComentario:  data[16]
      });
      (<HTMLInputElement>document.getElementById("idDatoCalificacion")).value = this.datoCalificaciones.datoCalificacionId;
    }

    loadDatoEntrevista(){
      var data = Object.values(this.datoEntrevista);
      this.quarterFormGroup.patchValue({
        quarterCtrlNombreEntrevistador: data[4],
        quarterCtrlComentarioEntrevistador: data[1],
        quarterCtrlInformacionEntrevistador: data[2],
        quarterCtrlFechaEntrevista: data[3]

      });
      (<HTMLInputElement>document.getElementById("idDatoEntrevista")).value = this.datoEntrevista.datoEntrevistaId;
    }



    ngOnInit() {

     
     


      //CREACION FORMULARIOS + VALIDACIONES
      this.firstFormGroup = this._formBuilder.group({
        firstCtrlNumEmpleado: ['', ''],
        firstCtrlNombreEmpleado: ['', ''],
        firstCtrlApellidosEmpleado: ['', ''],
        firstCtrlCentroEmpleado: ['', ''],
        firstCtrlTecnologiaEmpleado: ['', ''],
        firstCtrlTitulacionEmpleado: ['', ''],
        firstCtrlCategoriaEmpleado: ['', ''],
        firstCtrlLineaEmpleado: ['', ''],
        firstCtrlCeldaEmpleado: ['', ''],
        firstCtrlProyectoEmpleado: ['', ''],
        firstCtrlTiempoEnProyectoEmpleado: ['', ''],
        firstCtrlTutorEmpleado: ['', ''],
        firstCtrlSupervisorEmpleado: ['', '']
      });

      this.secondFormGroup = this._formBuilder.group({
        secondCtrlTipoSalida:  ['', ''],
        secondCtrlMotivoSalida1: ['', ''],
        secondCtrlMotivoSalida2:['', ''],
        secondCtrlSubMotivo1:['', ''],
        secondCtrlSubMotivo2:['', ''],
        secondCtrlTipoBusqueda:['', ''],
        secondCtrlSectorEmpresaDestino:['', ''],
        secondCtrlTipoEmpresaDestino:['', ''],
        secondCtrlEmpresaDestino:['', ''],
        secondCtrlIncrementoSalarial:['', ''],
        secondCtrlNuevoPuesto:['', ''],
        secondCtrlUbicacion:['', ''],
        secondCtrlObservaciones:['', ''],
        secondCtrlFechaBaja:['', '']
      });

      this.thirdFormGroup = this._formBuilder.group({
        thirdCtrlProcesoSeleccionNota:  ['', ''],
        thirdCtrlIntegracionNota:  ['', ''],
        thirdCtrlTutorNota:  ['', ''],
        thirdCtrlProcesoSeleccionComentario:  ['', ''],
        thirdCtrlIntegracionComentario:  ['', ''],
        thirdCtrlTutorComentario:  ['', ''],
        thirdCtrlRetribucionNota:  ['', ''],
        thirdCtrlHorarioNota:  ['', ''],
        thirdCtrlFormacionNota:  ['', ''],
        thirdCtrlRetribucionComentario:  ['', ''],
        thirdCtrlHorarioComentario:  ['', ''],
        thirdCtrlFormacionComentario:  ['', ''],
        thirdCtrlSupervisoresNota:  ['', ''],
        thirdCtrlSupervisoresComentario:  ['', ''],
        thirdCtrlComunicacionInternaNota:  ['', ''],
        thirdCtrlComunicacionInternComentario:  ['', '']
      });
      
      this.quarterFormGroup = this._formBuilder.group({
        quarterCtrlNombreEntrevistador: ['', ''],
        quarterCtrlComentarioEntrevistador: ['',''],
        quarterCtrlInformacionEntrevistador: ['', ''],
        quarterCtrlFechaEntrevista: ['','']

      });

      //DATOS MAESTROS
      this.getTitulacion();
      this.getTiempoEnProyecto();
      this.getTecnologia();
      this.getCelda();
      this.getProyecto();
      this.getCategoriaActual();
      this.getCentro();
      this.getLinea();
      this.getTipoSalida();
      this.getTipoEmpresa();
      this.getSectorEmpresa();
      this.getTipoBusqueda();
      this.getIncrementoSalarial();
      this.getMotivoSalida();

      
      //CARGA DATOS DEL BUSCADOR
      this.firstFormGroup.patchValue({
        firstCtrlNumEmpleado: this.activeRoute.snapshot.paramMap.get("numEmpleado"), 
        firstCtrlCentroEmpleado: this.activeRoute.snapshot.paramMap.get("centroId"),
        firstCtrlApellidosEmpleado: this.activeRoute.snapshot.paramMap.get("apellidoEmpleado"),
        firstCtrlLineaEmpleado: this.activeRoute.snapshot.paramMap.get("lineaId"),
        firstCtrlCategoriaEmpleado: this.activeRoute.snapshot.paramMap.get("categoriaId"),
        firstCtrlCeldaEmpleado: this.activeRoute.snapshot.paramMap.get("celdaId"),
        firstCtrlNombreEmpleado: this.activeRoute.snapshot.paramMap.get("nombreEmpleado")
      });

       //CREACION DEL REGISTRO
      this.getRegistroId(this.activeRoute.snapshot.paramMap.get("id"));

    }


}
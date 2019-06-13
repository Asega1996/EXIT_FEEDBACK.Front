import { Component, OnInit, ViewChild} from '@angular/core';
import { LogService } from './log.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { FormGroup, FormControl } from '@angular/forms';


@Component({
    selector: 'log',
    templateUrl: './log.component.html'
})



export class LogComponent implements OnInit { 
    
    filterForm = new FormGroup({
        numeroEmpleado: new FormControl(''),
        nombreEmpleado: new FormControl(''),
        apellidosEmpleado: new FormControl(''),
        centroEmpleado: new FormControl(''),
        lineaEmpleado: new FormControl(''),
        celdaEmpleado: new FormControl(''),
        tipoSalidaEmpleado: new FormControl(''),
        sectorEmpresaEmpleado: new FormControl(''),
        finalizado: new FormControl('')
    });


    celdas;
    centros;
    lineas;
    salidas;
    empresas;
    registros;

    arrayData;

    constructor(private api: LogService) { }
    
    displayedColumns: string[] = ['numempleado', 'nombre', 'apellidos', 'linea', 'celda', 'fechaSalida', 'options'];
    dataSource = new MatTableDataSource<CustomReg>(this.arrayData);

    @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

    getCelda(){
        this.api.getCelda().subscribe(res => { this.celdas = res });
    }

    getLinea(){
        this.api.getLinea().subscribe(res => {this.lineas = res});
    }

    getCentro(){
        this.api.getCentro().subscribe(res => {this.centros = res});
    }

    getTipoSalida(){
        this.api.getTipoSalida().subscribe(res => {this.salidas = res});
    }

    getTipoEmpresa(){
        this.api.getTipoEmpresa().subscribe(res => {this.empresas = res});
    }

    getRegistros(){
        this.api.getRegistros().subscribe(res => {this.registros = res});
    }

    edit(numempleado){
        this.api.getEmpleado(numempleado);
    }

    view(numempleado){
        this.api.getViewForm(numempleado);
    }

    continue(numempleado){
        this.api.continueForm(numempleado);
    }

    async getFetchData(){
        await this.api.getFetchData().then(res => {console.log(res); this.arrayData = res})
        ELEMENT_DATA = [];
        this.arrayData.forEach(function(reg){
            //reg.fechaSalida = reg.fechaSalida.getDate();
            ELEMENT_DATA.push(reg);
            console.log(ELEMENT_DATA);
        })
        this.dataSource.data=ELEMENT_DATA;
    }

    async filter(filterForm){
        await this.api.postFetchData(filterForm).then(res=> this.arrayData = res)
        ELEMENT_DATA = [];
        this.arrayData.forEach(function(reg){
            //reg.fechaSalida = reg.fechaSalida.getDate();
            ELEMENT_DATA.push(reg);
            console.log(ELEMENT_DATA);
        })
        this.dataSource.data=ELEMENT_DATA;
        
    }




    ngOnInit() {

        this.paginator._intl.itemsPerPageLabel = 'Registros por página';
        this.paginator._intl.nextPageLabel = 'Siguiente';
        this.paginator._intl.previousPageLabel = 'Anterior';
        this.paginator._intl.getRangeLabel = (page: number, pageSize: number, length: number) => {
            if (length === 0 || pageSize === 0) {
              return `0 de ${length}`;
            }
            length = Math.max(length, 0);
            const startIndex = page * pageSize;
            const endIndex = startIndex < length ? Math.min(startIndex + pageSize, length) : startIndex + pageSize;
            return `${startIndex + 1} - ${endIndex} de ${length}`;
          };

        this.getCelda();
        this.getLinea();
        this.getCentro();
        this.getTipoSalida();
        this.getTipoEmpresa();

        this.dataSource.paginator = this.paginator;
        this.getFetchData();

    }


}

let ELEMENT_DATA: CustomReg[] = [
   

  ];

export interface CustomReg {
    numempleado: number;
    nombre: string;
    apellidos: string;
    linea: number;
    celda: number;
    fechaSalida: Date;
    finalizado: boolean;
    centro:number;
    sectorEmpresaDestino:number;
    tipoSalida:number

}
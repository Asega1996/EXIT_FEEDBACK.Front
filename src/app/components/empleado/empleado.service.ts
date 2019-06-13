import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment} from '../../../environments/environment';
import { Router } from '@angular/router'
import { Empleado } from './empleado.component';

const rutaApi = '/api/empleado/numempleado/';
const rutaApiPost = '/api/empleado';

const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': 'my-auth-token'
    })
  };

@Injectable()
export class EmpleadoService {

    constructor(private http: HttpClient, private router: Router) {}

    getEmpleado(numEmpleado: number){
        var url = environment.urlBase + rutaApi + numEmpleado;
        this.http.get(url).subscribe(
                res =>{
                    this.router.navigate(['/form', res],{ skipLocationChange: true });
                    }
            )
    }

    async getEmpleados(nombre,apellidos){
        let data = {} as Empleado;
        data.apellidoEmpleado = apellidos;
        data.nombreEmpleado = nombre;
        data.numEmpleado=0;
        data.categoriaId=0;
        data.centroId=0;
        data.lineaId=0;
        data.celdaId=0;

        var url = environment.urlBase + rutaApiPost;
        return this.http.post(url,data,httpOptions).toPromise();
    }

}
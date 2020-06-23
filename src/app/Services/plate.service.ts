import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from "@angular/common/http";
import { throwError } from "rxjs";
import { map, catchError } from "rxjs/operators";
import { IPlate } from '../Models/plate';

const options = {
    headers: new HttpHeaders({ "Content-Type": "application/json" })
};

@Injectable({ providedIn: 'root' })
export class PlateService {

    constructor(private http: HttpClient) { }

    getPlates() {
        var url = "plates";

        return this.http.get<IPlate[]>(url, options)
            .pipe(map(response => response),
                catchError(this.handleError));
    }

    createRecord(plate: IPlate) {
        var url = "plate";

        return this.http.post(url, plate, options)
            .pipe(map((data: any) => { return data; }),
                catchError(this.handleError));
    }

    updatePlate(plate: IPlate) {
        var url = `plate/${plate.Id}`;

        return this.http.patch(url, plate, options)
            .pipe(map(response => response),
                catchError(this.handleError));
    }

    deletePlate(plateId: number) {
        var url = `plate/${plateId}`;

        return this.http.delete(url, options)
            .pipe(map(response => response),
                catchError(this.handleError));
    }

    private handleError(error: HttpResponse<Error>) {
        return throwError(error);
    }
}
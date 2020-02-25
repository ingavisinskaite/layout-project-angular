import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Widget } from '../models/widget.model';
import { WidgetType } from '../models/widget-type.model';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AppDataService {
  BASE_API_URL: string = 'http://localhost:3000/widgets/';

  constructor(private http: HttpClient) {}

  public getAllWidgets(type: number = null): Observable<Widget[]> {
    if (type === WidgetType.Table || type === WidgetType.Messaging) {
      return this.http.get<Widget[]>(this.BASE_API_URL + 'filter/' + type);
    } else {
      return this.http.get<Widget[]>(this.BASE_API_URL);
    }
  }

  public getWidget(id: string): Observable<Widget> {
    return this.http.get<Widget>(this.BASE_API_URL + id);
  }

  public addNewWidget(data: Widget): Observable<Widget> {
    return this.http.post<Widget>(this.BASE_API_URL, data);
  }

  public updateWidget(id: string, data: Widget): Observable<Widget> {
    return this.http.put<Widget>(this.BASE_API_URL + id, data).pipe(
      catchError(err => {
        console.log(err);
        return throwError(err);
      })
    );
  }

  public deleteWidget(id: string): Observable<{}> {
    return this.http.delete(this.BASE_API_URL + id);
  }
}

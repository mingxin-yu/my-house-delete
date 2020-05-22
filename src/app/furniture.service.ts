import { Injectable } from '@angular/core';
import { Furniture } from './furniture';

import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';

import { HttpClient, HttpHeaders } from '@angular/common/http';

import { catchError, map, tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})

export class FurnitureService {

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  private furnituresUrl = 'api/furnitures';  // URL to web api

  private log(message: string) {
    this.messageService.add(`FurnitureService: ${message}`);
  }

  /** GET heroes from the server */
  getFurnitures(): Observable<Furniture[]> {
    return this.http.get<Furniture[]>(this.furnituresUrl)
      .pipe(
        tap(_ => this.log('fetched furniture')),
        catchError(this.handleError<Furniture[]>('getFurnitures', []))
      );
  }

  /** GET hero by id. Will 404 if id not found */
  getFurniture(id: number): Observable<Furniture> {
    const url = `${this.furnituresUrl}/${id}`;
    return this.http.get<Furniture>(url).pipe(
      tap(_ => this.log(`fetched furniture id=${id}`)),
      catchError(this.handleError<Furniture>(`getFurnitures id=${id}`))
    );
  }

  /** PUT: update the hero on the server */
  updateFurniture(furniture: Furniture): Observable<any> {
    return this.http.put(this.furnituresUrl, furniture, this.httpOptions).pipe(
      tap(_ => this.log(`updated furniture id=${furniture.id}`)),
      catchError(this.handleError<any>('updateFurniture'))
    );
  }

  /** POST: add a new hero to the server */
  addFurniture(furniture: Furniture): Observable<Furniture> {
    return this.http.post<Furniture>(this.furnituresUrl, furniture, this.httpOptions).pipe(
      tap((newFurniture: Furniture) => this.log(`added hero w/ id=${newFurniture.id}`)),
      catchError(this.handleError<Furniture>('addHero'))
    );
  }

  /** DELETE: delete the hero from the server */
  deleteFurniture(furniture: Furniture | number): Observable<Furniture> {
    const id = typeof furniture === 'number' ? furniture : furniture.id;
    const url = `${this.furnituresUrl}/${id}`;

    return this.http.delete<Furniture>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted hero id=${id}`)),
      catchError(this.handleError<Furniture>('deleteHero'))
    );
  }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };


  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

}

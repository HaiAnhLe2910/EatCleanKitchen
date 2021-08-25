import {Injectable} from '@angular/core';
import {Recipe} from "../../shared/models/recipe";
import {RECIPES} from "../../shared/models/mock-recipes";
import {Observable, of} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {catchError, map, tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  recipes: Recipe[] = [];

  private recipeUrl = "api/recipe";
  httpOptions = {
    headers: new HttpHeaders({'Content-type': 'application/json'})
  };

  constructor(private http: HttpClient) {
  }

  getRecipes(): Observable<Recipe[]> {
    return this.http.get<Recipe[]>(this.recipeUrl).pipe(
      tap(_ => console.log('fetched recipes')),
      catchError(this.handleError<Recipe[]>('getRecipes', []))
    );
  }

  getRecipe(id: number): Observable<Recipe> {
    const url = `${this.recipeUrl}/${id}`;
    return this.http.get<Recipe>(url).pipe(
      tap(_ => console.log(`fetch friend id=${id}`)),
      catchError(this.handleError<Recipe>('getRecipe'))
    );
  }

  updateRecipe(recipe: Recipe): Observable<any> {
    return this.http.put<Recipe>(this.recipeUrl, recipe, this.httpOptions).pipe(
      tap(_ => console.log(`update recipe id=${recipe.id}`)),
      catchError(this.handleError<Recipe>('updateRecipe'))
    );
  }

  addRecipe(recipe: Recipe): Observable<Recipe> {
    return this.http.post<Recipe>(this.recipeUrl, recipe, this.httpOptions).pipe(
      tap((newRecipe: Recipe) => console.log(`add recipe w/ id=${newRecipe.id}`)),
      catchError(this.handleError<Recipe>('addRecipe'))
    );
  }

  deleteRecipe(id: Number): Observable<Recipe> {
    const url = `${this.recipeUrl}/${id}`;
    return this.http.delete<Recipe>(url, this.httpOptions).pipe(
      tap(_ => console.log(`delete friend id=${id}`)),
      catchError(this.handleError<Recipe>('deleteRecipe'))
    );
  }

  private handleError<T>(operation: string = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      //log the error to console
      console.log(error);

      //let the app keep running by returning an empty result
      return of(result as T);
    }
  }
}

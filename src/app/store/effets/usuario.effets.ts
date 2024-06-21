import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import * as usuariosActions from "../actions";
import { catchError, map, mergeMap, of, tap } from "rxjs";
import { UsuarioService } from "../../services/usuario.service";


@Injectable()
export class UsuarioEffets {

    constructor(
        private actions$: Actions,
        private usuarioService: UsuarioService
    ){}

    cargarUsuario$ = createEffect(
        () => this.actions$.pipe(
            ofType(  usuariosActions.cargarUsuario ),
            tap( data => console.log('effects tap', data)),
            mergeMap(
                ( action ) => this.usuarioService.getUserById( action.id)
                    .pipe(
                        tap( data => console.log('getUser effects', data)),
                        map( user => usuariosActions.cargarUsuarioSuccess({ usuario: user })),
                        catchError( err => of (usuariosActions.cargarUsuarioError({ payload: err})))
                    )
            )
        )
    );
}
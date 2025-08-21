// src/app/core/services/ag-grid-config.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AgGridConfigService {
  localeText = {
    page: 'Página',
    more: 'Más',
    to: 'a',
    of: 'de',
    next: 'Siguiente',
    last: 'Última',
    first: 'Primera',
    previous: 'Anterior',
    loadingOoo: 'Cargando...',
    noRowsToShow: 'No hay datos para mostrar',
    searchOoo: 'Buscar...',
    filterOoo: 'Filtrar...',
    applyFilter: 'Aplicar filtro',
    equals: 'Igual a',
    notEqual: 'Distinto de',
    contains: 'Contiene',
    startsWith: 'Empieza con',
    endsWith: 'Termina con'
    // Puedes agregar más según lo que uses
  };
}

import { Component } from '@angular/core';
import { GenericTableComponent } from "../generic-table/generic-table.component";

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [GenericTableComponent],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class TableComponent {

}

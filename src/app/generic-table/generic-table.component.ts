import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { Sort, MatSortModule, MatSort } from '@angular/material/sort';
import { printTable, exportToCSV, copyTable } from '../utils/table-utils';
import { handleStatus, STATUS } from '../utils/status-util';
import { GenericService } from '../generic.services/generic.service';
import { AddCommasTableDirective } from '../directives/add-commas-table.directive';

export interface IActionMenu {
  id: number;
  name: string;
  icon: string;
  class?: string;
  typeId?: any;
}

export interface Column {
  columnDef: string;
  header: string;
  type?: 'currency' | 'number' | 'date' | 'status';
}

@Component({
  selector: 'app-generic-table',
  standalone: true,
  imports: [
    CommonModule,
    MatPaginatorModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    MatSortModule,
    FormsModule,
    AddCommasTableDirective,
  ],
  templateUrl: './generic-table.component.html',
  styleUrl: './generic-table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GenericTableComponent implements OnInit, OnChanges {
  public handleStatus = handleStatus;

  @Input('columnList') columnList: Column[] = [];
  @Input('dataList') dataList: any[] = [];
  @Input('enableAddButton') enableAddButton = false;

  @Input('tableHeader') tableHeader: string | any = '';

  @Input('actionMenu') actionMenu: IActionMenu[] = [];
  @Input() filterActionMenuFn:
    | ((actionMenu: IActionMenu[], row: any) => IActionMenu[])
    | undefined;

  @Input('excludedColumnsIndexWhileExportingTable')
  excludedColumnsIndexWhileExportingTable: number[] = [];
  @Output() onAddData = new EventEmitter<any>();
  @Output() onSelectdropdownMenu = new EventEmitter<any>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  obs!: Observable<any>;
  dataSource!: MatTableDataSource<any> | any;

  $loading!: Observable<boolean>;

  length!: number;
  pageSize = 10;
  pageSizeOptions = [5, 10, 20, 30];
  selectedRole: any;
  filtering = false;
  sortedData: any[] = [];
  filteredData: any[] = [];
  @ViewChild(MatSort) sort!: MatSort;
  filters: { [key: string]: string } = {};
  showFilter: boolean = false;

  constructor(public gen: GenericService, public cd: ChangeDetectorRef) {
    this.sortedData = this.dataList.slice();
    this.$loading = gen.loaderState;
  }

  ngOnInit(): void {
    this.buildTable(this.dataList);
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.buildTable(this.dataList);
  }

  buildTable(data: any) {
    if (data === null || data === undefined) data = [];
    this.dataSource = new MatTableDataSource<any>(data);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.obs = this.dataSource.connect();
    this.cd.detectChanges();
    this.cd.markForCheck();
  }

  addData() {
    this.onAddData.emit();
  }

  getFilteredActionMenu(row: any): IActionMenu[] {
    if (this.filterActionMenuFn) {
      return this.filterActionMenuFn(this.actionMenu, row);
    }
    return this.actionMenu;
  }

  selectedMenu(selectedMenu: IActionMenu, selectedRow: any) {
    this.onSelectdropdownMenu.emit({ selectedMenu, selectedRow });
  }

  applyFilter(event: Event) {
    this.filtering = true;
    const filterValue = (event.target as HTMLInputElement).value;
    if (this.dataSource) {
      this.dataSource.filter = filterValue.trim().toLowerCase();
    }
  }

  filterTable(): void {
    this.filteredData = [...this.dataList].filter((item) => {
      return this.columnList.every((column: any) => {
        return (
          !this.filters[column.columnDef] ||
          (item[column.columnDef] !== null &&
            item[column.columnDef].toString() ===
              this.filters[column.columnDef])
        );
      });
    });
    this.buildTable(this.filteredData);
  }

  getUniqueValues(column: string): any[] {
    if (!this.dataList || !Array.isArray(this.dataList)) {
      return [];
    }
    return [
      ...new Set(
        this.dataList
          .map((item: any) => item[column])
          .filter(
            (value) => value !== undefined && value !== null && value !== ''
          )
      ),
    ];
  }

  sortData(sort: Sort) {
    const data = this.dataList ? this.dataList.slice() : [];
    if (!sort.active || sort.direction === '') {
      this.sortedData = data;
      return;
    }
  }

  public printTable(
    table: HTMLTableElement,
    tableHeader: string,
    excludedColumnIndices: number[] = []
  ) {
    printTable(table, tableHeader, excludedColumnIndices);
  }

  exportToCSV() {
    exportToCSV('exportTable', this.excludedColumnsIndexWhileExportingTable);
  }

  copyTable(table: HTMLTableElement, excludedColumnIndices: number[] = []) {
    copyTable(table, excludedColumnIndices);
    this.gen.showMessage('success', 'This table has been copied to clipboard');
  }
}

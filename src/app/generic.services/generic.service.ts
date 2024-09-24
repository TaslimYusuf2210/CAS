import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AlertMessageComponent } from '../../app/alert-message/alert-message.component';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GenericService {
  private num = 1;

  public minimizeSidebar = new BehaviorSubject<boolean>(false);
  public minimizeSidebarState = this.minimizeSidebar.asObservable();

  private loader = new BehaviorSubject<boolean>(false);
  public loaderState = this.loader.asObservable();
  public msg: string | undefined = '';

  constructor(private dialog: MatDialog) {}

  hideLoader() {
    this.loader.next(false);
    this.msg = '';
  }

  showLoader(msg?: string) {
    this.loader.next(true);
    this.msg = msg;
  }

  showMessage(
    type: 'success' | 'warning' | 'error' | 'info',

    message: string | any,
    header?: string
  ) {
    const dialogRef = this.dialog.open(AlertMessageComponent, {
      data: {
        message,
        type,
        header,
      },
      width: '400px',
    });

    dialogRef.afterOpened().subscribe({
      next: () => {
        setTimeout(() => {
          dialogRef.close();
        }, 5000);
      },
    });
  }
}

import { HttpErrorResponse } from '@angular/common/http';

export class AppException extends HttpErrorResponse {
  public override message: string = 'Something went wrong';
  public override error: any | null;

  constructor(init: any) {
    super(init);
    if (init?.status) {
      switch (init.status) {
        case 400:
          const isOnline = navigator.onLine;
          this.message = init?.error?.message
            ? init?.error?.message
            : `Bad Request. Please ${
                isOnline
                  ? ' contact support.'
                  : ' check your internet and try again.'
              }`;
          break;
        case 401:
          this.message = init?.error?.message
            ? init?.error?.message
            : 'Unauthorized Request. Login session expired.';
          break;
        case 404:
          this.message = init?.error?.message
            ? init?.error?.message
            : 'The requested data was not found.';
          break;
        case 409:
          this.message = init?.error?.message
            ? init?.error?.message
            : 'Oops! There seems to be a conflict with the request.';
          break;
        case 500:
          this.message = init?.error?.message
            ? init?.error?.message
            : 'Oops! Something went wrong. Please contact support.';
      }
    }
  }
}

import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { finalize, Observable } from 'rxjs';
import { UiService } from '../services/ui.service';

@Injectable({
  providedIn: 'root',
})
export class LoadingService implements HttpInterceptor {
  private count = 0;

  constructor(private uiService: UiService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.uiService.initLoding();
    this.count++;
    return next.handle(req).pipe(
      finalize(() => {
        this.count--;
        if (this.count == 0) {
          this.uiService.stopLoading();
        }
      })
    );
  }
}

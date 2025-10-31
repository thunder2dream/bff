import { Injectable } from '@nestjs/common';
import { catchError, map, Observable, of, throwError } from 'rxjs';
import { ConfigService } from '../config/config.service';
import { HttpService } from '@nestjs/axios';
import { AxiosRequestConfig, AxiosResponse } from 'axios';
import { Request } from 'express';

@Injectable()
export class RequestToOrganizationService {
  public readonly organizationServiceBaseUrl: string;
  constructor(
    config: ConfigService,
    public http: HttpService,
  ) {
    this.organizationServiceBaseUrl =
      config.organizationServiceConfig().locationBaseUrl;
  }

  public get$(req: Request, url: string): Observable<any> {
    const path = `${this.organizationServiceBaseUrl}${url}`;
    const config: AxiosRequestConfig = {
      params: req.query,
    };
    const testData = [
      {
        customerId: 1,
        customerName: 'customer1',
      },
      {
        customerId: 2,
        customerName: 'customer2',
      },
    ];
    return of(testData);
    return this.http.get(path, config).pipe(
      catchError((e) => {
        return throwError(e);
      }),
    );
  }

  public post$(
    path: string,
    data?: any,
    config?: AxiosRequestConfig,
  ): Observable<AxiosResponse<any>> {
    return this.http
      .post(path, data, config)
      .pipe(catchError((e) => throwError(e)));
  }

  public delete$(
    path: string,
    config?: AxiosRequestConfig,
  ): Observable<AxiosResponse<any>> {
    return this.http
      .delete(path, config)
      .pipe(catchError((e) => throwError(e)));
  }
}

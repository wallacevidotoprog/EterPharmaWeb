import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { HttpStatus } from '../utils/HttpStatus';
import {
  IAddress,
  ICEP,
  IClients,
  IDeliverySend,
  IDeliveryStatus,
  IEndereco,
  IRespAPI,
  IStatus,
  ITypeOrder,
  IViewOrder,
} from './indexers.service';
@Injectable({
  providedIn: 'root',
})
export class DeliveryService {
  private api = inject(HttpClient);

  getTypeOrder(): Observable<ITypeOrder[]> {
    return this.api
      .get<IRespAPI<ITypeOrder[]>>(`${environment.API}api/type_order`, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        withCredentials: true,
        observe: 'response',
      })
      .pipe(
        map((resp) => {
          const status: HttpStatus = resp.status as HttpStatus;
          if (status === HttpStatus.OK) {
            const respBody: ITypeOrder[] | null = resp.body?.data ?? [];
            return respBody;
          }
          return [];
        })
        //map((resp: IRespAPI<ITypeOrder[]>) => resp.data ?? [])
      );
  }
  getStatus(): Observable<IStatus[]> {
    return this.api
      .get<IRespAPI<IStatus[]>>(`${environment.API}api/status`, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        withCredentials: true,
        observe: 'response',
      })
      .pipe(
        map((resp) => {
          const status: HttpStatus = resp.status as HttpStatus;
          if (status === HttpStatus.OK) {
            const respBody: IStatus[] | null = resp.body?.data ?? [];
            return respBody;
          }
          return [];
        })
        //map((resp: IRespAPI<ITypeOrder[]>) => resp.data ?? [])
      );
  }
  async getCep(cep: number): Promise<Observable<ICEP | null>> {
    return this.api
      .get(`https://viacep.com.br/ws/${cep}/json/`, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        observe: 'response',
      })
      .pipe(
        map((resp) => {
          const status: HttpStatus = resp.status as HttpStatus;
          if (status === HttpStatus.OK) {
            if (resp.body !== null) {
              const respBody: IEndereco = resp.body as IEndereco;
              const reticep: ICEP = {
                cep: respBody.cep,
                street: respBody.logradouro,
                city: respBody.localidade,
                neighborhood: respBody.bairro,
                state: respBody.uf,
                service: respBody.regiao,
              };
              return reticep;
            }
            return null;
          }
          return null;
        })
      );

    if (true) {
      return this.api
        .get(`https://brasilapi.com.br/api/cep/v1/${cep}`, {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          observe: 'response',
        })
        .pipe(
          map((resp) => {
            const status: HttpStatus = resp.status as HttpStatus;
            if (status === HttpStatus.OK) {
              const respBody: ICEP | any = resp.body;
              return respBody;
            }
            return null;
          })
        );
    }
    return new Observable<ICEP | null>((observer) => {
      observer.next(null);
      observer.complete();
    });
  }

  getClient(cod: string, type: 'c_interno' | 'cpf') {
    const params = new URLSearchParams({ [type]: cod }).toString();
    return this.api
      .get<IRespAPI<IClients>>(`${environment.API}api/client?${params}`, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        withCredentials: true,
        observe: 'response',
      })
      .pipe(
        map((resp) => {
          const status: HttpStatus = resp.status as HttpStatus;
          if (status === HttpStatus.OK) {
            const responseBody = resp.body as unknown as IRespAPI<IClients[]>;

            if (responseBody?.actionResult) {
              if (Array.isArray(responseBody?.data)) {
                return responseBody.data.length > 0
                  ? responseBody.data[0]
                  : null;
              }
              return responseBody.data ?? null;
            }
          }
          return null;
        })
      );
  }
  getViewOrder(
    date: string,
    between: boolean = false
  ): Observable<IViewOrder[] | null> {
    const params = !between
      ? new URLSearchParams({ ['date']: date }).toString()
      : date;
    return this.api
      .get<IRespAPI<IViewOrder[]>>(
        `${environment.API}api/order_view?${params}`,
        {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          withCredentials: true,
          observe: 'response',
        }
      )
      .pipe(
        map((resp) => {
          const status: HttpStatus = resp.status as HttpStatus;
          if (status === HttpStatus.OK || status === HttpStatus.CREATED) {
            return resp.body?.data ?? null;
          }
          return null;
        })
      );
  }

  registerClient(client: IClients): Observable<number | null> {
    return this.api
      .post<IRespAPI<number>>(`${environment.API}api/client`, client, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        withCredentials: true,
        observe: 'response',
      })
      .pipe(
        map((resp) => {
          const status: HttpStatus = resp.status as HttpStatus;
          if (status === HttpStatus.OK) {
            const respBody: number | null = resp.body?.data ?? null;
            return respBody;
          }
          return null;
        })
      );
  }

  registerAddress(address: IAddress): Observable<number | null> {
    return this.api
      .post<IRespAPI<number | null>>(`${environment.API}api/address`, address, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        withCredentials: true,
        observe: 'response',
      })
      .pipe(
        map((resp) => {
          const status: HttpStatus = resp.status as HttpStatus;
          if (status === HttpStatus.OK) {
            const respBody: number | null = resp.body?.data ?? null;
            return respBody;
          }
          return null;
        })
      );
  }

  registerOrder(
    order: any,
    type: 'full' | 'simple'
  ): Observable<number | null> {
    const params = new URLSearchParams({ type: type }).toString();
    return this.api
      .post<IRespAPI<number | null>>(
        `${environment.API}api/order_delivery?${params}`,
        order,
        {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          withCredentials: true,
          observe: 'response',
        }
      )
      .pipe(
        map((resp) => {
          const status: HttpStatus = resp.status as HttpStatus;
          if (status === HttpStatus.OK || status === HttpStatus.CREATED) {
            const respBody: number | null = resp.body?.data ?? null;
            return respBody;
          }
          return null;
        })
      );
  }

  registerDeliveryAndStatus(
    obj: IDeliverySend,
    type: 'colleted-all' | 'simple'
  ): Observable<number | null> {
    const params = new URLSearchParams({ type: type }).toString();
    return this.api
      .post<IRespAPI<number | null>>(
        `${environment.API}api/delivery?${params}`,
        obj,
        {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          withCredentials: true,
          observe: 'response',
        }
      )
      .pipe(
        map((resp) => {
          const status: HttpStatus = resp.status as HttpStatus;
          if (status === HttpStatus.OK || status === HttpStatus.CREATED) {
            const respBody: number | null = resp.body?.data ?? null;
            return respBody;
          }
          return null;
        })
      );
  }
  registerDeliveryStatus(obj: IDeliveryStatus): Observable<number | null> {
    //const params = new URLSearchParams({ type: type }).toString();
    return this.api
      .post<IRespAPI<number | null>>(
        `${environment.API}api/delivery_status`,
        obj,
        {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          withCredentials: true,
          observe: 'response',
        }
      )
      .pipe(
        map((resp) => {
          const status: HttpStatus = resp.status as HttpStatus;
          if (status === HttpStatus.OK || status === HttpStatus.CREATED) {
            const respBody: number | null = resp.body?.data ?? null;
            return respBody;
          }
          return null;
        })
      );
  }

  async buscaCPFOnline(cpf: string) {
    try {
      // Realiza a primeira requisição
      const respostaPrimeira = await this.fazerPrimeiraRequisicao(
        cpf
      ).toPromise();

      if (respostaPrimeira.sucesso) {
        console.log('Primeira requisição bem-sucedida!');
        // Realiza a segunda requisição usando o valor da primeira
        await this.fazerSegundaRequisicao(
          respostaPrimeira.resposta
        ).toPromise();
        console.log('Segunda requisição bem-sucedida!');
      } else {
        console.error('Falha na primeira requisição');
      }
    } catch (error) {
      console.error('Erro ao executar as requisições:', error);
    }
  }

  private fazerPrimeiraRequisicao(cpf: string): Observable<any> {
    const formData = new FormData();
    formData.append('cpf', cpf);

    return this.api.post(
      'https://totalcpf.com/conteudo/apis/cpf.php',
      formData
    );
  }

  // Função para a segunda requisição
  private fazerSegundaRequisicao(hash: string): Observable<any> {
    const formData = new FormData();
    formData.append('hash', hash);
    formData.append('modulo', 'total-consulta');
    formData.append('chave', 'BBaDSMrYQaJ8Ax6');
    formData.append('quantidade', 'false');
    formData.append('size', 'false');
    formData.append('pagina', 'false');
    formData.append('paginacao', '0');
    formData.append(
      'fingerprint',
      'TW96aWxsYS81LjAgKFdpbmRvd3MgTlQgMTAuMDsgV2luNjQ7IHg2NCkgQXBwbGVXZWJLaXQvNTM3LjM2IChLSFRNTCwgbGlrZSBHZWNrbykgQ2hyb21lLzEzMS4wLjAuMCBTYWZhcmkvNTM3LjM2V2luMzJwdC1CUjE2MDA5MDAxODA='
    );

    return this.api.post('https://totalcpf.com/admin/api.php', formData);
  }

  teste() {
    return this.api
      .post<IRespAPI<IStatus>>(
        `${environment.API}api/status`,
        {
          name: 'teste',
        },
        {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          withCredentials: true,
          observe: 'response',
        }
      )
      .pipe(
        map((resp) => {
          const status: HttpStatus = resp.status as HttpStatus;
          if (status === HttpStatus.OK) {
            const responseBody = resp.body as unknown as IRespAPI<IStatus>;

            if (responseBody?.actionResult) {
              return responseBody.data ?? '';
            }
          }
          return '';
        })
      );
  }
}

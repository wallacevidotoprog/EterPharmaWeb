import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { DeliveryService } from '../../../service/delivery.service';
import { ITypeOrder, IViewOrder } from '../../../service/indexers.service';
import {
  getFormattedCurrency,
  getFormattedDate,
  returnDataTodayFormGroup,
  returnOrdernationStatusDelivery,
} from '../../../utils/global.utils';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-delivery-report',
  standalone: true,
  imports: [CommonModule,FormsModule],
  template: `



  <div class="data-query">
    <div class="searchBox">
    <label for="dateFrom" class="searchLabel">DE:</label>
      <input
        class="searchInput"
        type="date"
        name="de"
        [(ngModel)] ="startDate"
      />
      <label for="dateTo" class="searchLabel">ATÉ:</label>
      <input
        class="searchInput"
        type="date"
        name="ate"
         [(ngModel)] ="endDate"
      />

      <button class="searchButton" (click)="filtrarDatas()">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="29"
          height="29"
          viewBox="0 0 29 29"
          fill="none"
        >
          <g clip-path="url(#clip0_2_17)">
            <g filter="url(#filter0_d_2_17)">
              <path
                d="M23.7953 23.9182L19.0585 19.1814M19.0585 19.1814C19.8188 18.4211 20.4219 17.5185 20.8333 16.5251C21.2448 15.5318 21.4566 14.4671 21.4566 13.3919C21.4566 12.3167 21.2448 11.252 20.8333 10.2587C20.4219 9.2653 19.8188 8.36271 19.0585 7.60242C18.2982 6.84214 17.3956 6.23905 16.4022 5.82759C15.4089 5.41612 14.3442 5.20435 13.269 5.20435C12.1938 5.20435 11.1291 5.41612 10.1358 5.82759C9.1424 6.23905 8.23981 6.84214 7.47953 7.60242C5.94407 9.13789 5.08145 11.2204 5.08145 13.3919C5.08145 15.5634 5.94407 17.6459 7.47953 19.1814C9.01499 20.7168 11.0975 21.5794 13.269 21.5794C15.4405 21.5794 17.523 20.7168 19.0585 19.1814Z"
                stroke="white"
                stroke-width="3"
                stroke-linecap="round"
                stroke-linejoin="round"
                shape-rendering="crispEdges"
              ></path>
            </g>
          </g>
          <defs>
            <filter
              id="filter0_d_2_17"
              x="-0.418549"
              y="3.70435"
              width="29.7139"
              height="29.7139"
              filterUnits="userSpaceOnUse"
              color-interpolation-filters="sRGB"
            >
              <feFlood flood-opacity="0" result="BackgroundImageFix"></feFlood>
              <feColorMatrix
                in="SourceAlpha"
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                result="hardAlpha"
              ></feColorMatrix>
              <feOffset dy="4"></feOffset>
              <feGaussianBlur stdDeviation="2"></feGaussianBlur>
              <feComposite in2="hardAlpha" operator="out"></feComposite>
              <feColorMatrix
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
              ></feColorMatrix>
              <feBlend
                mode="normal"
                in2="BackgroundImageFix"
                result="effect1_dropShadow_2_17"
              ></feBlend>
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="effect1_dropShadow_2_17"
                result="shape"
              ></feBlend>
            </filter>
            <clipPath id="clip0_2_17">
              <rect
                width="28.0702"
                height="28.0702"
                fill="white"
                transform="translate(0.403503 0.526367)"
              ></rect>
            </clipPath>
          </defs>
        </svg>
      </button>
    </div>

    <section>
      <table class="custom-table">
        <thead>
          <th>Com Taxa</th>
          <th>Sem Taxa</th>
          <th>Ifood</th>
          <th>Convênio</th>
          <th>Manipulado</th>
          <th>Padrão</th>
        </thead>
        <tbody>
          <tr>
            <td>{{ datasTypeOrderResult.ctaxa }}</td>
            <td>{{ datasTypeOrderResult.staxa }}</td>
            <td>{{ datasTypeOrderResult.ifood }}</td>
            <td>{{ datasTypeOrderResult.convenio }}</td>
            <td>{{ datasTypeOrderResult.mani }}</td>
            <td>{{ datasTypeOrderResult.padrao }}</td>
          </tr>
        </tbody>
      </table>
    </section>
    <table>
      <thead>
        <th>DATA</th>
        <th>VALOR</th>
        <th>KM</th>
        <th>Vendedor</th>
        <th>Entregador</th>
        <th>ENDEREÇO</th>
        <th>TIPO</th>
      </thead>
      <tbody>
        <tr *ngFor="let item of datasViewOrder">
          <td>{{ getFormattedDate(item.order?.date) }}</td>
          <td>{{ getFormattedCurrency(item.order?.value) }}</td>
          <td>{{ item.order?.delivery?.motor_kilometers }}</td>
          <td>{{ item.order?.user?.name }}</td>
          <td>{{ item.order?.delivery?.user?.name }}</td>
          <td>
            {{ item?.order?.address?.place }} -
            {{ item?.order?.address?.number }} -
            {{ item?.order?.address?.neighborhood }} -
            {{ item?.order?.address?.city }} - {{ item?.order?.address?.uf }} |
            {{ item?.order?.obs }}
          </td>
          <td>{{ item?.order?.type_order?.name }}</td>
        </tr>
      </tbody>
    </table>
  `,
  styles: `
  .searchLabel {
  font-weight: bold;
  margin-right: 5px;
 color: white;
}
  .data-query {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 10px;
}
.searchButton {
  color: white;
  position: absolute;
  right: 8px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: var(
    --gradient-2,
    linear-gradient(90deg, #2af598 0%, #009efd 100%)
  );
  border: 0;
  display: inline-block;
  transition: all 300ms cubic-bezier(0.23, 1, 0.32, 1);
  cursor: pointer;
}
/*hover effect*/
button:hover {
  color: #fff;
  background-color: #1a1a1a;
  box-shadow: rgba(0, 0, 0, 0.5) 0 10px 20px;
  transform: translateY(-3px);
}
/*button pressing effect*/
button:active {
  box-shadow: none;
  transform: translateY(0);
}

.searchInput {
  border: none;
  background: none;
  outline: none;
  color: white;
  font-size: 15px;
  padding: 24px 65px 24px 26px;
}
.searchBox {
  display: flex;
  align-items: center;
  gap: 8px;
  background:rgb(57, 83, 110);
  border-radius: 50px;
  position: relative;
  margin: 10px;
  justify-content:center;
  width: 600px;
}
  section{
    display: flex;
    justify-content: center;
  }
  table {
            margin: 20px;
            border-spacing: 0;
            border-radius: 10px;
            overflow: hidden;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            background-color: #ffffff;
          }

          thead {
            border-radius: 10px;
            background-color:rgb(57, 83, 110);
            color: white;
          }

          th, td {
            padding: 16px 20px;
            text-align: left;
            font-size: 14px;
            text-align: center;
        }

        th {
            font-weight: 600;
            text-transform: uppercase;
        }

        tr:nth-child(even) {
            background-color: #f2f2f2;
        }

        tr:hover {
            background-color:rgb(160, 150, 150);
             color: #555;

        }

        td {
            color: #555;
        }

        td:first-child {
            font-weight: 500;
        }

        .highlight {
            color: #e74c3c;
            font-weight: bold;
        }

        caption {
            font-size: 24px;
            font-weight: 700;
            color: #2d3e50;
            padding: 10px;
        }
  `,
})
export class DeliveryReportComponent implements OnInit {
  getFormattedDate = getFormattedDate;
  getFormattedCurrency = getFormattedCurrency;
  returnOrdernationStatusDelivery = returnOrdernationStatusDelivery;
  returnDataTodayFormGroup = returnDataTodayFormGroup;

  protected deliveryService = inject(DeliveryService);
  private cdr = inject(ChangeDetectorRef);

  protected valueDateSearch!: string;
  protected datasViewOrder: IViewOrder[] = [];
  protected datasTypeOrder: ITypeOrder[] = [];
  protected datasTypeOrderResult = {
    ctaxa: 0,
    staxa: 0,
    ifood: 0,
    convenio: 0,
    mani: 0,
    padrao: 0,
  };
  protected startDate: Date | null = null;
  protected endDate: Date | null = null;

  async ngOnInit(): Promise<void> {
    this.valueDateSearch = returnDataTodayFormGroup().split('T')[0];

    await this.getTypeOrder();
  }

  async getViewOrder(date: string,between:boolean=false) {
    //between
    try {
      const response = await lastValueFrom(
        this.deliveryService.getViewOrder(date,between)
      );

      if (response) {
        response.sort((a, b) => {
          const dateA = a.order?.date ? new Date(a.order?.date).getTime() : 0;
          const dateB = b.order?.date ? new Date(b.order?.date).getTime() : 0;
          return dateA - dateB;
        });
        this.datasViewOrder = response;
      }

      this.cdr.detectChanges();
    } catch (error) {
      console.error('Erro ao carregar pedidos:', error);
    }
  }
  async getTypeOrder() {
    try {
      const response = await lastValueFrom(this.deliveryService.getTypeOrder());

      if (response) {
        this.datasTypeOrder = response;
      }

      this.cdr.detectChanges();
    } catch (error) {
      console.error('Erro ao carregar pedidos:', error);
    }
  }

  typeOrderResult() {
    this.datasTypeOrderResult = {
      ctaxa: this.datasViewOrder?.filter(
        (v) => v.order?.type_order?.name === 'COM TAXA'
      ).length,
      staxa: this.datasViewOrder?.filter(
        (v) => v.order?.type_order?.name === 'SEM TAXA'
      ).length,
      ifood: this.datasViewOrder?.filter(
        (v) => v.order?.type_order?.name === 'IFOOD'
      ).length,
      convenio: this.datasViewOrder?.filter(
        (v) => v.order?.type_order?.name === 'CONVÊNIO'
      ).length,
      mani: this.datasViewOrder?.filter(
        (v) => v.order?.type_order?.name === 'MANIPULADO'
      ).length,
      padrao: this.datasViewOrder?.filter(
        (v) => v.order?.type_order?.name === 'PADRAO'
      ).length,
    };
  }

  async filtrarDatas() {
    let query :string='';
    let between:boolean=false

    if (!this.endDate && this.startDate) {
      query = this.startDate?.toString();
    }
    else if(this.endDate && this.startDate){
      query = new URLSearchParams({ ['de']: this.startDate.toString(),['ate']:this.endDate.toString() }).toString()
      between=true;
    }
    if (query) {
      await this.getViewOrder(query,between);
      this.typeOrderResult();
    }


  }
}

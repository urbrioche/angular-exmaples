import {Component, OnInit} from '@angular/core';
import {ColDef, GridReadyEvent, SideBarDef, StatusPanelDef} from 'ag-grid-community';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {MyCustomComponent} from '../my-custom/my-custom.component';
import {ICellRendererParams} from 'ag-grid-community/dist/lib/rendering/cellRenderers/iCellRenderer';
import {HelloComponent} from '../hello/hello.component';
import {GoodbyeComponent} from '../goodbye/goodbye.component';

@Component({
  templateUrl: './custom-component-overview.component.html',
  styleUrls: ['./custom-component-overview.component.scss']
})
export class CustomComponentOverviewComponent implements OnInit {
  components = {
    hello: HelloComponent,
    goodbye: GoodbyeComponent
  };

  public sideBar: SideBarDef = {
    toolPanels: [
      'columns',
      'filters',
      {
        id: 'customComp',
        labelDefault: 'Custom Comp',
        labelKey: 'customComp',
        iconKey: 'custom-Comp',
        toolPanel: HelloComponent,
      },
    ],
    // 加上這行，sideBar預設會展開下面的component
    // defaultToolPanel: 'customComp',
  };

  public statusBar: {
    statusPanels: StatusPanelDef[];
  } = {
    statusPanels: [
      {
        statusPanel: HelloComponent,
      },
      {
        statusPanel: GoodbyeComponent,
      },
      {
        statusPanel: 'agAggregationComponent',
        statusPanelParams: {
          aggFuncs: ['count', 'sum'],
        },
      },
    ],
  };

  public columnDefs: ColDef[] = [
    {
      field: 'athlete',
      // https://www.ag-grid.com/angular-data-grid/components/#component-usage
      cellRendererSelector: (params: ICellRendererParams<OlympicWinner>) => {
        if (params.data?.age! < 24) {
          return {
            component: HelloComponent,
            params: {
              name: params.data?.athlete
            }
          };
        }

        return {
          // component: GoodbyeComponent,
          // 定義components，並使用字串
          component: 'goodbye',
          params: {
            name: params.data?.athlete
          }
        };
      }
    },
    {field: 'age'},
    {
      field: 'country',
      filter: MyCustomComponent,
      filterParams: {
        name: "Filter"
      },
      // 同一個component可以放在不同的地方
      // 但是使用的"Params"不同
      // 即使 MyCustomComponent是implement IHeaderAngularComp也可以用在任何的地方
      // 因為本質上最後就是轉譯成JavaScript，或是從TypeScript是duck typing來想就一點都不會覺得奇怪了
      // cellRenderer: MyCustomComponent,
      // cellRendererParams: {
      //   name: "Filter"
      // },
      // headerComponent: MyCustomComponent,
      // headerComponentParams: {
      //   name: "Filter"
      // }
    },
    {
      field: 'year',
      // 試試設定不同的component
      // https://www.ag-grid.com/angular-data-grid/components/#grid-provided-components
      // filter: 'agNumberColumnFilter',
      filter: 'agTextColumnFilter',
    },
    {field: 'date'},
    {field: 'sport'},
    {field: 'gold'},
    {field: 'silver'},
    {field: 'bronze'},
    {field: 'total'},
  ];

  public defaultColDef: ColDef = {
    sortable: true,
    filter: true,
    // this is enterprise feature
    enableRowGroup: true
  };

  public rowData$!: Observable<OlympicWinner[]>;

  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {
  }

  onGridReady(params: GridReadyEvent) {
    this.rowData$ = this.http
      .get<OlympicWinner[]>('assets/demo-data/olympic-winners.json');
  }
}

interface OlympicWinner {
  athlete: string;
  age: number;
  country: string;
  year: number;
  date: string;
  sport: string;
  gold: number;
  silver: number;
  bronze: number;
  total: number;
}

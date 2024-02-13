import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class SmtDeviceService {

  deviceAir: any = [];

  smt_device_type: any;
  smt_device_model: any;
  smt_device_name: any;
  smt_client_id: any;
  smt_activate: any;
  wiplux_outlet: any;
  channel: any = []
  wiplux_channel:any;

  count_Air:any = 0;

  sAir: any = [];
  airDemo: any = [];

//   src = [{
//     theme: 'default',
//     data: [
//       {
//         type: 'Cold',
//         imgsrc: '../../../../assets/images/frost.png'
//       },
//       {
//         type: 'Auto',
//         imgsrc: '../../../../assets/images/automatic.svg'
//       },
//       {
//         type: 'Fan',
//         imgsrc: '../../../../assets/images/fan.svg'
//       },
//       {
//         type: 'Dry',
//         imgsrc: '../../../../assets/images/dry.svg'
//       },
//       {
//         type: 'Heat',
//         imgsrc: '../../../../assets/images/sun.png'
//       }
//     ],
//   }
//     ,
//   {
//     theme: 'dark',

//     data: [
//       {
//         type: 'Cold',
//         imgsrc: '../../../../assets/images/frost-w.png'
//       },
//       {
//         type: 'Auto',
//         imgsrc: '../../../../assets/images/automatic-w.png'
//       },
//       {
//         type: 'Fan',
//         imgsrc: '../../../../assets/images/fan-w.png'
//       },
//       {
//         type: 'Dry',
//         imgsrc: '../../../../assets/images/dry-w.png'
//       },
//       {
//         type: 'Heat',
//         imgsrc: '../../../../assets/images/sun-w.png'
//       }
//     ]
//   }
//   ]

  fan =[{
    theme: 'default',
    data: [
      {
        type: '1',
        imgsrc: '../../assets/images/fan-1.png'
      },
      {
        type: '2',
        imgsrc: '../../assets/images/fan-2.png'
      },
      {
        type: '3',
        imgsrc: '../../assets/images/fan-3.png'
      },
      {
        type: 'Auto',
        imgsrc: '../../assets/images/fan-auto.png'
      }
    ],
  }
  ,
  {
    theme: 'dark',
    data: [
      {
        type: '1',
        imgsrc: '../../assets/images/fan-1w.png'
      },
      {
        type: '2',
        imgsrc: '../../assets/images/fan-2w.png'
      },
      {
        type: '3',
        imgsrc: '../../assets/images/fan-3w.png'
      },
      {
        type: 'Auto',
        imgsrc: '../../assets/images/fan-autow.png'
      }
    ],
  }
]
}
import { Component, OnInit, TemplateRef } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { NbDialogService, NbThemeService, NbToastrService } from '@nebular/theme';
import { ServerPort } from 'src/server/serverapi';
import { SmtDeviceService } from '../_services/smt-device.service';

@Component({
  selector: 'app-air',
  templateUrl: './air.component.html',
  styleUrls: ['./air.component.scss']
})
export class AirComponent implements OnInit {
  keys: any;
  nameRoom: any;
  description: any
  channel: number | undefined;
  nameAir: any;
  InputTemp: any;
  InputFan: any;
  InputPower: any;
  InputMode: any;
  InputSwing: any;
  InputSleep: any;
  InputTurbo: any;
  InputQuiet: any;
  InputLight: any;
  InputError: any;

  newChannel:any;
  newNameRoom: any;
  newDescription: any
  dialog: any;
  InputLock: any;

  currentTheme = '';
  
  constructor(
    private http: HttpClient,
    private dialogService: NbDialogService,
    private toastrService: NbToastrService,
    public  smt: SmtDeviceService,
    private themeService: NbThemeService,) {
    
    // <-- Show Data from Server --> //
    this.http.get(ServerPort.apiUrlNodeAir2 + '/remote')
      .subscribe((data: any) => {
        this.keys = data.keys
        this.nameRoom = data.keys.Room
        this.channel = data.keys.Channel
        this.description = data.keys.Description
        this.nameAir = data.keys.Name
        this.InputPower = data.keys.Power
        this.InputTemp = data.keys.Temp
        this.InputFan = data.keys.Fan
        this.InputMode = data.keys.Mode
        this.InputSwing = data.keys.Swing
        this.InputSleep = data.keys.Sleep
        this.InputQuiet = data.keys.Quiet
        this.InputTurbo = data.keys.Turbo
        this.InputLight = data.keys.Light

        console.log(data.keys)
      }, err => {
        this.InputError = err
        this.InputPower = "OFF"
        console.log(err)
      })
    // <-- Show Data from Server --> //
  }

  ngOnInit(): void {
    // default value
    this.InputLock = "UNLOCK"

    this.currentTheme = this.themeService.currentTheme;
    this.themeService.onThemeChange()
    // .pipe(
    //   map(({name}) => name),
    //   takeUntil(this.destroy$)
    // ).subscribe((themeName) => this.currentTheme = themeName);
    // this.observe();
    // setTimeout(() => {
    //   this.smt.getAllDeviceStatus();
    // }, 300);
  }

  // <-- Change the dialog --> //
  edit_toggle(dialog: TemplateRef<any>, type: string) {
    if (type == 'room') {
      this.dialogService.open(dialog, { context: 'Edit name of ' + this.nameRoom })
    }
    if(type == 'channel') {
      this.dialogService.open(dialog, { context: 'Edit channel of ' + this.channel })
    }
    if(type == 'description') {
      this.dialogService.open(dialog, { context: 'Edit description of ' + this.description })
    }
  }

  // <-- LOCK && Unlock Remote --> //
  changeLock(modeLock: any) {
    /* 0 ==> Lock
       1 ==> UNLOCK*/
    
    if(modeLock === 0) {
      this.InputLock = "LOCK"
      this.InputPower = 'OFF'
    }else if(modeLock === 1){
      this.InputLock = "UNLOCK"
      // this.InputPower = 'ON'
    }
  }

  // <-- Change the Name Room --> //
  changeRoomName() {
    let room = {
      Room: this.newNameRoom
    }

    this.nameRoom = this.newNameRoom

    this.http.post(ServerPort.apiUrlNodeAir2 + '/room', room)
    .subscribe(data => {
      console.log(data)
    }, err => {
      console.log(err)
    })
  }

  // <-- Change the Channel --> //
  changeChannel() {
    let channelObj = {
      Channel: this.newChannel
    }

    this.channel = this.newChannel

    this.http.post(ServerPort.apiUrlNodeAir2 + '/channel', channelObj)
    .subscribe(data => {
      console.log(data)
    }, err => {
      console.log(err)
    })
  }

  // <-- Change the Description --> //
  changeDescription() {
    let descriptionObj = {
      Description: this.newDescription
    }

    this.description = this.newDescription

    this.http.post(ServerPort.apiUrlNodeAir2 + '/description', descriptionObj)
    .subscribe(data => {
      console.log(data)
    }, err => {
      console.log(err)
    })
  }
  
  // <-- Change the Power ON/OFF --> //
  turnOnOff(newPower: string) {
    let power = {
      Power: newPower
    }

    this.InputPower = newPower

    this.http.post(ServerPort.apiUrlNodeAir2 + '/remote', power)
    .subscribe(data => {
      console.log(data)
    }, err => {
      console.log(err)
    })

    setTimeout(() => {
      this.toastrService.show("complete", "Remote Successfully", 
      {
        status: "success",
        duration: 3000
      });
    }, 300);
  }
  // <-- Change the Power ON/OFF --> //

  // <-- Change the Temerature --> //
  send_temp() {
    let newTemp = this.InputTemp

    console.log(newTemp + typeof(newTemp))

    if(newTemp !== '' && this.isNotNullOrWhitespace(newTemp)) {
      if(parseInt(newTemp) >= 16 && parseInt(newTemp) <=30) {
        let temp = {
          Temp: newTemp
        }

        this.http.post(ServerPort.apiUrlNodeAir2 + '/remote', temp)
        .subscribe(data => {
          console.log(data)
        }, err => {
          console.log(err)
        })

        setTimeout(() => {
          this.toastrService.show("complete", "Remote Successfully", 
          {
            status: "success",
            duration: 3000
          });
        }, 300);
      }else if(parseInt(newTemp) < 16) {
        setTimeout(() => {
          this.toastrService.show("Temperatute must be > 15 °C", "Remote Fail", 
          {
            status: "warning",
            duration: 3000
          });
        }, 300);
      }else if(parseInt(newTemp) > 30) {
        setTimeout(() => {
          this.toastrService.show("Temperatute must be < 31 °C", "Remote Fail", 
          {
            status: "warning",
            duration: 3000
          });
        }, 300);
      }
    }else {
      setTimeout(() => {
        this.toastrService.show("You must input value", "Fail", 
        {
          status: "danger",
          duration: 3000
        });
      }, 300);
    }
  }

  inc_temp() {
    let newTemp = this.InputTemp
    newTemp = parseInt(newTemp) + 1

    this.InputTemp = newTemp

    if(newTemp <= 30) {
      let temp = {
        Temp: newTemp
      }

      this.http.post(ServerPort.apiUrlNodeAir2 + '/remote', temp)
      .subscribe(data => {
        console.log(data)
      }, err => {
        console.log(err)
      })

      setTimeout(() => {
        this.toastrService.show("complete", "Remote Successfully", 
        {
          status: "success",
          duration: 3000
        });
      }, 300);
    }else {
      setTimeout(() => {
        this.toastrService.show("The Temperatute must be < 31 °C", "Remote Fail", 
        {
          status: "warning",
          duration: 3000
        });
      }, 300);
    }
  }

  dec_temp() {
    let newTemp = this.InputTemp
    newTemp = parseInt(newTemp) - 1
    
    this.InputTemp = newTemp

    if(newTemp >= 16) {
      let temp = {
        Temp: newTemp
      }

      this.http.post(ServerPort.apiUrlNodeAir2 + '/remote', temp)
      .subscribe(data => {
        console.log(data)
      }, err => {
        console.log(err)
      })

      setTimeout(() => {
        this.toastrService.show("complete", "Remote Successfully", 
        {
          status: "success",
          duration: 3000
        });
      }, 300);
    }else {
      setTimeout(() => {
        this.toastrService.show("The Temperatute must be > 15 °C", "Remote Fail", 
        {
          status: "warning",
          duration: 3000
        });
      }, 300);
    }
  }
  // <-- Change the Temerature --> //

  // <-- Change the Fan Speed --> //
  selectFan(speedFan: number){
    let newFan:any

    if (speedFan == 0) {
      this.InputFan = 0
      newFan = 'AUTO'
    }else {
      this.InputFan = speedFan
      newFan = speedFan
    }

    let fan = {
      Fan: newFan
    }

    this.http.post(ServerPort.apiUrlNodeAir2 + '/remote', fan)
    .subscribe(data => {
      console.log(data)
    }, err => {
      console.log(err)
    })

    setTimeout(() => {
      this.toastrService.show("Fan complete", "Remote Successfully", 
      {
        status: "success",
        duration: 3000
      });
    }, 500);
  }
  // <-- Change the Fan Speed --> //

  // <-- Change the Mode Air --> //
  changeMode(modeAir: any) {
    let newMode = modeAir

    this.InputMode = newMode

    let mode = {
      Mode: newMode
    }

    this.http.post(ServerPort.apiUrlNodeAir2 + '/remote', mode)
    .subscribe(data => {
      console.log(data)
    }, err => {
      console.log(err)
    })

    setTimeout(() => {
      this.toastrService.show("Mode complete", "Remote Successfully", 
      {
        status: "success",
        duration: 3000
      });
    }, 500);
  }
  // <-- Change the Mode Air --> //

  // <-- Change the Swing Air --> //
  changeSwing(modeSwing: any) {
    let newSwing = modeSwing

    this.InputSwing = newSwing

    let swing = {
      Swing: newSwing
    }

    this.http.post(ServerPort.apiUrlNodeAir2 + '/remote', swing)
    .subscribe(data => {
      console.log(data)
    }, err => {
      console.log(err)
    })

    setTimeout(() => {
      this.toastrService.show("Swing complete", "Remote Successfully", 
      {
        status: "success",
        duration: 3000
      });
    }, 500);
  }
  // <-- Change the Swing Air --> //
  
  // <-- Change the Sleep Mode --> //
  changeSleep(modeSleep: any) {
    let newSleep = modeSleep

    this.InputSleep = newSleep

    let sleep = {
      Sleep: newSleep
    }

    this.http.post(ServerPort.apiUrlNodeAir2 + '/remote', sleep)
    .subscribe(data => {
      console.log(data)
    }, err => {
      console.log(err)
    })

    setTimeout(() => {
      this.toastrService.show("Sleep complete", "Remote Successfully", 
      {
        status: "success",
        duration: 3000
      });
    }, 500);
  }
  // <-- Change the Sleep Mode --> //

  // <-- Change the Turbo Mode --> //
  changeTurbo(modeTurbo: any) {
    let newTurbo = modeTurbo

    this.InputTurbo = newTurbo

    let turbo = {
      Turbo: newTurbo
    }

    this.http.post(ServerPort.apiUrlNodeAir2 + '/remote', turbo)
    .subscribe(data => {
      console.log(data)
    }, err => {
      console.log(err)
    })

    setTimeout(() => {
      this.toastrService.show("Turbo complete", "Remote Successfully", 
      {
        status: "success",
        duration: 3000
      });
    }, 500);
  }
  // <-- Change the Turbo Mode --> //

  // <-- Change the Quiet Mode --> //
  changeQuiet(modeQuiet: any) {
    let newQuiet = modeQuiet

    this.InputQuiet = newQuiet

    let quiet = {
      Quiet: newQuiet
    }

    this.http.post(ServerPort.apiUrlNodeAir2 + '/remote', quiet)
    .subscribe(data => {
      console.log(data)
    }, err => {
      console.log(err)
    })

    setTimeout(() => {
      this.toastrService.show("Quiet complete", "Remote Successfully", 
      {
        status: "success",
        duration: 3000
      });
    }, 500);
  }
  // <-- Change the Quiet Mode --> //

  // <-- Change the Light Mode --> //
  changeLight(modeLight: any) {
    let newLight = modeLight

    this.InputLight = newLight

    let light = {
      Light: newLight
    }

    this.http.post(ServerPort.apiUrlNodeAir2 + '/remote', light)
    .subscribe(data => {
      console.log(data)
    }, err => {
      console.log(err)
    })

    setTimeout(() => {
      this.toastrService.show("Light complete", "Remote Successfully", 
      {
        status: "success",
        duration: 3000
      });
    }, 500);
  }
  // <-- Change the Quiet Mode --> //

  changeTemp() {
    let newKey = {
      Power: this.InputPower,
      Temp: this.InputTemp,
      Fan: this.InputFan
    }

    this.http.post(ServerPort.apiUrlNodeAir2 + '/remote', newKey)
      .subscribe(data => {
        console.log(data)
      }, err => {
        console.log(err)
      })

    if(this.InputTemp < 16) {
      console.log(16)
    }else if(this.InputTemp > 30) {
      console.log(30)
    }else {
      console.log(this.InputTemp)
    }
  }

  // Check blank space
  isNotNullOrWhitespace(str: string): boolean {
    return str?.trim().length > 0 ;
  }
}

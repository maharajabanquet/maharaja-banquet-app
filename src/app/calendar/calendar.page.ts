import { CommonServiceService } from './../common-service.service';
import {
  Component,
  ChangeDetectionStrategy,
  ViewChild,
  TemplateRef,
  OnInit,
  ViewEncapsulation
} from '@angular/core';
import {
  startOfDay,
  endOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours,
} from 'date-fns';
import { Subject } from 'rxjs';
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent,
  CalendarView,
} from 'angular-calendar';
import { EventColor } from 'calendar-utils';
import { IonModal, LoadingController, ToastController, ViewWillEnter } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
import { Camera, CameraOptions } from '@awesome-cordova-plugins/camera/ngx';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

const colors: Record<string, EventColor> = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3',
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF',
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA',
  },

};


@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.page.html',
  styleUrls: ['./calendar.page.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CalendarPage implements OnInit, ViewWillEnter {
  @ViewChild('modalContent', { static: true }) modalContent: TemplateRef<any>;
  taskForm: FormGroup
  @ViewChild(IonModal) modal: IonModal;
  message = 'This modal example uses triggers to automatically open a modal when the button is clicked.';
  name: string;
  isModalOpen = false;
  imageURI:any = []
  imageFileName:any;
  view: CalendarView = CalendarView.Month;

  CalendarView = CalendarView;
  selectedDate: any;
  viewDate: Date = new Date();

  modalData: {
    action: string;
    event: CalendarEvent;
  };

  actions: CalendarEventAction[] = [
    {
      label: '<i class="fas fa-fw fa-pencil-alt"></i>',
      a11yLabel: 'Edit',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.handleEvent('Edited', event);
      },
    },
    {
      label: '<i class="fas fa-fw fa-trash-alt"></i>',
      a11yLabel: 'Delete',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.events = this.events.filter((iEvent) => iEvent !== event);
        this.handleEvent('Deleted', event);
      },
    },
  ];

  refresh = new Subject<void>();

  events: CalendarEvent[] = []

 

  activeDayIsOpen: boolean = false;
  disableButton: boolean;
  showHeader: any;
  userLogin: any;
  constructor(
    private camera: Camera,
    private fb: FormBuilder,
    private commmonService: CommonServiceService,
    private loadingCtrl: LoadingController,
    private toastr: ToastController,
    private activateRoute: ActivatedRoute,
    private location: Location
    ) {}

  ngOnInit() {
    this.userLogin = JSON.parse(localStorage.getItem('user'))
    console.log(this.userLogin);
    
    this.activateRoute.params.subscribe(resp => {
      this.showHeader = resp && resp.tab
      
    })
    this.taskForm = this.fb.group({
      date: ['', [Validators.required]],
      title: ['', [Validators.required]],
      images: [[]],
      staffName: ['', [Validators.required]]
    })
    this.getTaskList();
  }
  ionViewWillEnter() {
  }

  back() {
    this.location.back();
  }

  async getTaskList() {
    const loading = await this.presentLoading(); // start loader
    console.log('check');
    let eventClone = []
    this.events = [];
 
    this.commmonService.getTask().subscribe((resp: any) => {
      if(resp && resp.status === 'success') {
        this.loadingCtrl.dismiss();    
        let taskList = resp && resp.task || [];
        if(taskList.length > 0) {
          taskList.forEach(element => {
            eventClone.push(
              {
                  start: addHours(new Date(element.date), 10),
                  data: element,
                  end: addHours(new Date(element.date), 23),
                  title: 'A draggable and resizable event',
                  color: { ...colors.yellow },
                  resizable: {
                    beforeStart: true,
                    afterEnd: true,
                  },
                  draggable: false,
                  actions: this.actions,
                }
            )
          });
          this.events = eventClone;
        }
      }
    })
  }
  cancel() {
    this.modal.dismiss(null, 'cancel');

  }
  

  setOpen(isOpen: boolean) {
    if(!isOpen) {
     this.taskForm.get('date').patchValue('')
     this.taskForm.get('title').patchValue('')
     this.taskForm.get('images').patchValue([])
     this.taskForm.get('staffName').patchValue('')
     this.disableButton = false;
    }
    this.isModalOpen = isOpen;
  }

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    console.log("HERE EVE ", events);
    this.taskForm.patchValue(events[0] && events[0]['data'])
    if(events && events[0] && events[0]['data']) {
      this.disableButton  = true;
    }
    this.selectedDate = date
    this.taskForm.get('date').patchValue(this.selectedDate);
    this.setOpen(true)
  }

  confirm() {
    this.modal.dismiss(this.name, 'confirm');
  }

  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm') {
      this.message = `Hello, ${ev.detail.data}!`;
    }
  }
  eventTimesChanged({
    event,
    newStart,
    newEnd,
  }: CalendarEventTimesChangedEvent): void {
    this.events = this.events.map((iEvent) => {
      if (iEvent === event) {
        return {
          ...event,
          start: newStart,
          end: newEnd,
        };
      }
      return iEvent;
    });
    this.handleEvent('Dropped or resized', event);
  }

  handleEvent(action: string, event: CalendarEvent): void {
    this.modalData = { event, action };
  }

  addEvent(): void {
    this.events = [
      ...this.events,
      {
        title: 'New event',
        start: startOfDay(new Date()),
        end: endOfDay(new Date()),
        color: colors.red,
        draggable: true,
        resizable: {
          beforeStart: true,
          afterEnd: true,
        },
      },
    ];
  }

  deleteEvent(eventToDelete: CalendarEvent) {
    this.events = this.events.filter((event) => event !== eventToDelete);
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }

  onFileSelected() {
    console.log("CAMERA");
    
    const options: CameraOptions = {
      quality: 50,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true
    }
    this.camera.getPicture(options).then((imageData) => {
      this.taskForm.get('images').value.push("data:image/jpeg;base64," + imageData)
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
    }, (err) => {
      console.log(err);
      
    // Handle error
    });
    }

    async submit() {
      if(this.taskForm.getRawValue().images.length === 0) {
        const toast = await this.toastr.create({
          position: 'top',
          message: 'Please upload all the images',
          duration: 3000
        });
        await toast.present();    
        return;
      }
      console.log('here');
      
      if(this.taskForm.status  === 'INVALID') {
        const toast = await this.toastr.create({
          position: 'top',
          message: 'All fields are required',
          duration: 3000
        });
        await toast.present();    
        return;
      }
      const loading = await this.presentLoading(); // start loader
      this.commmonService.submitTask(this.taskForm.getRawValue()).subscribe((resp: any) => {
        if(resp && resp.status === 'success') {
          this.loadingCtrl.dismiss();            // stop loader on successfull response
          this.prompt('Task Submmited');
          this.taskForm.reset();
          this.modal.dismiss();
          this.getTaskList();
        }
      }, (err: any) => {
        this.loadingCtrl.dismiss();            // stop loader on some error
      })

    }

    async presentLoading() {
       const loading = await this.loadingCtrl.create({
        spinner: 'circles',
        keyboardClose: false,
        message: 'Please wait..'
      });
      return await loading.present();
    }
  

    async prompt(msg) {
      const toast = await this.toastr.create({
        position: 'top',
        message: msg,
        duration: 3000
      });
      await toast.present();   
    }

    
}

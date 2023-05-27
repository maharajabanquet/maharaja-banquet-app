import {
  BookingServiceService
} from 'src/app/services/booking-service.service';

import {
  Component,
  ChangeDetectionStrategy,
  ViewChild,
  TemplateRef,
  OnInit,
  ViewEncapsulation,
  Input,
  Output,
  EventEmitter
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
import {
  Subject
} from 'rxjs';

import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent,
  CalendarView,
} from 'angular-calendar';
import {
  EventColor
} from 'calendar-utils';

const colors: Record < string, EventColor > = {
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
  gold: {
    primary: '#CFA240',
    secondary: '#CFA240',


  }
};

@Component({
  selector: 'public-calendar',
  templateUrl: './booking-calendar.page.html',
  // styleUrls: ['./public-calendar.component.css'],
  styles: [
    `
    .lagan {
      height: 15px;
      width: 15px;
      background-color: #CFA240;
      border-radius: 50%;
      display: inline-block;
    }
    .booking {
      height: 15px;
      width: 15px;
      background-color: #ad2121;
      border-radius: 50%;
      
      display: inline-block;
    }
    .cal-month-view .cal-event-title {
    cursor: pointer;
    font-weight: bold;
}
      .my-custom-class span {
        color: #CFA240;
        animation: blinker 2s linear infinite;
        font-size:15px;
        font-weight: bold;
      }
      .cal-month-view .cal-day-badge {
      background-color: grey;;
      color: #fff;
}
      @keyframes blinker {
  50% {
    opacity: 0;
  }
}
    `,
  ],
  encapsulation: ViewEncapsulation.None
})
export class BookingCalendarPage implements OnInit {
  @ViewChild('modalContent', {
    static: true
  }) modalContent!: TemplateRef < any > ;

  view: CalendarView = CalendarView.Month;

  CalendarView = CalendarView;

  viewDate: Date = new Date();
  isready !: Boolean
  @Input() status!: String;
  @Output() isReady = new EventEmitter();
  modalData!: {
    action: string;
    event: CalendarEvent;
  };

  actions: CalendarEventAction[] = [{
      label: '<i class="fas fa-fw fa-pencil-alt"></i>',
      a11yLabel: 'Edit',
      onClick: ({
        event
      }: {
        event: CalendarEvent
      }): void => {
        this.handleEvent('Edited', event);
      },
    },
    {
      label: '<i class="fas fa-fw fa-trash-alt"></i>',
      a11yLabel: 'Delete',
      onClick: ({
        event
      }: {
        event: CalendarEvent
      }): void => {
        this.events = this.events.filter((iEvent) => iEvent !== event);
        this.handleEvent('Deleted', event);
      },
    },
  ];

  refresh = new Subject < void > ();

  events: CalendarEvent[] = [];

  activeDayIsOpen: boolean = false;

  constructor(private bookingService: BookingServiceService) {

  }

  ngOnInit(): void {
    this.getBookedDates();
    // this.getLaganDate();
  }

  dayClicked({
    date,
    events
  }: {
    date: Date;events: CalendarEvent[]
  }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = date;
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
    this.modalData = {
      event,
      action
    };
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

  getBookedDates() {
    this.isready = false;
    var i = this;
    this.bookingService.getAllBookingDate().subscribe((bookingData: any) => {
      let bookingDataIns = bookingData.bookingData;
      for (let index = 0; index < bookingDataIns.length; index++) {
        if (bookingDataIns[index] && bookingDataIns[index].status === 'approved') {
          var bookingDate = bookingDataIns[index].bookingDate;
          this.events.push({
            start: addHours(new Date(bookingDate), 10),
            end: addHours(new Date(bookingDate), 23),
            title: "मैरिज हॉल बुक हो चुका है -  " + addHours(new Date(bookingDate), 10),
            color: colors.red,
           
          })
        }
        this.isready = true;
        console.log(this.events);
        this.isReady.emit(true);
      }
    })
  }

  getLaganDate() {
    this.bookingService.getLagan().subscribe((laganDate: any) => {
      for (let index = 0; index < laganDate.length; index++) {
        this.events.push({
          start: new Date(laganDate[index].date),
          end: new Date(laganDate[index].date),
          title: laganDate[index].description,
          color: colors.gold,
          cssClass: 'my-custom-class',
          
        })

      }
     
    })
  }

}

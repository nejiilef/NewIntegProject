import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { UntypedFormBuilder, Validators, UntypedFormGroup, NgForm } from '@angular/forms';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

import { CalendarOptions, DateSelectArg, EventClickArg, EventApi } from '@fullcalendar/core';
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';

import { category, calendarEvents, createEventId } from './data';

import Swal from 'sweetalert2';
import { IreservationSalle } from 'src/app/reservation-salle/model/ireservation-salle';
import { ReservationSalleServiceService } from 'src/app/reservation-salle/service/reservation-salle-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {

  modalRef?: BsModalRef;

  // bread crumb items
  breadCrumbItems: Array<{}>;

  @ViewChild('modalShow') modalShow: TemplateRef<any>;
  @ViewChild('editmodalShow') editmodalShow: TemplateRef<any>;

  formEditData: UntypedFormGroup;
  submitted = false;
  category: any[];
  newEventDate: any;
  editEvent: any;
  calendarEvents: any[];
  // event form
  formData: UntypedFormGroup;

  calendarOptions: CalendarOptions = {
    plugins: [
      interactionPlugin,
      dayGridPlugin,
      timeGridPlugin,
      listPlugin,
    ],
    headerToolbar: {
      left: 'dayGridMonth,dayGridWeek,dayGridDay',
      center: 'title',
      right: 'prevYear,prev,next,nextYear'
    },
    initialView: "dayGridMonth",
    themeSystem: "bootstrap",
    initialEvents: calendarEvents,
    weekends: true,
    editable: true,
    selectable: true,
    selectMirror: true,
    dayMaxEvents: true,
    dateClick: this.openModal.bind(this),
    eventClick: this.handleEventClick.bind(this),
    eventsSet: this.handleEvents.bind(this),
    eventTimeFormat: { // like '14:30:00'
      hour: '2-digit',
      minute: '2-digit',
      meridiem: false,
      hour12: true
    }
  };
  currentEvents: EventApi[] = [];

  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'Skote' }, { label: 'Calendar', active: true }];

    this.formData = this.formBuilder.group({
      title: ['', [Validators.required]],
      category: ['', [Validators.required]],
    });

    this.formEditData = this.formBuilder.group({
      editTitle: ['', [Validators.required]],
      editCategory: [],
    });
    this._fetchData();

  }

  /**
   * Event click modal show
   */
  handleEventClick(clickInfo: EventClickArg) {
    console.log(clickInfo);
    this.editEvent = clickInfo.event;
    var category = clickInfo.event.classNames;
    this.formEditData = this.formBuilder.group({
      editTitle: clickInfo.event.title,
      editCategory: category instanceof Array?clickInfo.event.classNames[0]:clickInfo.event.classNames,
    });
    this.modalRef = this.modalService.show(this.editmodalShow);
  }

  /**
   * Events bind in calander
   * @param events events
   */
  handleEvents(events: EventApi[]) {
    this.currentEvents = events;
  
  }

  constructor(
    private modalService: BsModalService,
    private formBuilder: UntypedFormBuilder,
    private service:ReservationSalleServiceService,private router:Router
  ) {}

  get form() {
    return this.formData.controls;
  }

  /**
   * Delete-confirm
   */
  confirm() {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You won\'t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#34c38f',
      cancelButtonColor: '#f46a6a',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.value) {
        this.deleteEventData();
        Swal.fire('Deleted!', 'Event has been deleted.', 'success');
      }
    });
  }

  position() {
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Event has been saved',
      showConfirmButton: false,
      timer: 1000,
    });
  }

  /**
   * Event add modal
   */
  openModal(event?: any) {
    console.log(event.date)
    this.newEventDate = event;
    this.modalRef = this.modalService.show(this.modalShow);
  }

  /**
   * save edit event data
   */
  editEventSave() {
    const editTitle = this.formEditData.get('editTitle').value;
    const editCategory = this.formEditData.get('editCategory').value;

    const editId = this.calendarEvents.findIndex(
      (x) => x.id + '' === this.editEvent.id + ''
    );

    this.editEvent.setProp('title', editTitle);
    this.editEvent.setProp('classNames', editCategory);

    this.calendarEvents[editId] = {
      ...this.editEvent,
      title: editTitle,
      id: this.editEvent.id,
      classNames: editCategory + ' ' + 'text-white',
    };

    this.position();
    this.formEditData = this.formBuilder.group({
      editTitle: '',
      editCategory: '',
    });
    this.modalService.hide();
  }

  /**
   * Delete event
   */
  deleteEventData() {
    this.editEvent.remove();
    this.modalService.hide();
  }

  /**
   * Close event modal
   */
  closeEventModal() {
    this.formData = this.formBuilder.group({
      title: '',
      category: '',
    });
    this.modalService.hide();
  }

  /**
   * Save the event
   */
  saveEvent() {
    if (this.formData.valid) {
      const title = this.formData.get('title').value;
      const className = this.formData.get('category').value;
      const calendarApi = this.newEventDate.view.calendar;
      calendarApi.addEvent({
        id: createEventId(),
        title,
        start: this.newEventDate.date,
        end: this.newEventDate.date,
        className: className + ' ' + 'text-white'
      });
      this.position();
      this.formData = this.formBuilder.group({
        title: '',
        category: '',
      });
      this.modalService.hide();
    }
    this.submitted = true;
  }
  time1: string | undefined;
  time2: string | undefined;

  validateTimes(f:NgForm) {
    this.time1 =f.value.heureDebut;
    this.time2=f.value.heureFin;
      console.log('Time 1:', this.time1);
      console.log('Time 2:', this.time2);
      
    
    if (this.time1 && this.time2 && this.time1 > this.time2) {
      // Reset the value of time2 if it's less than or equal to time1
      this.time2 = undefined
      alert('in Appropriate time');
    }
    else{
      console.log("submit")
      this.onSubmit(f);
    }
  }
  


  updateTime2(event: any) {
    
    this.time2 = event.target.value;
  }

  updateTime1(event: any) {
    this.time1 = event.target.value;
  }


   subbmited=false;
  onSubmit(f:NgForm){
    this.subbmited=true;
      if(f.invalid){
        return
      }
      else{
  this.addRessS(f)
  }
  }

  salle= [{
    id: 1,
    libelle: 'Salle 1',
    reserve: false,
    department: "electrique"
  },
  {
    id: 2,
    libelle: 'Salle 2',
    reserve: false,
    department: "informatique"
  }
  ,
  {
    id: 3,
    libelle: 'Salle 3',
    reserve: false,
    department: "informatique"
  },
  {
    id: 4,
    libelle: 'Salle 4',
    reserve: false,
    department: "Gestion"
  }
]

selectedSalle : any;


addRessS=(f:NgForm)=>{
   const newArr={id : f.value.id , heureDebut:f.value.heureDebut,heureFin: f.value.heureFin , jour:this.newEventDate.date}
   this.service.addRessS(newArr as IreservationSalle , this.selectedSalle.id).subscribe(
    response => {
      this.modalService.hide();
      console.log('reservation added successfully:', response);
      this.router.navigate(["/dash"]);
    },
    error => {
     alert("Salle deja reserve pendant cette periode !");
      console.error('Error adding reservation:', error);
    }
   );
   this.router.navigate(["/dash"]);
  }

  


  /**
   * Fetches the data
   */
  private _fetchData() {
    // Event category
    this.category = category;
    // Calender Event Data
    this.calendarEvents = calendarEvents;
    // form submit
    this.submitted = false;
  }


}

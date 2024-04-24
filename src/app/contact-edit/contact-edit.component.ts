import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ContactModel} from "../models/contact.model";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {combineAll, combineLatest, combineLatestAll, forkJoin, map, Observable, of, tap, zip} from "rxjs";
import {ContactService} from "../services/contact/contact.service";
import {NotificationService} from "../services/notification.service";
import {LoggerService} from "../services/logger.service";
import {ContactPageState} from "../constants/constants";

@Component({
    selector: 'app-contact-edit',
    templateUrl: './contact-edit.component.html',
    styleUrls: ['./contact-edit.component.css']
})
export class ContactEditComponent implements OnInit {

    contact: ContactModel = new ContactModel();
    uuid: string;
    mode = ContactPageState.CREATE;


    contactForm: FormGroup;
    protected readonly JSON = JSON;

    constructor(private route: ActivatedRoute,private router: Router, private contactService: ContactService,
                private notificationService: NotificationService,
                private logger: LoggerService) {
    }

    ngOnInit(): void {

        this.initForm();

        let params = combineLatest([this.route.params, this.route.queryParams])
            .pipe(map(([params, queryParams]) => ({
                uuid: params['uuid'],
                mode: queryParams['mode'] as ContactPageState
            })));

        params.subscribe({
            next : (params: { uuid: string, mode: ContactPageState }) => {

                this.mode = params.mode;

                if (this.mode == ContactPageState.EDIT || this.mode == ContactPageState.VIEW) {
                    this.uuid = params.uuid;
                }
                if (this.mode == ContactPageState.VIEW) {
                    this.contactForm.disable();
                }
                this.loadContact(this.uuid).subscribe(data => {
                    this.contact = data;
                    this.contactForm.patchValue(this.contact);
                }, error => {
                    this.notificationService.error("Error loading contact");
                });
            }
        });
    }


    formControl(field): any {
        return this.contactForm.get(field);
    }

    deleteContact(): any {
        confirm("Are you sure you want to delete this contact?") ? this.contactService.deleteContact(this.uuid).subscribe({
            next: (data) => {
                this.notificationService.success('Contact deleted successfully');
                this.router.navigate(['/landing']);
            },
            error: (error) => {
                this.notificationService.error('Error deleting contact');
                this.logger.error('Error in deleteContact', error);
            }
        }) : null;
    }

    submitForm() {
        if (this.contactForm.valid) {
            let contact = Object.assign(new ContactModel(), this.contactForm.value);
            Object.assign(contact, {uuid: this.uuid ? this.uuid : '0'});
            let upseart_function = this.uuid && this.uuid != '0' ?
                this.contactService.updateContact : this.contactService.createContact;
            upseart_function = upseart_function.bind(this.contactService);
            upseart_function(contact).subscribe({
                next: (data) => {
                    this.uuid = data.data.uuid;
                    this.loadContact(this.uuid).subscribe(data => {
                        this.contact = data;
                        this.contactForm.reset()
                        this.contactForm.patchValue(this.contact);
                        this.notificationService.success('Contact saved');
                    });
                },
                error: (error) => {
                    this.notificationService.handleErrorMessage(error);
                }
            });
        }
    }


    private initForm() {
        this.contactForm = new FormGroup({
            'firstName': new FormControl(null, [Validators.required, Validators.minLength(2), Validators.maxLength(50)]),
            'lastName': new FormControl(null, [Validators.required, Validators.minLength(2), Validators.maxLength(50)]),
            'email': new FormControl(null, [Validators.required, Validators.email, Validators.minLength(11), Validators.maxLength(50)]),
            'phone': new FormControl(null, [Validators.required, Validators.minLength(2), Validators.maxLength(50), Validators.pattern('^\\+1\\s\\([0-9]{3}\\)\\s[0-9]{3}-[0-9]{4}$')]),
            'company': new FormControl(null, [Validators.minLength(2), Validators.maxLength(50)]),
            'website': new FormControl(null, [Validators.minLength(2), Validators.maxLength(50), Validators.pattern('^(https?:\\/\\/)?([\\da-z\\.-]+)\\.([a-z\\.]{2,6})([\\/\\w \\.-]*)*\\/?$')]),
            'address': new FormGroup({
                'civicNumber': new FormControl(null, [Validators.required, Validators.min(0), Validators.max(99999)]),
                'unitNumber': new FormControl(null, [Validators.min(0), Validators.max(99999), Validators.pattern('[0-9]*')]),
                'street': new FormControl(null, [Validators.required, Validators.minLength(2), Validators.maxLength(50)]),
                'city': new FormControl(null, [Validators.required, Validators.minLength(2), Validators.maxLength(50)]),
                'province': new FormControl(null, [Validators.required, Validators.maxLength(2),Validators.pattern('^[A-Z]{2}$')]),
                'postalCode': new FormControl(null, [Validators.required,Validators.pattern('^[A-Z]\\d[A-Z] \\d[A-Z]\\d$')])
            }),
        });
    }

    private loadContact(uuid: string): Observable<ContactModel> {
        if (!uuid || uuid == "0") {
            return of(new ContactModel())
        } else {
            return this.contactService.getContact(uuid).pipe(map(d => (d.data)))
        }
    }

    protected readonly ContactPageState = ContactPageState;
}

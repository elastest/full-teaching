import { TestBed, async } from '@angular/core/testing';

import { AppComponent } from '../app.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule }      from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { HttpModule }    from '@angular/http';

import { routing } from '../app.routing';

import { MaterializeModule }    from 'angular2-materialize';
import { MaterializeDirective } from "angular2-materialize";

import { FileSelectDirective } from 'ng2-file-upload';
import { FileDropDirective }   from 'ng2-file-upload';

import { MatCommonModule, MatRippleModule } from '@angular/material/core';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioButton } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSliderModule } from '@angular/material/slider';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTabsModule } from '@angular/material';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialogModule } from '@angular/material/dialog';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatExpansionPanel } from '@angular/material';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatStepperModule } from '@angular/material/stepper';

import { NavbarComponent }        from '../components/navbar/navbar.component';
import { FooterComponent }        from '../components/footer/footer.component';
import { LoginModalComponent }    from '../components/login-modal/login-modal.component';
import { PresentationComponent }  from '../components/presentation/presentation.component';
import { DashboardComponent }     from '../components/dashboard/dashboard.component';
import { CourseDetailsComponent } from '../components/course-details/course-details.component'
import { SettingsComponent }      from '../components/settings/settings.component';
import { ErrorMessageComponent }  from '../components/error-message/error-message.component';
import { CommentComponent }       from '../components/comment/comment.component';
import { FileGroupComponent }     from '../components/file-group/file-group.component';
import { VideoSessionComponent }  from '../components/video-session/video-session.component';
import { FileUploaderComponent }  from '../components/file-uploader/file-uploader.component';
import { StreamComponent }        from '../components/video-session/stream.component';
import { ChatLineComponent }      from '../components/chat-line/chat-line.component';

import { AuthenticationService }  from '../services/authentication.service';
import { CourseService }          from '../services/course.service';
import { SessionService }         from '../services/session.service';
import { ForumService }           from '../services/forum.service';
import { FileService }            from '../services/file.service';
import { CourseDetailsModalDataService }  from '../services/course-details-modal-data.service';
import { LoginModalService }      from '../services/login-modal.service';
import { UploaderModalService }   from '../services/uploader-modal.service';
import { UserService }            from '../services/user.service';
import { AnimationService }       from '../services/animation.service';

import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { CalendarComponent }      from '../components/calendar/calendar.component';
import { TimeAgoPipe }            from 'time-ago-pipe';
import { DragulaModule }          from 'ng2-dragula/ng2-dragula';
import { EditorModule }           from 'primeng/components/editor/editor';
import { ReCaptchaModule }        from 'angular2-recaptcha';

describe('Component: ErrorMessage', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        routing,
        MaterializeModule,
      ],
      declarations: [

        AppComponent,
        PresentationComponent,
        DashboardComponent,
        CourseDetailsComponent,
        NavbarComponent,
        FooterComponent,
        LoginModalComponent,
        SettingsComponent,
        ErrorMessageComponent,
        CommentComponent,
        FileGroupComponent,
        CalendarComponent,
        TimeAgoPipe,
        FileSelectDirective,
        FileDropDirective,
        VideoSessionComponent,
        FileUploaderComponent,
        StreamComponent,
        ChatLineComponent,
      ],
    });
  });

  it('should create an instance', () => {
    let component = new ErrorMessageComponent();
    expect(component).toBeTruthy();
  });
});

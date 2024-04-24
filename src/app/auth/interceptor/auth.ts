import {Injectable} from "@angular/core";
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Router} from "@angular/router";
import {catchError, Observable} from "rxjs";
import {NotificationService} from "../../services/notification.service";
import {SessionService} from "../../services/session.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private router: Router,
                private notificationService : NotificationService,
                private sessionStore : SessionService) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let url = request.url;
        let skipAuth = request.headers.get('skip_auth');

        let headersToAdd = {
            'Accept': 'application/json'
        }
        if(!skipAuth && this.sessionStore.getToken()) {
            headersToAdd['Authorization'] = `Bearer ${this.sessionStore.getToken()}`;
        }

        let clonedRequest = request.clone({
            setHeaders: headersToAdd,
            headers: request.headers.delete('skip_auth')
        });

        return next.handle(clonedRequest).pipe(
            catchError((error)=>{
                if(!skipAuth && error.status === 401){
                    this.sessionStore.clearSession();
                    this.notificationService.error('Session Expired');
                    this.router.navigate(['/auth']);
                }
                throw error;
            })
        );
    }
}

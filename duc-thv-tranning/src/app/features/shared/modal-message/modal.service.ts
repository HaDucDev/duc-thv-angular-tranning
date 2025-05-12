import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { map, take } from 'rxjs/operators';

interface ModalData {
    title: string;
    message: string;
    errors?: string[];
    buttons: { label: string, action: string, class?: string }[];
    type?: 'error' | 'success' | 'info' | 'warning';
}

@Injectable({ providedIn: 'root' })
export class ModalService {
    private modalSubject = new Subject<ModalData>();
    private actionSubject = new Subject<string>();

    modalState$ = this.modalSubject.asObservable();

    showModal(
        title: string, 
        message: string, 
        buttons: any[], 
        errors: string[] = [], 
        type: 'error' | 'success' | 'info' | 'warning' = 'info',) {

        this.modalSubject.next({ title, message, buttons, errors, type });
    }

    emitAction(action: string) {
        this.actionSubject.next(action);
    }

    confirmDelete(message: string, title: string = 'Confirm'): Observable<boolean> {
        this.showModal(
            title,
            message,
            [
                { label: 'Delete', action: 'delete', class: 'btn-danger' },
                { label: 'Cancel', action: 'cancel', class: 'btn-secondary' }
            ],
            [],
            'warning'
        );

        return this.actionSubject.asObservable().pipe(
            take(1),
            map(action => action === 'delete')
        );
    }
}

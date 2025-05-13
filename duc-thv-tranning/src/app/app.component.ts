import { Component, OnInit } from '@angular/core';
import { AuthService} from './features/auth/auth.service';
import { ModalService } from './features/shared/modal-message/modal.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  title: string = 'duc-thv-tranning';
  modalVisible: boolean = false;
  modalData: any;
  constructor(
    private authService: AuthService,
    private modalService: ModalService,
  ) {
    this.modalService.modalState$.subscribe(data => {
      this.modalData = data;
      this.modalVisible = true;
    });
  }

  ngOnInit(): void {
    this.authService.loadCurrentUserFromLocalStorage();
  }

  handleModalClick(action: string) {
    this.modalVisible = false;
    this.modalService.emitAction(action);
  }
}

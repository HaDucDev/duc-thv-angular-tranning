import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-modal-message',
  templateUrl: './modal-message.component.html',
  styleUrls: ['./modal-message.component.css']
})
export class ModalMessageComponent {
  @Input() title: string = '';
  @Input() message: string = '';
  @Input() errors: string[] = [];
  @Input() buttons: { label: string, action: string, class?: string }[] = [];
  @Input() type: 'error' | 'success' | 'info' | 'warning' = 'info';

  @Output() buttonClick = new EventEmitter<string>();

  onClick(action: string) {
    this.buttonClick.emit(action);
  }
}

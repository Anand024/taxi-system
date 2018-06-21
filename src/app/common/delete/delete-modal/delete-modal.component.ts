import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
// import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-delete-modal',
  templateUrl: './delete-modal.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./delete-modal.component.css']
})
export class DeleteModalComponent implements OnInit {

  closeResult: string;
  constructor() { }

  ngOnInit() {
  }

  // openBackDropCustomClass(content) {
  //   this.modalService.open(content, {backdropClass: 'light-blue-backdrop'});
  // }

  // openWindowCustomClass(content) {
  //   this.modalService.open(content, { windowClass: 'dark-modal' });
  // }

  // openSm(content) {
  //   this.modalService.open(content, { size: 'sm' });
  // }

  // openLg(content) {
  //   this.modalService.open(content, { size: 'lg' });
  // }

  // openVerticallyCentered(content) {
  //   this.modalService.open(content, { centered: true });
  // }
}

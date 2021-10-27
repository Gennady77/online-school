import { Injectable } from "@angular/core";
import { NgbDateAdapter } from "@ng-bootstrap/ng-bootstrap";
import { NgbDateStruct } from "@ng-bootstrap/ng-bootstrap/datepicker/ngb-date-struct";

@Injectable()
export class CustomAdapter extends NgbDateAdapter<number> {

  fromModel(value: number | null): NgbDateStruct | null {
    if (value) {
      let date = new Date(value);
      return {
        day : date.getDate(),
        month : date.getMonth(),
        year : date.getFullYear()
      };
    }
    return null;
  }

  toModel(date: NgbDateStruct | null): number | null {
    if(!date) {
      return null;
    }

    const obj = new Date(date.year, date.month, date.day);

    return obj.getTime();
  }
}

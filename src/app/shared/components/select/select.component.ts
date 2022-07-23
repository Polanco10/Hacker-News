import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { faReact } from '@fortawesome/free-brands-svg-icons'

export interface Iitem {
  name: string;
  value: string;
  icon: any
}


@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.css']
})
export class SelectComponent implements OnInit {
  items: Iitem[] = [{ name: 'Angular', value: 'angular', icon: faReact }, { name: 'Reacts', value: 'reactjs', icon: faReact }, { name: 'Vuejs', value: 'vuejs', icon: faReact }];
  selected: Iitem | number = -1

  @Output() itemSelected: EventEmitter<Iitem> = new EventEmitter<Iitem>();

  constructor() {
  }

  ngOnInit(): void {
    let urlParam = localStorage.getItem('params')
    if (urlParam) {
      let query = JSON.parse(urlParam).query
      let item = this.items.find((el: Iitem) => el.value === query)
      this.selected = item ? item : -1
    }
  }
  public onChange(item: Iitem): void {
    this.selected = item
    this.itemSelected.emit(item);
  }
}

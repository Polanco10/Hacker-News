import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SwitchButtonComponent } from './components/switch-button/switch-button.component';
import { SelectComponent } from './components/select/select.component';
import { CardComponent } from './components/card/card.component';
import { PaginatorComponent } from './components/paginator/paginator.component';
import { FilterHitsPipe } from './pipes/filter-hits.pipe';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';



@NgModule({
  declarations: [
    SwitchButtonComponent,
    SelectComponent,
    CardComponent,
    PaginatorComponent,
    FilterHitsPipe
  ],
  imports: [
    CommonModule,
    FormsModule,
    FontAwesomeModule,

  ],
  exports: [
    SwitchButtonComponent,
    SelectComponent,
    CardComponent,
    PaginatorComponent,
    FilterHitsPipe
  ],
  providers: [FilterHitsPipe]
})
export class SharedModule { }

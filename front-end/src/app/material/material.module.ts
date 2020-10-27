import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { MatCardModule } from '@angular/material/card'
import { MatTabsModule } from '@angular/material/tabs'
import { MatDividerModule } from '@angular/material/divider'
import { MatListModule } from '@angular/material/list'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatSelectModule } from '@angular/material/select'



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatCardModule,
    MatTabsModule,
    MatDividerModule,
    MatListModule,
    MatFormFieldModule,
    MatSelectModule
  ],
  exports: [
    MatCardModule,
    MatTabsModule,
    MatDividerModule,
    MatListModule,
    MatFormFieldModule,
    MatSelectModule
  ]
})
export class MaterialModule { }

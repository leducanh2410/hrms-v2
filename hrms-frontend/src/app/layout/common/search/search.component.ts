import { Component, Input, OnInit, ViewChild, EventEmitter, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import {MatAutocomplete, MatAutocompleteModule} from '@angular/material/autocomplete';
import { RouterModule } from '@angular/router';
import { UntypedFormControl } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { debounceTime, filter, map, Subject, takeUntil } from 'rxjs';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-search',
  imports: [MatIconModule,
    MatAutocompleteModule,
    RouterModule,
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule
  ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent implements OnInit{
 
  
  @Input() appearance: 'basic' | 'bar' = 'basic';
  @Input() debounce: number = 300;
  @Input() minLength: number = 2;
  @Output() search: EventEmitter<any> = new EventEmitter<any>();

  searchControl: UntypedFormControl = new UntypedFormControl();
  opened: boolean = false;
  resultSets: any[] | null = null;

  private _matAutocomplete!: MatAutocomplete;
  private _unsubscribeAll: Subject<any> = new Subject<any>();

  constructor(
    private _httpClient: HttpClient,
  ) {}
  ngOnInit(): void
  {
      // Subscribe to the search field value changes
      this.searchControl.valueChanges
          .pipe(
              debounceTime(this.debounce),
              takeUntil(this._unsubscribeAll),
              map((value) => {

                  // Set the resultSets to null if there is no value or
                  // the length of the value is smaller than the minLength
                  // so the autocomplete panel can be closed
                  if ( !value || value.length < this.minLength )
                  {
                      this.resultSets = null;
                  }

                  // Continue
                  return value;
              }),
              // Filter out undefined/null/false statements and also
              // filter out the values that are smaller than minLength
              filter(value => value && value.length >= this.minLength)
          )
          .subscribe((value) => {
              this._httpClient.post('api/common/search', {query: value})
                  .subscribe((resultSets: any) => {

                      // Store the result sets
                      this.resultSets = resultSets;

                      // Execute the event
                      this.search.next(resultSets);
                  });
          });
  }
   /**
     * Setter for mat-autocomplete element reference
     *
     * @param value
     */
   @ViewChild('matAutocomplete')
   set matAutocomplete(value: MatAutocomplete)
   {
       this._matAutocomplete = value;
   }

  close(): void
    {
        // Return if it's already closed
        if ( !this.opened )
        {
            return;
        }

        // Clear the search input
        this.searchControl.setValue('');

        // Close the search
        this.opened = false;
    }
    onKeydown(event: KeyboardEvent): void
    {
        // Escape
        if ( event.code === 'Escape' )
        {
            // If the appearance is 'bar' and the mat-autocomplete is not open, close the search
            if ( this.appearance === 'bar' && !this._matAutocomplete.isOpen )
            {
                this.close();
            }
        }
    }
    trackByFn(index: number, item: any): any
    {
        return item.id || index;
    }
}

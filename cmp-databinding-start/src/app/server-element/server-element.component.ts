import { AfterContentChecked, AfterContentInit, AfterViewChecked, AfterViewInit, Component, ContentChild, DoCheck, ElementRef, Input, OnChanges, OnDestroy, OnInit, SimpleChange, SimpleChanges, ViewChild, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-server-element',
  templateUrl: './server-element.component.html',
  styleUrls: ['./server-element.component.css'],
  encapsulation: ViewEncapsulation.Emulated            // DEFAULT BEHAVIOR
})
export class ServerElementComponent implements OnInit, OnChanges, DoCheck, AfterContentInit, AfterContentChecked, AfterViewInit, AfterViewChecked, OnDestroy {

  @Input('srvElement') element: {type:string, name: string, content: string};
  @ViewChild('heading', {static:true}) headingElement : ElementRef;
  @ContentChild('contentParagraph', {static:true}) contentElement : ElementRef;

  constructor() { 
    console.log("constructor called !");
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log("ngOnChanges called !");
    console.log(changes);
  }

  ngOnInit() {
    console.log("ngOnInit called !");
    console.log("Header text: " + this.headingElement.nativeElement.textContent);
    console.log("Text content of paragraph : " + this.contentElement.nativeElement.textContent);
  }

  ngDoCheck() {
    console.log("ngDoCheck called !");
  }

  ngAfterContentInit() {
    console.log("ngAfterContentInit called !");
  }

  ngAfterContentChecked() {
    console.log("ngAfterContentChecked called !");
    console.log("Text content of paragraph : " + this.contentElement.nativeElement.textContent);
  }

  ngAfterViewChecked() {
    console.log("ngAfterViewChecked called !");
  }

  ngAfterViewInit() {
    console.log("ngAfterViewInit called !");
    console.log("Header text: " + this.headingElement.nativeElement.textContent);
  }

  ngOnDestroy() {
    console.log("ngOnDestroy called !");
  }

}

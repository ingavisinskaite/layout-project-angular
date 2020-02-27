import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MessagingWidgetComponent } from './messaging-widget.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('MessagingWidgetComponent', () => {
  let component: MessagingWidgetComponent;
  let fixture: ComponentFixture<MessagingWidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [MessagingWidgetComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MessagingWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AiAssistantDialogComponent } from './ai-assistant-dialog.component';

describe('AiAssistantDialogComponent', () => {
  let component: AiAssistantDialogComponent;
  let fixture: ComponentFixture<AiAssistantDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AiAssistantDialogComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AiAssistantDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

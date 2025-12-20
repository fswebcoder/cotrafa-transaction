import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HistoryDump } from './history-dump';

describe('HistoryDump', () => {
  let component: HistoryDump;
  let fixture: ComponentFixture<HistoryDump>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HistoryDump]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HistoryDump);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { page } from 'vitest/browser'
import { BslLogoComponent } from './bsl-logo.component';

describe('BslLogoComponent', () => {
  let component: BslLogoComponent;
  let fixture: ComponentFixture<BslLogoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BslLogoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BslLogoComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  test('Ensure there is no change to the logo', async () => {
    await expect(page.getByTestId('bsl-logo')).toMatchScreenshot('logo-screenshot')
  })
});

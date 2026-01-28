import { ComponentFixture, TestBed } from "@angular/core/testing";

import { HighlightTextComponent } from "./highlight-text.component";

describe("HighlightText", () => {
  let component: HighlightTextComponent;
  let fixture: ComponentFixture<HighlightTextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HighlightTextComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(HighlightTextComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should parse text into an array of TextSegments", () => {
    fixture.componentRef.setInput('text', 'alpha-`beta`-gamma');
    fixture.detectChanges();
    expect(component.textSegments()).toEqual([
      { value: "alpha-" },
      { value: "beta", highlight: true },
      { value: "-gamma" }
    ]);
  });
});
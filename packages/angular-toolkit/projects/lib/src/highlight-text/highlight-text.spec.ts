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
    fixture.componentRef.setInput('text', '');
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  describe("TextSegment", () => {
    it("should parse text into an array of TextSegments", () => {
      fixture.componentRef.setInput('text', 'alpha-`beta`-gamma');
      fixture.detectChanges();
      expect(component.textSegments()).toEqual([
        { value: "alpha-" },
        { value: "beta", highlight: true },
        { value: "-gamma" }
      ]);
    });

    it("should not highlight text if missing closing delimiter", () => {
      fixture.componentRef.setInput('text', 'alpha-`beta-gamma');
      fixture.detectChanges();
      expect(component.textSegments()).toEqual([
        { value: "alpha-" }, 
        { value: "`beta-gamma" }
      ]);
    });

    it("should handle complex cases with empty highlight segments", () => {
      fixture.componentRef.setInput('text', '`alp`ha`-``beta```-gamma');
      fixture.detectChanges();
      expect(component.textSegments()).toEqual([
        { value: "alp", highlight: true },
        { value: "ha" },
        { value: "-", highlight: true },
        { value: "beta", highlight: true },
        { value: "", highlight: true },
        { value: "-gamma" }
      ])
    });

    it("should handle parsing with custom configured delimiter value", () => {
      fixture.componentRef.setInput('text', 'alpha-*beta*-gamma');
      fixture.componentRef.setInput('delimiter', "*")
      fixture.detectChanges();
      expect(component.textSegments()).toEqual([
        { value: "alpha-" },
        { value: "beta", highlight: true },
        { value: "-gamma" }
      ]);
    });
  });

  describe("Element Validation", () => {
    it("should render the DOM in the correct order", () => {
      fixture.componentRef.setInput('text', 'alpha-`beta`-gamma');
      fixture.detectChanges();
      console.dir(fixture.nativeElement);
    });
  });
});
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
      const el: HTMLElement = fixture.nativeElement;
      expect(el.textContent.trim()).toBe('alpha- beta -gamma');

      const html = el.innerHTML;
      expect(html.indexOf('alpha-')).toBeLessThan(html.indexOf('<p-tag'));
      expect(html.indexOf('<p-tag')).toBeLessThan(html.indexOf('gamma'));
    });

    it("should handle missing closing delimiter", () => {
      fixture.componentRef.setInput('text', 'alpha-`beta-gamma');
      fixture.detectChanges();
      const el: HTMLElement = fixture.nativeElement;
      expect(el.textContent.trim()).toBe('alpha-  `beta-gamma')

      const html = el.innerHTML;
      expect(html.indexOf('alpha-')).toBeLessThan(html.indexOf('`beta-gamma'));
    });

    it ("should complex inputs", () => {
      fixture.componentRef.setInput('text', '`alp`ha`-``beta```-gamma');
      fixture.detectChanges();
      const el: HTMLElement = fixture.nativeElement;
      expect(el.textContent.trim()).toBe('alp ha -beta -gamma');
      
      const tags = Array.from(el.querySelectorAll('p-tag'));
      expect(tags.length).toBe(4);
      expect(tags[0].textContent.trim()).toBe('alp');
      expect(tags[1].textContent.trim()).toBe('-');
      expect(tags[2].textContent.trim()).toBe('beta');
      expect(tags[3].textContent.trim()).toBe('');
    });
  });
});
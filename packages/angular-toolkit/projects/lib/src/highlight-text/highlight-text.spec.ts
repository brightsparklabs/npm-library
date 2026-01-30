import { ComponentFixture, TestBed } from "@angular/core/testing";

import { HighlightTextComponent } from "./highlight-text.component";

describe("HighlightText", () => {
  let component: HighlightTextComponent;
  let fixture: ComponentFixture<HighlightTextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HighlightTextComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HighlightTextComponent);
    fixture.componentRef.setInput("text", "");
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it("Should create", () => {
    expect(component).toBeTruthy();
  });

  describe("TextSegment", () => {
    it("Should parse text into an array of TextSegments", () => {
      fixture.componentRef.setInput("text", "alpha-`beta`-gamma");
      fixture.detectChanges();
      expect(component.textSegments()).toEqual([
        { value: "alpha-" },
        { value: "beta", highlight: true },
        { value: "-gamma" },
      ]);
    });

    it("Should not highlight text if missing closing delimiter", () => {
      fixture.componentRef.setInput("text", "alpha-`beta-gamma");
      fixture.detectChanges();
      expect(component.textSegments()).toEqual([{ value: "alpha-" }, { value: "`beta-gamma" }]);
    });

    it("Should handle complex cases with empty highlight segments", () => {
      fixture.componentRef.setInput("text", "`alp`ha`-``beta```-gamma");
      fixture.detectChanges();
      expect(component.textSegments()).toEqual([
        { value: "alp", highlight: true },
        { value: "ha" },
        { value: "-", highlight: true },
        { value: "beta", highlight: true },
        { value: "", highlight: true },
        { value: "-gamma" },
      ]);
    });

    it("Should handle parsing with custom configured delimiter value", () => {
      fixture.componentRef.setInput("text", "alpha-*beta*-gamma");
      fixture.componentRef.setInput("delimiter", "*");
      fixture.detectChanges();
      expect(component.textSegments()).toEqual([
        { value: "alpha-" },
        { value: "beta", highlight: true },
        { value: "-gamma" },
      ]);
    });
  });

  describe("Element Validation", () => {
    it("Should render the DOM in the correct order", () => {
      fixture.componentRef.setInput("text", "alpha-`beta`-gamma");
      fixture.detectChanges();
      const el: HTMLElement = fixture.nativeElement;
      expect(el.textContent.trim()).toBe("alpha- beta -gamma");

      const html = el.innerHTML;
      expect(html.indexOf("alpha-")).toBeLessThan(html.indexOf("<p-tag"));
      expect(html.indexOf("<p-tag")).toBeLessThan(html.indexOf("gamma"));
    });

    it("Should handle missing closing delimiter", () => {
      fixture.componentRef.setInput("text", "alpha-`beta-gamma");
      fixture.detectChanges();
      const el: HTMLElement = fixture.nativeElement;
      expect(el.textContent.trim()).toBe("alpha-  `beta-gamma");

      const html = el.innerHTML;
      expect(html.indexOf("alpha-")).toBeLessThan(html.indexOf("`beta-gamma"));
    });

    it("Should complex inputs", () => {
      fixture.componentRef.setInput("text", "`alp`ha`-``beta```-gamma");
      fixture.detectChanges();
      const el: HTMLElement = fixture.nativeElement;
      expect(el.textContent.trim()).toBe("alp ha -beta -gamma");

      const tags = Array.from(el.querySelectorAll("p-tag"));
      expect(tags.length).toBe(4);
      expect(tags[0].textContent.trim()).toBe("alp");
      expect(tags[1].textContent.trim()).toBe("-");
      expect(tags[2].textContent.trim()).toBe("beta");
      expect(tags[3].textContent.trim()).toBe("");
    });
  });

  describe("Edge Cases", () => {
    it("Should handle undefined test input", () => {
      fixture.componentRef.setInput("text", undefined);
      fixture.detectChanges();
      expect(component.textSegments()).toEqual([]);
      expect(fixture.nativeElement.textContent.trim()).toBe("");
    });

    it("Should handle multi character delimiters", () => {
      fixture.componentRef.setInput("delimiter", "```");
      fixture.componentRef.setInput("text", "alpha```beta```gamma");
      fixture.detectChanges();

      expect(component.textSegments()).toEqual([
        { value: "alpha" },
        { value: "beta", highlight: true },
        { value: "gamma" },
      ]);

      const tag = fixture.nativeElement.querySelector("p-tag");
      expect(tag.textContent.trim()).toBe("beta");
    });

    it("Should handle no delimiters", () => {
      fixture.componentRef.setInput("text", "This is a string");
      fixture.detectChanges();

      expect(component.textSegments()).toEqual([{ value: "This is a string" }]);

      const tags = fixture.nativeElement.querySelectorAll("p-tag");
      expect(tags.length).toBe(0);
    });

    it("Should update segments when delimiter changes", () => {
      fixture.componentRef.setInput("text", "alpha *beta*");
      fixture.componentRef.setInput("delimiter", "*");
      fixture.detectChanges();
      // Second segment (beta) should be highlighted.
      expect(component.textSegments()[1].highlight).toBe(true);

      fixture.componentRef.setInput("delimiter", "`");
      fixture.detectChanges();
      // It should be a singular segment now.
      expect(component.textSegments().length).toBe(1);
    });

    it("Should update segments when text changes", () => {
      fixture.componentRef.setInput("text", "alpha `beta` gamma");
      fixture.detectChanges();
      expect(component.textSegments().length).toBe(3);

      fixture.componentRef.setInput("text", "alpha `beta`");
      fixture.detectChanges();
      expect(component.textSegments().length).toBe(2);
    });
  });
});

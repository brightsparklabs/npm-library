import { provideFileRouter } from "@analogjs/router";
import { TestBed } from "@angular/core/testing";
import { withComponentInputBinding } from "@angular/router";
import { App } from "./app.component";

describe("App", () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [provideFileRouter(withComponentInputBinding())],
    }).compileComponents();
  });

  it("should create the app", () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});

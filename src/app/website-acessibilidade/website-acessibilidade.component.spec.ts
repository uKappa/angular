import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebsiteAcessibilidadeComponent } from './website-acessibilidade.component';

describe('WebsiteAcessibilidadeComponent', () => {
  let component: WebsiteAcessibilidadeComponent;
  let fixture: ComponentFixture<WebsiteAcessibilidadeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WebsiteAcessibilidadeComponent]
    });
    fixture = TestBed.createComponent(WebsiteAcessibilidadeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

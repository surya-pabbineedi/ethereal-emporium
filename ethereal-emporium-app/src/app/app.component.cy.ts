/// <reference path="../../cypress/support/component.ts" />

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { AsyncPipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterTestingModule } from '@angular/router/testing';

describe('AppComponent', () => {
  beforeEach(() => {
    cy.mount(AppComponent, {
      imports: [
        BrowserAnimationsModule,
        MatToolbarModule,
        MatButtonModule,
        MatSidenavModule,
        MatListModule,
        MatIconModule,
        AsyncPipe,
        RouterTestingModule,
        MatProgressBarModule,
      ],
    });
  });

  it('should render app title', () => {
    cy.get('[data-cy="app-title"]').contains('Ethereal Emporium');
  });

  describe('sidenav', () => {
    it('should open when the menu button is clicked', () => {
      cy.get('[data-cy="menu-action"]').click();
      cy.get('.mat-sidenav.sidenav').should('be.visible');
    });

    it('should have nav items', () => {
      cy.get('mat-nav-list')
        .should('exist')
        .within(() => {
          cy.get('a.mdc-list-item').should('have.length', 2);
          cy.get('a.mdc-list-item:first').within((el) => {
            cy.wrap(el).should('have.attr', 'href', '/home');
            cy.get('span').should('contain.text', 'Home');
          });
          cy.get('a.mdc-list-item:last').within((el) => {
            cy.wrap(el).should('have.attr', 'href', '/products');
            cy.get('span').should('contain.text', 'Demo Products');
          });
        });
    });
  });
});

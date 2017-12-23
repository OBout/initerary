import { Component } from '@angular/core';

import { EditPage } from '../edit/edit';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = EditPage;
  tab3Root = ContactPage;

  constructor() {

  }
}

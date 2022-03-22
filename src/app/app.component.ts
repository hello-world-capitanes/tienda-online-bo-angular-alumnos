import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { SidebarComponent } from './shared/components/sidebar/sidebar.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'tienda-online-bo-angular-alumnos';

  @ViewChild('drawer') drawer!: MatDrawer;

  onClickMenuButton(): void {
    this.drawer?.toggle();
  }

}

import { Component, inject } from '@angular/core';
import { MapObjectListComponent } from "../../ui/map-object-list/map-object-list.component";

@Component({
  selector: 'app-sidebar',
  imports: [MapObjectListComponent],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent {

}

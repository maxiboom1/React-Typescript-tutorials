import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { NotifyService } from 'src/app/services/notify.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

    public constructor(private dataService: DataService, private notifyService: NotifyService) { }

    public async ngOnInit() {
        try {
            // this.myData = await this.dataService.getAll___();
        }
        catch(err: any) {
            this.notifyService.error(err);
        }
    }
    
}

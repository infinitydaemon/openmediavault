/**
 * This file is part of OpenMediaVault.
 *
 * @license   http://www.gnu.org/licenses/gpl.html GPL Version 3
 * @author    Volker Theile <volker.theile@openmediavault.org>
 * @copyright Copyright (c) 2009-2021 Volker Theile
 *
 * OpenMediaVault is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * any later version.
 *
 * OpenMediaVault is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 */
import { Component } from '@angular/core';
import dayjs from 'dayjs';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { AbstractDashboardWidgetComponent } from '~/app/core/components/dashboard/widgets/abstract-dashboard-widget-component';
import {
  SystemInformation,
  SystemInformationService
} from '~/app/shared/services/system-information.service';

@Component({
  selector: 'omv-dashboard-widget-system-information',
  templateUrl: './widget-system-information.component.html',
  styleUrls: ['./widget-system-information.component.scss']
})
export class WidgetSystemInformationComponent extends AbstractDashboardWidgetComponent<SystemInformation> {
  constructor(private systemInformationService: SystemInformationService) {
    super();
  }

  protected loadData(): Observable<SystemInformation> {
    return this.systemInformationService.systemInfo$.pipe(
      map((data) => {
        data.uptime = dayjs().unix() - data.uptime;
        return data;
      })
    );
  }
}

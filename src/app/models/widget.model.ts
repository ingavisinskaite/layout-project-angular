import { WidgetData } from './widget-data.model';
import { HeaderType } from './header-type.model';
import { WidgetType } from './widget-type.model';
import { Settings } from './settings.model';

export class Widget {
  constructor(
    public column?: number,
    public type: WidgetType = -1,
    public title?: string,
    public headerType: HeaderType = -1,
    public settings?: Settings,
    public data?: WidgetData[],
    public id?: string
  ) {}
}

import { WidgetData } from "./widget-data.model";
import { HeaderType } from "./header-type.model";
import { WidgetType } from "./widget-type.model";

export class Widget {
  constructor(
    public column: number,
    public type: WidgetType,
    public title: string,
    public headerType: HeaderType,
    public settings: number,
    public data: WidgetData,
    public id?: string
  ) {}
}

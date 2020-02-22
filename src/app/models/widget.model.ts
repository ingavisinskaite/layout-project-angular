import { WidgetData } from './widget-data.model';
import { HeaderType } from './header-type.model';
import { WidgetType } from './widget-type.model';

export class Widget {
  column: number;
  type: WidgetType;
  title: string;
  headerType: HeaderType;
  settings: number;
  data: WidgetData[];
  id: string;

  constructor(
    column?: number,
    type: WidgetType = -1,
    title?: string,
    headerType: HeaderType = -1,
    settings: number = -1,
    data?: WidgetData[],
    id?: string
  ) {
    this.column = column;
    this.type = type;
    this.title = title;
    this.headerType = headerType;
    this.settings = settings;
    this.data = data;
    this.id = id;
  }
}

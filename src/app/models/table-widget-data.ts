import { WidgetData } from './widget-data.model';

export class TableWidgetData extends WidgetData {
  constructor(
    public firstName: string,
    public lastName: string,
    public userName: string
  ) {
    super();
  }
}

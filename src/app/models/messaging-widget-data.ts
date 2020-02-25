import { WidgetData } from './widget-data.model';

export class MessagingWidgetData extends WidgetData {
  constructor(
    public author: string,
    public message: string,
    public isOnRightSide: boolean
  ) {
    super();
  }
}

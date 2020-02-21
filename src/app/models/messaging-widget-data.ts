import { WidgetData } from "./widget-data.model";

export class MessagingWidgetData extends WidgetData {
  author: string;
  message: string;
  isOnRightSide: boolean;
  constructor(author: string, message: string, isOnRightSide: boolean) {
    super();
    this.author = author;
    this.message = message;
    this.isOnRightSide = isOnRightSide;
  }
}

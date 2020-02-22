import { WidgetData } from './widget-data.model';

export class TableWidgetData extends WidgetData {
  firstName: string;
  lastName: string;
  userName: string;
  constructor(firstName: string, lastName: string, userName: string) {
    super();
    this.firstName = firstName;
    this.lastName = lastName;
    this.userName = userName;
  }
}

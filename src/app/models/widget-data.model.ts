export class WidgetData {
  constructor(public id: number) {}
}

export class TableWidgetData {
  constructor(
    public firstName: string,
    public lastName: string,
    public userName: string
  ) {}
}

export class MessagesWidgetData {
  constructor(
    public author: string,
    public message: string,
    public isOnRightSide: boolean
  ) {}
}

export class SystemEventsHandler {
  static onError({err}) {
    console.log(err);
  }

  static onInfo({info}) {
    console.log(info);
  }
}

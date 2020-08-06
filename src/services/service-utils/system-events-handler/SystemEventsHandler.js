export class SystemEventsHandler {
  static #counter = 0;

  static onError({err}) {
    console.log(err);
  }

  static onInfo({info}) {
    if (info === 'RENDERED') {
      console.log(info + ' ' + ++this.#counter);
    } else {
      console.log(info);
    }
  }
}

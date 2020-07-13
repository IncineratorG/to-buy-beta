export class Notifier {
  #idsCounter = 0;
  #subscriptions = [];

  constructor() {}

  subscribe({event, handler}) {
    const subscriptionId = ++this.#idsCounter;
    const subscription = {
      id: subscriptionId,
      event: event,
      handler: handler,
    };

    this.#subscriptions.push(subscription);

    return () => {
      this.#subscriptions = this.#subscriptions.filter(
        (s) => s.id !== subscription.id,
      );
    };
  }

  notify({event, data}) {
    this.#subscriptions.forEach((subscription) => {
      if (subscription.event === event && subscription.handler) {
        subscription.handler(data);
      }
    });
  }
}

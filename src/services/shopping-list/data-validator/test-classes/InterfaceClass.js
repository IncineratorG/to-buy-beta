export class InterfaceClass {
  constructor() {
    // this.func_2();
  }

  async func_1({one, two}): Promise<{one: any, two: any}> {
    console.log('BASE_FUNC_1');
  }

  static async func_2({three}) {}
}

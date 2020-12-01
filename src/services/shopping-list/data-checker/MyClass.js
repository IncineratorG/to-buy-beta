import {InterfaceClass} from './InterfaceClass';

export class MyClass extends InterfaceClass {
  constructor() {
    super();
  }

  async func_1({one, two}) {}

  static async func_2({three}) {}

  // async func_1() {
  //   console.log('MY_CLASS_FUNC_1');
  // }
}

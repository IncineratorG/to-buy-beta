import {Linking} from 'react-native';

export class PhoneShareService {
  static #className = 'PhoneShareService';
  static #defaultSmsUrl = 'sms:?body=t';
  static #defaultWhatsAppUrl = 'whatsapp://send?text=t';

  static async init() {
    await this.checkSmsAvailability();
    await this.checkWhatsAppAvailability();
  }

  static async checkSmsAvailability() {
    const defaultSmsUrl = 'sms:?body=t';

    try {
      const smsSharingSupported = await Linking.canOpenURL(defaultSmsUrl);
      return !!smsSharingSupported;
    } catch (e) {
      return false;
    }
  }

  static async checkWhatsAppAvailability() {
    const defaultWhatsAppUrl = 'whatsapp://send?text=t';

    try {
      const whatsAppSharingSupported = await Linking.canOpenURL(
        defaultWhatsAppUrl,
      );
      return !!whatsAppSharingSupported;
    } catch (e) {
      return false;
    }
  }
}

import { Component } from '@angular/core';
import { CloudSettings } from '@ionic/cloud-angular';

export const cloudSettings: CloudSettings = {
  'core': {
    'app_id': '31fa6d2b'
  },
  'push': {
    'sender_id': '950257889484',
    'pluginConfig': {
      'ios': {
        'badge': true,
        'sound': true,
        'alert': true
      },
      'android': {
        'iconColor': '#5e0e9d'
      }
    }
  }
};

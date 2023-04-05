import { Setting, SettingDTO } from 'shared/models';

export const mapSettings = (setting: SettingDTO): Setting => {
  return {
    ...setting
  };
};

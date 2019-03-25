import { AppProperties } from '../constants/application.properties';
import { getFileFromLocation } from '../utils/fileUtil';
const translationFilesLocation = '../translations';
const languages = AppProperties.LANGUAGES;
const getActiveTranslationFileLocation = (langCode: string, relativePath: string) => `${relativePath}/${langCode}.welcome.json`;
const getActiveTranslationFile = (langCode: string, relativePath: string = translationFilesLocation) => getFileFromLocation((() => getActiveTranslationFileLocation(langCode, relativePath))());
export {
  getActiveTranslationFile,
  getActiveTranslationFileLocation,
  languages
};

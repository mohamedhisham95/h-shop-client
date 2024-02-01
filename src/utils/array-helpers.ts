import { map } from "lodash";

export function convertToPlainArray(array = [], objectName: any) {
  return map(array, objectName);
}

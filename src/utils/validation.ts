import "reflect-metadata";
import { hasValue } from "./helper";

const requiredMetadataKey = Symbol("required");
const lengthMetadataKey = Symbol("length");

export const length = (minLength: number, maxLength?: number) => {
  return Reflect.metadata(lengthMetadataKey, {
    minLength: minLength,
    maxLength: maxLength,
  });
};
export const required = () => {
  return Reflect.metadata(requiredMetadataKey, {});
};
export const validate = <T>(object: T) => {
  const properties = Object.getOwnPropertyNames(object);
  properties.forEach((propertyName) => {
      const value = object[propertyName];
    let metadata = Reflect.getMetadata(
      requiredMetadataKey,
      object,
      propertyName
    );
    if (metadata) {
      if (!hasValue(value)) {
        throw new TypeError(`Property \'${propertyName}\' is required`);
      }
    }
    metadata = Reflect.getMetadata(lengthMetadataKey, object, propertyName);    
    if (metadata && hasValue(value)) {
      const maxValue = metadata.maxLength ? metadata.maxLength : Infinity;
      if (value.length < metadata.minLength || value.length > maxValue) {
        const message = metadata.maxLength
          ? `${propertyName} length is less then ${metadata.minLength} or more then ${metadata.maxLength}`
          : `${propertyName} length is less then ${metadata.minLength}`;
        throw new Error(message);
      }
    }
  });
};

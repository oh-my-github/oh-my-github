/// <reference path="../typings/node/node.d.ts" />
/// <reference path="../node_modules/cerialize/dist/serialize.d.ts" />

'use strict';

const cerialize = require('cerialize');

export const serialize = cerialize.serialize;
export const serializeAs = cerialize.serializeAs;
export const deserialize = cerialize.serialize;
export const deserializeAs = cerialize.deserializeAs;
export const inheritSerialization = cerialize.inheritSerialization;

export abstract class Deserializable {
  public static deserialize<T> (constructor, json): T {
    return cerialize.Deserialize(json, constructor);
  }
}

/// <reference path="../typings/node/node.d.ts" />
/// <reference path="../node_modules/cerialize/dist/serialize.d.ts" />

"use strict";

const cerialize = require("cerialize");

export const serialize = cerialize.serialize;
export const serializeAs = cerialize.serializeAs;
export const deserialize = cerialize.deserialize;
export const deserializeAs = cerialize.deserializeAs;
export const inheritSerialization = cerialize.inheritSerialization;

export interface NoParamConstructor<T> {
  new (): T;
}

export abstract class Deserializable {
  public static deserialize<T>(ctor: NoParamConstructor<T>, json): T {
    return cerialize.Deserialize(json, ctor);
  }

  public static deserializeArray<T>(ctor: NoParamConstructor<T>, json): Array<T> {
    return cerialize.Deserialize(json, ctor);
  }
}



/// <reference path="../../../typings/jasmine/jasmine.d.ts" />
/// <reference path="../../../typings/node/node.d.ts" />

import {MetaField, Profile} from "../../src/profile";
import {
  FileUtil,
  PROJECT_DIR,
  ENV_JSON,
  GENERATOR_VERSION,
  FILE_NAME_PROFILE_JSON,
  FILE_PATH_PROFILE_TEMPLATE_JSON
} from "../../src/file_util";

import {SampleProfile} from "./sampleProfile";

describe("profile.ts", () => {
  describe("MetaField.deserialize", () => {
    it("should throw an error when a profile has previous schema version", () => {
      let v0Prof = SampleProfile.V0_INITIAL_PROFILE;
      expect(() => Profile.deserialize(Profile, v0Prof)).toThrowError(Error);
    });

    it("should deserialize an initial meta", () => {
      let v1Prof = SampleProfile.V1_INITIAL_PROFILE;
      let v1Meta = v1Prof._$meta;
      let deserialized = Profile.deserialize(Profile, v1Prof)._$meta;

      expect(deserialized.agent).toEqual(v1Meta.agent);
      expect(deserialized.profile_schema_version).toEqual(v1Meta.profile_schema_version);
      expect(deserialized.publish_repository).toEqual(v1Meta.publish_repository);
      expect(deserialized.created_at).toEqual(v1Meta.created_at);
      expect(deserialized.collected_ats).toEqual(v1Meta.collected_ats);
    });

    it("should deserialize template while adding the current date to collected_ats ", () => {
      let template = getTemplate();
      let templateMeta = template._$meta;
      let initialProf = Profile.deserialize(Profile, template);
      let initialMeta = initialProf._$meta;

      expect(templateMeta.agent).toEqual("cli-generator");
      expect(templateMeta.publish_repository).toBeNull();
      expect(templateMeta.profile_schema_version).toBeNull();
      expect(templateMeta.created_at).toBeNull();
      expect(templateMeta.collected_ats.length).toEqual(0);

      expect(initialMeta.agent).toEqual("cli-generator");
      expect(initialMeta.publish_repository).toBeNull();
      expect(initialMeta.profile_schema_version).toEqual(MetaField.PROFILE_SCHEMA_VERSION);
      expect(initialMeta.created_at).toEqual(MetaField.CURRENT_DATE);
      expect(initialMeta.collected_ats.length).toEqual(1);
    });
  });

  describe("Profile", () => {
    it("should be deserialized from an empty profile", () => {
      let v1InitialProf = copyObject(SampleProfile.V1_INITIAL_PROFILE);
      let deserialized = Profile.deserialize(Profile, v1InitialProf);

      expect(deserialized._$meta.profile_schema_version).toEqual(v1InitialProf._$meta.profile_schema_version);
      expect(deserialized._$meta.publish_repository).toEqual(v1InitialProf._$meta.publish_repository);
      expect(deserialized._$meta.agent).toEqual(v1InitialProf._$meta.agent);
      expect(deserialized.languages.length).toEqual(0);
      expect(deserialized.repositories.length).toEqual(0);
      expect(deserialized.activities.length).toEqual(0);
    });
  });

  describe("Profile.updateMeta", () => {
    it("should update collected_ats while keeping other meta fields", () => {
      let v1InitialProf = copyObject(SampleProfile.V1_INITIAL_PROFILE);
      let prevProf = Profile.deserialize(Profile, v1InitialProf);
      let prevMeta = prevProf._$meta;

      let currentProf = new Profile();
      currentProf.updateMeta(prevMeta);
      let meta = currentProf._$meta;

      /** KEEP previous meta fields */
      expect(meta.profile_schema_version).toEqual(prevMeta.profile_schema_version);
      expect(meta.agent).toEqual(prevMeta.agent);
      expect(meta.publish_repository).toEqual(prevMeta.publish_repository);
      expect(meta.created_at).toEqual(prevMeta.created_at);

      /** updated meta fields */
      expect(Array.isArray(prevMeta.collected_ats)).toBeTruthy();
      expect(meta.collected_ats.length).toEqual(prevMeta.collected_ats.length + 1);
    });
  });

  describe("Template (`oh-my-github.template.json`)", () => {
    it("should be deserialized", () => {
      let templateProfile = getDeserializedTemplateProfile();
      expect(templateProfile._$meta.agent).toEqual("cli-generator");
      expect(templateProfile._$meta.profile_schema_version).toBeGreaterThan(0);
      expect(templateProfile._$meta.created_at).not.toBeNull();
      expect(templateProfile._$meta.collected_ats.length).toBe(1);
      expect(templateProfile._$meta.publish_repository).toBeNull();
    });
  });
});

function copyObject(object: any): any {
  return JSON.parse(JSON.stringify(object));
}

function getDeserializedTemplateProfile(): Profile {
 return Profile.deserialize(Profile, FileUtil.readFileIfExist(FILE_PATH_PROFILE_TEMPLATE_JSON));
}

function getTemplate(): any {
  return FileUtil.readFileIfExist(FILE_PATH_PROFILE_TEMPLATE_JSON);
}


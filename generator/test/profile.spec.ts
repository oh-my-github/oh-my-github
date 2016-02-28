/// <reference path="../../typings/jasmine/jasmine.d.ts" />
/// <reference path="../../typings/node/node.d.ts" />

import {MetaField, Profile} from "../src/profile";
import {
  FileUtil,
  PROJECT_DIR,
  GENERATOR_VERSION,
  FILE_NAME_PROFILE_JSON,
  FILE_PATH_PROFILE_TEMPLATE_JSON
} from "../src/file_util";

import {SampleProfile} from "./resource/sampleProfile";

describe("profile.ts", () => {
  describe("MetaField.deserialize", () => {
    xit("should throw an error when a profile has previous schema version", () => {
      let v0Prof = SampleProfile.V0_INITIAL_PROFILE;
      expect(() => Profile.deserialize(Profile, v0Prof)).toThrowError(Error);
    });

    it("should deserialize an initial meta", () => {
      let v1Prof = SampleProfile.V1_INITIAL_PROFILE;
      let v1Meta = v1Prof._$meta;
      let deserialized = Profile.deserialize(Profile, v1Prof)._$meta;

      expect(deserialized.agent).toEqual(v1Meta.agent);
      expect(deserialized.github_user).toEqual(v1Meta.github_user);
      expect(deserialized.github_repository).toEqual(v1Meta.github_repository);
      expect(deserialized.ignored_repositories).toEqual(v1Meta.ignored_repositories);
      expect(deserialized.schema_version).toEqual(v1Meta.schema_version);
      expect(deserialized.schema_created_at).toEqual(v1Meta.schema_created_at);
      expect(deserialized.schema_collected_ats).toEqual(v1Meta.schema_collected_ats);
    });

    it("should deserialize template while adding the current date to schema_collected_ats ", () => {
      let template = getTemplate();
      let templateMeta = template._$meta;
      let initialProf = Profile.deserialize(Profile, template);
      let initialMeta = initialProf._$meta;

      expect(templateMeta.agent).toEqual("cli-generator");
      expect(templateMeta.github_user).toBeNull();
      expect(templateMeta.github_repository).toBeNull();
      expect(templateMeta.ignored_repositories.length).toEqual(0);
      expect(templateMeta.schema_version).toBeNull();
      expect(templateMeta.schema_created_at).toBeNull();
      expect(templateMeta.schema_collected_ats.length).toEqual(0);

      expect(initialMeta.agent).toEqual("cli-generator");
      expect(initialMeta.github_user).toBeNull();
      expect(initialMeta.github_repository).toBeNull();
      expect(initialMeta.schema_version).toEqual(MetaField.PROFILE_SCHEMA_VERSION);
      expect(initialMeta.schema_created_at).toEqual(MetaField.CURRENT_DATE);
      expect(initialMeta.schema_collected_ats.length).toEqual(1);
    });
  });

  describe("Profile", () => {
    it("should be deserialized from an empty profile", () => {
      let v1InitialProf = copyObject(SampleProfile.V1_INITIAL_PROFILE);
      let deserialized = Profile.deserialize(Profile, v1InitialProf);

      expect(deserialized._$meta.agent).toEqual(v1InitialProf._$meta.agent);
      expect(deserialized._$meta.schema_version).toEqual(v1InitialProf._$meta.schema_version);
      expect(deserialized._$meta.github_user).toEqual(v1InitialProf._$meta.github_user);
      expect(deserialized._$meta.github_repository).toEqual(v1InitialProf._$meta.github_repository);
      expect(deserialized._$meta.ignored_repositories).toEqual(v1InitialProf._$meta.ignored_repositories);
      expect(deserialized.languages.length).toEqual(0);
      expect(deserialized.repositories.length).toEqual(0);
      expect(deserialized.activities.length).toEqual(0);
    });
  });

  describe("Profile.updateMeta", () => {
    it("should update schema_collected_ats while keeping other meta fields", () => {
      let v1InitialProf = copyObject(SampleProfile.V1_INITIAL_PROFILE);
      let prevProf = Profile.deserialize(Profile, v1InitialProf);
      let prevMeta = prevProf._$meta;

      let currentProf = new Profile();
      currentProf._$meta.ignored_repositories.push("2ambda.github.io");
      currentProf.updateMeta(prevMeta);

      let meta = currentProf._$meta;

      /** KEEP previous meta fields */
      expect(meta.agent).toEqual(prevMeta.agent);
      expect(meta.schema_version).toEqual(prevMeta.schema_version);
      expect(meta.schema_created_at).toEqual(prevMeta.schema_created_at);
      expect(meta.github_user).toEqual(prevMeta.github_user);
      expect(meta.github_repository).toEqual(prevMeta.github_repository);

      /** updated meta fields */
      expect(Array.isArray(prevMeta.schema_collected_ats)).toBeTruthy();

      /** collected_ats should be include new collected_at */
      expect(meta.schema_collected_ats.length).toEqual(prevMeta.schema_collected_ats.length + 1);

      /** ignored repositories should include both previous and current ignored repos */
      let uniqIgnoredRepos = new Set(meta.ignored_repositories.concat(prevMeta.ignored_repositories));

      expect(meta.ignored_repositories.length).toEqual(uniqIgnoredRepos.size);
    });
  });

  describe("Template (`oh-my-github.template.json`)", () => {
    it("should be deserialized", () => {
      let templateProfile = getDeserializedTemplateProfile();
      let meta = templateProfile._$meta;
      expect(meta.agent).toEqual("cli-generator");
      expect(meta.schema_version).toBeGreaterThan(0);
      expect(meta.schema_created_at).not.toBeNull();
      expect(meta.schema_collected_ats.length).toBe(1);
      expect(meta.github_user).toBeNull();
      expect(meta.github_repository).toBeNull();
      expect(meta.ignored_repositories.length).toEqual(0);
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


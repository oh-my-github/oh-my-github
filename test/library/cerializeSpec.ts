/// <reference path="../../typings/jasmine/jasmine.d.ts" />
/// <reference path="../../typings/node/node.d.ts" />
/// <reference path="../../node_modules/cerialize/dist/serialize.d.ts" />

const cerialize = require('cerialize');

const {
  serialize, serializeAs, Serialize,
  deserialize, deserializeAs, Deserialize
  } = cerialize;

describe("cerialize 0.1.1", () => {
  it("serialize", () => {
    let pet = new Pet("Cracker", "Cat");
    let person = new Person('Matt', new Date(1989, 4, 3), 'coding', pet);
    let serializedPet = Serialize(pet);
    let serializedPerson = Serialize(person);

    expect(serializedPerson.favorite_hobby).toEqual("coding");
    expect(serializedPerson.favorite_pet).toEqual(serializedPet);
  });

  it("deserialize", () => {
    var json = {
      species: 'Oak',
      barkType: { roughness: 1 },
      leafs: [ {color: 'red', blooming: false, bloomedAt: 'Mon Dec 07 2015 11:48:20 GMT-0500 (EST)' } ]
    };

    let tree = Deserialize(json, Tree);
    expect(tree.species).toEqual("Oak");
    expect(tree.leafs.length).toEqual(1);

    let leaf = tree.leafs[0];
    expect(leaf.color).toEqual("red");
    expect(leaf.blooming).toEqual(false);
    expect(tree.bark.roughness).toEqual(1);
  });
});

class Pet {
  //keys can be customized using serializeAs(string)
  @serializeAs('Name') public name : string;
  @serialize animalType : string;

  constructor(name : string, animalType: string) {
    this.name = name;
    this.animalType = animalType;
  }

  //this callback runs after the object is serialized. JSON can be altered here
  public static OnSerialized(instance : Pet, json : any) : void {
    json['addiction'] = 'laser pointers';
  }
}

class Person {
  //primitive properties marked with @serialize will be serialized as is
  @serialize public name : string;

  //complex types like Date or a user defined type like `User` use the serializeAs(keyNameOrType, keyName?) construct
  @serializeAs(Date) public birthdate : Date;

  //serialize key name as `favorite_hobby` instead of `hobby`
  @serializeAs('favorite_hobby') public hobby : string;

  //serialize the key name as `favorite_pet` and treat it like a `Pet`
  @serializeAs(Pet, 'favorite_pet') public pet : Pet;

  public firstName : string; //things not marked with an annotation are not serialized

  constructor(name : string, birthdate : Date, hobby : string, pet : Pet) {
    this.name = name;
    this.firstName = name.split(' ')[0];
    this.birthdate = birthdate;
    this.hobby = hobby;
    this.pet = pet;
  }
}

class Bark {
  @deserialize roughness: number;
}

class Leaf {
  @deserialize public color: string;
  @deserialize public blooming: boolean;
  @deserializeAs(Date) public bloomedAt: Date;
}

class Tree {
  @deserialize public species: string;
  @deserializeAs(Leaf) public leafs: Array<Leaf>;
  @deserializeAs(Bark, 'barkType') public bark: Bark;
}


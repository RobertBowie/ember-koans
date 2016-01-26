// import { _ } from '../helpers/blank';
import Ember from 'ember';
import { module, test } from 'qunit';

// Run `ember test --server` then visit:
// http://localhost:7357/tests/index.html?module=Intro&nojshint
// to run just this file.
let count = 0, Animal, beast, cat;
module('Ember Object', {
  beforeEach: function() {
    count = 0;
    Animal = Ember.Object.extend({
      type: 'critter',
      decription: Ember.computed('type', function() {
        count++;
        return `I am a ${this.get('type')}`;
      })
    });
    beast = Animal.create();
    cat = Animal.create({
      type: 'cat',
    });
  }
});

test('Ember Object is an object', function(assert) {
  assert.equal(typeof cat, 'object');
});

test('Type of Object.extend is class', function(assert) {
  assert.equal(Ember.typeOf(Animal), 'class');
});

test('Ember.Object.create makes an instance', function(assert) {
  assert.equal(Ember.typeOf(beast), 'instance');
});

test('Type of Object.create is instance', function(assert) {
  assert.equal(Ember.typeOf(cat), 'instance');
});

test('An instance will have class properties', function(assert) {
  assert.equal(beast.type, 'critter');
  assert.equal(cat.type, 'cat');
});

test('Using `get` will access a property', function(assert) {
  assert.equal(beast.get('type'), 'critter');
  assert.equal(cat.get('type'), 'cat');
});

test('A property of type Ember.computed, is an object', function(assert) {
  // Reading: http://emberjs.com/api/classes/Ember.computed.html
  assert.equal(typeof beast.decription, 'object');
});

test('Using `get` will access a computed property', function(assert) {
  assert.equal(beast.get('decription'), 'I am a critter');
  assert.equal(cat.get('decription'), 'I am a cat');
});

test('Using `set` will change property', function(assert) {
  cat.set('type', 'kitten');
  assert.equal(cat.get('type'), 'kitten');
});

test('Setting a property will update dependent computed properties', function(assert) {
  cat.set('type', 'kitten');
  assert.equal(cat.get('decription'), 'I am a kitten');
});

test('Computed properties are cached', function(assert) {
  cat.get('decription');
  assert.equal(count, 1);
  cat.get('decription');
  assert.equal(count, 1);
});

test('changing dependent property invalidates cache', function(assert) {
  cat.get('decription');
  assert.equal(count, 1);
  cat.set('type', 'kitten');
  cat.get('decription');
  assert.equal(count, 2);
});

test('Computed properties only execute when asked for', function(assert) {
  cat.set('type', 'kitten');
  assert.equal(count, 0, "Count == 0, because we havn't asked for it yet");
  cat.get('decription');
  assert.equal(count, 1, "Now we have.");
});

test('Ember protects against forgetting to use `set`', function(assert) {
  cat.get('decription');
  assert.throws(() => {
    cat.type = 'kitten';
  });
  assert.equal(cat.get('type'), 'cat');
});

import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import Documents from './documents';
import rateLimit from '../../modules/rate-limit.js';
import { Meteor } from 'meteor/meteor'

Meteor.methods({
  'createDoc': function(){
    let doc = {
      title: 'new doc',
    }
    Documents.insert(doc);
  },
  'updateText': function(text, docId){
    check(text, String);
    check(docId, String);
    let doc = {
      title: 'new doc',
      body: text
    }
    Documents.update({_id: docId}, {$set: doc});
  }
});

export const upsertDocument = new ValidatedMethod({
  name: 'documents.upsert',
  validate: new SimpleSchema({
    _id: { type: String, optional: true },
    title: { type: String, optional: true },
    body: { type: String, optional: true },
  }).validator(),
  run(document) {
    return Documents.upsert({ _id: document._id }, { $set: document });
  },
});

export const removeDocument = new ValidatedMethod({
  name: 'documents.remove',
  validate: new SimpleSchema({
    _id: { type: String },
  }).validator(),
  run({ _id }) {
    Documents.remove(_id);
  },
});

rateLimit({
  methods: [
    upsertDocument,
    removeDocument,
  ],
  limit: 5,
  timeRange: 1000,
});

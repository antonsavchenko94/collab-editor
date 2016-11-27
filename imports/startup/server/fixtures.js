import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { Accounts } from 'meteor/accounts-base';
import { Documents } from '../../api/documents/documents';

const users = [{
  email: 'admin@admin.com',
  password: 'password',
  profile: {
    name: { first: 'Carl', last: 'Winslow' },
  },
  roles: ['admin'],
}];


users.forEach(({ email, password, profile, roles }) => {
  const userExists = Meteor.users.findOne({ 'emails.address': email });

  if (!userExists) {
    const userId = Accounts.createUser({ email, password, profile });
    Roles.addUsersToRoles(userId, roles);
  }
});


/*const documents = Documents.find().fetch();

if (!documents || documents.length > 0) {
  let doc = {
      title: 'new doc',
    }
    Documents.insert(doc);
}*/

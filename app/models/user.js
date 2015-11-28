import Waterline from 'waterline';

/*---------------------------------------------/
| User Model
|
| Export simple Waterline Collection
|----------------------------------------------*/
export default Waterline.Collection.extend({

  identity: 'user',

  connection: 'myMongo',

  attributes: {

    firstName: {
      type: 'string',
      required: false
    },

    lastName: {
      type: 'string',
      required: false
    },

    email: {
      type: 'string',
      required: true
    },

    password: {
      type: 'string',
      required: true
    },

    /**
    * Get fullname
    */
    fullName() {
      return `${this.first_name} ${this.last_name}`;
    },

    /**
     * Check password
     * Notice: Improve that with an hash system (i.e Bcrypt)
     */
    validPassword(password) {
      return password == this.password;
    }
  }
});

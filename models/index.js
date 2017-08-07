const Sequelize = require('sequelize');
const db = new Sequelize('postgres://localhost:5432/wikistack');

// Page - title, urlTitle, content, status
// User - name, email


const Page = db.define('page', {
  title: {
    type: Sequelize.STRING,
    validate: {
      notEmpty: true
    },
    allowNull: false
    },

  urlTitle: {
    type: Sequelize.STRING,
    allowNull: false
  },

  content: {
    type: Sequelize.TEXT,
    validate: {
      notEmpty: true
    },
    allowNull: false
  },

  status: {
    type: Sequelize.ENUM('open', 'closed')
  },

  date: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW
  },

},
  {
    getterMethods: {
    route () {
      return '/wiki/' + this.urlTitle;
    }
  }
});

Page.hook('beforeValidate', (page) => {
  page.urlTitle = page.title.split(' ').join('_');
});

const User = db.define('user', {
  name: {
    type: Sequelize.STRING,
    validate: {
      notEmpty: true
    },
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    validate: {
      isEmail: true
    },
    allowNull: false
  }
});

module.exports = {
  db,
  Page,
  User
};

Page.belongsTo(User, { as: 'author'});

const Sequelize = require('sequelize');
const db = new Sequelize('postgres://localhost:5432/wikistack');

//Page - title, urlTitle, content, status
//User - name, email

const Page = db.define('page', {
  title: {
    type: Sequelize.String,
    validate: {
      notEmpty: true
    }
  },
  urlTitle: {
    type: Sequelize.String,
    validate: {
      isUrl: true
    }
  },
  content: {
    type: Sequelize.Text,
    validate: {
      notEmpty: true
    }
  },
  status: {
    type: Sequelize.Enum('open', 'closed')
  }
});

const User = db.define('user', {
  name: {
    type: Sequelize.String,
    validate: {
      notEmpty: true
    }
  },
  email: {
    type: Sequelize.String,
    validate: {
      isEmail: true
    }

  }
});

module.exports = {
  Page,
  User
};

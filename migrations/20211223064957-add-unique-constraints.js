'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    return queryInterface.addConstraint('Students', {
      fields: ['email'],
      type: 'unique',
      name:'unique_student_email'
    })
      .then(() => {
        return queryInterface.addConstraint('Instructors', {
          fields: ['email'],
          type: 'unique',
          name:'unique_instructor_email'
        })
      })
      .then(() => {
        return queryInterface.addConstraint('Admins', {
          fields: ['email'],
          type: 'unique',
          name:'unique_admin_email'
        })
      })
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    return queryInterface.removeConstraint('Admins', 'unique_admin_email', {})
      .then(() => {
        return queryInterface.removeConstraint('Instructors', 'unique_instructor_email', {})
      })
      .then(() => {
        return queryInterface.removeConstraint('Students', 'unique_student_email', {})
      })
  }
};

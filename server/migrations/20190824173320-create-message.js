'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Messages', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
      },
      message: {
        type: Sequelize.STRING,
        allowNull: false
      },
      SentBy: {
        type: Sequelize.UUID,
        onDelete: 'CASCADE',
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id'
        }

      },
      ConversationId: {
        type: Sequelize.UUID,
        onDelete: 'CASCADE',
        allowNull: false,
        references: {
          model: 'Conversations',
          key: 'id'
        }
      },
      attachment_url: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Messages');
  }
};
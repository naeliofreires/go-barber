import Sequelize, { Model } from 'sequelize';
import bcrypt from 'bcryptjs';

class User extends Model {
  static init(sequelize) {
    // sequelize => aqui recebemos nossa conexção
    // Todos os valores que pode receber na hora da criação
    super.init(
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        password: Sequelize.VIRTUAL, // nunca vai exister na base de dados
        password_hash: Sequelize.STRING,
        provider: Sequelize.BOOLEAN,
      },
      {
        sequelize,
      }
    );

    // criptografando a senha antes de salvar o usuario
    this.addHook('beforeSave', async user => {
      if (user.password) {
        user.password_hash = await bcrypt.hash(user.password, 8);
      }
    });

    return this;
  }

  static associate(models) {
    /**
     * pertence a ...
     * esse model de usuario pertence ao model de file
     */
    this.belongsTo(models.File, {
      as: 'avatar',
      foreignKey: 'avatar_id',
    });
  }

  checkPassword(password) {
    return bcrypt.compare(password, this.password_hash);
  }
}

export default User;

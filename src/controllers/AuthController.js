/* eslint-disable class-methods-use-this */
const jsonwebtoken = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const { User, Token } = require('../models');
const SignUpValidator = require('../validators/SignUpValidator');
const SignInValidator = require('../validators/SignInValidator');

class AuthController {
  async signUp(request, response) {
    const { body: data } = request;
    const result = SignUpValidator(data);

    if (!result.email) {
      return response.send(result);
    }

    result.password = bcrypt.hashSync(result.password, 10);

    const user = await User.create(result);
    const jwt = jsonwebtoken.sign({
      email: data.email,
      password: data.password,
    }, process.env.ACCESS_TOKEN_SECRET, {
      algorithm: 'HS256',
      expiresIn: process.env.ACCESS_TOKEN_LIFE,
    });

    await Token.create({
      user_id: user.id,
      token: jwt,
      type: 'Bearer',
    });

    return response.send({
      success: true,
      jwt_token: jwt,
    });
  }

  async signIn(request, response) {
    const { body: data } = request;
    const result = SignInValidator(data);

    if (!result.email) {
      return response.send(result);
    }

    const user = await User.findOne({
      where: {
        email: result.email,
      },
    });
    const passwordCheck = bcrypt.compareSync(result.password, user.password);

    if (!passwordCheck) {
      return response.send({
        success: false,
        message: 'Wrong password.',
      });
    }

    const jwt = jsonwebtoken.sign({
      email: data.email,
      password: data.password,
    }, process.env.ACCESS_TOKEN_SECRET, {
      algorithm: 'HS256',
      expiresIn: process.env.ACCESS_TOKEN_LIFE,
    });

    return response.send({
      success: true,
      jwt_token: jwt,
    });
  }

  async logout(request, response) {
    const { body: data } = request;

    await Token.destroy({
      where: {
        user_id: data.id,
      },
    });

    return response.send({
      success: true,
    });
  }
}

module.exports = new AuthController();

import { getCustomRepository } from "typeorm";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { UsersRepositories } from "../repositories/UsersRepositories";

interface IAuthenticateRequest {
  email: string;
  password: string;
}

class AuthenticateUserService {
  async execute({ email, password }: IAuthenticateRequest) {
    const usersRepositories = getCustomRepository(UsersRepositories);

    // verificar se email existe
    const user = await usersRepositories.findOne({
      email,
    });

    if (!user) {
      throw new Error("Email/Password incorrect");
    }

    // verificar se senha está correta
    // 122 / 6565665656
    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new Error("Email/Password incorrect");
    }

    // gerar token
    const token = sign(
      {
        email: user.email,
      },
      "764212139bde0ced873ce976758c4e95",
      {
        subject: user.id,
        expiresIn: "10m",
      }
    );

    return token;
  }
}

export { AuthenticateUserService };

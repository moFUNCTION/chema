import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../Config/Config";

export class LoginWithEmail {
  #emailRejex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
  constructor({ email, password }) {
    this.email = email;
    this.password = password;
  }
  async requist() {
    try {
      if (this.#emailRejex.test(this.email) && this.password) {
        const req = await signInWithEmailAndPassword(
          auth,
          this.email,
          this.password
        );
        return `Login successfully  Hi ${req.user.email}`;
      } else {
        throw new Error("in-vaild-credintals");
      }
    } catch (err) {
      throw new Error(err.code || err);
    }
  }
}

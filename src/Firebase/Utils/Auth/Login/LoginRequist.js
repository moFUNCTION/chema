import { GoogleProviderRegistration } from "../GoogleProviderRegistration/GoogleProviderRegistration";
import { LoginWithEmail } from "./LoginWithEmail";

export const LoginRequist = async ({ form, withGoogle }) => {
  if (withGoogle) {
    const login = new GoogleProviderRegistration({ grade: form.grade });
    const req = await login.requist();
    return req;
  } else {
    const login = new LoginWithEmail({
      email: form.email,
      password: form.password,
    });
    const req = await login.requist();
    return req;
  }
};

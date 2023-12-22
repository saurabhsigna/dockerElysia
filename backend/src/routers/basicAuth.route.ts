import Elysia, { t } from "elysia";
import {
  signUpController,
  signUpControllerTesting,
  signUpController_TestEmail,
  signUpController_Test_UA,
  signupController_TestHash,
} from "../controllers/(basicAuth)/signup.controller";
import {
  LoginController,
  // checkPasswordController,
} from "../controllers/(basicAuth)/login.controller";
import { rateLimitMiddleware } from "../middlewares/ratelimit";
const app = new Elysia();

app.post("/auth/basic", signUpController, {
  body: t.Object({
    nickName: t.String({ minLength: 4 }),
    email: t.String(),
    password: t.String(),
  }),
});

app.post("/auth/basic/testing", signupController_TestHash, {
  body: t.Object({
    nickName: t.String(),
    email: t.String(),
    password: t.String(),
  }),
});

app.post("/auth/basic/email", signUpController_TestEmail, {
  body: t.Object({
    email: t.String(),
  }),
});

app.post("/auth/basic/login", LoginController, {
  body: t.Object({
    email: t.String(),
    password: t.String(),
  }),
  async beforeHandle(context: any) {
    let errMsg;
    await rateLimitMiddleware(context, {
      maxRequests: 5,
      rateInSec: 60 * 10,
      blockFor12HoursAfterRequests: 8,
    }).catch((err: any) => {
      errMsg = err?.message;
    });
    return errMsg ?? errMsg;
  },
});

// app.post("/auth/basic/password", checkPasswordController);
app.get("/auth/basic/header", signUpController_Test_UA);

export { app as basicAuthRoute };

import Elysia, { t } from "elysia";
import { updateVerifiedControllerTesting, verifyOTPController } from "../controllers/(basicAuth)/verifyOTP.controller";

const app = new Elysia();



app.post("/auth/basic/verify",verifyOTPController,{body:t.Object({
    verification_key:t.String(),
    otp:t.Number()
})})

export {app as verifyOTP_Route}


app.post("/auth/basic/isVerified",updateVerifiedControllerTesting,{body:t.Object({
    email:t.String()
})})
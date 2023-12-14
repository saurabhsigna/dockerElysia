import Elysia, { t } from "elysia";
import {signUpController, signUpControllerTesting, signupController_TestHash} from '../controllers/(basicAuth)/signup.controller'
const app = new Elysia()




app.post("/auth/basic",signUpController,{body:t.Object({
    nickName:t.String({minLength:4}),
    email:t.String(),
    password:t.String()
})
})

app.post('/auth/basic/testing',signupController_TestHash,{body:t.Object({
    userId:t.Number()
})})

export {app as basicAuthRoute}
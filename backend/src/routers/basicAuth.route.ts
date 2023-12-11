import Elysia, { t } from "elysia";
import {signUpController} from '../controllers/(basicAuth)/signup.controller'
const app = new Elysia()


app.post("/auth/basic",signUpController,{body:t.Object({
    nickName:t.String({minLength:4}),
    email:t.String(),
    password:t.String()
})})

export {app as basicAuthRoute}
import { password as bunPassword } from "bun";
 export async function createNewUser(nickName:string,email:string,password:string){
const hashed =await bunPassword?.hash(password)
    // const bcryptHash = await Bun.password.hash(password, {
    //     algorithm: "bcrypt",
    //     cost: 4, // number between 4-31
    //   });
    console.log(hashed)
    return hashed
}
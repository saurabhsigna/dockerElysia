
class httpError {
    statusCode:number
    message?:string
    set:any

    constructor(statusCode:number,message:string|undefined,set:any){
        this.message = message
        this.statusCode= statusCode
        this.set = set
    }

    default(){
        this.set.status = this.statusCode
        throw Error(this.message)
    }
  
}



 

const customError = (statusCode:number, set:any,message?:string)=>{
try {
    // throw new httpError(statusCode,message)
    throw new Error(message)
} catch (error:any) {
    console.log("message is ",error?.message)
     let errorCode =  statusCode? statusCode : 500
     let errorMessage = message ? message:"error"
     set.status = errorCode
     return errorMessage
}
}

export {customError,httpError}
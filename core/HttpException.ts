class HttpException extends Error{

    protected errorCode:Number;
    protected code:Number;
    protected msg:string;

    /**
     * @param errorCode: Custom code
     * @param code: http status code
     * @param msg: Message returned
     */
    constructor(msg='server different',errorCode=10000,code=400){
        super()
        this.errorCode = errorCode,
        this.code = code,
        this.msg = msg
    }
}

class ParameterException extends HttpException{
    
    /**
     * @param errorCode: Custom code
     * @param code: http status code
     * @param msg: Message returned
     */
    constructor(msg?:string,errorCode?:Number){
        super()
        this.code = 400
        this.msg = msg || 'Parameter error'
        this.errorCode = errorCode || 10000
    }
}

class Success extends HttpException{

    /**
     * @param errorCode: Custom code
     * @param code: http status code
     * @param msg: Message returned
     */
    constructor(msg?:string,errorCode?:Number){
        super()
        this.code = 200
        this.msg = msg || 'ok'
        this.errorCode = errorCode || 0
    }
}

class NotFound extends HttpException{
    /**
     * @param errorCode: Custom code
     * @param code: http status code
     * @param msg: Message returned
     */
    constructor(msg?:string,errorCode?:Number){
        super()
        this.code = 404
        this.msg = msg || 'Resource not found'
        this.errorCode = errorCode || 10000
    }
}

class AuthFailed extends HttpException{
    /**
     * @param errorCode: Custom code
     * @param code: http status code
     * @param msg: Message returned
     */
    constructor(msg?:string,errorCode?:Number){
        super()
        this.code = 401
        this.msg = msg || 'Authorization failed'
        this.errorCode = errorCode || 10004
    }
}

class Forbidden extends HttpException {
    /**
     * @param errorCode: Custom code
     * @param code: http status code
     * @param msg: Message returned
     */
    constructor(msg?:string,errorCode?:Number){
        super()
        this.code = 403
        this.msg = msg || 'access to the requested resource denied'
        this.errorCode = errorCode || 10005
    }
}

export {
    HttpException,
    ParameterException,
    Success,
    NotFound,
    AuthFailed,
    Forbidden
}
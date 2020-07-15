class HttpException extends Error{

    protected errorCode:Number;
    protected code:Number;
    protected msg:string;

    /**
     * @param errorCode: 自定义code码
     * @param code: http状态码
     * @param msg: 返回的消息
     */
    constructor(msg='服务器异常',errorCode=10000,code=400){
        super()
        this.errorCode = errorCode,
        this.code = code,
        this.msg = msg
    }
}

class ParameterException extends HttpException{
    
    /**
     * @param errorCode: 自定义code码
     * @param code: http状态码
     * @param msg: 返回的消息
     */
    constructor(msg?:string,errorCode?:Number){
        super()
        this.code = 400
        this.msg = msg || '参数错误'
        this.errorCode = errorCode || 10000
    }
}

class Success extends HttpException{

    /**
     * @param errorCode: 自定义code码
     * @param code: http状态码
     * @param msg: 返回的消息
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
     * @param errorCode: 自定义code码
     * @param code: http状态码
     * @param msg: 返回的消息
     */
    constructor(msg?:string,errorCode?:Number){
        super()
        this.code = 404
        this.msg = msg || '资源未找到'
        this.errorCode = errorCode || 10000
    }
}

class AuthFailed extends HttpException{
    /**
     * @param errorCode: 自定义code码
     * @param code: http状态码
     * @param msg: 返回的消息
     */
    constructor(msg?:string,errorCode?:Number){
        super()
        this.code = 401
        this.msg = msg || '授权失败'
        this.errorCode = errorCode || 10004
    }
}

class Forbidden extends HttpException {
    /**
     * @param errorCode: 自定义code码
     * @param code: http状态码
     * @param msg: 返回的消息
     */
    constructor(msg?:string,errorCode?:Number){
        super()
        this.code = 403
        this.msg = msg || '禁止访问'
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
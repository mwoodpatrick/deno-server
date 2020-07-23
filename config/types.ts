
/**
 * @param dbName: Database name
 * @param host: Database address
 * @param port: Database port number
 * @param user: database username
 * @param password: Database password
 */
interface mysql{
    dbName:string,
    host:string,
    port:Number,
    user:string,
    password:string
}

interface security{
    secretKey:string,
    expiresIn:Number
}

interface configs{
    database:mysql,
    security:security
}

export {
    configs
}
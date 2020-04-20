# Authentication Endpoints

## Base URL : 'http://157.245.82.193/auth/'

- *POST* `/login`
```js
{
    email : required, email, string
    password : required, string,
    token : optional, string
    deviceId : required, optional, (required if mobile)
}
```


check if response exist with status, 

when 200 means success and logged in and the response has data
when 400 means error means not found and no data in response

- *POST* `/signup`
```js
{
    fullname : string, required,
    email : string, email, required,
    phone : string, required,
    pictureURL : string, uri, optional,
    address : string, optional,
    password : string, required,
    token : string, optional,
    deviceId : string, optional,
    rcountry:string required
}
```

### Verification

#### Base URL : '/verification'

- *GET* `/:user/:token/:from`
    Gets new verification code for the user


### Forgot Password

#### Base URL : '/password'

- *POST* `/token`
    fetches a token that a user will use to reset his/her password
```js
{
    user : string, [email, OR, phone number], required
    channel : string, [sms, OR, email],required//how code will get to user
}
```

- *GET* `/token/:token/verify`
    Verifies a password request token: checks if it is valid

- *POST* `/reset/:token`
```js
{
    password: string, required
}
```

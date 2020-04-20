# User Endpoints

## Base URL : 'http://157.245.82.193/users/'

- *GET* `/`
    ```js
        {
            search : String,
            limit : number, default(30),
            offset : number, default(0)
        }
    ```
- *GET* `/:user`
    Gets a user by ID

- *PUT* `/:user`
    ```js
    {
        fullname : string, ,
        email : string, email,
        phone : string, ,
        pictureURL : string, uri, optional
        address : string, optional
        password : string,
        token : string, optional
    }
    ```
-  *DELETE* `/:user`
    Deletes a user account. Action is irreversible.

### BASE URL `/:user/sizes`

 - *POST* `/`
  ```js
  {

  }
  ```

- *GET* `/`
    Gets all classes for a user

 - *DELETE* `/:size`
    Deletes a size

 - *PUT* `/:size`
    Updates a class


### BASE URL `/:user/gang/`

- *POST* `/:gang`
    Add the user 'gang' to 'user' gang

- *DELETE* `/:gang`
    Removes the user 'gang' from 'user' gang

- *GET* `/`
    Gets every user in 'user's gang. 
    using `?ganged` returns all users that have ganged the user
    params
    ```js
    {
      search : String,
      limit : Number, positive
      skip : Number,
      ganged
    }
    ```
    
    

# Classes Endpoints

## Base URL : 'http://157.245.82.193/product/'



- *GET* `/`

    returns all Products unfiltered
    ```js
    {
        name: String, required,
        photos: Array, required,
        videos: Array required,
        region: String, required,
        amount: Number, required,
        currency: String, required,
        coverPhoto: String, required,
        creator: String, required,
        coverVideo: String, required,
        price: Number, required,
        category: String, required,
        featured: String, required,
        tradexplorer: Boolean required,
        views: String, required,
        approved: String, required,
        published: String, required,
        deleted: String, required,
        description: String, required,
        keywords: Array, required,
        popular: Boolean, required,
        special: Boolean, required,
        canExchange: Boolean, required
    }
    ```

- *POST* `/`

    creates a new Product
    ```js
      {
        "cid":1,
        "uid":17,
        "name":"iphone 6S",
        "photos":[],
        "videos":[],
        "region":"Abuja",
        "amount":40000,
        "currency":"Naira",
        "creator":"Adeojo Emmanuel",
        "price":40000,
        "category":1,
        "featured":false,
        "tradexplorer":true,
        "approved":true,
        "published":true,
        "description":"iphone 6s working well with little dent at the side",
        "keywords":["iphone", "ios", "apple"],
        "canExchange":false
      }
    ```


- *PUT* `/:Product` 

    updates a Product
    ```js
    {
      cid:joi.number().required(),
      uid:joi.number().required(),
      name:joi.string().required(),
      photos:joi.array().items(joi.string().alphanum().length(24)).default([]).optional(),
      videos:joi.array().items(joi.string().alphanum().length(24)).default([]).optional(),
      region:joi.string(),
      amount:joi.string().required(),
      currency:joi.string(),
      coverPhoto:joi.string(),
      creator:joi.string().alphanum().length(24).required(),
      coverVideo:joi.string(),
      price:joi.string(),
      category:joi.string().lowercase(),
      featured:joi.string(),
      tradexplorer:joi.string(),
      views:joi.number(),
      approved:joi.string(),
      published:joi.string(),
      deleted:joi.string(),
      description:joi.string(),
      keywords:joi.string(),
      popular:joi.string(),
      special:joi.string(),
      canExchange:joi.string()
    }
    ```


- *DELETE* `/:product`

    deletes a class



##### Base URL `/:product/comment/`

- *POST* `/`

    creates a new comment

    ```js
    {
        user : ID, required,    
        comment : String
    }
    ```


- *GET* `/`

    gets comments for a product


- *PUT* `/:product/comments/`

    updates a comment, if the user updating the comment is no the one that created it, it returns null


##### Base URL `/:product/rating/`

- *POST* `/`

    creates a new comment

    ```js
    {
        user : ID, required,
        review : String
        rating : Number
    }
    ```


- *GET* `/`

    gets rating for a product


- *PUT* `/:product/ratings/`

    updates a comment, if the user updating the comment is no the one that created it, it returns null

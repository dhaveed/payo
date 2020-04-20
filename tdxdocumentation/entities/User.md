# Blueprint for users on Tradexplorer

```js
{
    email : { type : String, lowercase : true, unique : true, required : true },
    password : { type : String, select : false },
    phone : { type : String , required: true, unique : true},
    fullname : { type : String},
    gender : { type : String, lowercase : true, enum : ['male', 'female']},
    address: { type : String },
    dob : { type : String},
    backgroundPicture : String,
    verification : {
      status : {type: Boolean, 'default' : false},
      number : {type: Number},
      date : {type: Date}
    },
    tailor : {type : tailorSchema, 'default' : null},
    seller : {type : sellerSchema, 'default' : null},
    admin : {type : adminSchema, 'default' : null}
    gang : [gangSchema],
    ganged : [gangSchema],
    country : {
      residence : {type: String},//must align with those countries in DB
      origin : {type: String}//must align with those countries in DB
    },
    alternate_phone : String,
    account : {
      name : String,
      number : Number,
      bank : String,
      country : String //must align with those countries in DB
    },
    pictureURL : String,
    sizes : [{
        date : { type: Date, 'default' : Date.now},
        name : {type: String, required: true},
        description: String,
        measurement : {}
    }],
	bio : String,
    created : {type : Date, 'default': Date.now}
}
```
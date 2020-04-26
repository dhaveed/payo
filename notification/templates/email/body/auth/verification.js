module.exports = (user) => `
  <html>
  <head>
      <style>
          h1{
            text-align : center;
          }
          body{
            background : #ccc;
            padding : 30px;
          }
          main{
            background : white;
            color : black;
          }
      </style>
  </head>
    <body>
      <main>
        <h1>Tailorgang verification</h1>
        <p>${user.fullname}, you are almost done, just one more step. use this number to complete your verification.</p>
        <h1 style="font-size: 100px">${user.verification.number}</h1>
      </main>
    </body>
  </html>
`

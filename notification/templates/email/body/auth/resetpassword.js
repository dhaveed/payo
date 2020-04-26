

module.exports = (user, token) => `
    Dear ${user.fullname},
    <h1>Reset Your Tailorgang Password</h1>
    <h3 style="text-align : center">${token}</h3>
`

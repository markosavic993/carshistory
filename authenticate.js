const passport = require("passport")
const jwt = require("jsonwebtoken")
const dev = process.env.NODE_ENV !== "production"
exports.COOKIE_OPTIONS = {
  httpOnly: true,
  // Since localhost is not having https protocol,
  // secure cookies do not work correctly (in postman)
  secure: !dev,
  signed: true,
  maxAge: eval((60 * 60 * 24 * 30).toString()) * 1000,
  sameSite: 'none',
}
exports.getToken = user => {
  return jwt.sign(user, 'super_special_jwt_secret', {
    expiresIn: eval((60*15).toString()),
  })
}
exports.getRefreshToken = user => {
  const refreshToken = jwt.sign(user, 'super_special_refresh_token_secret', {
    expiresIn: eval((60 * 60 * 24 * 30).toString()),
  })
  return refreshToken
}
exports.verifyUser = passport.authenticate("jwt", { session: false })

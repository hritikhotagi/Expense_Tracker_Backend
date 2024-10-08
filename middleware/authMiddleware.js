const { auth } = require('express-oauth2-jwt-bearer');

// Middleware to validate JWT tokens from Auth0
const checkJwt = auth({
  audience: process.env.AUTH0_AUDIENCE,
  issuerBaseURL: process.env.AUTH0_DOMAIN,
  jwksUri: `${process.env.AUTH0_DOMAIN}.well-known/jwks.json`, // Explicitly set JWKS URI
  algorithms: ['RS256'],
});

const extractUserId = (req, res, next) => {
    if (!req.auth || !req.auth.payload) {
      return res.status(401).json({ message: 'Unauthorized - Missing token payload' });
    }
  
    req.user = { sub: req.auth.payload.sub }; // Extract the 'sub' property from the token payload
    next();
  };
  
module.exports = { checkJwt, extractUserId };
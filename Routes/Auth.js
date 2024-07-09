const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const Person = require('../Models/person');

passport.use(new LocalStrategy(async (username, password, done) => {
    try {
        const user = await Person.findOne({ username: username });

        if (!user) {
            return done(null, false, { message: 'Incorrect username.' });
        }

        const isPasswordValid = await user.comparePassword(password);

        if (!isPasswordValid) {
            return done(null, false, { message: 'Incorrect password.' });
        }

        return done(null, user); // Authentication succeeded
    } catch (err) {
        return done(err); // Internal error
    }
}));

module.exports = passport;

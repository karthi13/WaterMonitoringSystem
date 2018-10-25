const bCrypt = require('bcryptjs');

module.exports = (passport, user) => {
    
    const User = user;
    const LocalStrategy = require('passport-local').Strategy;

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser((id, done) => {
        User.findById(id).then(user => {
            if (user) {
                done(null, user.get());
            } else {
                done(user.errors, null);
            }
        });
    });

    passport.use(
        'local-signup',
        new LocalStrategy(
            {
                usernameField: 'email',
                passwordField: 'password',
                passReqToCallback: true // allows us to pass back the entire request to the callback
            },

            
            function (req, email, password, done) {
                var generateHash = password => {
                    return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
                };

                User.findOne({ where: { email: email } }).then(user => {
                    if (user) {
                        return done(null, false, {
                            message: 'That email is already taken'
                        });
                    } else {
                        console.log('the email is not take and generating hash');

                        var userPassword = generateHash(password);
                        
                        var data = {
                            email: email,
                            password: userPassword,
                            first_name : req.body.first_name,
                            last_name : req.body.last_name,
                            phone_num : req.body.phone_num,
                            role : req.body.role,
                            house_number:req.body.house_number,
                            street:req.body.street ,
                            postcode:req.body.postcode,
                            locality_id : req.body.locality_id
                        };

                        User.create(data).then((newUser, created) => {
                            if (!newUser) {
                                return done(null, false);
                            }

                            if (newUser) {
                                return done(null, newUser);
                            }
                        });
                    }
                });
            }
        )
    );

    //LOCAL SIGNIN
    passport.use(
        'local-signin',
        new LocalStrategy(
            {
                // by default, local strategy uses username and password, we will override with email
                usernameField: 'email',
                passwordField: 'password',
                passReqToCallback: true // allows us to pass back the entire request to the callback
            },

            function (req, email, password, done) {
                var User = user;

                var isValidPassword = (userpass, password) => {
                    return bCrypt.compareSync(password, userpass);
                };

                User.findOne({ where: { email: email } })
                    .then(user => {
                        if (!user) {
                            return done(null, false, { message: 'Email does not exist' });
                        }

                        if (!isValidPassword(user.password, password)) {
                            return done(null, false, { message: 'Incorrect password.' });
                        }

                        var userinfo = user.get();
                        console.log(userinfo);
                        return done(null, userinfo);
                    })
                    .catch(err => {
                        console.log('Error:', err);

                        return done(null, false, {
                            message: 'Something went wrong with your Signin'
                        });
                    });
            }
        )
    );
};
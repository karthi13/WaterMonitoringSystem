module.exports = (app, passport) => {

    app.post(
      '/registerUser',
      passport.authenticate('local-signup', {
        successRedirect: '/api/home',
        failureRedirect: '/api/registerUser'
      })
    );
  
    app.get('/home', isLoggedIn, (req, res) => {
      res.render('home');
    });
  
    app.get('/logout', (req, res) => {
      req.session.destroy(err => {
        res.redirect('/');
      });
    });
  
    app.post(
      '/signin',
      passport.authenticate('local-signin', {
        successRedirect: '/home',
        failureRedirect: '/signin'
      })
    );
  
    function isLoggedIn(req, res, next) {
      if (req.isAuthenticated()) return next();
  
      res.redirect('/signin');
    }
  };
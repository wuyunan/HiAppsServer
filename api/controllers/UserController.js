/**
 * UserController
 *
 * @description :: Server-side logic for managing Users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  'new': function(req, res){
    //res.locals.flash = _.clone(req.session.flash);
    res.view();
    //req.session.flash = {};
  },

  create: function (req, res, next) {
    User.create(req.params.all(), function userCreated(err,user){
      //if(err) return next(err);

      if(err){
        console.log(err);
        req.session.flash = {
          err: err
        }
        //if error redirect back to sign-up page
        return res.redirect('/user/new');
      }
      //res.json(user);
      //req.session.flash = {};
      res.redirect('/user/show/'+user.id);
    });
  },
  //render the profile view (e.g. /views/show.ejs)
  show: function(req, res, next){
    User.findOne(req.param('id'), function foundUser(err, user){
      if(err) return next(err);
      if(!user) return next();
      res.view({
        user: user
      });
    });
  }
};


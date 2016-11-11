/**
 * CategoryController
 *
 * @description :: Server-side logic for managing categories
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  /**
   *
   * @param req
   * @param res
   * @param next
   */
  index: function (req, res, next) {
    console.log(new Date());
    console.log(req.session.authenticated);
    //Get an array of all users in the Category collection(e.g. table)
    Category.find(function foundCategories(err, categories) {
      if (err) return (err);
      //pass the array down to the /views/index.ejs page
      res.view({
        categories: categories
      });
    });
  },
  'new': function (req, res) {
    //res.locals.flash = _.clone(req.session.flash);
    res.view();
    //req.session.flash = {};
  },


  create: function (req, res, next) {

    var categoryObj = {
      title: req.param('title'),
      icon: req.param('icon')
    }
    Category.create(categoryObj, function categoryCreated(err, category) {
      //if(err) return next(err);

      if (err) {
        console.log(err);
        req.session.flash = {
          err: err
        }
        //if error redirect back to sign-up page
        return res.redirect('/category/new');
      }
      //res.json(category);
      //req.session.flash = {};


      res.redirect('/category/show/' + category.id);
    });
  },

  //render the profile view (e.g. /views/show.ejs)
  show: function (req, res, next) {
    Category.findOne(req.param('id'), function foundCategory(err, category) {
      if (err) return next(err);
      if (!category) return next();
      res.view({
        category: category
      });
    });
  },

  //render the edit view (e.g. /views/edit.ejs)
  edit: function (req, res, next) {

    //Find the category from the id passed in via params
    Category.findOne(req.param('id'), function foundCategory(err, category) {
      if (err) return next(err);
      if (!category) return next('Category doesn\'t exist.');

      res.view({
        category: category
      });
    });
  },

  /**
   * process the info from edit view
   * @param req
   * @param res
   * @param next
   */
  update: function (req, res, next) {

    var categoryObj = {
      title: req.param('title'),
      icon: req.param('icon')

    }


    Category.update(req.param('id'), categoryObj, function categoryUpdated(err) {
      if (err) {
        return res.redirect('/category/edit/' + req.param('id'));
      }

      res.redirect('/category/show/' + req.param('id'));
    });
  },

  /**
   *
   * @param req
   * @param res
   * @param next
   */
  destroy: function (req, res, next) {
    console.log("Hi, destroy");
    Category.findOne(req.param('id'), function foundCategory(err, category) {
      if (err) return next(err);
      if (!category) return next('Category doesn\'t exist.');

      Category.destroy(req.param('id'), function categoryDestroyed(err) {
        if (err) return next(err);
      });

      res.redirect('/category');

    });
  },
};


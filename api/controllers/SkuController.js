/**
 * SkuController
 *
 * @description :: Server-side logic for managing skus
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
        //Get an array of all users in the Sku collection(e.g. table)
        Sku.find(function foundSkus(err, skus) {
            if (err) return (err);
            //pass the array down to the /views/index.ejs page
            res.view({
                skus: skus
            });
        });
    },
    'new': function (req, res) {
        //res.locals.flash = _.clone(req.session.flash);
        res.view();
        //req.session.flash = {};
    },


    create: function (req, res, next) {

        var skuObj = {
            name: req.param('name'),
            title: req.param('title'),
            desc: req.param('desc'),
            info: req.param('info')
        }
        Sku.create(skuObj, function skuCreated(err, sku) {
            //if(err) return next(err);

            if (err) {
                console.log(err);
                req.session.flash = {
                    err: err
                }
                //if error redirect back to sign-up page
                return res.redirect('/sku/new');
            }
            //res.json(sku);
            //req.session.flash = {};


            res.redirect('/sku/show/' + sku.id);
        });
    },

    //render the profile view (e.g. /views/show.ejs)
    show: function (req, res, next) {
        Sku.findOne(req.param('id'), function foundSku(err, sku) {
            if (err) return next(err);
            if (!sku) return next();
            res.view({
                sku: sku
            });
        });
    },

    //render the edit view (e.g. /views/edit.ejs)
    edit: function (req, res, next) {

        //Find the sku from the id passed in via params
        Sku.findOne(req.param('id'), function foundSku(err, sku) {
            if (err) return next(err);
            if (!sku) return next('Sku doesn\'t exist.');

            res.view({
                sku: sku
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

        var skuObj = {
            name: req.param('name'),
            title: req.param('title'),
            desc: req.param('desc'),
            info: req.param('info')

        }


        Sku.update(req.param('id'), skuObj, function skuUpdated(err) {
            if (err) {
                return res.redirect('/sku/edit/' + req.param('id'));
            }

            res.redirect('/sku/show/' + req.param('id'));
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
        Sku.findOne(req.param('id'), function foundSku(err, sku) {
            if (err) return next(err);
            if (!sku) return next('Sku doesn\'t exist.');

            Sku.destroy(req.param('id'), function skuDestroyed(err) {
                if (err) return next(err);
            });

            res.redirect('/sku');

        });
    },
};


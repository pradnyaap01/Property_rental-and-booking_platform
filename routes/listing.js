const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
// const ExpressError = require("../utils/ExpressError.js");
// const {listingSchema} = require("../schema.js");
const Listing =require("../models/listing.js");
const {isLoggedIn,isOwner,validateListing } = require("../middleware.js");
const listingController = require("../controllers/listings.js");
const multer  = require('multer');
const {storage} = require("../cloudConfig.js");
const upload = multer({ storage });

router
   .route("/")
   .get(wrapAsync(listingController.index))  //INDEX ROUTE
   .post(                                    //CREATE ROUTE
    isLoggedIn,
    validateListing,
    upload.single('listing[image]'),
    wrapAsync(listingController.createListings));


//NEW ROUTE --> Adding new listing
router.get("/new",isLoggedIn, listingController.renderNewform);


router
    .route("/:id")
    .get(wrapAsync(listingController.showListings))  //SHOW ROUTE
    .put(                                            //UPDATE ROUTE
    isLoggedIn,
    isOwner,
    upload.single('listing[image]'),
    validateListing,
    wrapAsync(listingController.updateListings))
    .delete(                                         //DELETE ROUTE
    isLoggedIn,
    isOwner, 
    wrapAsync(listingController.destroyListing));


//EDIT ROUTE
router.get("/:id/edit",
    isLoggedIn,
    isOwner,
    wrapAsync(listingController.renderEditForm));






module.exports = router;
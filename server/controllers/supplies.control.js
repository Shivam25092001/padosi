import supplyItem from "../models/supplyModel.js";
import ErrorHandler from "../utils/errorhandler.js";
import asyncCatch from "../middleware/catchAsync.js";
import Apifeatures from "../utils/apifeatures.js";

//Create Supply Item
const createSupply = asyncCatch(async (req,res)=>{
    console.log(req.user.id);
    
    req.body.owner = { "owner_id" : req.user.id};
    const item =  await supplyItem.create(req.body);

    res.status(201).json({
        success:true,
        item
    });

    // const item = new supplyItem(req.body);
    // await item.save().then(()=>{
    //   res.status(201).json({
    //         success:true,
    //         item
    //     });
    // }).catch(
    //   (err) => {
    //     res.status(500).json({error : `${err}`});
    //     console.log(err);
    //   }
    // );
});

//Get all supply items
const getSupplies = asyncCatch(async (req, res, next)=>{

  const suppliesperPage = 9;
  const supplycount = await supplyItem.countDocuments();
  const apiRes = new Apifeatures(supplyItem.find(), req.query).search().filter().pagination(suppliesperPage);  
  const supplies = await apiRes.query;
  
  //to find supplies count length
  const apiRes2 = new Apifeatures(supplyItem.find(), req.query).search().filter();
  const filteredSupply = await apiRes2.query;
  const filteredSuppliesCount = filteredSupply.length;

  res.status(200).json(
    {
      success: true, 
      supplies,
      supplycount,
      suppliesperPage,
      filteredSuppliesCount
    }
  );
});

//Get details of a specific supply
const getDetails = asyncCatch(async (req, res, next) => {

  const item = await supplyItem.findById(req.params.id);

  if(!item){
    return next(new ErrorHandler("Supply not found", 404));
  }

  return res.status(200).json({
    success: true,
    item
  })
});


//Update supply item
const updateSupply = asyncCatch(async (req, res, next)=>{
  let item  = await supplyItem.findById(req.params.id);

  if(!item){
    return next(new ErrorHandler("Supply item not found", 404));
  }

  item = await supplyItem.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify:false
  });

  res.status(200).json({
    success: true,
    item
  });
});

//delete a supply
const deleteSupply = asyncCatch(async (req, res, next)=>{
  let item  = await supplyItem.findById(req.params.id);

  if(!item){
    return next(new ErrorHandler("Supply item not found", 404));
  }

  await item.remove();

  res.status(200).json({
    success : true,
    message : "Supply removed successfully"
  })
});


// Create or update Review
const createSupplyReview = asyncCatch(async(req, res, next) => {
  const {rating, comment, supplyId} = req.body;

  const review = {
    user: req.user._id,
    name: req.user.name,
    rating: Number(rating),
    comment
  };

  const supply = await supplyItem.findById(supplyId);

  const isReviewed = supply.reviews.find(rev => rev.user.toString() === req.user.id.toString());
  if(isReviewed){
    supply.reviews.forEach( rev => {
      if(rev.user.toString() === req.user.id.toString())
        rev.rating  = rating,
        rev.comment = comment
    })
  }
  else{
    supply.reviews.push(review);
    supply.numOfReviews = supply.reviews.length;
  }

  let sum = 0;
  supply.reviews.forEach(rev => {
    sum += rev.rating;
  });
  supply.rating = sum / supply.reviews.length;

  await supply.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true
  });
});


//Get all reviews of a supply
const getSupplyReviews = asyncCatch(async(req, res, next) => {
  const supply = await supplyItem.findById(req.query.supplyId);

  if(!supply)
    return next(new ErrorHandler(" Supply not found.", 404));

  res.status(200).json({
    success: true,
    reviews: supply.reviews,
  });
});

//Delete Review
const deleteReview = asyncCatch( async (req, res, next) => {
  const supply = await supplyItem.findById(req.query.supplyId);

  if(!supply)
    return next(new ErrorHandler(" Supply not found.", 404));

  const reviews = supply.reviews.filter(
    (rev) => rev._id.toString() !== req.query.id.toString()
  );

  let sum = 0;
  reviews.forEach(rev => {
    sum += rev.rating;
  });

  const rating = reviews.length >0 ? (sum / reviews.length) : 0;

  const numOfReviews = reviews.length;

  await supplyItem.findByIdAndUpdate(req.query.supplyId, {rating, reviews, numOfReviews}, {
    new: true,
    runValidators: true,
    useFindAndModify: false
  });

  res.status(200).json({
    success: true
  });
})

export {createSupply, getSupplies, updateSupply, deleteSupply, getDetails, createSupplyReview, getSupplyReviews, deleteReview};
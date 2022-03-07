import supplyItem from "../models/supplyModel.js";
import ErrorHandler from "../utils/errorhandler.js";
import asyncCatch from "../middleware/catchAsync.js";
import Apifeatures from "../utils/apifeatures.js";

//Create Supply Item
const createSupply = asyncCatch(async (req,res)=>{
    console.log(req.user.id);
    
    req.body.owner = { "owner_id" : req.user.id};
    console.log(req.body.owner);
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
const getSupplies = asyncCatch(async (req, res)=>{

  const suppliesperPage = 5;
  const supplycount = await supplyItem.countDocuments();

  const apiRes = new Apifeatures(supplyItem.find(), req.query).search().filter().pagination(suppliesperPage);
    
  const supplies = await apiRes.query;

  res.status(200).json(
    {
      success: true, 
      supplies,
      supplycount
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

export {createSupply, getSupplies, updateSupply, deleteSupply, getDetails};
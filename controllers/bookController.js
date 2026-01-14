const bookModel = require("../models/bookModel");

exports.AddBookController = async (req, res) => {
  console.log(req.user);
  try {
    let {
      title,
      author,
      noOfPages,
      imgURL,
      price,
      discountPrice,
      abstract,
      publisher,
      language,
      ISBN,
      category,
      // uploadedImages:files that are uploaded willy only be available at req.files
    } = req.body;
    let imageArray = [];
    req.files.forEach((eachFile) => imageArray.push(eachFile.filename));

    //userMail comes from token,we will decode
    // the token in the middle ware and updates the request(add a new key named user and its values as email)
    let userMail = req.user;
    if (
      title &&
      author &&
      noOfPages &&
      imgURL &&
      price &&
      abstract &&
      publisher &&
      language &&
      ISBN &&
      category &&
      imageArray
    ) {
      //proceed to add data
      let existingBook = await bookModel.findOne({ title: title });
      if (existingBook) {
        //error
        //conflit
        res
          .status(409)
          .json({ message: "Book with this title is already added" });
      } else {
        //procedd to add data
        let newBook = new bookModel({
          title,
          author,
          noOfPages,
          imgURL,
          price,
          discountPrice,
          abstract,
          publisher,
          language,
          ISBN,
          category,
          uploadedImages: imageArray,
          userMail,
        });
        await newBook.save();
        res.status(201).json({ message: "Sucessfully Added", newBook });
      }
    } else {
      res.status(400).json({ message: "Fields are not filled" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong in server" });
  }
};

exports.getAllBookController=async (req,res) => {
  try {
    let searchKey=req.query.search
    let query={
      title:{
        $regex:searchKey,
        $options:"i",
      }
    }



    let bookData=await bookModel.find(query)
    res.status(200).json({message:'Data fetched successfully',bookData})
    
  } catch (error) {
    console.log(error)
    res.status(500).json({message:'Something wrong in server'})
  }
}

exports.getLimitedBooks=async (req,res) => {
  try {
    let limitedData=await bookModel.find().limit(6)
    res.status(200).json({message:'Data fetched Successfully',limitedData})
  } catch (error) {
    console.log(error)
    res.status(500).json({message:'something went wrong in server'})
  }
}

exports.getSingleBook=async (req,res) => {
  try {
    //send through url
    let id=req.params.id
    let singleBook=await bookModel.findById({_id:id})
    res.status(200).json({message:'',singleBook})

    
  } catch (error) {
    console.log(error)
    res.status(500).json({message:'something went wrong in server'})
  }
}
const enquiryModel = require('../../Model/userEnquiry.model');

let enquiryInsert = async (req, resp) => {
  let { name, email, phone, message } = req.body;
  let enquiry = new enquiryModel({
    name: name,
    email: email,
    phone: phone,
    message: message,
  });
  enquiry
    .save()
    .then(() => {
      resp.send({
        status: 1,
        message: 'Enquiry inserted successfully',
      });
    })
    .catch((err) => {
      resp.send({
        status: 0,
        message: 'Error while saving the enquiry',
        err,
      });
    });
};
let enquiryList = async (req, resp) => {
  let enquiryList = await enquiryModel.find();
  resp.status(200).json({
    status: 1,
    message: 'Enquiry List',
    data: enquiryList,
  });
};

let enquirySingleRow = async (req, res) => {
  let enId = req.params.id;
  let enquiry = await enquiryModel.findOne({ _id: enId });
  res.send({
    status: 1,
    enquiry,
  });
};

let enquiryUpdate = async (req, resp) => {
  let enquiryId = req.params.id;
  let { name, email, phone, message } = req.body;
  let updateObj = {
    name,
    email,
    phone,
    message,
  };

  let updateResponse = await enquiryModel.updateOne({ _id: enquiryId }, updateObj);

  resp.send({
    status: 1,
    message: 'Enquiry updated successfully',
    id: enquiryId,
    updateResponse,
  });
};
let enquiryDelete = async (req, resp) => {
  let enquiryId = req.params.id;
  let deleteEnquiry = await enquiryModel.deleteOne({ _id: enquiryId });
  resp.send({
    status: 1,
    message: 'Enquiry deleted successfully',
    id: enquiryId,
    delResponse: deleteEnquiry,
  });
};
module.exports = { enquiryInsert, enquiryList, enquiryUpdate, enquiryDelete, enquirySingleRow };

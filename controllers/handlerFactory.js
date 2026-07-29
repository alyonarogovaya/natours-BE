const APIFeatures = require('../utils/apiFeatures');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.getAll = (Model) =>
  catchAsync(async (req, res, next) => {
    let filter = {};
    if (req.params.tourId) {
      filter = { tour: req.params.tourId };
    }

    const features = new APIFeatures(Model.find(filter), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();

    console.log(req.query);
    const documents = await features.query;

    res.status(200).json({
      status: 'success',
      results: documents.length,
      data: { data: documents },
    });
  });

exports.getOne = (Model, populateOptions) =>
  catchAsync(async (req, res, next) => {
    let query = Model.findById(req.params.id);

    if (populateOptions) {
      query = query.populate(populateOptions);
    }

    const document = await query;

    if (!document) {
      return next(new AppError('No document found with that id', 404));
    }

    res.status(200).json({
      status: 'success',
      data: { data: document },
    });
  });

exports.createOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const newDocument = await Model.create(req.body);
    res.status(201).json({
      status: 'success',
      data: {
        data: newDocument,
      },
    });
  });

exports.updateOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const document = await Model.findByIdAndUpdate(req.params.id, req.body, {
      returnDocument: 'after',
      runValidators: true,
    });

    if (!document) {
      return next(new AppError('No document found with that id', 404));
    }

    res.status(200).json({
      status: 'success',
      data: { data: document },
    });
  });

exports.deleteOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const document = await Model.findByIdAndDelete(req.params.id);
    if (!document) {
      return next(new AppError('No document found with that id', 404));
    }

    res.status(204).json({
      status: 'success',
      data: null,
    });
  });

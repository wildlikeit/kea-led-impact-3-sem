/**
 *  Based on E.Z.Moghaddam's (zaerymoghaddam@gmail.com) valid-express (https://github.com/moghaddam/valid-express).
 */

'use strict';

const Joi = require('joi');

/**
 * Default error formatter which given an errors array (returned by calling the validate method of underlying JOI
 * framework) and generates a JSON representation of errors in following format:
 *
 * {
 *      code: 'VALIDATION_ERROR',
 *      message: 'Invalid data specified at request',
 *      errors: [
 *          {
 *              "message":"username is required",
 *              "type":"any.required",
 *              "path":"username"
 *          },
 *          {
 *              "message":"password is required",
 *              "type":"any.required",
 *              "path":"password"
 *          },
 *          {
 *              "message":"address is required",
 *              "type":"any.required",
 *              "path":"address"
 *          }
 *      ]
 * }
 *
 * The application can override this method while initializing the valid-express module in order to generate error
 * results in appropriate format
 *
 * @param {Array} errors    Collection of error objects returned from calling validate method of underlying JOI
 * framework
 *
 * @return {Object} JSON object containing formatted error report
 */
const validExpressDefaultErrorFormatter = function(error) {
	return {
		code: 'VALIDATION_ERROR',
		message: 'Invalid data specified at request',
		errors: error.details.map(function(errorItem) {
			return {
				message: errorItem.message,
				type: errorItem.type,
				path: errorItem.path
			};
		})
	};
};

//  Default options that would be used as 'options' parameters while calling joi.validate function
let joiOptions = {
	abortEarly: false,
	convert: true,
	allowUnknown: false,
	language: {},
	presence: 'optional'
};

let validExpressOptions = {
	errorFormatter: validExpressDefaultErrorFormatter
};

/**
 * The validate function would be called in any url handler methods in order to validate parameters and generate
 *
 * @param schema    An object containing joi validation options and joi validation schema to validate data against it.
 *                  The provided schema option can specify the validation options as 'params', 'query' or 'body'
 *                  attribute to validate corresponding parameters against it. As an example, to validate parameters in 'query' and
 *                  'body' part of the request, the validate object should be called with a schema object like this:
 *
 *                  validate({
 *                      query: {
 *                          name: joi.string().required(),
 *                          family: joi.string().required()
 *                      },
 *                      body: {
 *                          age: joi.number().min(10).max(20).optional()
 *                      }
 *                  })
 * @param options    Also JOI validation options can be passed as another property named 'options'.
 * @returns {Function}  An express middleware function to validate request parameters
 */
const validate = function(schema, options) {

	//  Override those options specified when calling validate function. The caller can specify joi validation options
	//  when calling the validate method by passing a specific 'options' property as part of their schema definition
	let joiValidationOptions = joiOptions;
	let validExpressValidationOptions = validExpressOptions;

	if (options) {
		joiValidationOptions = Object.assign({}, joiOptions, options);

		validExpressValidationOptions = Object.assign({}, validExpressOptions, options);

		//  Remove non-joi options from joiOptions object to prevent "unknown key" error in joi
		if (joiValidationOptions['errorFormatter']) {
			delete joiValidationOptions['errorFormatter'];
		}
	}

	const validateExpressImpl = function(req, res, next) {
		const request = {
			body: req.body,
			query: req.query,
			params: req.params,
			headers: req.headers,
		};

		Joi.validate(request, schema, joiValidationOptions, function(err, results) {
			if (err) {
				return res.status(400).json(validExpressValidationOptions.errorFormatter(err));
			}

			req = Object.assign(req, results);
			return next();
		});
	};

	return validateExpressImpl;
};

module.exports = function(options) {
	if (options) {
		joiOptions = Object.assign({}, joiOptions, options);
		validExpressOptions = Object.assign({}, validExpressOptions, options);

		if (joiOptions['errorFormatter']) {
			//  Remove non-joi options from joiOptions object to prevent "unknown key" error in joi
			delete joiOptions['errorFormatter'];
		}
	}

	return {
		validate: validate
	};
};

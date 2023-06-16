const { body, validationResult } = require("express-validator");
exports.detailValidator = [
    body("detailName").isString().isLength({ min: 3 }).not().isEmpty(),
    body("imageDetailUrl").isString().isLength({ min: 3 }).not().isEmpty(),	
    body("product_id").isInt().optional(),
    
    (req, res, next)=>{
        const errors = validationResult(req);
        if (!errors.isEmpty())
          return res.status(400).json({ errors: errors.array() });   
        
        next()
    }
]


exports.detailUpdateValidator = [
    body("detailName").isString().isLength({ min: 3 }).optional,
    body("imageDetailUrl").isString().isLength({ min: 3 }).not().isEmpty(),
    body("product_id").isInt().optional(),
    
    (req, res, next)=>{
        const errors = validationResult(req);
        if (!errors.isEmpty())
          return res.status(400).json({ errors: errors.array() });   
        
        next()
    }
]
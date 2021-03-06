import { SimpleSchema } from 'meteor/aldeed:simple-schema';

import Products from './products.js';

// Manual form specific update method that knows how to unpack the single
// object we get from autoform.
export const upsert = new ValidatedMethod({

    // register the name
    name: 'Products.upsert',

    validate(args) {
        //console.log("Products.upsert.validate(args) ", args);

        Schemas.ProductSchema.clean(args.data, { removeEmptyStrings: false });

        var schemaContext = Schemas.ProductSchema.namedContext("ProductForm");
        schemaContext.validate(args.data);

        //console.log("validation succeeded");
    },

    // the actual database updating part
    // validate has already been run at this point
    run(args) {
        return Products.upsert(args.productId, {$set: args.data});
    }
});

export const remove = new ValidatedMethod({

    name: 'products.remove',

    validate: new SimpleSchema({
        productId: { type: String }
    }).validator(),

    run({ productId }) {
        //console.log("Products.methods.remove", productId);
        const product = Products.findOne(productId);

        // TODO: Security

        Products.remove(productId);
    }
});

// reducers allow you to 'slice' off a part of the single state object which
// lets you think about the domain in a smaller picture. You could use one
// reducer in a small app like this but in large apps this reducer could be
// several hundred lines. See store.jsx to see how these reducers get 'combined'
// into one single app state. We'll use two reducers, one for transient state
// that the UI uses (selected id,name) and one for data (coming from Mongo)

import Actions from './action_creators.jsx';
import { combineReducers } from 'redux';

Reducers = {};

let initialInterfaceState = {
    customerBeingEdited: {}
};

// helper to *copy* old state and merge new data with it
function merge(oldState, newState) {
    return _.extend({}, oldState, newState);
}

// these reducers *must* be pure to use time-travel dev-tools
// never directly mutate the `state` param, use merge instead

const userInterface = function userInterface(state = initialInterfaceState, action) {
    //console.log("reducers.userInterface  action:", {state, action});

    switch (action.type) {
        case 'SELECT_CUSTOMER':
            console.log("userInterface SELECT_CUSTOMER, action:", action);

            return merge(state, {
                customerBeingEdited: action.customer
            });
        case 'EDIT_CUSTOMER':
            console.log("userInterface EDIT_CUSTOMER, customer:", state.customerBeingEdited);

            // merge in our newly edited data
            return merge(state, { customerBeingEdited: action.updatedCustomer });
        default:
            return state;
    }
};

// using the ES6 default params instead of the manual check like above

const customer = function customer(state = {}, action) {
    console.log("reducers.customer", {state, action});

    switch (action.type) {
        case 'SAVE_CUSTOMER':
            // normally in redux you would update and merge state here but
            // since have minimongo to do that for us we'll just wait for the
            // flux-helper to fire a COLLECTION_CHANGED dispatch after the
            // increment update. Since we're doing that we'll just return the old
            // state to prevent the UI from re-rendering twice.
            return state;
        case 'CUSTOMERS_COLLECTION_CHANGED':
            console.log("reducers.customer CUSTOMERS_COLLECTION_CHANGED", {state, action});
            // we don't have to merge the single doc that changes since minimongo
            // keeps the entire cache for us. We'll just return the new minimongo state
            // We *could* also return another fetch if sorting wasn't so easy here
            //let docs = _.clone(action.collection); // clone to prevent mutating action!!
            //return docs[0]; //.sort((a,b) => b.score - a.score);
            //return _.clone(action.collection);
            return state;
        default:
            return state;
    }
};

const rootReducer = combineReducers({
    userInterface,
    customer
});

export default rootReducer;

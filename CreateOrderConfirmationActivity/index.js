
/* simple activity function */
module.exports = async function (context) {
    return {
        confirmed: true,
        dishes: context.bindings.dishes,
        payment: 'accepted'
    };
};
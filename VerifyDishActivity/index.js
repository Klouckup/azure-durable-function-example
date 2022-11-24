module.exports = async function (context) {
    console.log(context.bindings.orderItem);

    let inStock = true;

    
    // simulate out of stock for dish
    /*if (context.bindings.orderItem.name === 'Pizza') {
        return {
            error: 'Pizza is not in stock'
        };
    }*/
    
    const timeout = (ms) => {
        return new Promise(resolve => setTimeout(resolve, ms));
    };
    // waits 3 seconds to simulate a long running task
    await timeout(3000);

    return inStock;
};
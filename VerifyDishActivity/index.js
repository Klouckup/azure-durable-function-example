module.exports = async function (context) {
    console.log(context.bindings.orderItem);

    let inStock = true;

    
    
    if (context.bindings.orderItem.name === 'Pizza') {
        return {
            error: 'Pizza is not in stock'
        };
    }
    
    const timeout = (ms) => {
        return new Promise(resolve => setTimeout(resolve, ms));
    };

    await timeout(3000);

    return inStock;
};
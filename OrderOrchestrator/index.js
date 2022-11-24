const df = require("durable-functions");
const DateTime = require('luxon').DateTime;

module.exports = df.orchestrator(function* (context) {
    const outputs = [];
    const tasks = [];
    for (let i = 0; i < context.bindingData.input.items.length; i++) {

        // run in parallel
        tasks.push(context.df.callActivity("VerifyDishActivity", dish))
        // run in series
        //outputs.push(yield context.df.callActivity("VerifyDishActivity", context.bindingData.input.items[i]));
        console.log(context.bindingData.input.items[i]);
        console.log("dish finished");
    }

    // run in parallel
    output = yield context.df.Task.all(tasks)

    let errors = outputs.filter(x => x.error !== undefined);
    console.log(errors);
    if (errors.length > 0) {
        console.log("error");
        // TODO: send error email to user
        // simulation of running tasks, waits 10 seconds
        const deadline = DateTime.fromJSDate(context.df.currentUtcDateTime, {zone: 'utc'}).plus({ seconds: 10 });
        yield context.df.createTimer(deadline.toJSDate());

        return {
            errors
        };
    } 

    // confirms order
    const confirmation = yield context.df.callActivity("CreateOrderConfirmationActivity", outputs);
    console.log("confirmed");
    // TODO: create invoice or something
    // TODO: send confirmation email
    // simulation of running tasks, waits 10 seconds
    const deadline = DateTime.fromJSDate(context.df.currentUtcDateTime, {zone: 'utc'}).plus({ seconds: 10 });
    yield context.df.createTimer(deadline.toJSDate());

    return confirmation;
});
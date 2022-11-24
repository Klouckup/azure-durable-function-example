const df = require("durable-functions");

module.exports = async function (context, req) {
    const client = df.getClient(context);
    const instanceId = await client.startNew("OrderOrchestrator", req.body.id, req.body);
    return client.createCheckStatusResponse(context.bindingData.req, instanceId);
};
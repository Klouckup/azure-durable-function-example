# Azure Durable Function Example

## How to get started

### Install Dependencies

- `npm install`

### Install Webapp Dependencies

- `cd webapp/orderApp`
- `npm install`

### Configure local.settings.json
To setup the storage for the durable function and to disable CORS on your local host, you have to add the following content to `./local.settings.json`
```
{
  "IsEncrypted": false,
  "Values": {
    "AzureWebJobsStorage": "<Azure Blob Storage Connection String>",
    "FUNCTIONS_WORKER_RUNTIME": "node"
  },
  "Host": {
    "LocalHttpPort": 7071,
    "CORS": "*"
  }
}
```

### Start Durable Functions
- `npm run start` in the root directory of the repository

### Start Vue Webapp
- `cd webapp/orderApp`
- `npm run dev`

If the webapp can't reach any function endpoint, check if the written endpoint in `./webapp/orderApp/src/api/api.js` is correct

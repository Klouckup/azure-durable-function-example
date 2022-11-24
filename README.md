# Azure Durable Function Example

## Introduction
This repository contains the code of the hands-on part of my session "Serverless in Azure".
The slides can be found [here](https://docs.google.com/presentation/d/1r8ly4xohlXivpctokPWbmHaSK406snyCQ7l_ugP4aME/edit?usp=sharing).

Disclaimer: The content of the slides and its containing media elements was only created for an educational purpose. It will not be used in a commercial use case.

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


## Architecture
![Architecture Diagram](/docs/images/Serverless_Durable_Functions_Architecture.png)

### Azure Functions
- OrderRegistrationStarter (Client Starter Function)
- OrderOrchestrator (Orchestrator Function)
- VerifyDishActivity (Activity Function)
- CreateOrderConfirmationActivity (Activity Function)


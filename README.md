# DinnerDecider(Name TBD)

DinnerDecider is a Web Application to help you and your loved ones determine what you're going to eat using the power democracy. You can vote on create a poll and vote on categories you're interested in, and all the votes will be summed with a resturant picked from the winning category!

## Prerequisites
* Node installed
* MongoDB instance
* Azure Account with a registered App see [ AzureAD GettingStarted]([https://docs.microsoft.com/en-us/azure/active-directory/develop/quickstart-v2-nodejs-webapp])
* Yelp Account, registered App, and  API key
* Pusher Account, registered App, and API key

After creating the accounts add a .env file to the root directory with the following information:

    clientID=<AzureAD clientID>
    clientSecret=<AzureAD client secret>
    redirectUrl=<AzureAD redirect URL>
    DB_STRING= <Your MongoDB URI String>
    YELP_ClientID=<Yelp client Id>
    YELP_API_KEY=<Yelp API key>
    PUSHER_appId=<Pusher app Id>
    PUSHER_key=<Pusher app key>
    PUSHER_secret=<Pusher app secret>
    PUSHER_cluster=<Pusher app cluster locale>


## Installation

Use the package manager npm to install dependencies.

```bash
npm install && cd client npm install
```

## Usage
If you would like to run the project **locally** open a terminal in the root directory of the project and enter
```bash
npm run dev
``` 

## License
[MIT](https://choosealicense.com/licenses/mit/)

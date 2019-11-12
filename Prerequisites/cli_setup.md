# Setting Up the CLI

## Install IBM Cloud CLI

Download the `ibmcloud` CLI by running the command appropriate for your operating system:

1. MacOS: `curl -fsSL https://clis.ng.bluemix.net/install/osx | sh`
2. Linux: `curl -fsSL https://clis.ng.bluemix.net/install/linux | sh`
3. Windows \(Powershell\): `iex(New-Object Net.WebClient).DownloadString('https://clis.ng.bluemix.net/install/powershell')`

![Registration page](https://github.com/mrutkows/fn-workshops/tree/f9a9f057e96f8493ab777e3d193376a2301461c5/.gitbook/assets/docs.gif)

## Log Into IBM Cloud CLI

1. Use this command to authenticate the IBM Cloud CLI with your account credentials.

   ```text
   $ ibmcloud login
   ```

2. Choose an API endpoint from the list. _**IBM Cloud Functions is available in the following regions:**_ `eu-de`_**,**_ `eu-gb` _**and**_ `us-south`_**. Choose the default account region from the previous section.**_

   ```text
   Select an API endpoint:
   1. eu-de - https://api.eu-de.bluemix.net
   2. au-syd - https://api.au-syd.bluemix.net
   3. us-east - https://api.us-east.bluemix.net
   4. us-south - https://api.ng.bluemix.net
   5. eu-gb - https://api.eu-gb.bluemix.net
   6. Enter a different API endpoint
   Enter a number>
   ```

3. Enter account credentials for your IBM Cloud account.

   ```text
   Email> user@email.com

   Password>
   Authenticating...
   OK

   Select an account (or press enter to skip):
   1. John Smith's Account (xxx)
   Enter a number>

   API endpoint:     https://api.eu-gb.bluemix.net (API version: 2.92.0)
   Region:           eu-gb
   User:             user@email.com
   Account:          No account targeted, use 'bx target -c ACCOUNT_ID'
   Resource group:   No resource group targeted, use 'bx target -g RESOURCE_GROUP'
   Org:
   Space:
   ```

4. Run the following command to configure the organisation and space the CLI is targeting.

   ```text
   $ ibmcloud target --cf
   ```

   ```text
   Targeted org user@email.com
   Targeted space dev

   API endpoint:     https://api.eu-gb.bluemix.net (API version: 2.92.0)
   Region:           eu-gb
   User:             user@email.com
   Account:          No account targeted, use 'bx target -c ACCOUNT_ID'
   Resource group:   No resource group targeted, use 'bx target -g RESOURCE_GROUP'
   Org:              user@email.com
   Space:            dev
   ```

🎉🎉🎉 **Congratulations, you've successfully registered an IBM Cloud account and logged into the IBM Cloud CLI.** 🎉🎉🎉


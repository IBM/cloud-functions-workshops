# Setting Up the CLI

This section will take you step-by-step through [Getting started with the IBM Cloud CLI and Developer Tools](https://cloud.ibm.com/docs/cli?topic=cloud-cli-getting-started) using the command line option.

### Install IBM Cloud CLI [🔗](https://cloud.ibm.com/docs/cli?topic=cloud-cli-getting-started#step1-install-idt)

Download the `ibmcloud` CLI by running the command appropriate for your operating system:

- **MacOS & Linux**:
    ```bash
    $ curl -sL https://ibm.biz/idt-installer | bash
    ```
- **Windows 10 Pro** (Powershell)
Run the following as Administrator:
    ```bash
    $ [Net.ServicePointManager]::SecurityProtocol = "Tls12"; iex(New-Object Net.WebClient).DownloadString('https://ibm.biz/idt-win-installer')
    ```
     - _**Tip** Right-click the Windows™ PowerShell icon, and select Run as administrator._

### Verify the Installation [🔗](https://cloud.ibm.com/docs/cli?topic=cloud-cli-getting-started#step2-verify-idt)

Try running the help command:
```bash
$ ibmcloud dev help
```

### Login and Configure the IBM Cloud CLI [🔗](https://cloud.ibm.com/docs/cli?topic=cloud-cli-getting-started#step3-configure-idt-env)

1. Use this command to authenticate the IBM Cloud CLI with your account credentials.

   ```bash
   $ ibmcloud login
   ```

2. Choose an API endpoint from the list. _**IBM Cloud Functions is available in the following regions:**_ `eu-de`_**,**_ `eu-gb` _**and**_ `us-south`_**. Choose the default account region from the previous section.**_

   ```bash
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

   ```bash
    Email> josephine.watson@gmail.com

    Password>
   Authenticating...
   OK

   Select an account (or press enter to skip):
   Select an account:
   1. Josephine Watson's Account (87a302ad58884640a45f959d3da6cc77)

   Enter a number> 1
    Targeted account Matt Rutkowski's Account (87a302ad58884640a45f959d3da6cc77)


    API endpoint:      https://cloud.ibm.com
    Region:            us-south
    User:              josephine.watson@gmail.co
    Account:           Josephine Watson's Account (87a302ad58884640a45f959d3da6cc77)
    Resource group:    No resource group targeted, use 'ibmcloud target -g RESOURCE_GROUP'
    CF API endpoint:
    Org:
    Space:
   ```

4. Run the following command to configure the organisation and space the CLI is targeting.

   ```bash
   $ ibmcloud target --cf
   ```

   ```bash
   Targeted org josephine.watson@gmail.co
   Targeted space dev

   API endpoint:     https://api.eu-gb.bluemix.net (API version: 2.92.0)
   Region:           eu-gb ???
   User:             josephine.watson@gmail.co
   Account:          No account targeted, use 'bx target -c ACCOUNT_ID' ???
   Resource group:   No resource group targeted, use 'bx target -g RESOURCE_GROUP' ???
   Org:              josephine.watson@gmail.co
   Space:            dev
   ```
---
🎉 **Congratulations, you've successfully registered an IBM Cloud account and logged into the IBM Cloud CLI.** 🎉


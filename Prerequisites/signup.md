# Sign Up for an IBM Cloud Account

You must have a valid IBM Cloud Account to complete exercises in the workshops.

New IBM Cloud accounts default to a [new "lite" account version](https://www.ibm.com/cloud/free/); other [IBM Cloud pricing options](https://www.ibm.com/cloud/pricing) are available if you wish to upgrade at a later time.

_This account provides free access to a subset of IBM Cloud resources, including IBM Cloud Functions. Lite accounts do not need a credit-card to sign up or expire after a set time period, i.e. 30 days._

Developers using "_Lite accounts_" are restricted to development within a single region. Accounts are automatically assigned to either `eu-gb` or `us-south` regions depending on user profile location.

## Create an Account

1. Open a browser window
1. Navigate to [https://cloud.ibm.com/registration](https://cloud.ibm.com/registration)

1. Fill in the registration page:

    ![Registration page top](images/IBM-Cloud-Registration-1.png)

   Select email preferences, read the Terms and Conditions  and the click the **"Create Account"** button:

   ![Registration page bottom](images/IBM-Cloud-Registration-2.png)

1. Follow link in the validation email when it arrives.

    ![Registration page](images/IBM-Cloud-Registration-Email.png)

1. [Login into IBM Cloud](https://console.bluemix.net/login) using the account credentials you have registered.

## Verify Default Region

🚨🚨🚨 **PLEASE READ THIS SECTION.** _We know it looks boring but trust us! People often skim this part and then complain they can't login into the CLI. These instructions will save you all that inevitable confusion..._ 🚨🚨🚨



**When setting up the IBM Cloud CLI, choose the API endpoint for the default account region.**

Follow these instructions to check which default region your lite account has been assigned.

1. Open the [Cloud Foundry Organizations](https://cloud.ibm.com/account/cloud-foundry) page
1. Click the organization `name` listed in the table.
*Note that your organization is usually the email address you signed up with*
1. Locate the default organization named `dev` and check the associated "_Region_" value listed in the table.

it should have a value of `UK South` or `US South`:

![Registration page](images/IBM-Cloud-Cloud-Foundry-Orgs.png)

Remember this value for the next step (Installing the IBM Cloud CLI):

_**Note** IBM Cloud Functions is [available in other regions](https://cloud.ibm.com/docs/openwhisk?topic=cloud-functions-cloudfunctions_regions) as well if you upgrade from a Lite account._

---

🎉🎉🎉 **Congratulations, you've successfully registered an IBM Cloud account** 🎉🎉🎉


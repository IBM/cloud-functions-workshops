# Sign Up for an IBM Cloud Account

You must have a valid IBM Cloud Account to complete exercises in the workshops.

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

New IBM Cloud accounts default to a [new "lite" account version](https://www.ibm.com/cloud/free/); other [IBM Cloud pricing options](https://www.ibm.com/cloud/pricing) are available if you wish to upgrade at a later time.

_This account provides free access to a subset of IBM Cloud resources, including IBM Cloud Functions. Lite accounts do not need a credit-card to sign up or expire after a set time period, i.e. 30 days._

Developers using "_Lite accounts_" are restricted to development within a single region. Accounts are automatically assigned to either `eu-gb` or `us-south` regions depending on user profile location.

**When setting up the IBM Cloud CLI, choose the API endpoint for the default account region.**

Follow these instructions to check which default region your lite account has been assigned.

1. From the [Cloud Foundry Organizations](https://console.bluemix.net/account/organizations) page, click the organization name listed in the table. Note that your organization is usually the email address you signed up with, so click on that.
2. Check the "_Region_" value listed in the organization details table.
3. If it says United Kingdom then your region is `eu-gb`, and if it says Dallas then your region is `us-south`. Remember this value for the next step.

![Registration page](images/default_region.png)

🎉🎉🎉 **Congratulations, you've successfully registered an IBM Cloud account** 🎉🎉🎉


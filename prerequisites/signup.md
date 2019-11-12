# Signing Up for an IBM Cloud Account

You must have a valid IBM Cloud Account to complete exercises in the workshops.

New IBM Cloud accounts default to a [new "lite" account version](https://www.ibm.com/cloud/free/); other [IBM Cloud pricing options](https://www.ibm.com/cloud/pricing) are available if you wish to upgrade at a later time.

_This account provides free access to a subset of IBM Cloud resources, including IBM Cloud Functions. Lite accounts do not need a credit-card to sign up or expire after a set time period, i.e. 30 days._

Developers using "_Lite accounts_" are restricted to development within a single region. Accounts are automatically assigned to either `UK South` or `US South` regions depending on user profile location.

_**Note** IBM Cloud Functions is_ [_available in other regions_](https://cloud.ibm.com/docs/openwhisk?topic=cloud-functions-cloudfunctions_regions) _as well if you upgrade from a Lite account._

## Create an Account

1. Open a browser window

![](../.gitbook/assets/ibm-cloud-registration-1.png)

1. Navigate to [https://cloud.ibm.com/registration](https://cloud.ibm.com/registration)
2. Fill in the registration page:

   ![Registration page top](../.gitbook/assets/ibm-cloud-registration-1.png)

   Select email preferences, read the Terms and Conditions and the click the **"Create Account"** button:

   ![Registration page bottom](../.gitbook/assets/ibm-cloud-registration-2.png)

3. Follow link in the validation email when it arrives.

   ![Registration page](../.gitbook/assets/ibm-cloud-registration-email.png)

4. [Login into IBM Cloud](https://console.bluemix.net/login) using the account credentials you have registered.

## Verify Default Region

🚨 **Please follow this instructions**  _We know it looks boring but trust us! People often skim this part and then complain they can't login into the CLI. These instructions will save you all that inevitable confusion..._🚨

Follow these instructions to check which default region your lite account has been assigned.

1. Open the [Cloud Foundry Organizations](https://cloud.ibm.com/account/cloud-foundry) page
2. Click the organization `name` listed in the table.

   _Note that your organization is usually the email address you signed up with_

   ![Registration page](https://github.com/IBM/cloud-functions-workshops/tree/3f0f1c092ceb4a25b6d31f36ab2bed304346ec9c/Prerequisites/images/IBM-Cloud-Cloud-Foundry-Orgs-1.png)

3. Locate the default organization named `dev` and check the associated "_Region_" value listed in the table.

![Registration page](../.gitbook/assets/ibm-cloud-cloud-foundry-orgs-2.png)

🚨The value should be either `UK South` or `US South`. **Remember this as the default region value for the next step** \(Installing the IBM Cloud CLI\).🚨

🎉 **Congratulations, you've successfully registered an IBM Cloud account** 🎉


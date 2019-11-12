# Installing Cloud Functions Plugin

## Install IBM Cloud Functions CLI plugin

Use this command to install the Cloud Functions plugin for the IBM Cloud CLI.

```text
$ ibmcloud plugin install cloud-functions
```

```text
Looking up 'cloud-functions' from repository 'Bluemix'...
Plug-in 'cloud-functions 1.0.7' found in repository 'Bluemix'
Attempting to download the binary file...
 11.13 MiB / 11.13 MiB [=================================================================================] 100.00% 9s
11665633 bytes downloaded
Installing binary...
OK
Plug-in 'cloud-functions 1.0.7' was successfully installed into /home/user/.bluemix/plugins/cloud-functions.
```

_This plugin provides the_ [_Apache OpenWhisk CLI_](https://github.com/apache/incubator-openwhisk/blob/master/docs/cli.md) _as a sub-command under the IBM Cloud CLI. Platform credentials are provided automatically by the IBM Cloud CLI._

## Test IBM Cloud Functions From The CLI

Run the following command to invoke a test function from the command-line.

```text
$ ibmcloud wsk action invoke whisk.system/utils/echo -p message hello --result
```

```text
{
    "message": "hello"
}
```

_If this command executes successfully, you have verified that the IBM Cloud CLI and Cloud Functions plugin have been installed and configured correctly. If this does not work, please contact the workshop organiser to provide assistance!_

🎉🎉🎉 **Congratulations, you've successfully registered an IBM Cloud account, configured the IBM Cloud CLI for Cloud Functions development and executed your first serverless function! Let's start using the platform to create our own serverless applications…** 🎉🎉🎉


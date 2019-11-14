<!--
#
# Licensed to the Apache Software Foundation (ASF) under one or more
# contributor license agreements.  See the NOTICE file distributed with
# this work for additional information regarding copyright ownership.
# The ASF licenses this file to You under the Apache License, Version 2.0
# (the "License"); you may not use this file except in compliance with
# the License.  You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.
#
-->

# Installing Cloud Functions Plugin

This section will take you step-by-step through the [setup of the IBM Cloud Functions CLI plugin](https://cloud.ibm.com/functions/learn/cli).

## Install IBM Cloud Functions CLI plugin

Use this command to install the Cloud Functions plugin for the IBM Cloud CLI.

```bash
ibmcloud plugin install cloud-functions
```

```bash
Looking up 'cloud-functions' from repository 'IBM Cloud'...
Plug-in 'cloud-functions 1.0.xx' found in repository 'IBM Cloud'
Attempting to download the binary file...
 12.93 MiB / 12.93 MiB [===========================================] 100.00% 1s
13563264 bytes downloaded
Installing binary...
OK
Plug-in 'cloud-functions 1.0.xx' was successfully installed into /Users/Joesephine/.bluemix/plugins/cloud-functions. Use 'ibmcloud plugin show cloud-functions' to show its details.
```

## Target a Resource Group and Namespace

1. List all available resource groups on your account:
    ```bash
    ibmcloud resource groups
    ```
    ```bash
    Retrieving all resource groups under account Josephine Watson's Account as josephine.watson@gmail.com...
    OK
    Name      ID                                 Default Group   State
    Default   2cdb253b144c4d36ae8f1c125a3ab6d5   true            ACTIVE
    ```

1. Target the desired resource group. In this case we target the group named `Default`:

    ```bash
    ibmcloud target -g Default
    ```

    ```bash
    Targeted resource group default

    API endpoint:      https://cloud.ibm.com
    Region:            us-south
    User:              josephine.watson@gmail.com
    Account:           Josephine Watson's Account (87a302ad58884640a45f959d3da6cc77)
    Resource group:    Default
    CF API endpoint:   https://api.ng.bluemix.net (API version: 2.142.0)
    Org:               josephine.watson@gmail.com
    Space:             dev
    ```

1. Verify your (default) namespace is configured to the `cloud-functions` plugin:

    ```bash
    ibmcloud fn namespace list
    ```

    ```bash
    name                            type         id
    josephine.watson@gmail.com_dev  CF-based     josephine.watson@gmail.com_dev
    ```

    _**Note**: A default namespace should have been created for you as part of the installation and configuration of the `cloud-functions` plugin._

## Test IBM Cloud Functions From The CLI

Run the following command to invoke a test function from the command-line.

```bash
ibmcloud fn action invoke whisk.system/utils/echo -p message hello --result
```

You should see that the built-in `echo` function responds with a JSON result that set the `message` key's value to "hello":

```bash
{
    "message": "hello"
}
```

{% hint style="success" %}
🎉 **Congratulations, you've successfully configured the IBM Cloud CLI for Cloud Functions development and executed your first serverless function! Let's start using the platform to create our own serverless applications…** 🎉
{% endhint %}

## Using aliases for the Cloud Functions plugin

The IBM Cloud Functions plugin is referenced as a sub-command under the IBM Cloud CLI by its name `cloud-functions`, but can also be referenced by the shorter aliases:

- `functions`
- `fn` _or_
- `wsk`

{% hint style="info" %}
_**Info**: The `cloud-functions` plugin provides an IBM specific implementation of the [Apache OpenWhisk CLI](https://github.com/apache/incubator-openwhisk/blob/master/docs/cli.md). This is why one of the aliases is named `wsk`. However, the IBM version supports custom credentials and configurations needed for working with the IBM Cloud and its services._
{% endhint %}

### Logging out of your IBM Cloud account

{% hint style="warning" %}
**Warning**: _**Do not logout now or you will have to redo steps you just completed!**_
{% endhint %}

Some configuration data is lost every time you logout of the IBM Cloud account, or if your login expires including your default:

- **Resource group**
- **Namespace**

If this happens, you will have to follow the steps described above to again configure these values in order to use the _IBM Cloud Functions plugin_.

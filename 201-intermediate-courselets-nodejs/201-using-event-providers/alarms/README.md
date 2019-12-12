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

# Connecting Alarm events to actions

![Cloud Functions Alarm Trigger](images/cloud-functions-alarm-trigger.png)

In this example, we will show how to automatically trigger an IBM Cloud Functions action whenever an alarm is configured using the built-in [Alarms event provider](https://github.com/apache/openwhisk-catalog/tree/master/packages/alarms) package.

## Prerequisites

* _None_

## Using the Alarms package

In this exercise, we use the "built-in" [`/whisk.system/alarms`](https://github.com/apache/openwhisk-catalog/tree/master/packages/alarms) package offers a convenient way to use the [GitHub APIs](https://developer.github.com/) in order to create a webhook that can generate events that can fire Cloud Functions triggers.

You can get a summary of the package, its single feed action called `webhook`and their parameters:

```bash
ibmcloud fn package get --summary /whisk.system/alarms
```

```bash
package /whisk.system/alarms: Alarms and periodic utility
   (parameters: *apihost, *trigger_payload)
 feed   /whisk.system/alarms/interval: Fire trigger at specified interval
   (parameters: minutes, startDate, stopDate)
 feed   /whisk.system/alarms/once: Fire trigger once when alarm occurs
   (parameters: date, deleteAfterFire)
 feed   /whisk.system/alarms/alarm: Fire trigger when alarm occurs
   (parameters: cron, startDate, stopDate, timezone)

```

## Setting up GitHub

We will need to generate a token that the `/whisk.system/github` package will need to have permission be able to create a webhook that can fire a trigger.

1. Generate a GitHub [personal access token](https://github.com/settings/tokens).

    **Important!**  _Please pay attention to these 2 things when [creating your personal access token](https://help.github.com/en/github/authenticating-to-github/creating-a-personal-access-token-for-the-command-line)._

    * Select the following **scopes**:
      * **repo**: **repo:status** to allow access to commit status.
    ![Token Repo. Access Scope](images/github-access-scope-repo.png)

      * **admin:repo_hook**: **write:repo_hook** to allow the feed action to create your webhook.
    ![Token WenHook Access Scope](images/github-access-scope-repo-hook.png)
    * Make sure to copy your new personal access token when shown. GitHub will not let you see it again once you leave the page!
      * If you forgot your token, you can find it by name: [https://github.com/settings/tokens](https://github.com/settings/tokens) and press the **"Regenerate token"** button to create a new one.

1. Verify your personal access token was created successfully with the proper scopes: [https://github.com/settings/tokens](https://github.com/settings/tokens)

## Binding the GitHub package with your GitHub account information

**Warning!** _Before issuing the following command, make sure that you don't have any webhooks already defined for your repository or they may be overwritten when running the next command._

1. Create a package binding named `myGit` to the `/whisk.system/github` package with your user name, repository name and personal access token.

    ```bash
    ibmcloud package bind /whisk.system/github myGit \
      --param username myGitUser \
      --param repository myGitRepo \
      --param accessToken 2277c115d5c143b499ac31ff65b0aec8
    ```

    Replace:
    * `myGitUser` with your user GitHub user name
    * `myGitRepo` with the directory you want to receive events for in this exercise.
    * `2277c115d5c143b499ac31ff65b0aec8` with the GitHub personal access token you generated above

    _**Note** by binding your github information to the package, you don't need to specify the values each time that you call the feed action (i.e., `webhook`)._


{% hint style="success" %}
 🎉**Congratulations!** _TBD_🎉
{% endhint %}

# References

* For a better general understanding of how Triggers work see _[IBM Cloud Functions - Your first Action, Trigger, and Rule](https://github.com/IBM/ibm-cloud-functions-action-trigger-rule)_ in IBM open source.
* To see the code pattern this course is based upon see _[Triggering IBM Cloud Functions with scheduled tasks](https://github.com/IBM/ibm-cloud-functions-scheduled-tasks)_ in IBM open source.
* Apache OpenWhisk's [Alarms package](https://github.com/apache/openwhisk-catalog/tree/master/packages/alarms) documentation has a more terse (yet canonical) description of the `/whisk.system/alarms` package.

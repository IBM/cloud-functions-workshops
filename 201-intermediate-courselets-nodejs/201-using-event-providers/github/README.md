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

# Connecting GitHub events to actions

In this example, we will show how to automatically trigger an IBM Cloud Functions action whenever a "push" of a "commit" is made to a GitHub repository.

## Prerequisites

* **GitHub Account**
  * See [Signing up for GitHub](https://help.github.com/en/github/getting-started-with-github/signing-up-for-github)
* **GitHub Repository**
  * See [Creating a new repository](https://help.github.com/en/github/creating-cloning-and-archiving-repositories/creating-a-new-repository) if you do not have a repository created that you want to use for this example.
  * This example will use a repository named `myGitRep`, but you can use any repo. that is safe for experimentation purposes.

## Using the GitHub package

In this exercise, we use the "built-in" [`/whisk.system/github`](https://github.com/apache/openwhisk-catalog/tree/master/packages/github) package offers a convenient way to use the [GitHub APIs](https://developer.github.com/) in order to create a webhook that can generate events that can fire Cloud Functions triggers.

You can get a summary of the package, its single feed action called `webhook`and their parameters:

```bash
ibmcloud fn package get --summary /whisk.system/github
```

```bash
package /whisk.system/github: Package which contains actions and feeds to interact with Github
   (parameters: *endpoint)
 feed   /whisk.system/github/webhook: Creates a webhook on GitHub to be notified on selected changes
   (parameters: accessToken, events, repository, username)

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

## Binding the GitHub package with your information

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

## Firing a trigger event with GitHub activity

The following is an example of creating a trigger that will be fired each time that there is a new commit to a GitHub repository.

1. Create a trigger for the GitHub `push` event type by using your `myGit/webhook` feed

    ```bash
    ibmcloud fn trigger create myGitTrigger --feed myGit/webhook --param events push
    ```

    The `/whisk.system/github/webhook` feed action creates a webhook in GitHub (using your personal access token) that fires a `myGitTrigger` when there is activity in the `myGitRepo` repository.

    **Note** we are supplying the `events` parameter with only the `push` event type for our purposes.  Please read [GitHub event types](https://developer.github.com/v3/activity/events/types/) to see what other event types are available. You can provide additional values to `events` using a comma separated list of values (no spaces).

  **Congratulations!** _ Now any commit to the repository using a `git push` CLI call will causes the trigger to be fired by the webhook. Let's continue and create a Rule that associates `myGitTrigger` to an actual Action to be invoked._

### Connecting an Action to the Trigger

1. Create a function `print-github-commits.js` that can display the commits from a `push` event from GitHub

    ```javascript
    function main(params) {

        console.log("Display GitHub Commit Details for GitHub repo: ", params.repository.url);
        for (var commit of params.commits) {
            console.log(params.head_commit.author.name + " added code changes with commit message: " + commit.message);
        }

        console.log("Commit logs are: ")
        console.log(params.commits)

        return { message: params };
    }
    ```

1. Create the Action named `print-github-commit`

    ```bash
    ibmcloud fn action create print-github-commits print-github-commits.js
    ```

    This action receives the GitHub webhook payload as an input parameter. Each GitHub webhook event has a similar JSON schema, but is a unique payload object that is determined by its event type.

    For more information about the payload content, see the [GitHub events and payload](https://developer.github.com/v3/activity/events/types/) API documentation.

1. Connect the `myGitTrigger` Trigger to the `print-github-commits` Action with a Rule named `myGitTriggerRule`

    ```bash
    ibmcloud fn rule create myGitTriggerRule myGitTrigger print-github-commits
    ```

## Test the GitHub event hook

1. In a separate bash terminal window, start polling for activastions

    ```bash
    ibmcloud fn activation poll
    ```

    where we will watch for activations from our `print-github-commits` action.

1. Navigate to `myGitRepo` in your browser and edit the `README.md` file

    * _For example, https://github.com/myGitUser/myGitRepo where`myGitUser` is your user name and `myGitRepo` is your repository name._

# References

* As the `/whisk.system/github/webhook` is an implementation of a feed, you may want to read more on [Implementing feeds](https://github.com/apache/openwhisk/blob/master/docs/feeds.md) in Apache OpenWhisk.
* Apache OpenWhisk's [GitHub package](https://github.com/apache/openwhisk-catalog/tree/master/packages/github) documentation has a more terse (yet canonical) description of the `/whisk.system/github` package.
* IBM Developer's [Github Project automation with Cloud Functions](https://developer.ibm.com/tutorials/github-task-automation-with-serverless-actions/) shows you additional automation things to try on top of this exercise.
  * [GitHub source](https://github.com/IBM/github-project-automation-with-cloud-functions) contains the code described in the article.
* [Whisk Deploy — GitHub Webhook Trigger](https://medium.com/openwhisk/whisk-deploy-github-webhook-trigger-304a2f47ee52) shows you how to do the entire trigger/rule/action setup with only one CLI call using the `deploy` command and a `manifest.yaml` file.

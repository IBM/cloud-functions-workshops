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

# Create and Invoke Actions

In this section, you will learn how to work with **actions** in IBM Cloud Functions (ICF). An action represents the serverless function, along with its conventions and metadata. If you recall, the _Action_ entity was shown as part of the ICF programming model in the previous chapter.

Throughout this course, you might see the word _function_ used synonymously with the term _action_ since actions contain the functional source code, which is the primary focus.

## Creating Node.js Actions

Review the following steps and examples to create your first JavaScript action.

1. Create a JavaScript file named 'hello.js' with these contents:

    ```javascript
    function main() {
        return {payload: 'Hello world'};
    }
    ```

    _The JavaScript file might contain additional functions. However, by convention, a function called `main` is the default entry point for the action._

2. Create an action from the 'hello.js' JavaScript function naming it `hello`:

    ```bash
    ibmcloud fn action create hello hello.js
    ```

    ```text
    ok: created action hello
    ```

3. List all actions; it should show the `hello` action you just created:

    ```bash
    ibmcloud fn action list
    ```

    ```text
    actions
    <NAMESPACE>/hello       private    nodejs10
    ```

    You can see the `hello` action you just created under your account's default NAMESPACE.

---

## Invoking Actions

After you create your action, you can run it on IBM Cloud Functions with the `invoke` command using one of two modes:

- **blocking** - which will _**wait** for the result_ \(i.e., request/response style\) by specifying the `--blocking` flag on the command-line.
- **non-blocking** - which will invoke the action immediately, but _**not wait**_ for a response.

Regardless, invocations always provide an **activation ID** which can be used later to lookup the action's response which is part of an **activation record** the platform creates for each invocation.

### **Blocking Invocations**

A blocking invocation request will _wait_ for the activation result to be available.

1. Invoke the `hello` action using the command-line as a blocking activation.

    ```bash
    ibmcloud fn action invoke --blocking hello
    ```

    The command outputs the activation ID (`44794bd6aab74415b4e42a308d880e5b`) which can always be used later to lookup the response:

    ```bash
    ok: invoked /_/hello with id 44794bd6aab74415b4e42a308d880e5b
    ```

    and the complete activation record in JSON format which contains all information about the activation including the function's complete `response`. The JavaScript function's output is the string `Hello world` which appears as the value of the `payload` key:

    ```json
    ...
    "response": {
          "result": {
              "payload": "Hello world"
          },
          "size": 25,
          "status": "success",
          "success": true
      },
      ...
    ```

{% hint style="info" %}
- The wait period is the lesser of 60 seconds or the action's configured [time limit](https://github.com/apache/incubator-openwhisk/blob/master/docs/reference.md#per-action-timeout-ms-default-60s).
- The result of the activation is returned if it is available within the wait period. Otherwise, the activation continues processing in the system and an activation ID is returned so that one may check for the result later, as with non-blocking requests \(see [here](https://github.com/apache/incubator-openwhisk/blob/master/docs/actions.md#watching-action-output) for tips on monitoring activations\).
{% endhint %}

### **Non-blocking invocations**

A non-blocking invocation will invoke the action immediately, but _not wait_ for a response.

If you don't need the Action result right away, you can omit the `--blocking` flag to make a non-blocking invocation. You can get the result later by using the **Activation ID**.

1. Invoke the `hello` action using the command-line as a non-blocking activation.

    ```bash
    ibmcloud fn action invoke hello
    ```

    ```bash
    ok: invoked /_/hello with id 6bf1f670ee614a7eb5af3c9fde813043
    ```

2. Retrieve the activation result using the activation ID from the invocation:

    ```bash
    ibmcloud fn activation result 6bf1f670ee614a7eb5af3c9fde81304
    ```

    ```json
    {
        "payload": "Hello world"
    }
    ```

3. Retrieve the full activation record

    To get the complete activation record use the `activation get` command using the activation ID from the invocation:

    ```bash
    ibmcloud fn activation get 6bf1f670ee614a7eb5af3c9fde813043
    ```

    ```json
    ok: got activation 6bf1f670ee614a7eb5af3c9fde813043
    {
      ...
      "response": {
          "result": {
              "payload": "Hello world"
          },
          "size": 25,
          "status": "success",
          "success": true
      },
      ...
    }
    ```

---

## Retrieving Activation records

If you forget to record the activation ID, there are a couple of `activation` commands to help you.

### **Retrieve the last activation record**

1. Run the following command to get your last activation record.

    ```bash
    ibmcloud fn activation get --last
    ```

    ```json
    {
        "payload": "Hello world"
    }
    ```

### **Retrieve the last activation result**

To access the most recent activation result use the `--last` or `-l` flag.

1. Run the following command to get your last activation result.

    ```bash
    ibmcloud fn activation result --last
    ```

    ```json
    {
        "payload": "Hello world"
    }
    ```

{% hint style="tip" %}
Notice that you _did not need an activation ID when using the flag `--last`._
{% endhint %}

### **Retrieve recent activation list**

You can always get a list of your most recent activations to find their activation IDs.

1. Run the following command to get a list of your most recent activations:

    ```bash
    ibmcloud fn activation list
    ```

    ```bash
    Datetime   Activation ID  Kind      Start Duration Status  Entity
    y:m:d:hm:s 44794bd6...    nodejs:10 cold  34s      success <NAMESPACE>/hello:0.0.1
    y:m:d:hm:s 6bf1f670...    nodejs:10 warm  2ms      success <NAMESPACE>/hello:0.0.1
    ```

{% hint style="info" %}
**Note** The **`Entity`** column indicates which action was invoked along with the function's internal version. Every time you update an action's code, the platform will increment the internal version number.
{% endhint %}

---

## Observations

{% hint style="tip" %}
- **No special code needed**. Just code with your favorite language.
  - By convention, the `main` function is called _(you can always alias "main" to any function in your `.js` file)_.
- **No build step**: Runtimes for all supported languages are already deployed in ICF server clusters waiting for your function to be deployed and invoked.
- The **NodeJS runtime was inferred** via the function's `.js` extension. ICF will always use the latest supported NodeJS runtime version unless you explicitly set another version with the `--kind` flag _(not discussed in this course)_.
- Your action was installed into an IBM Cloud **Namespace**. This will allow you to apply **Identity and Access Management (IAM)** control to all actions in a namespace _(not discussed in this course)_.
{% endhint %}

{% hint style="success" %}
🎉 **Great work!** You have now learned how to create, deploy and invoke your own serverless functions on ICF. What about passing data into actions? Let's find out more...
{% endhint %}

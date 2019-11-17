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

# Creating And Invoking Actions

## Creating Node.js actions

Review the following steps and examples to create your first JavaScript action.

1. Create a JavaScript file with the following content. For this example, the file name is 'hello.js'.

   ```javascript
   function main() {
       return {payload: 'Hello world'};
   }
   ```

   The JavaScript file might contain additional functions. However, by convention, a function called `main` is the default entry point for the action.

2. Create an action from the following JavaScript function. For this example, the action is called `hello`.

   ```bash
   ibmcloud fn action create hello hello.js
   ```

   ```text
   ok: created action hello
   ```

3. List the actions that you have created:

   ```bash
   ibmcloud fn action list
   ```

   ```text
   actions
   <NAMESPACE>/hello       private    nodejs10
   ```

   You can see the `hello` action you just created under your default NAMESPACE.

## Invoking Actions

After you create your action, you can run it on IBM Cloud Functions with the `invoke` command using one of two modes:

- **blocking** - which will _**wait**_ for the result \(i.e., request/response style\) by specifying the `blocking` flag on the command-line.
- **non-blocking** - which will invoke the action immediately, but _**not wait**_ for a response.

Regardless, invocations always provide an **Activation ID** which can be used later to lookup the action's response.

### Blocking Invocations

A blocking invocation request will _wait_ for the activation result to be available.

The wait period is the lesser of 60 seconds or the action's configured [time limit](https://github.com/apache/incubator-openwhisk/blob/master/docs/reference.md#per-action-timeout-ms-default-60s). The result of the activation is returned if it is available within the wait period. Otherwise, the activation continues processing in the system and an activation ID is returned so that one may check for the result later, as with non-blocking requests \(see [here](https://github.com/apache/incubator-openwhisk/blob/master/docs/actions.md#watching-action-output) for tips on monitoring activations\).

1. Invoke the `hello` action using the command-line as a blocking activation.

  ```bash
  ibmcloud fn action invoke --blocking hello
  ```

  The command outputs the **Activation ID** (`44794bd6aab74415b4e42a308d880e5b`) which can always be used later to lookup the response:

  ```bash
  ok: invoked /_/hello with id 44794bd6aab74415b4e42a308d880e5b
  ```

  and the complete **Activation record** in JSON format which contains all information about the activation including the function's complete `response`. The JavaScript function's output is the string `Hello world` which appears as the value of the `payload` key:

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

### Non-blocking invocations

A non-blocking invocation will invoke the action immediately, but _not wait_ for a response.

If you don't need the action result right away, you can omit the `—blocking` flag to make a non-blocking invocation. You can get the result later by using the **Activation ID**.

1. Invoke the `hello` Action using the command-line as a non-blocking activation.

   ```bash
   ibmcloud fn action invoke hello
   ```

   ```bash
   ok: invoked /_/hello with id 6bf1f670ee614a7eb5af3c9fde813043
   ```

1. Retrieve the activation result

   ```bash
   ibmcloud fn activation result 6bf1f670ee614a7eb5af3c9fde81304
   ```

   ```json
   {
       "payload": "Hello world"
   }
   ```

## Retrieve the last activation result

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

  {% hint style="warning" %}
  _Do not use an activation ID with the flag `--last`._
  {% endhint %}

## Retrieve the full activation record

  1. To get the complete activation record use the `activation get` command:

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

  {% hint style="info" %}
  **Tip** The `--last` flag can also be used to get the last activation record (`activation get --last), activation activation logs,
  {% endhint %}

## Retrieve activation list

1. If you forget to record the activation ID, you can get a list of activations ordered from the most recent to the oldest. Run the following command to get a list of your activations:

```bash
ibmcloud fn activation list
```

```bash
Datetime   Activation ID  Kind      Start Duration Status  Entity
y:m:d:hm:s 44794bd6...    nodejs:10 cold  34s      success <NAMESPACE>/hello:0.0.1
y:m:d:hm:s 6bf1f670...    nodejs:10 warm  2ms      success <NAMESPACE>/hello:0.0.1
```

{% hint style="info" %}
**Note** The `Entity` column indicates which action was invoked along with the function's internal version. Every time you update an action's code, the platform will increment the internal version number.
{% endhint %}

{% hint style="success" %}
🎉 **Great work, you have now learned how to create, deploy and invoke your own serverless functions on IBM Cloud Functions. What about passing data into actions? Let's find out more…** 🎉
{% endhint %}

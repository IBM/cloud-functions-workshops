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

## Creating And Invoking Actions

### Creating Node.js actions

Review the following steps and examples to create your first JavaScript action.

1. Create a JavaScript file with the following content. For this example, the file name is 'hello.js'.

   ```javascript
   function main() {
       return {payload: 'Hello world'};
   }
   ```

   The JavaScript file might contain additional functions. However, by convention, a function called `main` is the default entry point for the action.

2. Create an action from the following JavaScript function. For this example, the action is called 'hello'.

   ```bash
   ibmcloud fn action create hello hello.js
   ```

   ```bash
   ok: created action hello
   ```

3. List the actions that you have created:

   ```bash
   ibmcloud fn action list
   ```

   ```bash
   actions
   <NAMESPACE>/hello       private    nodejs10
   ```

   You can see the `hello` action you just created under your default NAMESPACE.

### Invoking Actions

**After you create your action, you can run it on IBM Cloud Functions with the 'invoke' command.**

You can invoke actions as

- _**blocking**_ invocation which will wait for the result \(i.e., request/response style\) by specifying a flag \(`—blocking`\) on the command-line. or a
- _**non-blocking**_ invocation which will invoke the action, but not wait for a response.

Invocations always provide an **Activation ID** which can be used later to lookup the action's response.

#### Blocking Invocations

A blocking invocation request will _wait_ for the activation result to be available.

The wait period is the lesser of 60 seconds or the action's configured [time limit](https://github.com/apache/incubator-openwhisk/blob/master/docs/reference.md#per-action-timeout-ms-default-60s). The result of the activation is returned if it is available within the wait period. Otherwise, the activation continues processing in the system and an activation ID is returned so that one may check for the result later, as with non-blocking requests \(see [here](https://github.com/apache/incubator-openwhisk/blob/master/docs/actions.md#watching-action-output) for tips on monitoring activations\).

1. Invoke the `hello` action using the command-line as a blocking activation.

  ```bash
  ibmcloud fn action invoke --blocking hello
  ```
  As you can see, the command outputs two important pieces of information:

  - The **Activation ID** (`44794bd6aab74415b4e42a308d880e5b`)

  ```bash
  ok: invoked /_/hello with id 44794bd6aab74415b4e42a308d880e5b
  ```

  - along with the complete Activation record in JSON format.  It will include the result of the invocation and the function's `result` as follows:

  ```json
  "response": {
        "result": {
            "payload": "Hello world"
        },
        "size": 25,
        "status": "success",
        "success": true
    },
  ```

  The functions `result` in this case is the string `Hello world` as the output `payload` value returned by the JavaScript function.

  {% hint style="tip" %}
  The Activation ID can be used to retrieve the result (i.e., Activation record) of the invocation at a future time.
  {% endhint %}

#### Retrieving an activation result

If you don't need the action result right away, you can omit the `—blocking` flag to make a non-blocking invocation. You can get the result later by using the **activation ID**.

1. Invoke the `hello` Action using the command-line as a non-blocking activation.

   ```bash
   ibmcloud fn action invoke hello
   ```

   ```bash
   ok: invoked hello with id 6bf1f670ee614a7eb5af3c9fde813043
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

#### Retrieve the last activation result

To access the most recent activation record, activation results or activation logs, use the `--last` or `-l` flag.

1. Run the following command to get your last activation result.

  ```bash
  ibmcloud fn activation result --last
  ```

  ```json
  {
      "payload": "Hello world"
  }
  ```

  {% hint style="info" %}
  _Note that you should not use an activation ID with the flag `--last`._
  {% endhint %}

1. If you forget to record the activation ID, you can get a list of activations ordered from the most recent to the oldest. Run the following command to get a list of your activations:

```bash
ibmcloud fn activation list
```

```bash
activations
44794bd6aab74415b4e42a308d880e5b         hello
6bf1f670ee614a7eb5af3c9fde813043         hello
```

{% hint style="success" %}
🎉 **Great work, you have now learned how to create, deploy and invoke your own serverless functions on IBM Cloud Functions. What about passing data into actions? Let's find out more…** 🎉
{% endhint %}

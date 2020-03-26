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

# Passing Action Parameters

Event parameters can be passed to the action when it is invoked. Let's look at a sample action which uses the parameters to calculate the return values.

## Invoking an action with parameters

First, we will need to update our function to look for parameters.

1. Update the file `hello.js` with the following following source code:

    ```javascript
    function main(params) {
        return {payload:  'Hello, ' + params.name + ' from ' + params.place};
    }
    ```

    The input parameters are passed as a JSON object parameter to the `main` function. Notice how the `name` and `place` parameters are retrieved from the `params` object in this example.

2. Update the `hello` action with the updated source code file.

    ```bash
    ibmcloud fn action update hello hello.js
    ```

### **Invoking using the `--param` flag**

When invoking actions through the command-line, parameter values can be passed as through explicit command-line parameters `—param` flag, the shorter `-p` flag or using an input file containing raw JSON.

1. Invoke the `hello` action using explicit command-line parameters using the `--param` flag.

    ```bash
    ibmcloud fn action invoke --result hello --param name Elrond --param place Rivendell
    ```

    or using the `-p` short form:

    ```bash
    ibmcloud fn action invoke --result hello -p name Elrond -p place Rivendell
    ```

    ```json
    {
        "payload": "Hello, Elrond from Rivendell"
    }
    ```

{% hint style="info" %}
**Note** We used the `--result` option above. It implies a `blocking` invocation where the CLI waits for the activation to complete and then displays only the function's output as the `payload` value.
{% endhint %}

### **Invoking using the `--param-file` flag**

Passing parameters from a file requires the creation of a file containing the desired content in JSON format. The filename must then be passed to the `--param-file` flag:

1. Create a file named `parameters.json` containing the following JSON.

    ```json
    {
        "name": "Frodo",
        "place": "the Shire"
    }
    ```

2. Invoke the `hello` action using parameters from the JSON file.

    ```bash
    ibmcloud fn action invoke --result hello --param-file parameters.json
    ```

    ```json
    {
        "payload": "Hello, Frodo from the Shire"
    }
    ```

### Invoking with Nested parameters

Parameter values can be any valid JSON value, including nested objects. Let's update our action to use child properties of the event parameters.

1. Create the `hello-person` action with the following source code.

    ```javascript
    function main(params) {
        return {payload:  'Hello, ' + params.person.name + ' from ' + params.person.place};
    }
    ```

    ```bash
    ibmcloud fn action create hello-person hello-person.js
    ```

    Now the action expects a single `person` parameter to have fields `name` and `place`.

2. Invoke the action with a single `person` parameter that is valid JSON.

   ```bash
   ibmcloud fn action invoke --result hello-person -p person '{"name": "Elrond", "place": "Rivendell"}'
   ```

   The result is the same because the CLI automatically parses the `person` parameter value into the structured object that the action now expects:

   ```json
   {
       "payload": "Hello, Elrond from Rivendell"
   }
   ```

{% hint style="success" %}
🎉 **That was pretty easy, huh?** We can now pass parameters and access these values in our serverless functions. What about parameters that we need but don't want to manually pass in every time? Guess what, we have a trick for that...
{% endhint %}

---

## Setting default parameters

Actions can be invoked with multiple named parameters. Recall that the `hello` action from the previous example expects two parameters: the _name_ of a person, and the _place_ where they're from.

Rather than pass all the parameters to an action every time, you can bind default parameters. Default parameters are stored in the platform and automatically passed in during each invocation. If the invocation includes the same event parameter, this will overwrite the default parameter value.

Let's use the `hello` action from our previous example and bind a default value for the `place` parameter.

1. Update the action by using the `--param` option to bind default parameter values.

    ```bash
    ibmcloud fn action update hello --param place Rivendell
    ```

2. Invoke the action, passing only the `name` parameter this time.

    ```bash
    ibmcloud fn action invoke --result hello --param name Elrond
    ```

    ```json
    {
        "payload": "Hello, Elrond from Rivendell"
    }
    ```

    Notice that you did not need to specify the `place` parameter when you invoked the action.

### Override a bound parameter

Bound parameters can still be overwritten by specifying the parameter value at invocation time.

1. Invoke the action again, passing both `name` and `place` values.

    ```bash
    ibmcloud fn action invoke --result hello --param name Elrond --param place "the Lonely Mountain"
    ```

    ```json
    {
        "payload": "Hello, Elrond from the Lonely Mountain"
    }
    ```

    Notice that the command line value overwrites the value that was bound to the action.

{% hint style="success" %}
🎉 **Default parameters are awesome for handling parameters like authentication keys for APIs.** Letting the platform pass them in automatically means you don't have include these keys in invocation requests or include them in the action source code. Neat, right?
{% endhint %}

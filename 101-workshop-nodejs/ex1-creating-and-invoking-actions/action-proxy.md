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

# Calling Other Actions

Using serverless platforms to implement reusable functions means you will often want to invoke one action from another. IBM Cloud Functions provides a [RESTful API](http://petstore.swagger.io/?url=https://raw.githubusercontent.com/openwhisk/openwhisk/master/core/controller/src/main/resources/apiv1swagger.json) to invoke actions programmatically.

Rather than having to [manually construct the HTTP requests](https://github.com/apache/incubator-openwhisk/blob/master/docs/rest_api.md#actions) to invoke actions from within the IBM Cloud Functions runtime, client libraries are pre-installed to make this easier.

These libraries make it simple to invoke other actions, fire triggers and access all other platform services.

## Proxy example

Let's look an example of creating a "proxy" action which invokes another action _(i.e, our `hello` action)_ if a "password" is present in the input parameters.

1. Create the following new action named `proxy` from the following source files.

    ```javascript
    var openwhisk = require('openwhisk');

    function main(params) {
        if (params.password !== 'secret') {
        throw new Error("Password incorrect!")
        }

        var ow = openwhisk();
        return ow.actions.invoke({name: "hello", blocking: true, result: true, params: params})
    }
    ```

    ```bash
    ibmcloud fn action create proxy proxy.js
    ```

{% hint style="info" %}
**Note** The function uses the [NPM Apache OpenWhisk](https://www.npmjs.com/package/openwhisk) JavaScript library which is pre-installed in the IBM Cloud Functions runtime (so you do not need to package it). _Its source code can be found here:_ [https://github.com/apache/openwhisk-client-js/](https://github.com/apache/openwhisk-client-js/).
{% endhint %}

1. Invoke the proxy with an incorrect password.

    ```bash
    ibmcloud fn action invoke proxy -p password wrong -r
    ```

    ```json
    {
        "error": "An error has occurred: Error: Password incorrect!"
    }
    ```

    {% hint style="success" %}
    **Note** On the invoke call above, we used the short form for the `--result` flag which is `-r`.
    {% endhint %}

1. Invoke the proxy with the correct password.

    ```bash
    ibmcloud fn action invoke proxy -p password secret -p name Bernie -p place Vermont -r
    ```

    ```json
    {
        "greeting": "Hello Bernie from Vermont"
    }
    ```

1. Review the activations list to show both actions were invoked.

   ```bash
   ibmcloud fn activation list -l 2
   ```

   ```text
   activations
   8387302c81dc4d2d87302c81dc4d2dc6 hello
   e0c603c242c646978603c242c6c6977f proxy
   ```

{% hint style="tip" %}
_The [NPM Apache OpenWhisk](https://www.npmjs.com/package/openwhisk) JavaScript library can be used to do other things like invoking **triggers** to fire events from actions._
{% endhint %}

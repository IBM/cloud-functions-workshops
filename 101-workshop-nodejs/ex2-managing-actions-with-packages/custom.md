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

# Creating Packages

## Creating new packages

Custom packages can be used to group your own actions, manage default parameters and share entities with other users.

Let's demonstrate how to do this now using the `ibmcloud fn` CLI tool…

1. Create a package called "custom".

   ```bash
   ibmcloud fn package create custom
   ```

   ```text
   ok: created package custom
   ```

1. Get a summary of the package.

   ```bash
   ibmcloud fn package get --summary custom
   ```

   ```text
   package /myNamespace/custom
     (parameters: none defined)
   ```

   Notice that the package is empty.

1. Create a file called `identity.js` that contains the following action code. This action returns all input parameters.

   ```javascript
   function main(args) { return args; }
   ```

1. Create an `identity` action in the `custom` package.

   ```bash
   ibmcloud fn action create custom/identity identity.js
   ```

   ```text
   ok: created action custom/identity
   ```

   Creating an action in a package requires that you prefix the action name with a package name.

1. Get a summary of the package again.

   ```bash
   ibmcloud fn package get --summary custom
   ```

   ```text
   package /myNamespace/custom
    (parameters: none defined)
   action /myNamespace/custom/identity
    (parameters: none defined)
   ```

   You can see the `custom/identity` action in your namespace now.

1. Invoke the action in the package.

   ```bash
   ibmcloud fn action invoke --result custom/identity
   ```

   ```text
   {}
   ```

## Setting default package parameters

You can set default parameters for all the entities in a package. You do this by setting package-level parameters that are inherited by all actions in the package.

To see how this works, try the following example:

1. Update the `custom` package with two parameters: `city` and `country`.

   ```bash
   ibmcloud fn package update custom --param city Austin --param country USA
   ```

   ```text
   ok: updated package custom
   ```

1. Display the parameters in the package and action, and see how the `identity` action in the package inherits parameters from the package.

   ```bash
   ibmcloud fn package get custom
   ```

   ```json
   ok: got package custom
   ...
   "parameters": [
      {
          "key": "city",
          "value": "Austin"
      },
      {
          "key": "country",
          "value": "USA"
      }
   ]
   ...
   ```

   ```bash
   ibmcloud fn action get custom/identity
   ```

   ```json
   ok: got action custom/identity
   ...
   "parameters": [
      {
          "key": "city",
          "value": "Austin"
      },
      {
          "key": "country",
          "value": "USA"
      }
   ]
   ...
   ```

1. Invoke the identity action without any parameters to verify that the action indeed inherits the parameters.

   ```bash
   ibmcloud fn action invoke --result custom/identity
   ```

   ```json
   {
      "city": "Austin",
      "country": "USA"
   }
   ```

1. Invoke the identity action with some parameters.

   ```bash
   ibmcloud fn action invoke --result custom/identity --param city Dallas --param state Texas
   ```

   ```json
   {
      "city": "Dallas",
      "country": "USA",
      "state": "Texas"
   }
   ```
{% hint style="info" %}
Invocation parameters are merged with the package parameters with the **invocation parameters overriding the package parameters**.
{% endhint %}

## Sharing packages

After the actions and feeds that comprise a package are debugged and tested, the package can be shared with all OpenWhisk users. Sharing the package makes it possible for the users to bind the package, invoke actions in the package, and author OpenWhisk rules and sequence actions.

1. Share the package with all users:

   ```bash
   ibmcloud fn package update custom --shared yes
   ```

   ```text
   ok: updated package custom
   ```

1. Display the `publish` property of the package to verify that it is now true.

   ```bash
   ibmcloud fn package get custom
   ```

   ```text
   ok: got package custom
   ...
   "publish": true,
   ...
   ```

   Others can now use your `custom` package, including binding to the package or directly invoking an action in it. Other users must know the fully qualified names of the package to bind it or invoke actions in it. Actions and feeds within a shared package are _public_. If the package is private, then all of its contents are also private.

1. Get a description of the package to show the fully qualified names of the package and action.

   ```bash
   ibmcloud fn package get --summary custom
   ```

   ```text
   package /myNamespace/custom: Returns a result based on parameters city and country
     (parameters: *city, *country)
   action /myNamespace/custom/identity
     (parameters: none defined)
   ```

   In the previous example, you're working with the `myNamespace` namespace, and this namespace appears in the fully qualified name.

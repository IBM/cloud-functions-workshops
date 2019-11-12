# Creating Packages

## Creating new packages

Custom packages can be used to group your own actions, manage default parameters and share entities with other users.

Let's demonstrate how to do this now using the `ibmcloud wsk` CLI tool…

1. Create a package called "custom".

   ```text
   $ ibmcloud wsk package create custom
   ```

   ```text
   ok: created package custom
   ```

2. Get a summary of the package.

   ```text
   $ ibmcloud wsk package get --summary custom
   ```

   ```text
   package /myNamespace/custom
     (parameters: none defined)
   ```

   Notice that the package is empty.

3. Create a file called `identity.js` that contains the following action code. This action returns all input parameters.

   ```javascript
   function main(args) { return args; }
   ```

4. Create an `identity` action in the `custom` package.

   ```text
   $ ibmcloud wsk action create custom/identity identity.js
   ```

   ```text
   ok: created action custom/identity
   ```

   Creating an action in a package requires that you prefix the action name with a package name.

5. Get a summary of the package again.

   ```text
   $ ibmcloud wsk package get --summary custom
   ```

   ```text
   package /myNamespace/custom
    (parameters: none defined)
   action /myNamespace/custom/identity
    (parameters: none defined)
   ```

   You can see the `custom/identity` action in your namespace now.

6. Invoke the action in the package.

   ```text
   $ ibmcloud wsk action invoke --result custom/identity
   ```

   ```text
   {}
   ```

_You can set default parameters for all the entities in a package. You do this by setting package-level parameters that are inherited by all actions in the package. To see how this works, try the following example:_

1. Update the `custom` package with two parameters: `city` and `country`.

   ```text
   $ ibmcloud wsk package update custom --param city Austin --param country USA
   ```

   ```text
   ok: updated package custom
   ```

2. Display the parameters in the package and action, and see how the `identity` action in the package inherits parameters from the package.

   ```text
   $ ibmcloud wsk package get custom
   ```

   ```text
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

   ```text
   $ ibmcloud wsk action get custom/identity
   ```

   ```text
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

3. Invoke the identity action without any parameters to verify that the action indeed inherits the parameters.

   ```text
   $ ibmcloud wsk action invoke --result custom/identity
   ```

   ```text
   {
      "city": "Austin",
      "country": "USA"
   }
   ```

4. Invoke the identity action with some parameters. Invocation parameters are merged with the package parameters; the invocation parameters override the package parameters.

   ```text
   $ ibmcloud wsk action invoke --result custom/identity --param city Dallas --param state Texas
   ```

   ```text
   {
      "city": "Dallas",
      "country": "USA",
      "state": "Texas"
   }
   ```

## Sharing packages

After the actions and feeds that comprise a package are debugged and tested, the package can be shared with all OpenWhisk users. Sharing the package makes it possible for the users to bind the package, invoke actions in the package, and author OpenWhisk rules and sequence actions.

1. Share the package with all users:

   ```text
   $ ibmcloud wsk package update custom --shared yes
   ```

   ```text
   ok: updated package custom
   ```

2. Display the `publish` property of the package to verify that it is now true.

   ```text
   $ ibmcloud wsk package get custom
   ```

   ```text
   ok: got package custom
   ...
   "publish": true,
   ...
   ```

   Others can now use your `custom` package, including binding to the package or directly invoking an action in it. Other users must know the fully qualified names of the package to bind it or invoke actions in it. Actions and feeds within a shared package are _public_. If the package is private, then all of its contents are also private.

3. Get a description of the package to show the fully qualified names of the package and action.

   ```text
   $ ibmcloud wsk package get --summary custom
   ```

   ```text
   package /myNamespace/custom: Returns a result based on parameters city and country
     (parameters: *city, *country)
   action /myNamespace/custom/identity
     (parameters: none defined)
   ```

   In the previous example, you're working with the `myNamespace` namespace, and this namespace appears in the fully qualified name.


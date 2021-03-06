# Use existing packages

## Browse public packages

IBM Cloud Functions (ICF) comes pre-installed with a number of public packages, which include trigger feeds used to register triggers with event sources.

Actions in public packages can be used by anyone and the caller pays the invocation cost.

Using the `ibmcloud fn` CLI, you can get a list of packages in a namespace, list the entities in a package, and get a description of the entities within a package. Here’s how:

1. Get a list of packages in the `/whisk.system` namespace:

   ```bash
   ibmcloud fn package list /whisk.system
   ```

   ```text
   packages
   /whisk.system/alarms                      shared
   /whisk.system/cloudant                    shared
   /whisk.system/combinators                 shared
   /whisk.system/cos                         shared
   /whisk.system/github                      shared
   /whisk.system/messaging                   shared
   /whisk.system/pushnotifications           shared
   /whisk.system/samples                     shared
   /whisk.system/slack                       shared
   /whisk.system/utils                       shared
   /whisk.system/watson-speechToText         shared
   /whisk.system/watson-textToSpeech         shared
   /whisk.system/watson-translator           shared
   /whisk.system/weather                     shared
   /whisk.system/websocket                   shared
   ```

2. Get a list of entities in the `/whisk.system/cloudant` package:

   ```bash
   ibmcloud fn package get --summary /whisk.system/cloudant
   ```

   ```bash
   package /whisk.system/cloudant: Cloudant database service
      (parameters: *apihost, *bluemixServiceName, dbname, host, iamApiKey, iamUrl, overwrite, password, username)
   ...
   action /whisk.system/cloudant/read: Read document from database
      (parameters: dbname, id, params)
   action /whisk.system/cloudant/write: Write document in database
      (parameters: dbname, doc)
   ...
   feed   /whisk.system/cloudant/changes: Database change feed
      (parameters: dbname, filter, iamApiKey, iamUrl, query_params)

   ```

   This output shows that the Cloudant package provides many **actions**, including `read` and `write` and a trigger **feed** called `changes`. The `changes` feed is a special action that monitors a specified Cloundant instance and causes triggers to be fired whenever changes to documents are made allowing actions to react and perform work.

   Also note that the Cloudant **package** itself defines parameters that, if bound with values, can be used by all actions in the package automatically. For this package, they include `host` and `dbname` to identify the database instance.

   The Cloudant package also declares authentication parameters that all actions will need to access the database instance. The specific parameters needed will vary depending on the authentication protocol selected for Cloudant. In this case, `username` and `password` would be used for *Basic* authentication or `iamApiKey` and `iamUrl` would be used for *OAuth* standard authentication.

{% hint style="info" %}
* Parameters listed under the package with a prefix `'*'` are predefined, bound parameters.
* Parameters without a `'*'` are those listed under the annotations for each entity.
* Furthermore, any parameters with the prefix `'**'` are finalized bound parameters. This means that they are immutable and cannot be changed by the user.
{% endhint %}

## View parameters

Any entity listed under a package inherits specific bound parameters from the package. To view the list of known parameters of an entity belonging to a package, you will need to run a `get --summary` of the individual entity.

Let's look more closely at the `read` action in the Cloudant package:

1. Get a description of the `/whisk.system/cloudant/read` action:

   ```bash
   ibmcloud fn action get --summary /whisk.system/cloudant/read
   ```

   ```text
   action /whisk.system/cloudant/read: Read document from database
      (parameters: *apihost, *bluemixServiceName, dbname, *id, params)
   ```

2. Identify the parameters that are predefined and inherited from the Cloudant package

   The output from above shows that the Cloudant `read` action has five parameters. Three of these parameters, `apihost`, `bluemixServiceName` and `dbname` can be predefined at the **package** level and their values would be inherited on invocations. This means that the only parameter required uniquely on each invocation would be the document `id` parameter.

## Invoke actions in a package

You can invoke actions in a package, just as with other actions. The next few steps show how to invoke the `greeting` action in the `/whisk.system/samples` package with different parameters.

1. Get a description of the `/whisk.system/samples/greeting` action:

   ```bash
   ibmcloud fn action get --summary /whisk.system/samples/greeting
   ```

   ```text
   action /whisk.system/samples/greeting: Returns a friendly greeting
      (parameters: name, place)
   ```

   Notice that the `greeting` action takes two parameters: `name` and `place`.

2. Invoke the action without any parameters:

   ```bash
   ibmcloud fn action invoke --result /whisk.system/samples/greeting
   ```

   ```text
   {
       "payload": "Hello, stranger from somewhere!"
   }
   ```

   The output is a generic message because no parameters were specified.

3. Invoke the action with parameters:

   ```bash
   ibmcloud fn action invoke --result /whisk.system/samples/greeting --param name Arya --param place Winterfell
   ```

   ```text
   {
       "payload": "Hello, Arya from Winterfell!"
   }
   ```

   Notice that the output uses the `name` and `place` parameters that were passed to the action.

## Create and use package bindings

Although you can use the entities in a package directly, you might find yourself passing the same parameters to the action every time. You can avoid this by binding to a package and specifying default parameters. These parameters are inherited by the actions in the package.

For example, in the `/whisk.system/cloudant` package, you can set default `username`, `password`, and `dbname` values in a package binding. These values are automatically passed to any actions in the package.

In the following simple example, you bind to the `/whisk.system/samples` package.

1. Bind to the `/whisk.system/samples` package and set a default `place` parameter value:

   ```text
   ibmcloud fn package bind /whisk.system/samples valhallaSamples --param place Valhalla
   ```

   ```text
   ok: created binding valhallaSamples
   ```

2. Get a description of the package binding:

   ```text
   ibmcloud fn package get --summary valhallaSamples
   ```

   ```text
   package /namespace/valhallaSamples: Returns a result based on parameter place
      (parameters: *place)
    action /namespace/valhallaSamples/helloWorld: Demonstrates logging facilities
       (parameters: payload)
    action /namespace/valhallaSamples/greeting: Returns a friendly greeting
       (parameters: name, place)
    action /namespace/valhallaSamples/curl: Curl a host url
       (parameters: payload)
    action /namespace/valhallaSamples/wordCount: Count words in a string
       (parameters: payload)
   ```

   Notice that all the actions in the `/whisk.system/samples` package are available in the `valhallaSamples` package binding.

3. Invoke an action in the package binding:

   ```text
   ibmcloud fn action invoke --result valhallaSamples/greeting --param name Odin
   ```

   ```text
   {
       "payload": "Hello, Odin from Valhalla!"
   }
   ```

   Notice from the result that the action inherits the `place` parameter you set when you created the `valhallaSamples` package binding.

4. Invoke an action and overwrite the default parameter value:

   ```text
   ibmcloud fn action invoke --result valhallaSamples/greeting --param name Odin --param place Asgard
   ```

   ```text
   {
       "payload": "Hello, Odin from Asgard!"
   }
   ```

{% hint style="info" %}
   Notice that the `place` parameter value that is specified with the action invocation overwrites the default value set in the `valhallaSamples` package binding.
{% endhint %}

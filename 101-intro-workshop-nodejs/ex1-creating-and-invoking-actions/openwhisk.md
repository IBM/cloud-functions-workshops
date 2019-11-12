# Calling Other Actions

Using serverless platforms to implement reusable functions means you will often want to invoke one action from another. IBM Cloud Functions provides a [RESTful API](http://petstore.swagger.io/?url=https://raw.githubusercontent.com/openwhisk/openwhisk/master/core/controller/src/main/resources/apiv1swagger.json) to invoke actions programmatically.

Rather than having to [manually construct the HTTP requests](https://github.com/apache/incubator-openwhisk/blob/master/docs/rest_api.md#actions) to invoke actions from within the IBM Cloud Functions runtime, client libraries are pre-installed to make this easier.

These libraries make it simple to invoke other actions, fire triggers and access all other platform services.

## Proxy example

Let's look an example of creating a "proxy" action which invokes another action if a "password" is present in the input parameters.

1. Create the following new action `proxy` from the following source files.

   ```text
   var openwhisk = require('openwhisk');

   function main(params) {
     if (params.password !== 'secret') {
       throw new Error("Password incorrect!")
     }

     var ow = openwhisk();
     return ow.actions.invoke({name: "hello", blocking: true, result: true, params: params})
   }
   ```

   _The JavaScript library for Apache OpenWhisk is here:_ [_https://github.com/apache/incubator-openwhisk-client-js/_](https://github.com/apache/incubator-openwhisk-client-js/)_._ _This library is pre-installed in the IBM Cloud Functions runtime and does not need to be manually included._

```text
   $ ibmcloud wsk action create proxy proxy.js
```

1. Invoke the proxy with an incorrect password.

   ```text
   $ ibmcloud wsk action invoke proxy -p password wrong -r
   ```

   ```text
   {
       "error": "Password is incorrect!"
   }
   ```

2. Invoke the proxy with the correct password.

   ```text
   $ ibmcloud wsk action invoke proxy -p password secret -p name Bernie -p place Vermont -r
   ```

   ```text
   {
       "greeting": "Hello Bernie from Vermont"
   }
   ```

3. Review the activations list to show both actions were invoked.

   ```text
   $ ibmcloud wsk activation list -l 2
   ```

   ```text
   activations
   8387302c81dc4d2d87302c81dc4d2dc6 hello
   e0c603c242c646978603c242c6c6977f proxy
   ```

_These libraries can also be used to invoke triggers to fire events from actions._


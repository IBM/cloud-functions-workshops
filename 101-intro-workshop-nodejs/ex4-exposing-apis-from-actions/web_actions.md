# Web Actions

Let's turn the `hello` action into a web action. Once it has been converted, we can call this action using a normal HTTP request.

1. Update the action to set the `—web` flag to `true`.

   ```text
   $ ibmcloud wsk action update hello --web true
   ```

   ```text
   ok: updated action hello
   ```

2. Retrieve the web action URL exposed by the platform for this action.

   ```text
   $ ibmcloud wsk action get hello --url
   ```

   ```text
   ok: got action hello
   https://openwhisk.ng.bluemix.net/api/v1/web/user%40host.com_dev/default/hello
   ```

3. Invoke the web action URL with the JSON extension, passing in query parameters for `name` and `place`.

```text
   $ curl "https://openwhisk.ng.bluemix.net/api/v1/web/user%40host.com_dev/default/hello.json?name=Bernie"
```

```text
   {
     "message": "Hello Bernie from Vermont!"
   }
```

1. Disable web action support.

   ```text
   $ ibmcloud wsk action update hello --web false
   ```

   ```text
   ok: updated action hello
   ```

2. Verify the action is not externally accessible.

   ```text
   $ curl "https://openwhisk.ng.bluemix.net/api/v1/web/user%40host.com_dev/default/hello.json?name=Bernie"
   ```

   ```text
   {
     "error": "The requested resource does not exist.",
     "code": 4452991
   }
   ```

## Content extensions

Web actions invoked through the platform API need a content extension to tell the platform how to interpret the content returned from the action. In the example above, we were using the `.json` extension. This tells the platform to serialise the return value out to a JSON response.

The platform supports the following content-types: `.json`, `.html`, `.http`, `.svg` or `.text`. If no content extension is provided, it defaults to `.http` which gives the action full control of the HTTP response.

## HTTP request properties

All web actions, when invoked, receives additional HTTP request details as parameters to the action input argument. These include:

1. `__ow_method` \(type: string\). the HTTP method of the request.
2. `__ow_headers` \(type: map string to string\): A the request headers.
3. `__ow_path` \(type: string\): the unmatched path of the request \(matching stops after consuming the action extension\).
4. `__ow_user` \(type: string\): the namespace identifying the OpenWhisk authenticated subject
5. `__ow_body` \(type: string\): the request body entity, as a base64 encoded string when content is binary or JSON object/array, or plain string otherwise
6. `__ow_query` \(type: string\): the query parameters from the request as an unparsed string

The `__ow_user` is only present when the web action is [annotated to require authentication](https://github.com/apache/incubator-openwhisk/blob/master/docs/annotations.md#annotations-specific-to-web-actions) and allows a web action to implement its own authorization policy. The `__ow_query` is available only when a web action elects to handle the ["raw" HTTP request](https://github.com/apache/incubator-openwhisk/blob/master/docs/webactions.md#raw-http-handling). It is a string containing the query parameters parsed from the URI \(separated by `&`\). The `__ow_body` property is present either when handling "raw" HTTP requests, or when the HTTP request entity is not a JSON object or form data. Web actions otherwise receive query and body parameters as first class properties in the action arguments with body parameters taking precedence over query parameters, which in turn take precedence over action and package parameters.

## Controlling HTTP responses

Web actions can return a JSON object with the following properties to directly control the HTTP response returned to the client.

1. `headers`: a JSON object where the keys are header-names and the values are string, number, or boolean values for those headers \(default is no headers\). To send multiple values for a single header, the header's value should be a JSON array of values.
2. `statusCode`: a valid HTTP status code \(default is 200 OK if body is not empty otherwise 204 No Content\).
3. `body`: a string which is either plain text, JSON object or array, or a base64 encoded string for binary data \(default is empty response\).

The `body` is considered empty if it is `null`, the empty string `""` or undefined.

If a `content-type header` is not declared in the action result’s `headers`, the body is interpreted as `application/json` for non-string values, and `text/html` otherwise. When the `content-type` is defined, the controller will determine if the response is binary data or plain text and decode the string using a base64 decoder as needed. Should the body fail to decoded correctly, an error is returned to the caller.

## Additional features

Web actions have a [lot more features](https://github.com/apache/incubator-openwhisk/blob/master/docs/webactions.md), see the documentation for full details on all these capabilities.

## Example - HTTP redirect

1. Create a new web action from the following source code.

   ```text
   function main() {
       return {
           headers: { location: "http://openwhisk.org" },
           statusCode: 302
     };
   }
   ```

   ```text
   $ ibmcloud wsk action create redirect action.js --web true
   ```

   ```text
   ok: created action redirect
   ```

2. Retrieve URL for new web action

   ```text
   $ ibmcloud wsk action get redirect --url
   ```

   ```text
   ok: got action redirect
   https://openwhisk.ng.bluemix.net/api/v1/web/user%40host.com_dev/default/redirect
   ```

3. Check HTTP response is HTTP redirect.

   ```text
   $ curl -v https://openwhisk.ng.bluemix.net/api/v1/web/user%40host.com_dev/default/redirect
   ```

   ```text
   < HTTP/1.1 302 Found
   < X-Backside-Transport: OK OK
   < Connection: Keep-Alive
   < Transfer-Encoding: chunked
   < Server: nginx/1.11.13
   < Date: Fri, 23 Feb 2018 11:23:24 GMT
   < Access-Control-Allow-Origin: *
   < Access-Control-Allow-Methods: OPTIONS, GET, DELETE, POST, PUT, HEAD, PATCH
   < Access-Control-Allow-Headers: Authorization, Content-Type
   < location: http://openwhisk.org
   ```

## Example - HTML response

1. Create a new web action from the following source code.

   ```text
   function main() {
       let html = "<html><body>Hello World!</body></html>"
       return { headers: { "Content-Type": "text/html" },
                statusCode: 200,
                body: html };
   }
   ```

   ```text
   $ ibmcloud wsk action create html action.js --web true
   ```

   ```text
   ok: created action html
   ```

   ```text
   $ ibmcloud wsk action get html --url
   ```

   ```text
   ok: got action html
   https://openwhisk.ng.bluemix.net/api/v1/web/user%40host.com_dev/default/html
   ```

2. Check HTTP response is HTML.

   ```text
   $ curl https://openwhisk.ng.bluemix.net/api/v1/web/user%40host.com_dev/default/html
   ```

   ```text
   <html><body>Hello World!</body></html>
   ```

## Example - Manual JSON response

1. Create a new web action from the following source code.

   ```text
   function main(params) { 
       return {
           statusCode: 200,
           headers: { 'Content-Type': 'application/json' },
           body: params
       };
   }
   ```

   ```text
   $ ibmcloud wsk action create manual action.js --web true
   ```

   ```text
   ok: created action manual
   ```

2. Retrieve URL for new web action

   ```text
   $ ibmcloud wsk action get manual --url
   ```

   ```text
   ok: got action manual
   https://openwhisk.ng.bluemix.net/api/v1/web/user%40host.com_dev/default/manual
   ```

3. Check HTTP response is JSON.

   ```text
   $ curl "https://openwhisk.ng.bluemix.net/api/v1/web/user%40host.com_dev/default/manual?hello=world"
   ```

   ```text
   {
     "__ow_method": "get",
     "__ow_headers": {
       "accept": "*/*",
       "user-agent": "curl/7.54.0",
       "x-client-ip": "92.11.100.114",
       "x-forwarded-proto": "https",
       "host": "openwhisk.ng.bluemix.net:443",
       "cache-control": "no-transform",
       "via": "1.1 DwAAAD0oDAI-",
       "x-global-transaction-id": "2654586489",
       "x-forwarded-for": "92.11.100.114"
     },
     "__ow_path": "",
     "hello": "world"
   ```

4. Use other HTTP methods or URI paths to show the parameters change.

   ```text
   $ curl -XPOST "https://openwhisk.ng.bluemix.net/api/v1/web/user%40host.com_dev/default/manual/subpath"
   ```

   ```text
   {
     "__ow_method": "post",
     "__ow_headers": {
       "accept": "*/*",
       "user-agent": "curl/7.54.0",
       "x-client-ip": "92.11.100.114",
       "x-forwarded-proto": "https",
       "host": "openwhisk.ng.bluemix.net:443",
       "via": "1.1 AgAAAB+7NgA-",
       "x-global-transaction-id": "2897764571",
       "x-forwarded-for": "92.11.100.114"
     },
     "__ow_path": "/subpath",
     "hello": "world"
   ```

🎉🎉🎉 **OpenWhisk Web Actions are an awesome feature. Exposing public APIs from actions is minimal effort.** 🎉🎉🎉


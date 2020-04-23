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

# Web actions

Web actions are actions that can be called externally using the HTTP protocol from clients like `curl` or web browsers. IBM Cloud Functions (ICF) provides a simple flag, `--web true`, which causes it to automatically create an HTTP accessible URL (endpoint) for any action.

## Create and invoke a web action

Let's turn the `hello` action into a web action!

1. Update the action to set the `--web` flag to `true`:

      ```bash
      ibmcloud fn action update hello --web true
      ```

      ```bash
      ok: updated action hello
      ```

      The `hello` action has now been assigned an HTTP endpoint.

2. Retrieve the web action's URL exposed by the platform for the `hello` action:

      ```bash
      ibmcloud fn action get hello --url
      ```

      ```bash
      ok: got action hello
      https://us-south.functions.cloud.ibm.com/api/v1/web/2ca6a304-a717-4486-ae33-1ba6be11a393/default/hello

      ```

3. Invoke the web action URL returned using the `curl` command:

      ```bash
      curl "https://us-south.functions.cloud.ibm.com/api/v1/web/2ca6a304-a717-4486-ae33-1ba6be11a393/default/hello"
      ```

      It looks like nothing happened! In fact, an HTTP response code of `204 No Content` was returned which you can verify if you add the verbose flag `-v`:

      ```bash
      curl -v "https://us-south.functions.cloud.ibm.com/api/v1/web/2ca6a304-a717-4486-ae33-1ba6be11a393/default/hello"
      ```

      ```bash
      ...
      GET /api/v1/web/2ca6a304-a717-4486-ae33-1ba6be11a393/default/hello HTTP/2
      Host: us-south.functions.cloud.ibm.com
      User-Agent: curl/7.54.0
      Accept: */*
      * Connection state changed (MAX_CONCURRENT_STREAMS updated)!
      HTTP/2 204
      ...
      ```

{% hint style="info" %}
This unexpected result occurred because you need to tell ICF what `content-type` you expect the function to return since the function did not explicitly set one.
{% endhint %}

4. Invoke the web action URL with a JSON extension using the `curl` command.

     To signal ICF to set the `content-type` to `application/json` on the HTTP response, you need to add `.json` after the action name, at the end of the URL. Try invoking it now:

      ```bash
      curl "https://us-south.functions.cloud.ibm.com/api/v1/web/2ca6a304-a717-4486-ae33-1ba6be11a393/default/hello.json"
      ```

      You now get a successful HTTP response in JSON format which matches the `.json` extension you added:

      ```json
      {
         "message": "Hello, undefined from Rivendell"
      }
      ```

## Requests with query parameters

Additionally, you can invoke web actions with query parameters.

1. Use curl to invoke the `hello` web action with a `name` query parameter:

      ```bash
      curl "https://us-south.functions.cloud.ibm.com/api/v1/web/2ca6a304-a717-4486-ae33-1ba6be11a393/default/hello.json?name=Josephine"
      ```

      ```json
      {
         "message": "Hello, Josephine from Rivendell"
      }
      ```

      If you have been following all the exercises in this course, you will see that the `place` parameter has a default value bound to it.

2. Now, try to invoke the `hello` web action with both a `name` and `place` query parameters:

      ```bash
      curl "https://us-south.functions.cloud.ibm.com/api/v1/web/2ca6a304-a717-4486-ae33-1ba6be11a393/default/hello.json?name=Josephine&place=Austin"
      ```

      ```bash
      {
          "code": "5675a20dbab5e05445d2a55b38236946",
          "error": "Request defines parameters that are not allowed (e.g., reserved properties)."
      }
      ```

      This error is because web actions, by default, finalize (protect) all bound parameters, making them protected from changes on HTTP requests. In this case, the `place` parameter was bound to the value `Rivendell`.

3. Set the `final` annotation to `false`:

      ```bash
      ibmcloud fn action update hello -a final false
      ```

      ```bash
      ok: updated action hello
      ```

      This will override the default protection on bound parameters.

4. Retry the previous invocation with both query parameters:

      ```bash
      curl "https://us-south.functions.cloud.ibm.com/api/v1/web/2ca6a304-a717-4486-ae33-1ba6be11a393/default/hello.json?name=Josephine&place=Austin"
      ```

      ```bash
      {
          "payload": "Hello, Josephine from Austin"
      }
      ```

<!-- ## Disable web action support (we cannot disable as we use this in API create...)

1. Update the action to set the `--web` flag to `false`:

      ```bash
      ibmcloud fn action update hello --web false
      ```

      ```bash
      ok: updated action hello
      ```

2. Verify the action is no longer externally accessible:

      ```bash
      curl "https://us-south.functions.cloud.ibm.com/api/v1/web/2ca6a304-a717-4486-ae33-1ba6be11a393/default/hello.json"
      ```

      ```json
      {
        "error": "The requested resource does not exist.",
        "code": "1dfc1f7cb457ed4bb1f2978fc75bd31f"
      }
      ``` -->

## Content types and extensions

Web actions invoked through the platform API either have to set the HTTP response header's `content-type` explicitly within the action function or the caller must append a content extension on the URL so the platform will set the `content-type` on the function's behalf.

The platform supports the following content type extensions: `.json`, `.html`, `.http`, `.svg` or `.text` for the request. If no content extension is provided, the platform defaults to `.http`.

In most cases, it is advisable to have the web action set the content type explicitly when possible.

## HTTP request properties

All web actions created using the `--web` flag are also treated as `http` actions, meaning they can be called with different HTTP methods like GET, POST, or DELETE.

HTTP web actions, when invoked, also receive additional HTTP request details as parameters to the action input argument. These include:

1. `__ow_method` \(type: string\): The HTTP method of the request.
2. `__ow_headers` \(type: map string to string\): The request headers.
3. `__ow_path` \(type: string\): The unmatched path of the request \(matching stops after consuming the action extension\).
4. `__ow_body` \(type: string\): The request body entity, as a base64 encoded string when content is binary or JSON object/array, or plain string otherwise. Only present if handling raw HTTP requests, or when the HTTP request entity is not a JSON object or form data.
5. `__ow_query` \(type: string\): The query parameters from the request as an unparsed string. Click [here](https://github.com/apache/openwhisk/blob/master/docs/webactions.md#raw-http-handling) for more information.
6. `__ow_user` \(type: string\): The namespace identifying the ICF authenticated subject. Only present if the `require-whisk-auth` annotation is set. Click [here](https://github.com/apache/openwhisk/blob/master/docs/annotations.md#annotations-specific-to-web-action) for more information.

Web actions otherwise receive query and body parameters as first class properties in the action arguments. Body parameters take precedence over query parameters, which in turn take precedence over action and package parameters.

{% hint style="tip" %}
Web actions can also be [enabled to handle raw HTTP requests](https://cloud.ibm.com/docs/openwhisk?topic=cloud-functions-actions_web#actions_web_raw_enable). This setting allows the function to directly manage the raw HTTP query string and body content, meaning the actions can receive and process `content-types` other than JSON objects.
{% endhint %}

## Control HTTP responses

Web actions can return a JSON object with the following properties to directly control the HTTP response returned to the client:

1. `headers`: A JSON object where the keys are header names and the values are string, number, or boolean values for those headers \(default is no headers\). To send multiple values for a single header, the header's value should be a JSON array of values.
2. `statusCode`: A valid HTTP status code \(default is 200 OK if body is not empty otherwise 204 No Content\).
3. `body`: A string which is either plain text, JSON object or array, or a base64 encoded string for binary data \(default is empty response\).

The `body` is considered empty if it is `null`, the empty string `""`, or undefined.

If a `content-type` header value is not declared in the action result’s `headers`, the body is interpreted as `application/json` for non-string values and `text/html` otherwise. When the `content-type` is defined, the controller will determine if the response is binary data or plain text and decode the string using a base64 decoder as needed. Should the body fail to decode correctly, an error is returned to the caller.

## Additional features of web actions

Web actions have many more features. See the sICF [documentation](https://cloud.ibm.com/docs/openwhisk?topic=cloud-functions-actions_web) for full details on all these capabilities.

### Example - HTTP redirect

1. Create a new web action from the following source code in `redirect.js`:

      ```javascript
      function main() {
            return {
                  headers: { location: "https://openwhisk.apache.org/" },
                  statusCode: 302
            };
      }
      ```

      ```bash
      ibmcloud fn action create redirect redirect.js --web true
      ```

      ```bash
      ok: created action redirect
      ```

2. Retrieve the URL for a new web action:

      ```bash
      ibmcloud fn action get redirect --url
      ```

      ```bash
      ok: got action redirect
      https://us-south.functions.cloud.ibm.com/api/v1/web/2ca6a304-a717-4486-ae33-1ba6be11a393/default/redirect
      ```

3. Check that the HTTP response is indeed an HTTP redirect:

      ```bash
      curl -v "https://us-south.functions.cloud.ibm.com/api/v1/web/2ca6a304-a717-4486-ae33-1ba6be11a393/default/redirect"
      ```

      ```bash
      ...
      < HTTP/1.1 302 Found
      < X-Backside-Transport: OK OK
      < Connection: Keep-Alive
      < Transfer-Encoding: chunked
      < Server: nginx/1.11.13
      < Date: Fri, 23 Feb 2018 11:23:24 GMT
      < Access-Control-Allow-Origin: *
      < Access-Control-Allow-Methods: OPTIONS, GET, DELETE, POST, PUT, HEAD, PATCH
      < Access-Control-Allow-Headers: Authorization, Content-Type
      < location: https://openwhisk.apache.org/
      ...
      ```

4. Now try the URL in a browser.

      Did your action successfully redirect to the Apache OpenWhisk project website?

## Web actions with non JSON content types

This section includes a few examples of web actions returning other content types. You can follow along by trying these examples in your browser.

### Example: HTML response

1. Create a new web action named `html` from the following source code in html.js:

      ```javascript
      function main() {
         let html = '<html><body><h3><span style="color:red;">Hello World!</span></h3></body></html>'
         return { headers: { "Content-Type": "text/html" },
                  statusCode: 200,
                  body: html };
      }
      ```

      ```bash
      ibmcloud fn action create html html.js --web true
      ```

      ```bash
      ok: created action html
      ```

2. Retrieve the URL for the web action:

      ```bash
      ibmcloud fn action get html --url
      ```

      ```bash
      ok: got action html
      https://us-south.functions.cloud.ibm.com/api/v1/web/2ca6a304-a717-4486-ae33-1ba6be11a393/default/html
      ```

3. Check that the HTTP response is HTML and copy and paste that into your browser:

      ```bash
      curl "https://us-south.functions.cloud.ibm.com/api/v1/web/2ca6a304-a717-4486-ae33-1ba6be11a393/default/html"
      ```

      ```html
      <html><body>Hello World!</body></html>
      ```

### Example: SVG Response

1. Create a new web action named `atom` that has the following code that includes base64-encoded SVG content in the `body`:

      ```javascript
      // The SVG XML image source has been base64 encoded in the "body" param below:
      function main() {
         return { headers: { 'Content-Type': 'image/svg+xml' },
            statusCode: 200,
            body: `PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9Ii01MiAtNTMgMTAwIDEwMCIgc3Ryb2tlLXdpZHRoPSIyIj4NCiA8ZyBmaWxsPSJub25lIj4NCiAgPGVsbGlwc2Ugc3Ryb2tlPSIjNjY4OTlhIiByeD0iNiIgcnk9IjQ0Ii8+DQogIDxlbGxpcHNlIHN0cm9rZT0iI2UxZDg1ZCIgcng9IjYiIHJ5PSI0NCIgdHJhbnNmb3JtPSJyb3RhdGUoLTY2KSIvPg0KICA8ZWxsaXBzZSBzdHJva2U9IiM4MGEzY2YiIHJ4PSI2IiByeT0iNDQiIHRyYW5zZm9ybT0icm90YXRlKDY2KSIvPg0KICA8Y2lyY2xlICBzdHJva2U9IiM0YjU0MWYiIHI9IjQ0Ii8+DQogPC9nPg0KIDxnIGZpbGw9IiM2Njg5OWEiIHN0cm9rZT0id2hpdGUiPg0KICA8Y2lyY2xlIGZpbGw9IiM4MGEzY2YiIHI9IjEzIi8+DQogIDxjaXJjbGUgY3k9Ii00NCIgcj0iOSIvPg0KICA8Y2lyY2xlIGN4PSItNDAiIGN5PSIxOCIgcj0iOSIvPg0KICA8Y2lyY2xlIGN4PSI0MCIgY3k9IjE4IiByPSI5Ii8+DQogPC9nPg0KPC9zdmc+`
         };
      }
      ```

      ```bash
      ibmcloud fn action create atom atom.js --web true
      ```

      ```bash
      ok: updated action atom
      ```

2. Get the URL for the new atom web action:

      ```bash
      ibmcloud fn action get atom --url
      ```

      ```bash
      ok: got action atom
      https://us-south.functions.cloud.ibm.com/api/v1/web/josephine.watson%40us.ibm.com_ns/default/atom
      ```

3. Copy and paste that URL into your browser to see the image!

      <!--
      #######################################################
      TODO: Figure out how to add width="20%" to SVG images.
      #######################################################
      -->
      ![atom.svg](images/atom.svg)

{% hint style="info" %}
If you want to see the unencoded SVG XML source, you can save the image file to your local computer and view it in a text editor.
{% endhint %}

### Example: Manual JSON response

If our function is only able to return a response in JSON, you can set the `content-type` manually in the function. This is so the caller doesn’t need to append `.json` to the URL.

1. Create a new web action from the following source code called `manual.js`:

      ```javascript
      function main(params) {
            return {
               statusCode: 200,
               headers: { 'Content-Type': 'application/json' },
               body: params
            };
      }
      ```

      ```bash
      ibmcloud fn action create manual manual.js --web true
      ```

      ```bash
      ok: created action manual
      ```

2. Retrieve the URL for a new web action:

      ```bash
      ibmcloud fn action get manual --url
      ```

      ```bash
      ok: got action manual
      https://us-south.functions.cloud.ibm.com/api/v1/web/2ca6a304-a717-4486-ae33-1ba6be11a393/default/manual
      ```

3. Check that the HTTP response is JSON and the HTTP method is `get`:

      ```bash
      curl "https://us-south.functions.cloud.ibm.com/api/v1/web/2ca6a304-a717-4486-ae33-1ba6be11a393/default/manual?hello=world"
      ```

      ```json
      {
        "__ow_headers": {
          "accept": "*/*",
          "accept-encoding": "gzip",
          "cdn-loop": "cloudflare",
          "cf-connecting-ip": "47.220.174.18",
          "cf-ipcountry": "US",
          "cf-ray": "5889fd324e5057cf-DFW",
          "cf-request-id": "024a1c9369000057cf67a37200000001",
          "cf-visitor": "{\"scheme\":\"https\"}",
          "host": "us-south.functions.cloud.ibm.com",
          "user-agent": "curl/7.54.0",
          "x-forwarded-for": "47.220.174.20, 172.69.69.221",
          "x-forwarded-host": "us-south.functions.cloud.ibm.com",
          "x-forwarded-port": "443",
          "x-forwarded-proto": "https",
          "x-global-k8fdic-transaction-id": "d50c08e4b616c6ad8ad0dd95e41be4e3",
          "x-real-ip": "172.69.69.221",
          "x-request-id": "d50c08e4b616c6ad8ad0dd95e41be4e3"
        },
        "__ow_method": "get",
        "__ow_path": ""
      }
      ```

4. Try calling it with an HTTP POST method and with a URI path:

      ```bash
      curl -XPOST "https://us-south.functions.cloud.ibm.com/api/v1/web/2ca6a304-a717-4486-ae33-1ba6be11a393/default/manual/subpath?hello=world"
      ```

      ```json
      {
          "__ow_headers": {
          "accept": "*/*",
          ...
        },
        "__ow_method": "post",
        "__ow_path": "/subpath",
        "hello": "world"
      }
      ```

      As you can see, the `__ow_method` and `__ow_path` reflected the URL changes and the parameter passed in the HTTP query string was indeed provided in the JSON.

{% hint style="success" %}
Aren’t web actions cool? They are a great feature that allows you to make you’re actions accessible on the web while controlling content types.  You can even generate HTML and other website content on the fly without hosting a content server!
{% endhint %}

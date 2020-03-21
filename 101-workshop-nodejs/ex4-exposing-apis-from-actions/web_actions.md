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

# Web Actions

Web actions are actions which can be called externally using the HTTP protocol from clients like `curl` or web browsers.  IBM Cloud Functions provides a simple flag, `--web true`, which will cause it to automatically create an HTTP accessible URL (endpoint) for any action.

Let's turn the `hello` action into a `"web action"`!

1. Update the action to set the `--web` flag to `true`.

      ```bash
      ibmcloud fn action update hello --web true
      ```

      ```bash
      ok: updated action hello
      ```

      The `hello` action has now been assigned an HTTP endpoint.

2. Retrieve the web action's URL exposed by the platform for the `hello` action.

      ```bash
      ibmcloud fn action get hello --url
      ```

      ```bash
      ok: got action hello
      https://us-south.functions.cloud.ibm.com/api/v1/web/2ca6a304-a717-4486-ae33-1ba6be11a393/default/hello

      ```

3. Invoke the web action URL returned using the `curl` command.

      ```bash
      curl "https://us-south.functions.cloud.ibm.com/api/v1/web/2ca6a304-a717-4486-ae33-1ba6be11a393/default/hello"
      ```

      It looks like nothing happened!  In fact, an HTTP response code of `204 No Content` was returned!

      ```bash
      &nbsp;
      ```

      This is because we need to tell IBM Cloud Functions what content type we expect the function to return...

4. Invoke the web action URL with a JSON extension using the `curl` command.

     To do this we need to add `.json` after the action name, at the end of the URL, to tell ICF we want a JSON object returned. Try it invoking it now:

      ```bash
      curl "https://us-south.functions.cloud.ibm.com/api/v1/web/2ca6a304-a717-4486-ae33-1ba6be11a393/default/hello.json"
      ```

      We now get a successful HTTP response in JSON format which matches the `.json` extension we added:

      ```json
      {
         "message": "Hello undefined from undefined!"
      }
      ```

      Additionally, we can invoke it with query parameters for `name` and `place`:

      ```bash
      curl "https://us-south.functions.cloud.ibm.com/api/v1/web/2ca6a304-a717-4486-ae33-1ba6be11a393/default/hello.json?name=Josephine&place=Austin"
      ```

      ```json
      {
         "message": "Hello Josephine from Austin!"
      }
      ```

5. Disable web action support.

      ```bash
      ibmcloud fn action update hello --web false
      ```

      ```bash
      ok: updated action hello
      ```

6. Verify the action is no longer externally accessible.

      ```bash
      curl "https://us-south.functions.cloud.ibm.com/api/v1/web/2ca6a304-a717-4486-ae33-1ba6be11a393/default/hello.json?name=Josephine&place=Austin"
      ```

      ```json
      {
        "error": "The requested resource does not exist.",
        "code": "1dfc1f7cb457ed4bb1f2978fc75bd31f"
      }
      ```

## Content extensions

Web actions invoked through the platform API need a content extension to tell the platform how to interpret the content returned from the action. In the example above, we were using the `.json` extension. This tells the platform to serialize the return value out to a JSON response.

The platform supports the following content-types: `.json`, `.html`, `.http`, `.svg` or `.text`. If no content extension is provided, it defaults to `.http` which gives the action full control of the HTTP response.

## HTTP request properties

All web actions, when invoked, receive additional HTTP request details as parameters to the action input argument. These include:

1. `__ow_method` \(type: string\). the HTTP method of the request.
2. `__ow_headers` \(type: map string to string\): A the request headers.
3. `__ow_path` \(type: string\): the unmatched path of the request \(matching stops after consuming the action extension\).
4. `__ow_user` \(type: string\): the namespace identifying the OpenWhisk authenticated subject
5. `__ow_body` \(type: string\): the request body entity, as a base64 encoded string when content is binary or JSON object/array, or plain string otherwise
6. `__ow_query` \(type: string\): the query parameters from the request as an unparsed string

The `__ow_user` is only present when the web action is [annotated to require authentication](https://github.com/apache/openwhisk/blob/master/docs/annotations.md#annotations-specific-to-web-actions) and allows a web action to implement its own authorization policy. The `__ow_query` is available only when a web action elects to handle the ["raw" HTTP request](https://github.com/apache/openwhisk/blob/master/docs/webactions.md#raw-http-handling). It is a string containing the query parameters parsed from the URI \(separated by `&`\). The `__ow_body` property is present either when handling "raw" HTTP requests, or when the HTTP request entity is not a JSON object or form data. Web actions otherwise receive query and body parameters as first class properties in the action arguments with body parameters taking precedence over query parameters, which in turn take precedence over action and package parameters.

## Controlling HTTP responses

Web actions can return a JSON object with the following properties to directly control the HTTP response returned to the client.

1. `headers`: a JSON object where the keys are header-names and the values are string, number, or boolean values for those headers \(default is no headers\). To send multiple values for a single header, the header's value should be a JSON array of values.
2. `statusCode`: a valid HTTP status code \(default is 200 OK if body is not empty otherwise 204 No Content\).
3. `body`: a string which is either plain text, JSON object or array, or a base64 encoded string for binary data \(default is empty response\).

The `body` is considered empty if it is `null`, the empty string `""` or undefined.

If a `content-type header` is not declared in the action result’s `headers`, the body is interpreted as `application/json` for non-string values, and `text/html` otherwise. When the `content-type` is defined, the controller will determine if the response is binary data or plain text and decode the string using a base64 decoder as needed. Should the body fail to decoded correctly, an error is returned to the caller.

## Additional features

Web actions have a [lot more features](https://github.com/apache/openwhisk/blob/master/docs/webactions.md), see the documentation for full details on all these capabilities.

## Example - HTTP redirect

1. Create a new web action from the following source code in `redirect.js`.

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

2. Retrieve URL for new web action

      ```bash
      ibmcloud fn action get redirect --url
      ```

      ```bash
      ok: got action redirect
      https://us-south.functions.cloud.ibm.com/api/v1/web/2ca6a304-a717-4486-ae33-1ba6be11a393/default/redirect
      ```

3. Check that the HTTP response is indeed an HTTP redirect.

      ```bash
      curl -v https://us-south.functions.cloud.ibm.com/api/v1/web/2ca6a304-a717-4486-ae33-1ba6be11a393/default/redirect
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

4. Now try the URL in a browser...

      _What website do you see?_

## Example: HTML response

1. Create a new web action from the following source code in html.js.

      ```javascript
      function main() {
         let html = "<html><body><h3><span style="color:red;">Hello World!</span></h3></body></html>"
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

2. Retrieve the URL for the web action

      ```bash
      ibmcloud fn action get html --url
      ```

      ```bash
      ok: got action html
      https://us-south.functions.cloud.ibm.com/api/v1/web/2ca6a304-a717-4486-ae33-1ba6be11a393/default/html
      ```

3. Check HTTP response is HTML and we should copy/paste that into our browser.

      ```bash
      curl https://us-south.functions.cloud.ibm.com/api/v1/web/2ca6a304-a717-4486-ae33-1ba6be11a393/default/html
      ```

      ```html
      <html><body>Hello World!</body></html>
      ```

## Example: SVG Response

1. Create a new function that has the SVG base64 encoded as the body

      ```javascript
      // The "svg" that is base64 encoded in the "body" param below:
      // <svg xmlns="http://www.w3.org/2000/svg" viewBox="-52 -53 100 100" stroke-width="2">
      //  <g fill="none">
      //   <ellipse stroke="#66899a" rx="6" ry="44"/>
      //   <ellipse stroke="#e1d85d" rx="6" ry="44" transform="rotate(-66)"/>
      //   <ellipse stroke="#80a3cf" rx="6" ry="44" transform="rotate(66)"/>
      //   <circle  stroke="#4b541f" r="44"/>
      //  </g>
      //  <g fill="#66899a" stroke="white">
      //   <circle fill="#80a3cf" r="13"/>
      //   <circle cy="-44" r="9"/>
      //   <circle cx="-40" cy="18" r="9"/>
      //   <circle cx="40" cy="18" r="9"/>
      //  </g>
      // </svg>
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

2. Get the URL for the new atom web action

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

## Example: Manual JSON response

If our function is only able to return a response in JSON, we can set the `content-type` manually in the function so the caller need not append `.json` to the URL.

1. Create a new web action from the following source code called `manual.js`.

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

2. Retrieve URL for new web action

      ```bash
      ibmcloud fn action get manual --url
      ```

      ```bash
      ok: got action manual
      https://us-south.functions.cloud.ibm.com/api/v1/web/2ca6a304-a717-4486-ae33-1ba6be11a393/default/manual
      ```

3. Check HTTP response is JSON.

      ```bash
      curl https://us-south.functions.cloud.ibm.com/api/v1/web/2ca6a304-a717-4486-ae33-1ba6be11a393/default/manual?hello=world
      ```

      ```json
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

      ```bash
      curl -XPOST https://us-south.functions.cloud.ibm.com/api/v1/web/2ca6a304-a717-4486-ae33-1ba6be11a393/default/manual/subpath?hello=world
      ```

      ```json
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
      }
      ```

{% hint style="success" %}
🎉 **Web Actions are cool!** Web Actions are an awesome feature allowing you make your Actions accessible on the web while controlling Content Types.  You can even generate HTML and other website content "on-the-fly" without hosting a content server!
{% endhint %}

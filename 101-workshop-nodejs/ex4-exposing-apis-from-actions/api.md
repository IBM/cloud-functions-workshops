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

# API Management of Web Actions

Let's now show how these web actions can be turned into an API using the [API Gateway](https://cloud.ibm.com/docs/openwhisk?topic=cloud-functions-apigateway). First we will choose `/myapi` as the base path. This is the part of the path before the actual endpoint. For example: `example.com/basepath/endpoint`. This is useful for grouping endpoints together in a logical way and is how IBM Cloud Functions organizes your endpoints into a single API.

## Creating an API

To create an API you would use the we will run the following command syntax:

```bash
ibmcloud fn api create BASE_PATH API_PATH API_VERB ACTION
```

{% hint style="warning" %}
**The example above is merely an example of the syntax used to create an API endpoint and should not be run.**
{% endhint %}

### Hello Endpoint

First we will create the `hello` endpoint. Note that all actions used in an API must be web actions, so we mustn't forget to run `ibmcloud fn action update hello --web true` prior to following commands below.

1. Run the following command to create a simple GET endpoint for the hello action

    ```bash
    ibmcloud fn api create /myapi /foo get hello
    ```

    ```bash
    ok: created API /myapi/foo GET for action /_/hello
    https://service.us.apiconnect.ibmcloud.com/gws/apigateway/api/aac6bc4a6f94f19dd008e64513b62bf155af5703a95a142f0c9a6ea83af81300/myapi/foo
    ```

2. Check to see the API was created

    ```bash
    ibmcloud fn api list
    ```

    ```bash
    ok: APIs
    Action                                     Verb  API Name  URL
    /joesphine.watson@gmail.com_ns/hello        get    /myapi  https://service.us.apiconnect.ibmcloud.com/gws/apigateway/api/d9903f40439f1a268b7dcbac42a389cdde605f3f3bef57f69789be6df438361e/myapi/hello
    ```

3. Now lets invoke that API via curl

    ```bash
    curl https://service.us.apiconnect.ibmcloud.com/gws/apigateway/api/aac6bc4a6f94f19dd008e64513b62bf155af5703a95a142f0c9a6ea83af81300/myapi/foo
    ```

    ```json
    {
    "greeting": "Hello, undefined from undefined"
    }
    ```

We will now create endpoints for the other web actions created in the previous section.

### Other Response Types

We must be remember that, by default, IBM Cloud Functions expects a functions return content type will be JSON. Since for the remaining functions this is not the case, we must be mindful to set the appropriate response types with the `--response-type <TYPE>` flag. Valid type values include `http`, `json`, `text`, and `svg`.

1. Create the endpoint for the http endpoint

    ```bash
    ibmcloud fn api create /myapi /redirect get redirect --response-type http
    ```

    ```bash
    ok: created API /myapi/redirect GET for action /_/redirect
    https://service.us.apiconnect.ibmcloud.com/gws/apigateway/api/d9903f40439f1a268b7dcbac42a389cdde605f3f3bef57f69789be6df438361e/myapi/redirect
    ```

2. Check to make sure that the redirect works

    ```bash
    curl https://service.us.apiconnect.ibmcloud.com/gws/apigateway/api/d9903f40439f1a268b7dcbac42a389cdde605f3f3bef57f69789be6df438361e/myapi/redirect
    ```

    ```bash
    ...
    < HTTP/1.1 302 Found
    < Date: Wed, 20 Nov 20xx 16:04:09 GMT
    < Content-Type: text/plain
    < Content-Length: 0
    < Connection: keep-alive
    < Set-Cookie: __cfduid=d8e6927590dacedec6ea476916d381c781574265849; expires=Fri, 20-Dec-19 16:04:09 GMT; path=/; domain=.functions.cloud.ibm.com; HttpOnly
    < X-Request-ID: fb4b9e9f86b058fa1cf2f990be22a8da
    < Access-Control-Allow-Origin: *
    < Access-Control-Allow-Methods: GET, POST, PUT, DELETE, PATCH, HEAD, OPTIONS
    < Access-Control-Allow-Headers: Authorization, Origin, X-Requested-With, Content-Type, Accept, User-Agent
    < x-openwhisk-activation-id: 24b94b370cf049e2b94b370cf0e9e207
    < location: http://openwhisk.org
    < IBM_Cloud_Functions: OpenWhisk
    < CF-Cache-Status: DYNAMIC
    < Expect-CT: max-age=604800, report-uri="https://report-uri.cloudflare.com/cdn-cgi/beacon/expect-ct"
    < CF-RAY: 538ba8760c57c7c1-DEN
    < Access-Control-Allow-Credentials: true
    < X-Request-Id: 4Gk6GDz6VV2xHVwrOtJbsfS5UQuot5gI
    ...
    ```

3. Create the endpoint for the `html` action

    ```bash
    ibmcloud fn api create /myapi /html get html --response-type http
    ```

    ```bash
    ok: created API /myapi/html GET for action /_/html
    https://service.us.apiconnect.ibmcloud.com/gws/apigateway/api/d9903f40439f1a268b7dcbac42a389cdde605f3f3bef57f69789be6df438361e/myapi/html
    ```

4. Check the endpoints output

    ```bash
    curl https://service.us.apiconnect.ibmcloud.com/gws/apigateway/api/d9903f40439f1a268b7dcbac42a389cdde605f3f3bef57f69789be6df438361e/myapi/html
    ```

    ```html
    <html><body><h3><span style="color:red">Hello World!</span></h3></body></html>
    ```

5. Create the endpoint for the atom svg action

    ```bash
    ibmcloud fn api create /myapi /atom get atom --response-type http
    ```

    ```bash
    ok: created API /myapi/atom GET for action /_/atom
    https://service.us.apiconnect.ibmcloud.com/gws/apigateway/api/d9903f40439f1a268b7dcbac42a389cdde605f3f3bef57f69789be6df438361e/myapi/atom
    ```

6. Test out the action by copy/pasting the endpoint into your browser of choice.

    _What do you see?_

7. Finally we create a PUT endpoint for the manual JSON action

    ```bash
    ibmcloud fn api create /myapi /manual put manual --response-type json
    ```

    ```bash
    ok: created API /myapi/manual PUT for action /_/manual
    https://service.us.apiconnect.ibmcloud.com/gws/apigateway/api/d9903f40439f1a268b7dcbac42a389cdde605f3f3bef57f69789be6df438361e/myapi/manual
    ```

8. Test the output of the PUT action

    ```bash
    curl -XPUT https://service.us.apiconnect.ibmcloud.com/gws/apigateway/api/d9903f40439f1a268b7dcbac42a389cdde605f3f3bef57f69789be6df438361e/myapi/manual\?hello\=world
    ```

    ```json
    {
        body: {
            "__ow_method": "put",
            "__ow_path": "",
            "hello": "world"
        },
        "headers": {
            "Content-Type": "application/json"
        },
        "statusCode": 200
    }
    ```

9. Test that a GET request does not work since we have not set up a GET endpoint

    ```bash
    curl -XGET https://service.us.apiconnect.ibmcloud.com/gws/apigateway/api/d9903f40439f1a268b7dcbac42a389cdde605f3f3bef57f69789be6df438361e/myapi/manual\?hello\=world
    ```

    ```json
    {"status":404,"message":"Error: Whoops. Verb not supported."}
    ```

10. Let's take stock of our API by listing out all the endpoints:

    ```bash
    ibmcloud fn api list
    ```

    ```bash
    ok: APIs
    Action                                     Verb  API Name  URL
    /josephine.watson@gmail.com_ns/hello        get    /myapi  https://service.us.apiconnect.ibmcloud.com/gws/apigateway/api/d9903f40439f1a268b7dcbac42a389cdde605f3f3bef57f69789be6df438361e/myapi/hello
    /josephine.watson@gmail.com_ns/html         get    /myapi  https://service.us.apiconnect.ibmcloud.com/gws/apigateway/api/d9903f40439f1a268b7dcbac42a389cdde605f3f3bef57f69789be6df438361e/myapi/html
    /josephine.watson@gmail.com_ns/manual       put    /myapi  https://service.us.apiconnect.ibmcloud.com/gws/apigateway/api/d9903f40439f1a268b7dcbac42a389cdde605f3f3bef57f69789be6df438361e/myapi/manual
    /josephine.watson@gmail.com_ns/redirect     get    /myapi  https://service.us.apiconnect.ibmcloud.com/gws/apigateway/api/d9903f40439f1a268b7dcbac42a389cdde605f3f3bef57f69789be6df438361e/myapi/redirect
    /josephine.watson@gmail.com_ns/atom         get    /myapi  https://service.us.apiconnect.ibmcloud.com/gws/apigateway/api/d9903f40439f1a268b7dcbac42a389cdde605f3f3bef57f69789be6df438361e/myapi/atom
    ```

## Using OpenAPI Specification

As we can begin to tell, as the number of API endpoints increases, documenting and managing them becomes increasingly difficult. One solution to this to use the [OpenAPI Specification](https://swagger.io/specification/). This has a plethora of tools around for documenting, creating stub projects, etc in a variety of languages. And it is supported by IBM Cloud Functions!

1. View the OpenAPI Specification for `myapi` using the following command:

    ```bash
    ibmcloud fn api get /myapi
    ```

    You should see a long JSON document that starts something like:

    ```json
    {
        "swagger": "2.0",
        "basePath": "/myapi",
        "info": {
            "title": "/myapi",
            "version": "1.0.0"
        },
        ...
    }
    ```

2. We will want to write that to a file with:

    ```bash
    ibmcloud fn api get /myapi > myapi.json
    ```

Now we can delete the existing API we have created and restore using this document:

    1. Delete the existing API

    ```bash
    ibmcloud fn api delete /myapi
    ```

    ```bash
    ok: deleted API /myapi
    ```

    2. Check that the endpoints are gone

    ```bash
    ibmcloud fn api list
    ```

    ```bash
    ok: APIs
    Action                            Verb             API Name  URL
    ```

3. Restore the endpoints from the OpenAPI Specification

    ```bash
    ibmcloud fn api create -c myapi.json
    ```

    ```bash
    ok: created API /myapi/redirect get for action /josephine.watson@gmail.com_ns/redirect
    https://service.us.apiconnect.ibmcloud.com/gws/apigateway/api/d9903f40439f1a268b7dcbac42a389cdde605f3f3bef57f69789be6df438361e/myapi/redirect
    ok: created API /myapi/hello get for action /josephine.watson@gmail.com_ns/hello
    https://service.us.apiconnect.ibmcloud.com/gws/apigateway/api/d9903f40439f1a268b7dcbac42a389cdde605f3f3bef57f69789be6df438361e/myapi/hello
    ok: created API /myapi/html get for action /josephine.watson@gmail.com_ns/html
    https://service.us.apiconnect.ibmcloud.com/gws/apigateway/api/d9903f40439f1a268b7dcbac42a389cdde605f3f3bef57f69789be6df438361e/myapi/html
    ok: created API /myapi/manual put for action /josephine.watson@gmail.com_ns/manual
    https://service.us.apiconnect.ibmcloud.com/gws/apigateway/api/d9903f40439f1a268b7dcbac42a389cdde605f3f3bef57f69789be6df438361e/myapi/manual
    ok: created API /myapi/atom get for action /josephine.watson@gmail.com_ns/atom
    https://service.us.apiconnect.ibmcloud.com/gws/apigateway/api/d9903f40439f1a268b7dcbac42a389cdde605f3f3bef57f69789be6df438361e/myapi/atom
    ```

4. We can now see that endpoints are restored

    ```bash
    ibmcloud fn api list
    ```

    ```bash
    ok: APIs
    Action                                     Verb  API Name  URL
    /josephine.watson@gmail.com_ns/atom         get    /myapi  https://service.us.apiconnect.ibmcloud.com/gws/apigateway/api/d9903f40439f1a268b7dcbac42a389cdde605f3f3bef57f69789be6df438361e/myapi/atom
    /josephine.watson@gmail.com_ns/hello        get    /myapi  https://service.us.apiconnect.ibmcloud.com/gws/apigateway/api/d9903f40439f1a268b7dcbac42a389cdde605f3f3bef57f69789be6df438361e/myapi/hello
    /josephine.watson@gmail.com_ns/html         get    /myapi  https://service.us.apiconnect.ibmcloud.com/gws/apigateway/api/d9903f40439f1a268b7dcbac42a389cdde605f3f3bef57f69789be6df438361e/myapi/html
    /josephine.watson@gmail.com_ns/manual       put    /myapi  https://service.us.apiconnect.ibmcloud.com/gws/apigateway/api/d9903f40439f1a268b7dcbac42a389cdde605f3f3bef57f69789be6df438361e/myapi/manual
    /josephine.watson@gmail.com_ns/redirect     get    /myapi  https://service.us.apiconnect.ibmcloud.com/gws/apigateway/api/d9903f40439f1a268b7dcbac42a389cdde605f3f3bef57f69789be6df438361e/myapi/redirect
    ```

This OpenAPI Specification can now be stored in your code repository and used to update endpoints, documentation, or event generate stub code!

{% hint style="success" %}
🎉 **Congrats on successfully creating Serverless APIs!** As you can see, exposing and managing Serverless APIs takes minimal effort using IBM Cloud Functions and allows you full access control and use of the OpenAPI specification!
{% endhint %}

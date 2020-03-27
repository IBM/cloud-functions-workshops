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

# Other Endpoints
This is a supplementary document showing the creation of API endpoints for the web actions created in a previous section. This is not mandatory, but is included for completeness.

## HTML Endpoint
1. Create the endpoint for the `html` action

    ```bash
    ibmcloud fn api create /myapi /html get html --response-type http
    ```

    ```bash
    ok: created API /myapi/html GET for action /_/html
    https://service.us.apiconnect.ibmcloud.com/gws/apigateway/api/d9903f40439f1a268b7dcbac42a389cdde605f3f3bef57f69789be6df438361e/myapi/html
    ```
    
{% hint style="success" %}
**While the content-type of the response is text/html, we are still using a response type of http and not html!**
{% endhint %}

2. Check the endpoints output. You can copy/paste the url into your browser of choice to see the html rendered and curl it to see the raw html text.

    ```bash
    curl https://service.us.apiconnect.ibmcloud.com/gws/apigateway/api/d9903f40439f1a268b7dcbac42a389cdde605f3f3bef57f69789be6df438361e/myapi/html
    ```

    ```html
    <html><body><h3><span style="color:red">Hello World!</span></h3></body></html>
    ```

## SVG Endpoint
1. Create the endpoint for the atom svg action

    ```bash
    ibmcloud fn api create /myapi /atom get atom --response-type http
    ```

    ```bash
    ok: created API /myapi/atom GET for action /_/atom
    https://service.us.apiconnect.ibmcloud.com/gws/apigateway/api/d9903f40439f1a268b7dcbac42a389cdde605f3f3bef57f69789be6df438361e/myapi/atom
    ```

2. Test out the action by copy/pasting the endpoint into your browser of choice.

    _What do you see?_

## Creating an Endpoint with an PUT HTTP method

1. Finally we create a PUT endpoint for the manual JSON action

    ```bash
    ibmcloud fn api create /myapi /manual put manual --response-type json
    ```

    ```bash
    ok: created API /myapi/manual PUT for action /_/manual
    https://service.us.apiconnect.ibmcloud.com/gws/apigateway/api/d9903f40439f1a268b7dcbac42a389cdde605f3f3bef57f69789be6df438361e/myapi/manual
    ```

2. Test the output of the PUT action

    ```bash
    curl -XPUT https://service.us.apiconnect.ibmcloud.com/gws/apigateway/api/d9903f40439f1a268b7dcbac42a389cdde605f3f3bef57f69789be6df438361e/myapi/manual\?hello\=world
    ```

    ```json
    {
        "body": {
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

3. Test that a GET request does not work since we have not set up a GET endpoint

    ```bash
    curl -XGET https://service.us.apiconnect.ibmcloud.com/gws/apigateway/api/d9903f40439f1a268b7dcbac42a389cdde605f3f3bef57f69789be6df438361e/myapi/manual\?hello\=world
    ```

    ```json
    {"status":404,"message":"Error: Whoops. Verb not supported."}
    ```
You can define more than one HTTP method for a single endpoint, so it is possible to have different methods execute different web actions on the same endpoint.

{% hint style="success" %}
🎉 **Congrats on successfully creating Serverless APIs!** As you can see, exposing and managing Serverless APIs takes minimal effort using IBM Cloud Functions and allows you full access control and use of the OpenAPI specification!
{% endhint %}

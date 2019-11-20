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

# Concepts

## Web Actions

Cloud Function actions can be annotated with a special flag (i.e., `--web true`) at creation to convert them into "web actions". The result is the corresponding creation of a public URL that can be used to trigger the action from any web app.

Web actions can then also be invoked via HTTP requests without user authentication where the HTTP request parameters are automatically converted in event parameters. Values returned from the action are automatically serialized to a JSON response by default, but The platform supports returning additional  content-types such as `.html`, `.svg`, or `.http` where you can control the HTTP response headers and content directly.

{% hint style="warning" %}
If you want to implement user authentication, rate limiting, request routing, or if you are building high-traffic and enterprise APIs, the better choice is to use the Cloud Functions API Gateway features described in the next section.
{% endhint %}

{% hint style="info" %}
Find out more about [Web Actions](https://cloud.ibm.com/docs/openwhisk?topic=cloud-functions-actions_web).
{% endhint %}

## API Gateway

Cloud Functions comes with an integrated API Gateway service. This allows  developers to create new HTTP APIs which map incoming requests to actions.

The API Gateway handles capabilities like routing based on request properties \(URI paths and HTTP method\), user authentication, rate limiting and more. Developers do not need to implement this features within the web action code.


{% hint style="warning" %}
_**Note** Several of the extended features described above, along with [support of the OpenAPI specification](https://github.com/apache/openwhisk-apigateway#API) or "Swagger", are quite deep and outside of the scope of this workshop._
{% endhint %}

{% hint style="info" %}
Find out more about [API Gateway commands](https://cloud.ibm.com/docs/openwhisk?topic=cloud-functions-cli-plugin-functions-cli#cli_api) for Cloud Functions.
{% endhint %}

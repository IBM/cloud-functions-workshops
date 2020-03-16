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

# Serverless Deployment Models

## Functions or Containers

Serverless platforms typically support the management and deployment of Serverless functions either using

- **Functions directly** where the
  - Provider uses an orchestration system _optimized for Function-as-a-Service (FaaS)_.
  - Functions are loaded and run on pre-configured, language-specific runtimes.
- **pre-packaged Containers** where the
  - Provider uses _Container-as-a-Service (CaaS)_ container-orchestration platforms like [Kubernetes](https://kubernetes.io/) and treat them as single-function applications.
  - Developer must package functions within containers along with any necessary language dependencies and a service framework that can handle HTTP network requests, invoke the functions and return responses.

![Serverless Workloads can be Functions or Functions packaged in Containers](images/101-ex0-serverless-workloads.png)

## Packaging for Serverless FaaS

In general, with a FaaS Serverless implementation, the Developer needs only submit a single function and any dependencies (i.e., packages or libraries) that are not already "built in" to the language runtime the Serverless provider prepares.  This packaging step usually involves creating an archive format like ZIP or JAR (Java).

In these cases, the Serverless provider usually has "ready made" containers that not only contain system and language libraries for languages such as JavaScript (NodeJS), Python, Java and others, but also libraries support data transformation, network access and connections to databases and message queues.

#### Typical Packaging Steps

![Packaging functions for FaaS Platform](images/101-ex0-package-for-faas.png)

1. Write your Function in a language the FaaS platform supports.
2. Select the target language runtime and version. _See what additional libraries it may already include_.
3. _If needed, create an archive with Function and any additional libraries not supported by the runtime_.
4. Submit the function or archive to FaaS platform with selected runtime identifier. Typically, via a supported API client.

## Packaging for Serverless CaaS

With a Serverless platform that is designed for containers, the developer must select a base container and build their own microservice "stack" to host and run their function. This typically involves selecting a base "runtime" container for their language and version, selecting and installing a service framework that can support HTTP network connections, and install their function and dependent application libraries into that service framework and then export that function on an endpoint (route) that is compatible with the Serverless platform.

#### Additional responsibilities for CaaS functions

With the CaaS approach, other operational responsibilities now become the responsibility of the developer preparing the container. The developer must now be responsible for overall container security, and maintaining the versions of not only the base container, but also of their chosen service framework along with any supporting libraries.  In addition, plans may have to be made to support capturing function-level logs and metrics which normally would  be transparent with a FaaS approach.

#### Typical Packaging Steps

![Packaging functions for CaaS Platform](images/101-ex0-package-for-caas.png)

1. Write your function _and plan to host it using a language-specific service framework._
2. Select a base image from a repository with the language runtime version you desire.  _If able, select one that may have your service framework already installed._
3. Build your function, any supporting libraries needed and service framework if not already included.
4. Export your function as a service endpoint from your framework.
5. Submit resultant image to CaaS Serverless platform. This could be a direct submission or indirect from a supported image repository.

{% hint style="tip" %}
IBM Cloud Functions is a FaaS which runs functions amazingly fast, but also gives you the option to _**"bring your own Container" using a Docker SDK**_.  This feature allows you to create Docker containers optimized for any language with just the libraries and versions you need while exploring FaaS!
{% endhint %}

{% hint style="success" %}
Now you understand the general methods Serverless providers use to manage and scale your functions with FaaS or CaaS! _Find out more about [Preparing Apps for Actions](https://cloud.ibm.com/docs/openwhisk?topic=cloud-functions-prep) in IBM Cloud Functions._
{% endhint %}

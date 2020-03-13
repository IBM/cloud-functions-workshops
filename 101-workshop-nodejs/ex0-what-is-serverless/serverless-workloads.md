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
  - Provider uses an orchestration system optimized for Function-as-a-Service (FaaS)
  - Functions are loaded and run on pre-configured, language-specific runtimes
- **pre-packaged Containers** where the
  - Provider uses _Container-as-a-Service (CaaS)_ container-orchestration platforms like [Kubernetes](https://kubernetes.io/) and treat them as single-function applications.
  - Developer must package functions within containers along with any necessary language dependencies and a service framework that can handle HTTP network requests, invoke the functions and return responses.

![Serverless Workloads can be Functions or Functions packaged in Containers](images/101-ex0-serverless-workloads.png)

{% hint style="tip" %}
IBM Cloud Functions is a FaaS which runs functions amazingly fast, but also supports a _**"bring your own Container"**_ approach using a Docker SDK.  This allows you to create Docker containers optimized for any language with just the libraries and versions you need!

**ICF's container support provides a great way migrating your existing, containerized applications to Serverless**.
{% endhint %}

## Packaging for Serverless FaaS

In general, with a FaaS Serverless implementation, the Developer needs only submit a single function and any dependencies (i.e., packages or libraries) that are not already "built in" to the language runtime the Serverless provider prepares.  This packaging step usually involves creating an archive format like ZIP or JAR (Java).

In these cases the Serverless provider usually has "ready made" containers that not only contain system and language libraries for languages such as JavaScript (NodeJS), Python, Java and others, but also libraries support data transformation, network access and connections to databases and message queues.

## Packaging for Serverless CaaS

With a Serverless platform that is designed for containers, the developer must select a base container and build their own microservice "stack" to host and run their function. This typically involves selecting a base "runtime" container for their language and version, selecting and installing a service framework that can support accepting network connects, and install their function and dependent application libraries into that service framework.

This means that many operational responsibilities now become the problem of the developer. The developer must now be responsible for container security, and maintaining the versions of not only the base container, but of the framework itself and numerous more supporting libraries.  In addition, additional plans will have to be made if logging and monitoring are needed on the function which would likely be transparent with a FaaS.

{% hint style="success" %}
Now you understand the general methods Serverless providers use to manage and scale your functions with FaaS or CaaS!
{% endhint %}

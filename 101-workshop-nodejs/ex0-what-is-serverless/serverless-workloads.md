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
  - Developer must package functions within containers along with any necessary language dependencies and a service framework that can proxy network request and invoke the functions.

![Serverless Workloads can be Functions or Functions packaged in Containers](images/101-ex0-serverless-workloads.png)

{% hint style="success" %}
Now you understand the general methods Serverless providers use to manage and scale your functions with FaaS or CaaS!
{% endhint %}

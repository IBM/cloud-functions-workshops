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

# When to apply Serverless

## Serverless as the ultimate Microservice framework

If you have already moved towards deconstructing your monolithic applications to embrace microservices and reactive programming concepts, then Serverless should be viewed as the ultimate programming evolution towards realizing and optimizing these concepts as a computing service in a language-agnostic way.

### General patterns for Serverless

#### **Unpredictable / Aperiodic load**

That is, the number of requests to (or usage of) the functional service may varies widely and unpredictable over time. Hosting these cases as Serverless functions can be extremely cost-effective for both its PAYGO cost model, as well as its ability to automatically scale on-demand.

{% hint style="tip" %}
Most user-driven use cases, including data driven by workflows with human interactions, fall into this category.  Almost any functional services not under constant load qualify as Serverless candidates.
{% endhint %}

### Serverless Anti-patterns

#### **Functions under constant load**

Although IBM Cloud Functions can scale and keep up with large demands on Serverless functions; each functions is single use and therefore suffers "cold start" load times.

Cold start time includes starting a language runtime compatible with your function, as well as loading your function and starting it.

#### Long-running or non-separable tasks

For example:

- **Functions with lots of dependencies**

    If you are thinking of Serverless, then hopefully you are not trying to bring over large, monolithic application "chunks" and treat them as "functions".

    However, if you do have large functional services "cold start" times, as described above, are a primary consideration.  That is, some functions may have dependencies on frameworks, runtime libraries and other dependencies all of which must load on each request negating Serverless benefits.

- **Network intensive functions**

    Your PAYGO costs will go up if functions are waiting on (external) services to respond since you are paying for that idle time. Network timeouts are also a consideration when evaluating potential wait costs.

{% hint style="tip" %}
Please note that there are ways to recognize and mitigate against these anti-patterns, primarily using the same strategies used for event-driven microservices, which we will cover in more advanced courses.
{% endhint %}

## "Top 4" Serverless use cases

Although you can use Serverless to solve most problems, here are four general use cases Developers looking adopting Serverless should consider.

### 1. Alarm driven (periodic)

![Alarm (periodic) Use Case ](images/101-ex0-use-case-periodic.png)

### 2. Serverless APIs

![Serverless APIs Use Case ](images/101-ex0-use-case-apis.png)

### 3. ETL Pipelines

![ETL Pipeline Use Case ](images/101-ex0-use-case-etl-pipeline.png)

### 4. "Divide & Conquer" Workloads

!["Embarrassingly Parallel" Use Case ](images/101-ex0-use-case-divide-conquer.png)

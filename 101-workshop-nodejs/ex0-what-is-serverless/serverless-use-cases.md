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

#### **Unpredictable load**

This means loads that are _aperiodic in nature_, that is, the number of requests to (or usage of) the functional service varies widely and unpredictably over time.

#### **Infrequent load**

Some functional service usage may well be more _periodic or predictable in nature_, yet be called only at certain scheduled times or when enough data has been accumulated.

{% hint style="info" %}
Most user-driven use cases, including data driven by workflows with human interactions, fall under these patterns.  Almost any functional services not under constant load could qualify as Serverless candidates.
{% endhint %}

{% hint style="tip" %}
Hosting these cases as Serverless functions on IBM Cloud Functions can be extremely cost-effective for both its [PAYGO](https://en.wikipedia.org/wiki/PAYGO) cost model and its ability to automatically scale on-demand.
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

One if the best patterns to look for when adopting Serverless is that `"Alarm"` pattern, that is IBM Cloud Functions provides a built-in service that can trigger your Actions on a schedule you configure.

This kind of use case is often referred to as a `"batch job"`, as you accumulate data in some data storage service and process it in a "batch".

Alternatively, it can also be called a `"cron job"` as for the [popular Linux utility](https://en.wikipedia.org/wiki/Cron) used as a job scheduler.  In fact, the ICF Alarm supports a standardized cron format just like that utility which supports:

- **Periodic Intervals** - every X secs/mins
  - _Batch process orders every 24 hours at 12 PM_
- **Time Windows** - Start / Stop by Date-Time
  - _Accept lunch orders Mon-Fri at 11AM Stop accepting at 2PM_
- **Specific date/time** - “fire once”, or recurring
  - _Launch a new website on Jan. 1st 2021_

As you can infer, the pattern typically relies upon functional access to external data storage (e.g., Cloud Object Storage (COS) or Cloudant) where the data is "batched up".

{% hint style="success" %}
In this course, we will actually show you how to setup the Alarm feed provider in ICF to schedule the triggering of your functions!
{% endhint %}

If you want to read more about ICF Alarms check out this blog:
- _[New Alarm based trigger events for IBM Cloud Functions](https://www.ibm.com/cloud/blog/new-alarm-based-trigger-events-for-ibm-cloud-functions)_

### 2. Extract-Transform-Load (ETL) Pipelines

![ETL Pipeline Use Case ](images/101-ex0-use-case-etl-pipeline.png)

Anytime you have data that may be raw, unstructured or needs to be prepared or enhanced in some way for downstream applications and workflows to consume, Serverless is for you.

Serverless frameworks such as IBM Cloud Functions, typically have ready-made feeds to allow you to access data, regardless if its "state", to perform your needed transformations and enhancements on including:

#### _Data-at-Rest (SQL, NoSQL)_

- **Structured**
  - [SQL / Relational](https://www.ibm.com/cloud/learn/relational-databases) _(e.g., DB2, MySQL, Postgres, etc.)_
- **Unstructured**
  - [NoSQL]() _(e.g, [Cloudant](https://www.ibm.com/cloud/cloudant), CouchDB, Redis)_

<!--
{% hint style="tip" %}
Check our [IBM Cloud databases](https://www.ibm.com/cloud/databases) for more sources.
{% endhint %}
-->

#### _Data-in-Motion_

- Message Queues _(e.g., Kafka, RabbitMQ)_

#### _Streaming Data (Analytics)_

- Live Log data
- IoT sensor data
- Financial (market) data
- In-Stream Analytics (e.g., _[TensorFlow](https://www.tensorflow.org/))_
  - ![TensorFlow](images/tensorflow-logo-2d-trans-small.png)

{% hint style="tip" %}
Consider using the `Alarm` pattern along with ETL pipelines when working with "data-at-rest".
{% endhint %}

### 3. Serverless APIs

![Serverless APIs Use Case ](images/101-ex0-use-case-apis.png)

### 4. "Divide & Conquer" Workloads

!["Embarrassingly Parallel" Use Case ](images/101-ex0-use-case-divide-conquer.png)

{% hint style="success" %}
Hopefully, you are getting excited about applying some of these use cases to your favorite applications!
{% endhint %}
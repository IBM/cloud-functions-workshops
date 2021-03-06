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

# When to apply serverless

## Serverless as the ultimate microservice framework

If you’ve moved towards deconstructing your monolithic applications to embrace microservices and reactive programming concepts, then serverless should be viewed as the ultimate programming evolution.

### General patterns for serverless

**Unpredictable load**: These are loads that are aperiodic, meaning the number of requests to (or usage of) the functional service varies widely and unpredictably over time.

**Infrequent load**: Some functional service usage may be more periodic or predictable in nature yet be called upon only at certain scheduled times or when enough data has been accumulated.

{% hint style="info" %}
Most user-driven use cases, including data driven by workflows with human interactions, fall under these patterns.  Almost any functional services not under constant load could qualify as serverless candidates.
{% endhint %}

{% hint style="tip" %}
Hosting these cases as serverless functions on IBM Cloud Functions (ICF) can be extremely cost-effective for both its [PAYGO](https://en.wikipedia.org/wiki/PAYGO) cost model and its ability to automatically scale on-demand.
{% endhint %}

### Serverless anti-patterns

#### Functions under constant load

Although ICF can scale and keep up with large demands on serverless functions, each function is single-use and therefore suffers cold start load times.

Cold start load times include starting a language runtime compatible with your function, as well as loading your function and starting it.

#### Long-running or non-separable tasks

- **Functions with many dependencies**: As you familiarize yourself with serverless approaches, hopefully you’re realizing that bringing over large, monolithic application chunks and treating them as functions isn’t ideal.

However, if you do have large functional services, cold start times are a primary consideration.  That is, some functions may have dependencies on frameworks, runtime libraries and other dependencies all of which must load on each request negating Serverless benefits.

- **Network intensive functions**: Be aware that your PAYGO costs will go up if functions are waiting on external services to respond since you are paying for that idle time. Network timeouts are also a consideration when evaluating potential wait costs.

{% hint style="tip" %}
Please note that there are ways to recognize and mitigate against these anti-patterns, primarily using the same strategies used for event-driven microservices. You’ll learn about that in more advanced courses.
{% endhint %}

---

# Top 4 serverless use cases

Here are four general use cases you should consider when deciding to adopt serverless methodologies.

## 1. Alarm driven (periodic)

![Alarm (periodic) use case ](images/101-ex0-use-case-periodic.png)

One of the best patterns to look for when adopting serverless is an `Alarm` pattern. ICF provides a built-in service that can trigger actions on a configured schedule.

This kind of use case is often referred to as a `batch job` because you accumulate data in a data storage service and process it in a batch.

Alternatively, it can also be called a `cron job`, named after the [popular Linux utility](https://en.wikipedia.org/wiki/Cron) used as a job scheduler. In fact, the ICF Alarm supports a standardized cron format just like that utility which supports:

- **Periodic intervals** take place every x number of seconds or minutes.
  - _For example, batch process orders every 24 hours at 12 PM_
- **Time windows** are classified by start and stop by date and time.
  - _For example, accepting lunch orders Monday through Friday beginning at 11AM and no longer accepting orders at 2PM._
- **Specific date/time** can be “fired once” or recurring.
  - _For example, launching a new website on January 1, 2021._

As you can infer, the pattern typically relies upon functional access to external data storage, such as Cloud Object Storage (COS) or [Cloudant](https://www.ibm.com/cloud/cloudant), where the data is batched up.

{% hint style="success" %}
In this course, you will learn how to set up the Alarm feed provider in ICF to schedule the triggering of your functions!
{% endhint %}

If you’d like to read more about ICF Alarms, see [New Alarm based trigger events for IBM Cloud Functions](https://www.ibm.com/cloud/blog/new-alarm-based-trigger-events-for-ibm-cloud-functions).

## 2. Extract-Transform-Load (ETL) pipelines

![ETL pipeline use case ](images/101-ex0-use-case-etl-pipeline.png)

Anytime you have data that may be raw, unstructured, or needs to be prepared or enhanced in some way for downstream applications and workflows to consume, serverless is ideal.

Serverless frameworks such as ICF, typically have ready-made feeds to allow you to access data to perform your needed transformations and enhancements on. This can be achieved regardless of the ready-made feeds state. This includes:

#### Data-at-rest 

Configure a feed to receive events whenever data changes occur in the database. This includes:

- **Structured**: [SQL/relational](https://www.ibm.com/cloud/learn/relational-databases), which includes DB2, MySQL, Postgres, and more.

- **Unstructured**: [NoSQL](https://www.ibm.com/cloud/learn/nosql-databases), which includes Cloudant, CouchDB, and Redis.

<!--
{% hint style="tip" %}
Check our [IBM Cloud databases](https://www.ibm.com/cloud/databases) for more sources.
{% endhint %}
-->

#### Data-in-motion

Configure a client feed to pull messages off of a queue and trigger an action with the message data using message queues like Kafka and RabbitMQ.

#### Streaming data (Analytics)

Yes, you can absolutely use serverless functions to transform and enhance data in stream! This includes:

- Live log data
- IoT sensor data
- Financial market data
- In-stream analytics  (For example, [TensorFlow](https://www.tensorflow.org/))

{% hint style="tip" %}
Consider using the `Alarm` pattern along with ETL pipelines when working with data-at-rest.
{% endhint %}

## 3. Serverless APIs

![Serverless APIs use case ](images/101-ex0-use-case-apis.png)

If you provide customer or internal facing APIs, especially those that are not under a high, constant load, creating an API endpoint that is backed by a serverless function **would be the best choice 100% of the time**.

In fact, ICF includes API Gateway integration that allows you to create secure APIs and even publish them using the [OpenAPI Specification](https://www.openapis.org/), also known as _”Swagger”_.

## 4. Divide and conquer/map reduce

![Embarrassingly parallel use case ](images/101-ex0-use-case-divide-conquer.png)

Serverless opens the door to performing high-end analytics and problem solving. Before, this was only available by using expensive services that required pre-allocated server clusters.

Serverless offers a low-cost alternative to run what are often called **Embarrassingly Parallel Tasks** which are often needed for divide and conquer-styled processing steps, which include:

- Map reduce operations
- Monte Carlo simulations
- Evolutionary algorithms (EA)
- Genetic algorithms (GA)
- Hyperparameter tuning
- Web scraping

Serverless providers are constantly competing to give each function large amounts of concurrent execution with guaranteed memory and execution time in order to perform such tasks. In fact, some researchers are using serverless in conjunction with technologies such as [Apache Spark](https://spark.apache.org/) which requires more dedicated compute resources for performing these tasks.

{% hint style="tip" %}
Analytic workloads are one of the fastest growing use cases for serverless, especially using the Python language.  IBM has created the [PyWren project](https://github.com/pywren/pywren-ibm-cloud) to provide libraries and examples that help you quickly build analytic application by integrating data from open source projects like [Jupyter](https://jupyter.org/) and TensorFlow.
{% endhint %}

To learn more about using ICF for deep learning, see [Leverage deep learning in IBM Cloud Functions](https://developer.ibm.com/technologies/artificial-intelligence/tutorials/leverage-deep-learning-in-apache-openwhisk-ibm-cloud-functions/).

{% hint style="success" %}
Hopefully, you are getting excited about applying some of these use cases to your favorite applications!
{% endhint %}

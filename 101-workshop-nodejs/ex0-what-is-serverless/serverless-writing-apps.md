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

# Writing serverless applications with IBM Cloud Functions

Mature serverless platforms, such as IBM Cloud Functions (ICF), provide features that allow you to build cloud-native applications by composing your serverless functions into more complex data transformations and workflows.

This section describes some ICF-specific features that differentiate it from other serverless platforms and enable developers in writing amazing serverless applications.

## What's a polyglot?

ICF is a polyglot serverless platform, meaning it understands and supports multiple programming languages for authoring functions.

This allows you to choose the language that works best for you, which can:

- Reduce the need to learn new languages
- Increase code reuse, simplifying migration. This is especially important when integrating with services and data sources that provide libraries in specific languages
- Leverage language-specific knowledge to code more efficient functions

### ICF supported languages

The ICF team attempts to provide the most popular serverless languages and versions. For a comprehensive list of supported language runtimes, see [ICF runtimes](https://cloud.ibm.com/docs/openwhisk?topic=cloud-functions-runtimes).

This currently includes the latest LTS releases for:

- Node.js
- Python
- Swift
- PHP

_Note that there are a few languages not listed_

If your language is not supported, you can always create your own language runtime using a Docker skeleton or build from compatible runtimes for other languages from the Apache OpenWhisk project, which can be found at [Apache OpenWhisk -> Downloads -> Action Runtimes](https://openwhisk.apache.org/downloads.html#component-releases).


## Using namespaces and packages

ICF provides a naming convention that allows you to organize functions and apply access control. Every entity in ICF can have a fully qualified name (FQN) with the following path-style format:

```text
/<Namespace Name>/<Package Name>/<Entity Name>
```

It should be pointed out that `Enitity Name` is the name of your action, trigger, or rule.

### Namespaces

Actions, triggers, and rules always belong in a namespace. If a namespace is not explicitly provided, they are created in a default namespace.

Namespaces are where access control can be applied to your actions, triggers, and rules. This requires authorization from IBM's Cloud Identity and Access Management (IAM) services when others want to use them to create their applications.

{% hint style="tip" %}
Read more on [managing namespaces](https://cloud.ibm.com/docs/openwhisk?topic=cloud-functions-namespaces) with your actions.
{% endhint %}

### Packages

Packages are logical, named groupings that can contain actions and feeds. A package cannot contain another package, so package nesting is not allowed.

Actions and feeds do not need to belong to a package, which means you have to be aware of **name collisions** when they are combined with other developers' packages to form applications. This can cause referencing issues.

As a serverless application developer, you should always create unique, meaningful package names to better allow them to be reused across multiple serverless applications.

{% hint style="tip" %}
Read more on [incorporating packages](https://cloud.ibm.com/docs/openwhisk?topic=cloud-functions-pkg_ov) in your ICF applications.
{% endhint %}

## Packages and event feeds

ICF provides built-in, public packages that contain event feeds that simplify integration with various popular services that are able to produce events (also known as event sources) to your actions.

These packages include event integrations with the following services:

- Alarms, both periodic and cron
- GitHub
- IBM Cloudant
- IBM Cloud Object Storage (COS)
- IBM Composer
- IBM Event Streams (Messaging) (e.g., Kafka)
- IBM Watson
  - Discovery (cognitive search)
  - Speech to Text and Text to Speech
  - Natural language (Translator, Classifier and Understanding)_
  - Tone analyzer
  - Personality insights
  - Visual recognition
  - Assistant
- Mobile SDK
- Mobile push notifications
- Slack
- The Weather Company
- WebSockets
- Utilities like curl, data, head, tail, cat, split, sort, and echo

All you need do is bind them into your namespace with an alias along with your configurations (credentials) to reference them from your actions.

## Notable packages popular in ICF applications

Some of the packages ICF provides deserve special mention because they are useful for almost any serverless application and within ICF, they represent scalable, IBM managed services that you do not need to deploy and run yourself.

- **Alarms feed**: The public alarms package can be used to fire a trigger or feed at a specified frequency. Alarms are useful for setting up recurring jobs or tasks, such as invoking a system back up every hour.

- **Cloudant**: The public Cloudant package can be used to read, write, update, or delete documents and listen for changes to an IBM Cloudant (NoSQL) database.

- **Cloud Object Storage (COS)**: The public package used to integrate with an IBM COS instance and listen for changes in data. Similar to the Cloudant package.

{% hint style="success" %}
All you need do is bind any of these packages to your namespace, configure it with proper parameter values (for example, credentials for storage services) and ICF does the rest!
{% endhint %}

{% hint style="tip" %}
Learn more about [integrating packages](https://cloud.ibm.com/docs/openwhisk?topic=cloud-functions-pkg_ov) with ICF.
{% endhint %}

## Using sequences and compositions

![Polyglot sequences and compositions on ICF](images/101-ex0-serverless-icf-compositions.png)

### Sequences

ICF supports the declaration of sequences of actions which behave collectively as a single action.

#### Sequences are polyglot capable

The function for each action in a sequence can be written in any language as long as the data format from the output from each action in the sequence is compatible with the input expected by the next action in a sequence.

#### Data between actions in a sequence must be compatible

Typically, data between actions is normalized in JSON format. However, actions and sequences are not limited to just JSON format.

Currently, it is up to the serverless application developer to assure data compatibility between actions.

{% hint style="info" %}
This course will show you how to create action sequences, using Node.js functions, which ICF manages for you.
{% endhint %}

### Compositions

ICF is one of the few serverless platforms that offers the ability to compose polyglot function into programmatic workflows using a rich set of conditional logic and programming friendly constructs.

{% hint style="info" %}
This course will not cover compositions, but information on how to integrate them can be found on IBM Cloud using the [Composer Package](https://cloud.ibm.com/docs/openwhisk?topic=cloud-functions-pkg_composer).  Canonical documents and its actual implementation can be found on its project GitHub: [IBM Cloud Functions Composer](https://github.com/ibm-functions/composer).
{% endhint %}

{% hint style="success" %}
Congratulations! Now you have an overview of essential ways to integrate serverless using ICF when writing your cloud-native applications!
{% endhint %}

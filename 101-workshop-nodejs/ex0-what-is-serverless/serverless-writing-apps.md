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

Mature serverless platforms, such as IBM Cloud Functions, provide features that allow you to build cloud-native applications by composing your Serverless functions into more complex data transformations and workflows.

This section will describe some ICF-specific features that differentiate it from other Serverless platforms and enable developers in writing truly amazing Serverless applications.

## What's a Polyglot?

IBM Cloud Functions is a polyglot serverless platform meaning it understands and supports multiple programming languages for authoring functions.

This allows developers to choose the language that works best for them, which can:

- Reduce the need to learn new languages
- Increase code reuse _simplifying migration_
  - Especially important when integrating with services and data sources that provide libraries in specific languages.
- Leverage language-specific knowledge to code more efficient functions

### **ICF Supported languages**

The ICF team attempts to provide all the most popular Serverless languages and versions; their current list of supported language runtimes can always be found here:

- [ICF Runtimes](https://cloud.ibm.com/docs/openwhisk?topic=cloud-functions-runtimes)

This currently includes the latest LTS releases for:

- **NodeJS**
- **Python**
- **Swift**
- **PHP**

If your language is not supported, you can always create your own language runtime using a Docker skeleton or build from compatible runtimes for other languages from the Apache OpenWhisk project:

- [Apache OpenWhisk -> Downloads -> Action Runtimes](https://openwhisk.apache.org/downloads.html#component-releases)

## Using namespaces and packages

ICF provides a naming convention that allows developers to organize their functions and apply access control.  Every entity in ICF can have a Fully-Qualified Name (FQN) with the following path-style format:

```text
/<Namespace Name>/<Package Name>/<Entity Name>
```

- _where `Enitity Name` is the name of your Action, Trigger or Rule_

### **Namespaces**

Actions, triggers, and rules always belong in a namespace. If a namespace is not explicitly provided, they are created in a default namespace.

Namespaces are where Access Control can be applied to your Actions, Triggers and Rules requiring authorization provided by IBM's Cloud Identity and Access Management (IAM) services when others want to use them to create their applications.

{% hint style="tip" %}
- _Read more on [Managing Namespaces](https://cloud.ibm.com/docs/openwhisk?topic=cloud-functions-namespaces) with your Actions._
{% endhint %}

### **Packages**

Packages are logical, named groupings that can contain Actions and Feeds. A package cannot contain another package, so package nesting is not allowed.

Actions and feeds do not need to belong to a package, but then developers would have to worry about **name collisions** when they are combined with other developers' packages to form applications causing referencing issues.

Serverless application developers should always creating unique, meaningful package names to better allow them to be reused across multiple Serverless applications.

{% hint style="tip" %}
- _Read more on [Incorporating Packages](https://cloud.ibm.com/docs/openwhisk?topic=cloud-functions-pkg_ov) in your ICF applications._
{% endhint %}

## Packages & event Feeds

IBM Cloud Functions provides "built-in", public packages that contain event **Feeds** that simplify integration with various popular services that are able to produce events (a.k.a., **Event Sources**) to your actions.

These packages include event integrations with the following services:

- **Alarms** (periodic, cron)
- **GitHub**
- **IBM Cloudant**
- **IBM Cloud Object Storage (COS)**
- **IBM Composer**
- **IBM Event Streams** (Messaging) (e.g., Kafka)
- **IBM Watson**
  - Discovery (Cognitive search)
  - Speech-to-Text, Text-to-Speech
  - Natural Language _(Translator, Classifier and Understanding)_
  - Tone Analyzer
  - Personality insights
  - Visual Recognition
  - Assistant
- **Mobile SDK**
- **Mobile Push Notifications**
- **Slack**
- **Weather Co.**
- **WebSockets**
- **Utilities** _(e.g., curl, data, head, tail, cat, split, sort, echo)_

All you need do is "bind" them into your namespace with an alias along with your configurations (e.g., credentials) to reference them from your Actions.

Some notable packages:

### **Alarms Feed**

The public Alarms package can be used to fire a trigger or feed at a specified frequency. Alarms are useful for setting up recurring jobs or tasks, such as invoking a system back up every hour.

### **Cloudant**

The public Cloudant package can be used to read, write, update, or delete documents and listen for changes to an IBM Cloudant (NoSQL) database.

### **COS (Cloud Object Storage)**

The public package used to integrate with an IBM® Cloud Object Storage instance and listen for changes in data. Similar to the Cloudant package.

{% hint style="tip" %}
**Tip**: Learn more about [Integrating Pacakges](https://cloud.ibm.com/docs/openwhisk?topic=cloud-functions-pkg_ov) with IBM Cloud Functions.
{% endhint %}

## Using Sequences and Compositions

![Polyglot Sequences and Compositions on ICF](images/101-ex0-serverless-icf-compositions.png)

### **Sequences**

ICF supports the declaration of sequences of actions which behave collectively as a single action.

#### Sequences are polyglot capable

The function for each action in a sequence can be written in any language as long as the data format from the output from each action in the sequence is compatible with the input expected by the next action in a sequence.

#### Data between actions in a sequence must be compatible

Typically data between actions is normalized in JSON format, but actions and sequences are not limited to just JSON format.  Currently, it is up to the serverless application developer to assure data compatibility between actions.

{% hint style="info" %}
This course will show you how to create action sequences, using NodeJS functions, which ICF manages for you.
{% endhint %}

### **Compositions**

IBM Cloud Functions is one of the few serverless platforms that offers the ability to compose polyglot function into programmatic workflows using a rich set of conditional logic and programming friendly constructs.

{% hint style="info" %}
This course will not cover compositions, but information on how to integrate them can be found on IBM Cloud using the [Composer Package](https://cloud.ibm.com/docs/openwhisk?topic=cloud-functions-pkg_composer).  Canonical documents and its actual implementation can be found on its project GitHub: [IBM Cloud Functions Composer](https://github.com/ibm-functions/composer).
{% endhint %}

{% hint style="success" %}
🎉**Congratulations**! Now you have an overview of the key ways to integrate Serverless using IBM Cloud Functions when writing your cloud-native applications! 🎉
{% endhint %}

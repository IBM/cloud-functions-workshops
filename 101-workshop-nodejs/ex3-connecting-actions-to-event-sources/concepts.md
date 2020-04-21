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

In this section you will learn about using two components of the IBM Cloud Functions (ICF) programming model called `triggers` and `rules` which are used to associate event data with your `actions`.

## Triggers

Triggers are a named channel for a class of events. The following are examples of triggers:

* A trigger of location update events
* A trigger of document uploads to a website
* A trigger of incoming emails

Triggers can be fired, or activated, by using a dictionary of key-value pairs. Sometimes this dictionary is referred to as the normalized, internal event. However, these normalized events are often a representation of raw data coming from external events generated outside the serverless platform.  As with actions, each firing of a trigger results in an activation ID.

Triggers can be explicitly fired by a user or by an external event source. A feed is a convenient way to configure an external event source to fire trigger events that can be consumed by ICF. Examples of feeds include:

* CouchDB data change feed that fires a trigger event each time a document in a database is added or modified
* A Git feed that fires a trigger event for every commit to a Git repository

Instances of triggers can also be fired with parameters that can be passed on to one or more actions they can be connected to using rules.

---

## Rules

A rule associates one trigger with one action. Every firing of the trigger causes the corresponding action to be invoked with the trigger event as input.

With the appropriate set of rules, it's possible for a single trigger event to invoke multiple actions, or for an action to be invoked as a response to events from multiple triggers.

For example, consider a system with the following actions:

* `classifyImage` action that detects the objects in an image and classifies them
* `thumbnailImage` action that creates a thumbnail version of an image

Also, suppose that there are two event sources that are firing the following triggers:

* `newTweet` trigger that is fired when a new tweet is posted
* `imageUpload` trigger that is fired when an image is uploaded to a website

You can set up rules so that a single trigger event invokes multiple actions, and have multiple triggers invoke the same action:

* `newTweet -> classifyImage` rule
* `imageUpload -> classifyImage` rule
* `imageUpload -> thumbnailImage` rule

The three rules establish the following behavior:

* Images in both tweets and uploaded images are classified
* Uploaded images are classified
* A thumbnail version is generated

{% hint style="info" %}
Triggers and rules enable the implementation of the [Observer pattern](https://en.wikipedia.org/wiki/Observer_pattern). Triggers relate state changes (events) from the subject(event source) to a list of observers (actions) when connected by a rule.
{% endhint %}

{% hint style="success" %}
**Remember**: Rules allow you to connect a trigger to an action. That's all you need to know for now. Next you’ll learn more about using these new concepts.
{% endhint %}

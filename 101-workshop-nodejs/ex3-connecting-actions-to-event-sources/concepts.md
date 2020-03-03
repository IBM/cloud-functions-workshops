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

## Triggers

Triggers are a named channel for a class of events. The following are examples of triggers:

* A trigger of location update events.
* A trigger of document uploads to a website.
* A trigger of incoming emails.

Triggers can be _**fired**_ \(activated\) by using a dictionary of key-value pairs. Sometimes this dictionary is referred to as the (normalized, internal) _event_. However, these normalized events are often a representation of raw data coming from external _events_ generated outside the Serverless platform.  As with actions, each firing of a trigger results in an activation ID.

Triggers can be explicitly fired by a user or by an external event source. A _feed_ is a convenient way to configure an external event source to fire trigger events that can be consumed by IBM Cloud Functions. Examples of feeds include the following:

* CouchDB data change feed that fires a trigger event each time a document in a database is added or modified.
* A Git feed that fires a trigger event for every commit to a Git repository.

Instances of Triggers can also be _fired_ with parameters that can be passed on to one or more actions they can be connected to using Rules.

## Rules

A rule associates one trigger with one action, with every firing of the trigger causing the corresponding action to be invoked with the trigger event as input.

With the appropriate set of rules, it's possible for a single trigger event to invoke multiple actions, or for an action to be invoked as a response to events from multiple triggers.

For example, consider a system with the following actions:

* `classifyImage` action that detects the objects in an image and classifies them.
* `thumbnailImage` action that creates a thumbnail version of an image.

Also, suppose that there are two event sources that are firing the following triggers:

* `newTweet` trigger that is fired when a new tweet is posted.
* `imageUpload` trigger that is fired when an image is uploaded to a website.

You can set up rules so that a single trigger event invokes multiple actions, and have multiple triggers invoke the same action:

* `newTweet -> classifyImage` rule.
* `imageUpload -> classifyImage` rule.
* `imageUpload -> thumbnailImage` rule.

The three rules establish the following behavior: images in both tweets and uploaded images are classified, uploaded images are classified, and a thumbnail version is generated.

{% hint style="info" %}
**Triggers and Rules enable the implementation of the [Observer pattern](https://en.wikipedia.org/wiki/Observer_pattern)**. Triggers relate state changes (Events) from the _Subject_ (Event source) to a list of _Observers_ (Actions) when connected by a Rule.
{% endhint %}

{% hint style="success" %}
**Just remember Rules allow you to connect a Trigger to an Action. That's all we need to know for now, let's look at using these new concepts…**
{% endhint %}

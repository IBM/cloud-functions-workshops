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

# Creating and Invoking Actions

This exercise will introduce the concepts needed to create and use actions with IBM Cloud Functions.

_Once you have completed this exercise, you will have…_

* **Created and invoked actions.**
* **Understood how to pass parameters to actions.**
* **Created actions which return asynchronous results.**

Once this exercise is finished, we will be able to create simple serverless functions using IBM Cloud Functions!

## Background

Actions are stateless code snippets (functions) that run on the IBM Cloud Functions (ICF) platform. The Platform supports functions written in JavaScript (NodeJS), Python, Java, Go, PHP, Ruby, .NET or Ballerina programming languages. It also supports functions implemented as executables (binary programs) packaged in Docker containers.

Actions can be used to do many things. For example, an action can be used to respond to a database change, aggregate a set of API calls, post a Tweet or work with AI and analytic services to detect objects in image or streamed video.

Actions can be explicitly invoked, or run in response to an event. In either case, each run of an action results in an activation record that is identified by a unique activation ID. The input to an action and the result of an action are a dictionary of key-value pairs, where the key is a string and the value a valid JSON value. Actions can also be composed of calls to other actions or a defined sequence of actions.

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

# Create and invoke actions

This exercise will introduce the concepts needed to create and use **actions** with IBM Cloud Functions (ICF). If you recall, the _Action_ entity was shown as part of the ICF programming model in the previous chapter.

Once you have completed this exercise, you will know how to:

* Create and invoke actions
* Pass parameters to actions
* Create actions which return asynchronous results

After this, you’ll be able to create simple serverless functions using ICF!

## Background

Actions are stateless code snippets (functions) that run on the ICF platform. The platform supports functions written in JavaScript (Node.js), Python, PHP, Ruby or Swift as well as many other programming languages. It also supports functions implemented as executables (binary programs) packaged in Docker containers.

Actions can be used to do many things. For example, an action can be used to respond to a database change, aggregate a set of API calls, post a Tweet, or even work with AI and analytics services to detect objects in an image or streamed video.

Actions can be explicitly invoked or run in response to an event. In either case, each run of an action results in an activation record that is identified by a unique activation ID. The input to an action and the result of an action are a dictionary of key-value pairs, where the key is a string and the value a valid JSON value. Actions can also be composed of calls to other actions or a defined sequence of actions.
 value a valid JSON value. Actions can also be composed of calls to other actions or a defined sequence of actions.

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

# Review: Connect actions to event sources

1. What is a trigger?

( ) An API that invokes a function
( ) A network connection between an event source and a function
(x) A named channel for a class of events
( ) Event data that is sent to functions as key-value pairs

[explanation]
Triggers are named channels for classes or kinds of events sent from event sources.
[explanation]

---

2. What is the purpose of a rule?

( ) associates multiple triggers with a single action
(x) associates a single trigger with a single action
( ) associates a single trigger with multiple actions

[explanation]
Rules are used to associate one trigger with one action. After this kind of association is created, each time a trigger event is fired, the action is invoked.
[explanation]

---

3. Rules allow you to define conditional logic that controls if an action gets invoked based upon event data.

( ) True
(x) False

[explanation]
False. Rules are simply an association between a trigger and an action indicating that event data coming from a trigger should fire an associated action. It is either enabled or disabled.
[explanation]

4. Multiple actions can be fired from a single trigger.

(!) incorrect
(x) correct

[explanation]
Correct. Multiple actions can be connected to the same trigger using separate rules. This allows a single event to cause many parallel serverless actions to begin processing the same data in different ways at the same time.
[explanation]

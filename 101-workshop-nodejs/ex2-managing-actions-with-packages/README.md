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

# Managing Actions with Packages

This exercise will introduce the concepts needed to create and use packages with IBM Cloud Functions.

_Once you have completed this exercise, you will have…_

* **Learned how to find public packages.**
* **Used public package actions and bindings.**
* **Created and shared your own custom package.**

Once this exercise is finished, we will be able to create and share actions using packages within IBM Cloud Functions!

## Background

In IBM Cloud Functions, you can use _packages_ to bundle together related actions and even share them with others. It is important to note that:

* **Packages can only contain _actions_**. _Triggers_ and _rules_ are not supported at the moment.
* **Package nesting is not allowed**, i.e. packages cannot contain other packages.

Packages also support parameters which are automatically passed into packaged actions during invocations as **default parameter values** when none are provided.

{% hint style="tip" %}
Package parameters provide a convenient method to _manage service credentials_ needed with multiple actions.
{% endhint %}

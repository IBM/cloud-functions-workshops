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

# Final Exam

--- <!-- EX0 -->

1. You are given the following graph of usage for an application you are developing. Which of the following is a correct conclusion of the graph?

![Application Usage Graph](images/101-ex0-review-question-request-graph-2.png)

<!-- <img width="80%" src="/static/101-ex0-review-question-request-graph-2.png"/> -->

(!) The usage is mostly constant, so serverless computing would be a good fit for this usage case.
( ) The usage is mostly sporadic, so serverless computing is a good fit for this usage case.
(x) The usage is mostly constant, so serverless computing would be a bad fit for this usage case.
( ) The usage is mostly sporadic, so serverless computing is a bad fit for this usage case.

[explanation]
The usage graphs shows that requests to the application are very fairly constant with request rate averaging roughly 6k over the provided time interval. In this usage case, it is likely more cost effective to pay for dedicated servers (computing services) with enough planned capacity to handle such a load.
[explanation]


--- <!-- EX1 -->


--- <!-- EX2 -->


--- <!-- EX3 -->
1. Multiple triggers can be configured to fire the same action.

(!) incorrect
(x) correct

[explanation]
Triggers can be connected to the same action using separate rules.
[explanation]

--- <!-- EX4 -->


--- <!-- EX5 -->

1. If you wish to monitor your action invocations, you need to use the web user interface.

(!) true (x) false

[explanation]
False. The CLI's `action poll` command allows you to see activation records as they are created (live), but you will not get the views and filters the web user interface experience provides.
[explanation]


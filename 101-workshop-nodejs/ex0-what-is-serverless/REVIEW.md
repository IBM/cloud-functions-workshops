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

# Review: What is serverless?

1. What characteristics of serverless computing contribute to its name?

[!] Developers can run backend code to access databases without using servers.
[x] Serverless computing scales inherently to incoming events.
[ ] Serverless computing does not use servers.
[x] Server management decisions are hidden from the developer.
[ ] Serverless developers only need to configure the service framework for their chosen language.

Note: Make sure you select all the correct options; there may be more than one!

[explanation]
Serverless computing uses servers to execute functional code in response to events. You do not need to setup, configure, or manage servers or language-specific service frameworks in order to develop or run your functions. In addition, the serverless platform handles all aspects of management and operations, including scaling, monitoring, logging, and security.
[explanation]

2. Serverless computing is a specific technology with a developed set of standards and practices.

(!) True
(x) False

[explanation]
Serverless computing is still a cutting-edge cloud technology that is implemented differently by different serverless providers. Different providers may use different paradigms to run and scale functional code.  There is no standardized API or standardized packaging mechanism. Also, you will find that the arguments and environment differ.  It is always best to look for serverless solution providers who are working with others in proven open source organizations and projects to promote serverless maturity and standards.
[explanation]

3. Serverless computing requires the developer to allocate servers and machine resources.

(!) True
(X) False

[explanation]
[explanation]

4. Serverless computing scales inherently and executes stateless code in response to events.

(x) True
(!) False


[explanation]
[explanation]

5. Isabelle decided to use serverless computing for a project that crops photos automatically when added to cloud storage. How would you critique her choice?

(!) Serverless is a great choice here because it allows Isabelle to manage the allocation of machine resources.
( ) Serverless won’t work well here because it depends too much on how often customers will be uploading photos.
( ) Serverless may work well, but Isabelle will have to spend some time configuring servers to handle the infrequent uploads.
(X) Serverless is a great choice because it can flexibly react to incoming photos and crop them as needed.

[explanation]
This is an example of an Extract, Transform and Load (ETL) Pipeline which is ideally suited for serverless actions which can be triggered to crop photos as they arrive in a datastore.
[explanation]

6. You need to develop a project that is as cost-effective as possible. For which reasons would you pick serverless?

[x] Serverless outsourcing leads to less infrastructure, operational, and development costs.
[x] Serverless only charges for the time when code is executing.
[!] Serverless applications can run in low-cost, pre-allocated capacity you can purchase in advance.

Note: Make sure you select all the correct options; there may be more than one!

[explanation]
With serverless, you only pay for compute costs that your functions use on a per-invocation basis (remember the PAYGO model discussed earlier in this course). Serverless providers worry about the infrastructure and DevOps while you focus on writing functional business logic. There is no need to pay for pre-allocated capacity. Your provider will scale your functions as needed, each receiving the compute and memory limits that you are guaranteed by your license agreements.
[explanation]

7. Long running and non-separable tasks are types of tasks that typically work well in a serverless environment.

(!) True
(x) False

[explanation]
[explanation]

8. You are given the following graph of usage for an application you are developing. Which of the following is a correct conclusion of the graph?

![Application Usage Graph](images/101-ex0-review-question-request-graph-1.png)

<!-- <img width="80%" src="/static/101-ex0-review-question-request-graph-1.png"/> -->

(!) The usage is mostly constant, so serverless computing would be a good fit for this usage case.
(x) The usage is mostly sporadic, so serverless computing is a good fit for this usage case.
( ) The usage is mostly constant, so serverless computing would be a bad fit for this usage case.
( ) The usage is mostly sporadic, so serverless computing is a bad fit for this usage case.

[explanation]
The usage graphs shows that requests to the application are very sporadic with long periods of little to no usage.  This is an ideal usage case for a serverless application to handle.
[explanation]

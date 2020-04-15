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

# Review: IBM Cloud Functions (ICF) Web User Interface (Web UI)

1. When using the ICF Web UI, you can accomplish everything you can using the CLI.

(x) True
(!) False

[explanation]
The intent of the Web UI is to provide functional equivalency to the that provided by the CLI. In fact, the Web UI actually provides simplified access to other IBM Cloud services such as alarms, Cloudant, logging, and more, that is often much harder to do from the command line.
[explanation]

---

1. The ICF Web UI provides access to logs and action metrics.

(x) True
(!) False

[explanation]
True.  The **monitor** feature of the Web UI provides an easy means to view recent activations of actions and triggers over periods of time. The **logging** feature can be used to automatically send complete activation records to IBM Clouds Observability service for long term retention and analysis alongside all your other IBM Cloud events.
[explanation]

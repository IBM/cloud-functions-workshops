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

# Review: Exposing APIs from Actions

1. Any action can be made accessible on the web by simply setting the flag <code>--web</code> to <code>true</code>.

(x) true
(!) false

[Explanation]
True. Making your Actions web accessible using IBM Cloud Functions is really that easy.
[Explanation]

2. Functions that are web actions need to parse the raw HTTP request header to obtain query parameters.

(!) true
(x) false

[Explanation]
False. Web actions are provided all HTTP request information as parsed input arguments to their function including the HTTP query parameters.  The parameters are provided as an unparsed string value for the <__ow_query_> parameter so you will still need to parse the individual parameters from it.
[Explanation]

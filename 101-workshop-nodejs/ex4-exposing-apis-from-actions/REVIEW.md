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

[explanation]
True. Making your Actions web accessible using IBM Cloud Functions is really that easy.
[explanation]

2. Functions that are web actions need to parse the raw HTTP request header to obtain query parameters.

(!) true
(x) false

[explanation]
False. Web actions are provided all HTTP request information as parsed input arguments to their function including the HTTP query parameters.  The parameters are provided as an unparsed string value for the <code>__ow_query_</code>> parameter so you will still need to parse the individual parameters from it.
[explanation]

3. Which command would you use to retrieve the HTTP endpoint for a web action?

[!] ibmcloud fn api get &lt;action_name&gt;  --url
[x] ibmcloud fn action get &lt;action_name&gt; --url
[ ] ibmcloud fn api get &lt;action_name&gt; --http
[ ] ibmcloud fn action get &lt;action_name&gt; --http

[explanation]
[explanation]

4. If I have a web action that returns a JSON object, the caller must append <code>.json</code> to the web action's URL to get a successful response.

(!) true
(x) false

[explanation]
Alternatively, the function can manually set the <code>content-type</code> in the HTTP response header.  The caller then can call the URL of the web action without modification.
[explanation]

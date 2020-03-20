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

# Review: Managing Actions with Packages

1. You can invoke actions in public packages as if they were normal actions

(x) true
(!) false

[explanation]
True. You can invoke it and pass it parameters on invocation just like a normal action.
[explanation]

2. You can provide default parameters to an action in a public package just as you would a normal action.

(!) true
(x) false

[explanation]
False. The action from the public package needs to bound to a logical name within a local namespace before default parameters can be applied to it.
[explanation]

3. If you bind a parameter value to a package, that value cannot be overridden on invocation.

(!) true
(x) false

[explanation]
False. The parameter value on invocation always overrides those on the package binding.
[explanation]

4. After creating a custom package as private, you can clone the package to make it public.

(!) true
(x) false

[explanation]
False. You simply need to update the package using the <code>--shared</code> flag and with a value of <code>yes</code>value.
For example:
<p><code>ibmcloud fn package update custom --shared yes</code></p>
[explanation]

5. If you have many Packages, you can better organize them by creating a Package that contains several similar packages.

(!) true
(x) false

[explanation]
False. Package nesting is not allowed, i.e. packages cannot contain other packages.
[explanation]

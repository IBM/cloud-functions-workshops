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

# Creating Triggers

_Triggers_ represent a named "channel" for a stream of events.

1. Let's create a trigger to send _location updates_:

    ```bash
    ibmcloud fn trigger create locationUpdate
    ```

    ```text
    ok: created trigger locationUpdate
    ```

2. You can check that the trigger has been created like this:

    ```bash
    ibmcloud fn trigger list
    ```

    ```text
    triggers
    locationUpdate                  private
    ```

So far we have only created a named channel to which events can be fired.

3. Let's now fire the trigger by specifying its name and parameters:

    ```bash
    ibmcloud fn trigger fire locationUpdate -p name "Barry" -p place "Central City"
    ```

    ```text
    ok: triggered /_/locationUpdate with id
    ```

    the trigger was "fired".

3. Triggers also support default parameters. Firing this trigger without any parameters will pass in the default values.

    ```bash
    ibmcloud fn trigger update locationUpdate -p name "Barry" -p place "Central City"
    ```

    ```text
    ok: updated trigger locationUpdate
    ```

    and again the trigger was "fired", but nothing apparent happens (besides seeing the confirmation message).


4. Look at the details of the `locationUpdate` trigger:

    ```bash
    ibmcloud fn trigger get locationUpdate
    ```

    ```bash
    ok: got trigger locationUpdate
    {
        "namespace": "myNamespace",
        "name": "locationUpdate",
        "version": "0.0.2",
        "parameters": [
            {
                "key": "name",
                "value": "Barry"
            },
            {
                "key": "place",
                "value": "Central City"
            }
        ],
        "limits": {},
        "publish": false
        ...
    }
    ```

    The `locationUpdate` Trigger will now include these parameters using the default values supplied whenever fired.

{% hint style="warning" %}
**Events you fire to the `locationUpdate` trigger currently do not do anything.** To be useful, we need to create a rule that associates the trigger with an action.
{% endhint %}

{% hint style="success" %}
🎉 **Let's keep going by connecting actions to triggers…** 🎉
{% endhint %}

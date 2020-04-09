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

# Connecting trigger feeds

Trigger feeds allow you to connect triggers to external event sources. Event sources will fire registered triggers each time an event occurs. Here’s a [list of the event sources](https://github.com/apache/incubator-openwhisk/blob/master/docs/catalog.md) currently supported on IBM Cloud Functions (ICF).

This example shows how to use a feed in the [Alarms package](https://github.com/apache/incubator-openwhisk-package-alarms/blob/master/README.md) to fire a trigger every minute, which invokes an action using a rule.

1. Get a description of the feeds in the `/whisk.system/alarms` package:

      ```bash
      ibmcloud fn package get --summary /whisk.system/alarms
      ```

      ```text
      package /whisk.system/alarms: Alarms and periodic utility
         (parameters: *apihost, *trigger_payload)
      feed   /whisk.system/alarms/interval: Fire trigger at specified interval
         (parameters: minutes, startDate, stopDate)
      feed   /whisk.system/alarms/once: Fire trigger once when alarm occurs
         (parameters: date, deleteAfterFire)
      feed   /whisk.system/alarms/alarm: Fire trigger when alarm occurs
         (parameters: cron, startDate, stopDate)
      ```

2. Retrieve the details for the `alarms/interval` feed:

      ```text
      ibmcloud fn action get --summary /whisk.system/alarms/interval
      ```

      ```text
      action /whisk.system/alarms/interval: Fire trigger at specified interval
         (parameters: *apihost, *isInterval, minutes, startDate, stopDate, *trigger_payload)
      ```

      The `/whisk.system/alarms/interval` feed has the following parameters we need to pass in:

      1. `minutes`:  An integer representing the length of the interval \(in minutes\) between trigger fires.
      2. `trigger_payload`: The payload parameter value to set in each trigger event.
      3. Create a trigger that fires every minute using this feed.

      ```bash
      ibmcloud wsk trigger create everyMinute --feed /whisk.system/alarms/interval -p minutes 1 -p trigger_payload "{\"name\":\"Mork\", \"place\":\"Ork\"}"
      ```

      ```text
      ok: invoked /whisk.system/alarms/interval with id b2b4c3cb38224f44b4c3cb38228f44be
      ...
      ok: created trigger everyMinute
      ```

3. Connect this trigger to the `hello` action with a new rule:

      ```bash
      ibmcloud fn rule create everyMinuteRule everyMinute hello
      ```

      ```text
      ok: created rule everyMinuteRule
      ```

4. Check that the action is being invoked every minute by polling for activation logs:

      ```bash
      ibmcloud fn activation poll
      ```

      ```text
      Activation: 'hello' (b2fc4b00c7be4143bc4b00c7bed1431c)
      []
      Activation: 'everyMinute' (cec7eb38739c4d4287eb38739ccd42ef)
      [
         "{\"statusCode\":0,\"success\":true,\"activationId\":\"b2fc4b00c7be4143bc4b00c7bed1431c\",\"rule\":\"james.thomas@uk.ibm.com_dev/everyMinuteRule\",\"action\":\"james.thomas@uk.ibm.com_dev/hello\"}"
      ]
      ```

   You should see activations every minute for both the trigger and the action. The action receives the parameters `{"name":"Mork", "place":"Ork"}` on every invocation.

5. Delete the trigger and rule:

   {% hint style="warning" %}
   **Important**: Be sure to delete the trigger and rule or this event will be running **forever**!
   {% endhint %}

   ```bash
   ibmcloud fn trigger delete everyMinute
   ```

   ```bash
   ibmcloud fn rule delete everyMinuteRule
   ```

{% hint style="success" %}
Understanding triggers and rules allows you to build event-driven applications using ICF. All you have to do is create some actions, hook up events, and let the platform take care of everything else! What could be easier? 
{% endhint %}

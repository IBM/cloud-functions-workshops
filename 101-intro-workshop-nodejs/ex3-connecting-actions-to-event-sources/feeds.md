# Connecting Trigger Feeds

Trigger feeds allow you to connect triggers to external event sources. Event sources will fire registered triggers each time an event occurs. Here's a list of the event sources currently supported on IBM Cloud Functions: [https://github.com/apache/incubator-openwhisk/blob/master/docs/catalog.md](https://github.com/apache/incubator-openwhisk/blob/master/docs/catalog.md)

This example shows how to use a feed in the [Alarms package](https://github.com/apache/incubator-openwhisk-package-alarms/blob/master/README.md) to fire a trigger every minute, which invokes an action using a rule.

1. Get a description of the feeds in the `/whisk.system/alarms` package.

   ```text
   $ ibmcloud wsk package get --summary /whisk.system/alarms
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

2. Retrieve the details for the `alarms/interval` feed.

   ```text
   $ ibmcloud wsk action get --summary /whisk.system/alarms/interval
   ```

   ```text
   action /whisk.system/alarms/interval: Fire trigger at specified interval
      (parameters: *apihost, *isInterval, minutes, startDate, stopDate, *trigger_payload)
   ```

   The `/whisk.system/alarms/interval` feed has the following parameters we need to pass in:

   1. `minutes`:  An integer representing the length of the interval \(in minutes\) between trigger fires.
   2. `trigger_payload`: The payload parameter value to set in each trigger event.
   3. Create a trigger that fires every minute using this feed. 

   ```text
   $ ibmcloud wsk trigger create everyMinute --feed /whisk.system/alarms/interval -p minutes 1 -p trigger_payload "{\"name\":\"Mork\", \"place\":\"Ork\"}"
   ```

   ```text
   ok: invoked /whisk.system/alarms/interval with id b2b4c3cb38224f44b4c3cb38228f44be
   ...
   ok: created trigger everyMinute
   ```

3. Connect this trigger to the `hello` action with a new rule.

   ```text
   $ ibmcloud wsk rule create everyMinuteRule everyMinute hello
   ```

   ```text
   ok: created rule everyMinuteRule
   ```

4. Check that the action is being invoked every minute by polling for activation logs.

   ```text
   $ ibmcloud wsk activation poll
   ```

   ```text
   Activation: 'hello' (b2fc4b00c7be4143bc4b00c7bed1431c)
   []
   Activation: 'everyMinute' (cec7eb38739c4d4287eb38739ccd42ef)
   [
       "{\"statusCode\":0,\"success\":true,\"activationId\":\"b2fc4b00c7be4143bc4b00c7bed1431c\",\"rule\":\"james.thomas@uk.ibm.com_dev/everyMinuteRule\",\"action\":\"james.thomas@uk.ibm.com_dev/hello\"}"
   ]
   ```

   You should see activations every minute the trigger and the action. The action receives the parameters `{"name":"Mork", "place":"Ork"}` on every invocation.

**IMPORTANT: Let's delete the trigger and rule or this event will be running forever!**

```text
$ ibmcloud wsk trigger delete everyMinute
```

```text
$ ibmcloud wsk rule delete everyMinuteRule
```

🎉🎉🎉 **Understanding triggers and rules allows you to build event-driven applications on OpenWhisk. Create some actions, hook up events and let the platform take care of everything else, what could be easier?** 🎉🎉🎉


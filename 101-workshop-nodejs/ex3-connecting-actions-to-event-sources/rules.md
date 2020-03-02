# Using Rules

Rules are used to associate a trigger with an action. Each time a trigger event is fired, the action is invoked with the event parameters.

## Creating rules

As an example, create a rule that calls the `hello` action whenever a location update is triggered.

1. Check the `hello` action exists and responds to the correct event parameters.

    ```bash
    ibmcloud fn action invoke --result hello --param name Oliver --param place "Starling City"
    ```

2. Check the trigger exists.

   ```bash
   ibmcloud fn trigger get locationUpdate
   ```

   ```text
   ok: got trigger a
   {
        "namespace": "user@host.com_dev",
        "name": "locationUpdate",
        "version": "0.0.1",
        "parameters": [
            {
                "key": "name",
                "value": "Barry"
            },
            {
                "key": "place",
                "value": "Central City"
            }
        "limits": {},
        "publish": false
    ],
   ```

3. Create the rule using the command-line. The three parameters are the name of the rule, the trigger, and the action.

   ```bash
   ibmcloud fn rule create myRule locationUpdate hello
   ```

   ```text
   ok: created rule myRule
   ```

4. Retrieve rule details to show the trigger and action bound by this rule.

   ```bash
   ibmcloud fn rule get myRule
   ```

   ```text
   ok: got rule myRule
   {
       "namespace": "user@host.com_dev",
       "name": "myRule",
       "version": "0.0.1",
       "status": "active",
       "trigger": {
           "name": "locationUpdate",
           "path": "user@host.com_dev"
       },
       "action": {
           "name": "hello",
           "path": "user@host.com_dev"
       },
       "publish": false
   }
   ```

{% hint style="success" %}
**Success! The `locationUpdate` Trigger is now connected to the `hello` action via the `myRule` Rule!**.
{% endhint %}

## Testing rules

1. Fire the `locationUpdate` trigger. Each time that you fire the trigger with an event, the `hello` action is called with the event parameters.

```bash
   ibmcloud fn trigger fire locationUpdate --param name Kara --param place "Krypton"
```

```text
   ok: triggered /_/locationUpdate with id 5c153c01d76d49dc953c01d76d99dc34
```

2. Verify that the action was invoked by checking the activations list.

   ```bash
   ibmcloud fn activation list --limit 2
   ```

    ```text
    Activation ID                    Kind    Start Duration Status  Entity
    5ee74025c2384f30a74025c2382f30c1 nodejs  warm  2ms      success hello
    5c153c01d76d49dc953c01d76d99dc34 unknown warm  0s       success locationUpdate
    ```

   We can see the trigger activation \(`5c153c01d76d49dc953c01d76d99dc34`\) is recorded, followed by the `hello` action activation \(`5ee74025c2384f30a74025c2382f30c1`\).

3. Retrieving the trigger activation record will show the actions and rules invoked from this activation.

   ```text
   ibmcloud fn activation result 5ee74025c2384f30a74025c2382f30c1
   ```

   ```text
   {
      "payload": "Hello, Kara from Krypton"
   }
   ```

   You can see that the hello action received the event payload and returned the expected string.

Activation records for triggers store the rules and actions fired for an event and the event parameters.

4. Explore the results of the activation.

```text
ibmcloud fn activation result 5c153c01d76d49dc953c01d76d99dc34
```

```text
{
    "name": "Kara",
    "place": "Krypton"
}
```

```text
ibmcloud fn activation logs 5c153c01d76d49dc953c01d76d99dc34
```

```text
{"statusCode":0,"success":true,"activationId":"5ee74025c2384f30a74025c2382f30c1","rule":"user@host.com_dev/myRule","action":"user@host.com_dev/hello"}
```

You can create multiple rules that associate the same trigger with different actions.

**Can you create another trigger and rule that calls the** `hello` **action? 🤔**

* You can also use rules with sequences. For example, one can create an action sequence `recordLocationAndHello`that is activated by the rule `anotherRule`.

    1. create a simple sequence:

        ```text
        ibmcloud fn action create recordLocationAndHello --sequence /whisk.system/utils/echo,hello
        ```

    2. connect the `locationUpdate` trigger to the sequence with another rule:

    ```text
    ibmcloud fn rule create anotherRule locationUpdate recordLocationAndHello
    ```

    3. Fire the trigger:

    ```bash
    ibmcloud fn trigger fire locationUpdate --param name Kara --param place "Argo City"
    ```

    4. what do you see if you check the activation logs now?

    ```bash
    ibmcloud fn activation list --limit 5
    ```

## Disabling rules

Rules are enabled upon creation but can be disabled and re-enabled using the command-line.

1. Disable the rule connecting the `locationUpdate` trigger and `hello` action.

   ```bash
   ibmcloud fn rule disable myRule
   ```

   ```text
   ok: disabled rule myRule
   ```

2. Fire the trigger again.

   ```bash
   ibmcloud fn trigger fire locationUpdate --param name Kara --param place "Argo City"
   ```

   ```text
   ok: triggered /_/locationUpdate with id 53f85c39087d4c15b85c39087dac1571
   ```

3. Check the activation list there are no new activation records.

    ```bash
    ibmcloud fn activation list --limit 2
    ```

    ```text
    Activation ID                    Kind   Start Duration Status  Entity
    5ee74025c2384f30a74025c2382f30c1 nodejs warm  2ms      success hello
    5c153c01d76d49dc953c01d76d99dc34 nodejs warm  2ms      success echo
    ```

{% hint style="warning" %}
**The latest activation records were from the previous example!**. _Activation records for triggers are only recorded when they are bound to an active rule._
{% endhint %}

{% hint style="success" %}
🎉 **Excellent work! Now we have a way to connect actions to events in OpenWhisk, how do we connect triggers to event sources like messages queues? Enter trigger feeds…** 🎉
{% endhint %}

---

## Troubleshooting

If you see this error attempting to invoke the `hello` action with a `place` parameter:

```text
error: Unable to invoke action 'hello': Request defines parameters that are not allowed (e.g., reserved properties).
```

{% hint style="warning" %}
**You may see this error if you have previously "bound" the `place` parameter to a fixed value.**.
{% endhint %}

1. Delete the old `hello` action and create it again...

```bash
ibmcloud fn action delete hello
ibmcloud fn action create hello ~hello.js
```

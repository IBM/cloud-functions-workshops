# Use rules

Rules are used to associate a trigger with an action. Each time a trigger event is fired, the action is invoked with the event parameters.

## Create rules

As an example, let’s create a rule that calls the `hello` action whenever a location update is triggered.

1. Check the `hello` action exists and responds to the correct event parameters:

    ```bash
    ibmcloud fn action invoke --result hello --param name Oliver --param place "Starling City"
    ```

2. Check the trigger exists:

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

3. Create the rule using the command line. The three parameters are the name of the rule, the trigger, and the action:

    ```bash
    ibmcloud fn rule create myRule locationUpdate hello
    ```

    ```text
    ok: created rule myRule
    ```

4. Retrieve rule details to show the trigger and action bound by this rule:

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
Success! The `locationUpdate` trigger is now connected to the `hello` action via the `myRule` rule!
{% endhint %}

## Test rules

1. Fire the `locationUpdate` trigger. Each time that you fire the trigger with an event, the `hello` action is called with the event parameters:

    ```bash
    ibmcloud fn trigger fire locationUpdate --param name Kara --param place "Krypton"
    ```

    ```text
    ok: triggered /_/locationUpdate with id 5c153c01d76d49dc953c01d76d99dc34
    ```

2. Verify that the action was invoked by checking the activations list:

    ```bash
    ibmcloud fn activation list --limit 2
    ```

    ```text
    Activation ID                    Kind    Start Duration Status  Entity
    5ee74025c2384f30a74025c2382f30c1 nodejs  warm  2ms      success hello
    5c153c01d76d49dc953c01d76d99dc34 unknown warm  0s       success locationUpdate
    ```

   You can see the trigger activation \(`5c153c01d76d49dc953c01d76d99dc34`\) is recorded, followed by the `hello` action activation \(`5ee74025c2384f30a74025c2382f30c1`\).

3. Explore the `locationUpdate` trigger activation record:

    ```text
    ibmcloud fn activation result 5c153c01d76d49dc953c01d76d99dc34
    ```

    ```text
    {
        "name": "Kara",
        "place": "Krypton"
    }
    ```

    Activation results for triggers show the event parameters.

4. Explore the results of the `hello` action activation record:

    ```text
    ibmcloud fn activation result 5ee74025c2384f30a74025c2382f30c1
    ```

    ```text
    {
        "payload": "Hello, Kara from Krypton"
    }
    ```

    The hello action received the event parameters from the trigger and returned the expected string in the result.

<!-- ICF disabled this feature
    ```text
    ibmcloud fn activation logs 5c153c01d76d49dc953c01d76d99dc34
    ```

    ```text
    {"statusCode":0,"success":true,"activationId":"5ee74025c2384f30a74025c2382f30c1","rule":"user@host.com_dev/myRule","action":"user@host.com_dev/hello"}
    ```
-->

## Connect the same trigger to another action

You can create multiple rules that associate the same trigger with different actions.

_But can you create another trigger and rule that calls the `hello` action?_

You can also use rules with sequences. For example, you can create an action sequence `recordLocationAndHello` that is activated by the rule `anotherRule`.

1. Create a simple sequence:

    ```text
    ibmcloud fn action create recordLocationAndHello --sequence /whisk.system/utils/echo,hello
    ```

2. Connect the `locationUpdate` trigger to the sequence with another rule:

    ```text
    ibmcloud fn rule create anotherRule locationUpdate recordLocationAndHello
    ```

3. Fire the trigger:

    ```bash
    ibmcloud fn trigger fire locationUpdate --param name Kara --param place "Argo City"
    ```

4. If you check the activation logs now, you’ll see:

    ```bash
    ibmcloud fn activation list --limit 5
    ```

    ```bash
    b1084edae6f04a75884edae6f08a75d9 nodejs:10 warm  2ms        success 3cc8e80c-1...13fee32/hello:0.0.3
    07683c48a7af44c0a83c48a7af94c0cd nodejs:10 cold  237ms      success 3cc8e80c-1...13fee32/echo:0.0.475
    49d047150ddc498c9047150ddcc98cee nodejs:10 warm  5ms        success 3cc8e80c-1...13fee32/hello:0.0.3
    93e4680a56d84f73a4680a56d89f7362 sequence  warm  604ms      success 3cc8e80c-1...13fee32/recordLocationAndHello:0.0.1
    2902e554efdb441d7ae554efdb411d797 unknown   warm  0s        success 3cc8e80c-1...13fee32/locationUpdate:0.0.2
    ```

5. Examine the result for the `recordLocationAndHello` trigger:

    ```bash
    ibmcloud fn activation result 93e4680a56d84f73a4680a56d89f7362
    {
        "payload": "Hello, Kara from Argo City"
    }
    ```

    This shows we were able to invoke the same `hello` action twice with the same trigger using two different rules.

## Disable rules

Rules are enabled upon creation but can be disabled and re-enabled using the command line.

1. Disable the rule connecting the `locationUpdate` trigger and `hello` action:

    ```bash
    ibmcloud fn rule disable myRule
    ```

    ```text
    ok: disabled rule myRule
    ```

2. Fire the `locationUpdate` trigger again:

    ```bash
    ibmcloud fn trigger fire locationUpdate --param name Kara --param place "Argo City"
    ```

    ```text
    ok: triggered /_/locationUpdate with id 53f85c39087d4c15b85c39087dac1571
    ```

3. Check the activation list. There shouldn’t be any new activation records:

    ```bash
    ibmcloud fn activation list --limit 2
    ```

    ```text
    Activation ID                    Kind   Start Duration Status  Entity
    5ee74025c2384f30a74025c2382f30c1 nodejs warm  2ms      success hello
    5c153c01d76d49dc953c01d76d99dc34 nodejs warm  2ms      success echo
    ```

{% hint style="warning" %}
The latest activation records were from the previous example! Activation records for triggers are only recorded when they are bound to an active rule.
{% endhint %}

{% hint style="success" %}
Excellent work! Now you have a way to connect events to actions using triggers and rules. It’s time to learn more about trigger feeds so you can connect triggers to event sources like data stores, message queues and just about anything.
{% endhint %}

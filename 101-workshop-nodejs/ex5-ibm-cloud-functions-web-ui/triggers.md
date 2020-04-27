# Managing triggers

## List triggers for a namespace and region

1. Select "Triggers" from the left-hand menu panel on the **Functions** homepage which will display the [management page for triggers](https://cloud.ibm.com/functions/triggers). It shows triggers created within the selected IBM Cloud namespace and region.

The following screenshot shows a listing of triggers created in the `test-iam-namespace` namespace in the `Dallas` region:

![Trigger listing page](images/101-ex5-trigger-list.png)

2. Click on the name of the `locationUpdate` trigger to move to the trigger details page.

![Select a trigger from list](images/101-ex5-trigger-list-select.png)

## Details overview

The trigger details page shows properties for the chosen trigger.

![Trigger details page](images/101-ex5-trigger-details.png)

In this case, we see that the `locationUpdate` trigger is connected to two actions using the two rules we created earlier.

Using the menu on the left-hand side, different properties for the trigger can be accessed and modified:

* **Connected actions**  shows the actions this trigger is connected to.
* **Parameters** shows default parameters for the action.
* **Endpoints** show details on how to fire this trigger remotely.

You can explore these options later at your convenience.

## Create triggers

1. Return to the [trigger listing page](https://cloud.ibm.com/functions/triggers) using the `Triggers` breadcrumb in the top-left of the page.

![Return to trigger listing](images/101-ex5-trigger-breadcrumb.png)

2. Select the "Create" button from the page.

![Create a new trigger](images/101-ex5-trigger-create.png)

3. Click on "Trigger" from the "Create" entity list.

![Create a trigger](images/101-ex5-entity-create-trigger.png)

4. Click on "Custom Trigger".

![Select Custom Trigger](images/101-ex5-trigger-create-type.png)

5. Configure the trigger by filling in the  "Trigger Name" and "Description"

![Configure trigger name and description](images/101-ex5-trigger-create-configure-name.png)

6. Click "Create"

![](images/101-ex5-trigger-create-configure-create.png)

7. Your trigger has been created, but is not yet connected to an action. Click "Add" in "Connected Actions".

![Select Custom Trigger](images/101-ex5-trigger-connect-action-add.png)

8. Let's connect it to an exiting action. Click "Select Existing".

![Select Custom Trigger](images/101-ex5-trigger-connect-action-add-select.png)

9. Select the `hello` action from the dropdown and click "Add".

![Select Custom Trigger](images/101-ex5-trigger-connect-action-existing-add.png)

You should now see your new trigger in the trigger details page:

![Select Custom Trigger](images/101-ex5-trigger-connect-action-complete.png)

{% hint style="info" %}
When you connect a trigger to an action, the underlying code of the web UI automatically creates a **rule** "under the covers". The rule, shown as a **Connection** in the details page, is enabled by default.
{% endhint %}

{% hint style="success" %}
Kudos! You now can use the web UI to create and connect new triggers to actions as you did in the CLI.
{% endhint %}

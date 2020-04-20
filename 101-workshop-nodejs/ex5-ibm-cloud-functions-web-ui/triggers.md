# Managing triggers

## List triggers for a namespace and region

1. Select "Triggers" from the left-hand menu panel on the **Functions** homepage which will display the [management page for triggers](https://cloud.ibm.com/functions/triggers). It shows triggers created within the selected IBM Cloud namespace and region.

The following screenshot shows a listing of triggers created in the `test-iam-namespace` namespace in the `Dallas` region:

![Trigger listing page](images/101-ex5-triggers-overview.png)

2. Click on the name of any trigger listed to move to the trigger details page.

## Details overview

The trigger details page shows properties for the chosen trigger.

![Trigger details page](images/101-ex5-trigger-details.png)

Using the menu on the left-hand side, different properties for the trigger can be accessed and modified.

* **Connected actions**  shows the actions this trigger is connected to.
* **Parameters** shows default parameters for the action.
* **Endpoints** show details on how to fire this trigger remotely.

## Create triggers

From the [trigger create page](https://cloud.ibm.com/functions/triggers), new triggers can be created.

1. Select the "Create" button from the page.
![](images/101-ex5-create-trigger-hp.png)
2. Choose "Create Trigger" from the list.
![](images/101-ex5-create-trigger-select-trigger.png)
3. Choose "Trigger type" as "Custom Trigger"
![](images/101-ex5-create-trigger-type.png)
4. Fill in "Trigger Name" and "Description"
5. Click "Create"
![](images/101-ex5-create-trigger-name.png)

# Managing actions from the web UI

## List actions for namespace and region

Select "Actions" from the left-hand menu panel on the IBM Cloud Functions homepage which will display the [Management page for actions](https://cloud.ibm.com/functions/actions). The page shows actions within the chosen namespace, and region currently selected within IBM Cloud.

![action details page](images/101-ex5-action-overview.png)

## Details overview

The action details page shows properties for the chosen action. Click oin the name of any action listed to move to the action details page.

For supported language runtimes, an action source code is shown in an editor which allows users to make changes and publish them immediately making them live to callers.

![action details page](images/101-ex5-action-editor.png)

Using the menu on the left-hand side, different properties for the action can be accessed and modified.

* **Code** shows action source code in editor.
* **Parameters** shows default parameters for the action.
* **Runtime** shows the action runtime, timeout value, and memory limit.
* **Endpoints** allow you to expose the action as a web action.
* **Connected triggers** shows the triggers the action is connected to.
* **Enclosing sequences** shows sequences which use this action.

## Invoke actions

Click the "Invoke" button to invoke an action and display the resulting activation record.

_Input parameters to invocations can be modified using the "Change Input" button._

![Invoking an action](images/101-ex5-invoking-action.png)

## Creating actions

From the [action overview page](https://cloud.ibm.com/functions/actions), new actions can be created by providing the source code through the browser-based editor.

1. Select the "Create" button from the page.
![Creating an action](images/101-ex5-creating-action-hp.png)
2. Choose "Create Action" from the list.
![Creating an action](images/101-ex5-creating-action-list.png)
3. Fill in the "Action name" and choose the "Runtime".
4. Click "Create"
![Creating an action](images/101-ex5-creating-action-modal.png)
5. Fill in the editor with your action source code.

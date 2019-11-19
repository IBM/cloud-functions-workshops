# Actions

Select "Actions" from the left-hand menu panel on the homepage.[This page](https://cloud.ibm.com/functions/actions) is the management page for actions. It shows actions within the chosen region, org and space.

![action details page](images/action-overview.png)

Select an action from the page to move to the action details page.

## Details overview

The action details page will show properties for the chosen action.

For supported runtimes, action source code is shown in an editor which allows users to make changes live.

![action details page](images/action-editor.png)

Using the menu on the left-hand side, different properties for the action can be accessed and modified.

* _"Code"_ - shows action source code in editor.
* _"Parameters"_ - shows default parameters for the action.
* _"Runtime"_ - shows the action runtime, timeout value and memory limit.
* _"Endpoints"_ - allows you to expose the action as web action.
* _"Connected Triggers"_ - shows the triggers action is connected to.
* _"Enclosing Sequences"_ - shows sequences which use this action.

## Invoking actions

Click the "Invoke" button to invoke an action and display the resulting activation record.

_Input parameters to invocations can be modified using the "Change Input" button._

![Invoking an action](images/invoking-action.png)

## Creating actions

From the [action overview page](https://cloud.ibm.com/functions/actions), new actions can be created by providing the source code through the browser-based editor.

1. Select the "Create" button from the page.
![Creating an action](images/creating-action-hp.png)
2. Choose "Create Action" from the list.
![Creating an action](images/creating-action-list.png)
3. Fill in the "Action name" and choose the "Runtime".
4. Click "Create"
![Creating an action](images/creating-action-modal.png)
5. Fill in the editor with your action source code.




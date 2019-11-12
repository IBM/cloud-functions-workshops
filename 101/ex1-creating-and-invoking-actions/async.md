# Asynchronous actions

## Returning asynchronous results

JavaScript functions that run asynchronously may need to return the activation result after the `main` function has returned. You can accomplish this by returning a Promise in your action.

1. Save the following content in a file called `asyncAction.js`.

```text
function main(args) {
     return new Promise(function(resolve, reject) {
       setTimeout(function() {
         resolve({ done: true });
       }, 2000);
    })
 }
```

Notice that the `main` function returns a Promise, which indicates that the activation hasn't completed yet, but is expected to in the future.

The `setTimeout()` JavaScript function in this case waits for two seconds before calling the callback function. This represents the asynchronous code and goes inside the Promise's callback function.

The Promise's callback takes two arguments, resolve and reject, which are both functions. The call to `resolve()`fulfills the Promise and indicates that the activation has completed normally.

A call to `reject()` can be used to reject the Promise and signal that the activation has completed abnormally.

## Testing asynchronous timeouts

1. Run the following commands to create the action and invoke it:

   ```text
   $ ibmcloud wsk action create asyncAction asyncAction.js
   ```

   ```text
   $ ibmcloud wsk action invoke --result asyncAction
   ```

   ```text
   {
       "done": true
   }
   ```

   Notice that you performed a blocking invocation of an asynchronous action.

2. Fetch the last activation log to see how long the async activation took to complete:

   ```text
   $ ibmcloud wsk activation get --last
   ```

   ```text
   {
        "duration": 2026,
        ...
   }
   ```

   Checking the `duration` field in the activation record, you can see that this activation took slightly over two seconds to complete.

**Actions have a** `timeout` **parameter that enforces the maximum duration for an invocation.** This value defaults to 60 seconds and can be changed to a maximum of 5 minutes.

Let's look at what happens when an action invocation takes longer than the `timeout`.

1. Update the `asyncAction` timeout to 1000ms.

   ```text
   $ ibmcloud wsk action update asyncAction --timeout 1000
   ```

   ```text
   ok: updated action asyncAction
   ```

2. Invoke the action and block on the result.

   ```text
   $ ibmcloud wsk action invoke asyncAction --result
   ```

   ```text
   {
       "error": "The action exceeded its time limits of 1000 milliseconds."
   }
   ```

   The error message returned by the platform indicates the action didn't return a response within the user-specified timeout. If we change the `timeout` back to a value higher than the artificial delay in the function, it should work again.

3. Update the `asyncAction` timeout to 10000ms.

   ```text
   $ ibmcloud wsk action update asyncAction --timeout 10000
   ```

   ```text
   ok: updated action asyncAction
   ```

4. Invoke the action and block on the result.

   ```text
   $ ibmcloud wsk action invoke asyncAction --result
   ```

   ```text
   {
       "done": true
   }
   ```

🎉🎉🎉 **Asynchronous actions are necessary for calling other APIs or cloud services. Don't forget about that timeout though! Let's have a look at using an asynchronous action to invoke another API…** 🎉🎉🎉


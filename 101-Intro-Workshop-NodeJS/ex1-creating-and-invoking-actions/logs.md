# Retrieving Action Logs

Application logs are essential to debugging production issues. In IBM Cloud Functions, all output written to `stdout` and `stderr` by actions is available in the activation records.

## Creating activation logs

1. Create a new action \(`logs`\) from the following source files.

   ```text
   function main(params) {
       console.log("function called with params", params)
       console.error("this is an error message")
       return { result: true }
   }
   ```

   ```text
   $ ibmcloud wsk action create logs logs.js
   ```

   ```text
   ok: created action logs
   ```

2. Invoke the `logs` action to generate some logs.

   ```text
   $ ibmcloud wsk action invoke -r logs -p hello world
   ```

   ```text
   {
       "result": true
   }
   ```

## Accessing activation logs

Retrieve activation record to verify logs have been recorded.

```text
$ ibmcloud wsk activation get --last
```

```text
ok: got activation 9fc044881705479580448817053795bd
{    
    ...   
    "logs": [
        "2018-03-02T09:49:03.021Z stdout: function called with params { hello: 'world' }",
        "2018-03-02T09:49:03.021Z stderr: this is an error message"
    ],
    ...
}
```

Logs can also be retrieved without showing the whole activation record, using the `activation logs` command.

```text
$ ibmcloud wsk activation logs --last
```

```text
2018-03-02T09:49:03.021404683Z stdout: function called with params { hello: 'world' }
2018-03-02T09:49:03.021816473Z stderr: this is an error message
```

## Polling activation logs

Activation logs can be monitored in real-time, rather than manually retrieving individual activation records.

1. Run the following command to monitor logs from the `logs` actions.

   ```text
   $ ibmcloud wsk activation poll
   ```

   ```text
   Enter Ctrl-c to exit.
   Polling for activation logs
   ```

2. In another terminal, run the following command multiple times.

   ```text
   $ ibmcloud wsk action invoke logs -p hello world
   ```

   ```text
   ok: invoked /_/logs with id 0e8d715393504f628d715393503f6227
   ```

3. Check the output from the `poll` command to see the activation logs.

   ```text
   Activation: 'logs' (ae57d06630554ccb97d06630555ccb8b)
   [
       "2018-03-02T09:56:17.8322445Z stdout: function called with params { hello: 'world' }",
       "2018-03-02T09:56:17.8324766Z stderr: this is an error message"
   ]

   Activation: 'logs' (0e8d715393504f628d715393503f6227)
   [
       "2018-03-02T09:56:20.8992704Z stdout: function called with params { hello: 'world' }",
       "2018-03-02T09:56:20.8993178Z stderr: this is an error message"
   ]

   Activation: 'logs' (becbb9b0c37f45f98bb9b0c37fc5f9fc)
   [
       "2018-03-02T09:56:44.6961581Z stderr: this is an error message",
       "2018-03-02T09:56:44.6964147Z stdout: function called with params { hello: 'world' }"
   ]
   ```


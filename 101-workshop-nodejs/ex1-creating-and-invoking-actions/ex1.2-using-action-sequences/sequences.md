# Action Sequences

OpenWhisk supports a kind of action called a "sequence". Sequence actions are created using a list of existing actions. When the sequence action is invoked, each action in executed in order of the action parameter list. Input parameters are passed to the first action in the sequence. Output from each function in the sequence is passed as the input to the next function and so on. The output from the last action in the sequence is returned as the response result.

Here's an example of defining a sequence \(`my_sequence`\) which will invoke three actions \(`a, b, c`\). **Note that the following command is merely an example of syntax and should not be run.**

```text
$ ibmcloud wsk action create my_sequence --sequence a,b,c
```

_Sequences behave like normal actions, you create, invoke and manage them as normal through the CLI._

Using a sequence can remove the need to manually invoke actions and sit idle waiting for a response. In the example above, a sequence would be created for each serverless function in the application, combing the action doing the authentication followed by the actual request processing action.

Let's look at an example of using sequences.

1. Create the file \(`funcs.js`\) with the following contents:

   ```text
   function split(params) {
     var text = params.text || ""
     var words = text.split(' ')
     return { words: words }
   }

   function reverse(params) {
     var words = params.words || []
     var reversed = words.map(word => word.split("").reverse().join(""))
     return { words: reversed }
   }

   function join(params) {
     var words = params.words || []
     var text = words.join(' ')
     return { text: text }
   }
   ```

2. Create the following three actions:

   ```text
   $ ibmcloud wsk action create split funcs.js --main split
   ```

   ```text
   $ ibmcloud wsk action create reverse funcs.js --main reverse
   ```

   ```text
   $ ibmcloud wsk action create join funcs.js --main join
   ```

## Creating sequence actions

1. Test each action to verify it is working.

   ```text
   $ ibmcloud wsk action invoke split --result --param text "Hello world"
   ```

   ```text
   {
       "words": [
           "Hello",
           "world"
       ]
   }
   ```

   ```text
   $ ibmcloud wsk action invoke reverse --result --param words '["hello", "world"]'
   ```

   ```text
   {
       "words": [
           "olleh",
           "dlrow"
       ]
   }
   ```

   ```text
   $ ibmcloud wsk action invoke join --result --param words '["hello", "world"]'
   ```

   ```text
   {
       "text": "hello world"
   }
   ```

2. Create the following action sequence.

   ```text
   $ ibmcloud wsk action create reverse_words --sequence split,reverse,join
   ```

3. Test out the action sequence.

   ```text
   $ ibmcloud wsk action invoke reverse_words --result --param text "hello world"
   ```

   ```text
   {
       "text": "olleh dlrow"
   }
   ```

Using sequences is a great way to develop re-usable action components that can be joined together into "high-order" actions to create serverless applications.

## Handling errors

What if you want to stop processing functions in a sequence? This might be due to an application error or because the pre-conditions to continue processing have not been met. In the authentication example above, we only want to proceed if the authentication check passes.

If any action within the sequences returns an error, the platform returns immediately. The action error is returned as the response. No further actions within the sequence will be invoked.

Let's look at how this work...

1. Create the file \(`funcs.js`\) with the following contents:

   ```text
   function fail (params) {
     if (params.fail) {
         throw new Error("stopping sequence and returning.")
     }

     return params  
   }

   function end (params) {  
     return { message: "sequence finished." }
   }
   ```

2. Create the following three actions:

   ```text
   $ ibmcloud wsk action create fail funcs.js --main fail
   ```

   ```text
   $ ibmcloud wsk action create end funcs.js --main end
   ```

   ```text
   $ ibmcloud wsk action create example --sequence fail,end
   ```

3. Test out the action sequence without `fail` parameter:

   ```text
   $ ibmcloud wsk action invoke example -r
   ```

   ```text
   {
       "message": "sequence finished."
   }
   ```

4. Test out the action sequence with `fail` parameter:

   ```text
   $ ibmcloud wsk action invoke example -r -p fail true
   ```

   ```text
   {
       "error": "An error has occurred: Error: stopping sequence and returning."
   }
   ```

🎉🎉🎉 **Sequences are an "advanced" OpenWhisk technique. Congratulations for getting this far! Now let's move on to something all together different, connecting functions to external event sources…** 🎉🎉🎉


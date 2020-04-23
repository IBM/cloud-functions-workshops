var openwhisk = require('openwhisk');

function main(params) {
  if (params.password !== 'secret') {
    throw new Error("Password incorrect!")
  }

  var ow = openwhisk();
  return ow.actions.invoke({name: "hello", blocking: true, result: true, params: params})
}

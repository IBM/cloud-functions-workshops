// function main() {
//     return {payload: 'Hello world'};
// }

function main(params) {
    return {payload:  'Hello, ' + params.name + ' from ' + params.place};
}

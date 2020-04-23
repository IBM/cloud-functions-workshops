function main(params) {
    return {
       statusCode: 200,
       headers: { 'Content-Type': 'application/json' },
       body: params
    };
}
function main() {
   let html = '<html><body><h3><span style="color:red;">Hello World!</span></h3></body></html>'
   return { headers: { "Content-Type": "text/html" },
            statusCode: 200,
            body: html };
}
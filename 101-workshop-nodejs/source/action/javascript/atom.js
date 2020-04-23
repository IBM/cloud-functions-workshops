
// The "svg" that is base64 encoded in the "body" param below:
// <svg xmlns="http://www.w3.org/2000/svg" viewBox="-52 -53 100 100" stroke-width="2">
//  <g fill="none">
//   <ellipse stroke="#66899a" rx="6" ry="44"/>
//   <ellipse stroke="#e1d85d" rx="6" ry="44" transform="rotate(-66)"/>
//   <ellipse stroke="#80a3cf" rx="6" ry="44" transform="rotate(66)"/>
//   <circle  stroke="#4b541f" r="44"/>
//  </g>
//  <g fill="#66899a" stroke="white">
//   <circle fill="#80a3cf" r="13"/>
//   <circle cy="-44" r="9"/>
//   <circle cx="-40" cy="18" r="9"/>
//   <circle cx="40" cy="18" r="9"/>
//  </g>
// </svg>


function main() {
  return { headers: { 'Content-Type': 'image/svg+xml' },
           statusCode: 200,
           body: `PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9Ii01MiAtNTMgMTAwIDEwMCIgc3Ryb2tlLXdpZHRoPSIyIj4NCiA8ZyBmaWxsPSJub25lIj4NCiAgPGVsbGlwc2Ugc3Ryb2tlPSIjNjY4OTlhIiByeD0iNiIgcnk9IjQ0Ii8+DQogIDxlbGxpcHNlIHN0cm9rZT0iI2UxZDg1ZCIgcng9IjYiIHJ5PSI0NCIgdHJhbnNmb3JtPSJyb3RhdGUoLTY2KSIvPg0KICA8ZWxsaXBzZSBzdHJva2U9IiM4MGEzY2YiIHJ4PSI2IiByeT0iNDQiIHRyYW5zZm9ybT0icm90YXRlKDY2KSIvPg0KICA8Y2lyY2xlICBzdHJva2U9IiM0YjU0MWYiIHI9IjQ0Ii8+DQogPC9nPg0KIDxnIGZpbGw9IiM2Njg5OWEiIHN0cm9rZT0id2hpdGUiPg0KICA8Y2lyY2xlIGZpbGw9IiM4MGEzY2YiIHI9IjEzIi8+DQogIDxjaXJjbGUgY3k9Ii00NCIgcj0iOSIvPg0KICA8Y2lyY2xlIGN4PSItNDAiIGN5PSIxOCIgcj0iOSIvPg0KICA8Y2lyY2xlIGN4PSI0MCIgY3k9IjE4IiByPSI5Ii8+DQogPC9nPg0KPC9zdmc+`
       };
}

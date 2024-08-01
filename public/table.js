module.exports = (data) => `
<!DOCTYPE html>
<html >
<head>
   <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
</head>
<body>
    <table class="table table-striped">
  <thead>
    <tr>
      <th scope="col">Title</th>
      <th scope="col">Status</th>
    </tr>
  </thead>
  <tbody>
    ${data}
  </tbody>
</table>
<script> 
  
  </script>
</body>
</html>
`
curl -X POST http://localhost:8181/api/auth/login \
-H "Content-Type: application/json" \
-d '{
  "email": "johndoe@gmail.com",
  "password": "dr@john123921"
}'

{"authtoken":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"}
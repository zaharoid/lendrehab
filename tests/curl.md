# LendRehab API quick tests

## Login (staff)
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"staff@lendrehab.test","password":"staff123"}'

## List devices
curl http://localhost:3000/api/devices

## Create device (staff)
curl -X POST http://localhost:3000/api/devices \
  -H "Authorization: Bearer dev-staff-token" \
  -H "Content-Type: application/json" \
  -d '{"name":"Pediatric Walker","type":"Walker","size":"Small","description":"Child-size walker.","availableFrom":"2025-03-10"}'

## Create reservation (public)
curl -X POST http://localhost:3000/api/reservations \
  -H "Content-Type: application/json" \
  -d '{"citizenName":"Anna Kowalska","email":"anna@example.com","phone":"55512345","pickupAt":"2025-03-04T12:00:00Z","deviceId":1}'

## Staff list reservations
curl http://localhost:3000/api/reservations \
  -H "Authorization: Bearer dev-staff-token"

## Update status
curl -X PATCH http://localhost:3000/api/reservations/1/status \
  -H "Authorization: Bearer dev-staff-token" \
  -H "Content-Type: application/json" \
  -d '{"status":"APPROVED"}'

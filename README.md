http POST http://localhost:4000/ query='{findPerson(name: "juan"){name}}'

http POST http://localhost:36237/ query='mutation{addPerson(name: "j" city: "conocida" telefono: 1 street: "conocido"){name telefono address{city}}}'

http POST http://localhost:4000/ query="{allPerson{name}}"

http POST http://localhost:4000/ query="{personCount}"

http POST http://localhost:4000/ query="{testPg}"

http POST http://localhost:38189/ query='mutation{addPerson(name: "j" city: "conocida" phone: "12" street: "conocido"){name phone address{city}}}' --auth-type='bearer' --auth="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwidXNlcm5hbWUiOiJ6IiwiaGFzc2hlZF9wYXNzd29yZCI6IiQyYiQxMCQ5enZ3N2dPc1FRTXVWaGFHdk9kd1lPWkxpUDJ4d1dIZFdsUHVISDRrNzdRbEtKREhxcWpiZSIsImlhdCI6MTY2NDIyMTcwNn0.q4x9ggWNkKA-Ipy90C0QpAuAi_eswIp0gV66u3GVZGk"

http POST http://localhost:45231/ query='{me{username friends{ name }}}' --auth-type='bearer' --auth="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwidXNlcm5hbWUiOiJ6IiwiaGFzc2hlZF9wYXNzd29yZCI6IiQyYiQxMCQ5enZ3N2dPc1FRTXVWaGFHdk9kd1lPWkxpUDJ4d1dIZFdsUHVISDRrNzdRbEtKREhxcWpiZSIsImlhdCI6MTY2NDIyMTcwNn0.q4x9ggWNkKA-Ipy90C0QpAuAi_eswIp0gV66u3GVZGk"

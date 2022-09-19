http POST http://localhost:4000/ query='{findPerson(name: "juan"){name}}'

http POST http://localhost:4000/ query='mutation{addPerson(name: "j" city: "conocida" telefono: 1 street: "conocido"){name telefono address{city}}}'

http POST http://localhost:4000/ query="{allPerson{name}}"

http POST http://localhost:4000/ query="{personCount}"

http POST http://localhost:4000/ query="{testPg}"

Para el back-end se pide construir una API REST usando algún framework sobre Node JS que exponga la información al Pokedex.
Esta API debe consumir el servicio PokeApi https://pokeapi.co/ para obtener la información. La documentación la puedes encontrar en https://pokeapi.co/docs/v2

Desde el lado de frontend solo necesitaremos las diferentes llamadas por curl o postman (esto es parte del entregable) a las APIs expuestas y poder obtener por cada uno de los pokemones (foto y su información básica):

-   Tipo (type)
-   Peso (weight)
-   Listado de Habilidades (ability)

También, al pinchar sobre uno se debe mostrar su ficha descriptiva junto a su foto e información detallada:

-   Información Básica (la misma del listado)
-   Descripción
-   Evoluciones

-   Si deseas (OPCIONAL) puedes hacer un front-end que haga las llamadas mencionadas arriba, y puedes elegir el lenguaje de tu preferencia.

La aplicación debe ser desplegada en AWS, Azure, GCP o Heroku, a elección. Es importante que documentes cómo se realiza el despliegue. El código de la aplicación debe estar alojado en algún repositorio Git al que debes darnos acceso.

Cualquier funcionalidad extra es bienvenida. Idealmente se espera que la aplicación cuente con tests y que las respuestas de Poke Api sean almacenadas en una capa de caché para mejorar el rendimiento de las respuestas. ¡tendrá puntuación extra!

Lo que evaluaremos con este desafío, es que seas capaz de:

-   Integrar una API externa.
-   Exponer un API REST
-   Consumir API desde front-end (opcional)
-   Desplegar en la nube.
-   Manejar errores.
-   Mantener un código ordenado y de calidad.

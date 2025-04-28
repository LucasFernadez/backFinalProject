#Tres en raya (Backend)

API REST para gestionar el marcador de partidas de Tres en Raya.
Con autentificación de usuarios con Firebase Admin SDK y guarda los datos en MongoDB



scoreboard.js incrementa el contador según el resultado de cada partida.
tiene una función de volver todos los resultados a 0 para reiniciar el marcador.
El backend verifica el token de inicio de sesion con Firebase y extrae el uid.
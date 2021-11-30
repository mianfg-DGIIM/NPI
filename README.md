# npi-app

Aplicación para Nuevos Paradigmas de Interacción

## Entorno de desarrollo

Para poder desarrollar esta aplicación, deberás seguir primero los siguientes pasos:

1. **Instalar NPM.** Entra [aquí](https://nodejs.org/en/download/) y descarga la versión conveniente para tu sistema operativo. Usa el instalador. Verifica la instalación ejecutando estos dos comandos:

   ```
   node -v
   ```

   ```
   npm -v
   ```

2. **Entra en el directorio `npi-app`.** Este paso es MUY importante, no ejecutes NADA sobre el directorio raíz del repositorio.

3. **Ejecuta `npm install`.** Esto instalará todas las dependencias correspondientes. Ejecuta este comando periódicamente para tener instaladas las últimas dependencias.

¡Ya está todo listo! Ahora puedes programar sin complicaciones.

## Ejecución en tu móvil

Para ejecutar la aplicación en tu móvil (y poder probarla), deberás asegurarte de varias cosas.

### Tener instalado `adb` y la SDK de Android

Debes tener instalado `adb`y la SDK de Android. Pueden instalarse individualmente, pero es mucho mejor hacerlo con **Android Studio**. Instala Android Studio en tu sistema operativo y asegúrate de que las SDK están instaladas y `adb` está correctamente configurado. Para comprobar que `adb` funciona inserta este comando:

```
adb
```

### Tener el dispositivo conectado y depurable

Conecta tu dispositivo Android al ordenador. Ahora debes asegurarte de varias cosas:

* En algún momento del proceso tu móvil te dirá si confías en una clave. Di que sí, y que además lo haces siempre.
* Habilita el modo de depuración por USB. Es posible que tengas que habilitar antes las opciones para desarrolladores.
* En las notificaciones de Android, te saldrá "móvil cargando por USB" o "transferir archivos". Entra en el menú y selecciona la opción "compartir conexión por USB" (nombres aproximados).

Una vez tengas esto, comprueba que tu móvil es accesible por `adb`. Inserta el comando que aparece a continuación, tendrá una salida similar.

```
> adb devices
List of devices attached
xxxxxxxx        device
```
> Fíjate en cómo tu dispositivo aparece. Si no aparece ninguna línea con `device`, `adb` no puede acceder a tu dispositivo.

### Ejecuta la aplicación en modo _live reload_

Ejecuta los siguientes comandos para que la aplicación se ejecute en tu móvil:

1. ```
   ionic capacitor sync android
   ```

2. ```
   ionic capacitor run android -l
   ```

En las ocasiones consecutivas bastará con ejecutar el comando 2. Si no funciona, ejecuta primero el 1 y luego el 2.

### Consola de depuración

Para ver el _output_ de la consola abre Chrome y entra en [chrome://inspect/#devices](chrome://inspect/#devices). Al cabo de un rato aparecerá el dispositivo. Pulsa en **inspect**.

Todos los `console.log` aparecerán en esta consola.


## Errores

```
[capacitor]         C:\Users\CF\Repos\npi-app\npi-app\android\capacitor-cordova-android-plugins\src\main\java\com\bitpay\cordova\qrscanner\QRScanner.java:27: error: cannot find symbol
[capacitor]         import android.support.v4.app.ActivityCompat;
[capacitor]         ^
[capacitor]         symbol:   class ActivityCompat
[capacitor]         location: package android.support.v4.app
[capacitor]         > Task :capacitor-cordova-android-plugins:compileDebugJavaWithJavac
[capacitor]         C:\Users\CF\Repos\npi-app\npi-app\android\capacitor-cordova-android-plugins\src\main\java\com\bitpay\cordova\qrscanner\QRScanner.java:356: error: cannot find symbol
[capacitor]         boolean showRationale = ActivityCompat.shouldShowRequestPermissionRationale(cordova.getActivity(), permission);
[capacitor]         ^
[capacitor]         symbol:   variable ActivityCompat
[capacitor]         location: class com.bitpay.cordova.qrscanner.QRScanner
[capacitor]         Note: C:\Users\CF\Repos\npi-app\npi-app\android\capacitor-cordova-android-plugins\src\main\java\com\bitpay\cordova\qrscanner\QRScanner.java uses or overrides a deprecated API.
[capacitor]
[capacitor]         BUILD FAILED in 48s
```

La solución es ejecutar:

```
npx jetifier
npx cap sync android
```

Es posible que debas instalar `jetifier` antes, en cuyo caso te lo indicará directamente.

##### ERR_CONNECTION_REFUSED

Cambia la IP de la app, usando

```
ionic cap run android -l --host=[insertar IP aquí]
```


##### No funciona el servicio de reconocimiento de voz

Añade dentro de la etiqueta `<manifest>` en `android/app/src/main/AndroidManifest.xml`:

```
<queries>
   <intent>
      <action android:name="android.speech.RecognitionService" />
   </intent>
</queries>
```

Debes de ejecutar el comando de `ionic` **después** de haber guardado los cambios.
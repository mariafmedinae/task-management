# TaskManagement

Prueba técnica para desarollador Frontend Angular

## Descargar e instalar la aplicación

Con el comando `[git clone https://github.com/mariafmedinae/projects-and-tasks.git](https://github.com/mariafmedinae/task-management.git)` se puede descargar este proyecto. Después se ejecuta el comando `npm install` para instalar las dependencias. Una vez finalizado este proceso se puede abrir la aplicación en el navegador con `ng s -o`. Este proyecto está desarrollado en Angular 17.

## Sobre la aplicación
Esta aplicación es un gestor de tareas con estados personalizables. Una vez ejecutado los pasos anteriores aparecerá una vista con las columnas de los estados iniciales que puede tener una tarea (Estos estados no pueden ser modificados o eliminado). Las acciones disponibles son:

- Nueva tarea: Este botón (ubicado en la parte superior derecha de la pantalla) abre una modal con un input para digitar el nombre de la tarea que se quiere agregar a la plantilla. Una vez creada la tarea, tiene sus respectivas acciones de editar y eliminar al dar click en los tres puntos que aparecen a la derecha de la tarjeta.

- Nuevo estado: Se encuentra ubicado al lado derecho de la pantalla, después de la última columna de estado existente. Hace lo mismo que el botón Nueva tarea pero enfocado a los estados personalizados que irán apareciendo después del último estado disponible. Al igual que una tarea, se puede editar su nombre o ser eliminada, esto último sólo cuando no tenga tareas asignadas.

- Cambio de vista: La aplicación cuenta un botón tipo toggle para cambiar entre las dos vistas disponibles: vista de tarjetas y de tabla. La primera corresponde a lo descrito hasta el momento; la segunda es una tabla en la que se lista todas las tareas ingresadas hasta el momento y su respectivo estado. Cuenta con tres acciones para cada tarea: actualizar (cambiar el título), cambiar estado (cambiar el estado de la tarea al siguiente disponible) y eliminar.

En la vista tarjetas, los estados de cada tarea se cambian arrastrando cada tarjeta al estado deseado, siempre y cuando este sea el siguiente o el anterior.

Para la interfaz gráfica, además de SASS, se hizo uso de Angular Material para aprovechar los componente pre-construidos como la modal. Para el ordenamiento del proyecto, las acciones CRUD de la aplicación quedaron segmentadas en dos archivos de servicios, una para las tareas y otra para cada uno de los estados; y en la carpeta componets se encuentran todos los elementos modulares del proyecto. 

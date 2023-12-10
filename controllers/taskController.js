const { PrismaClient } = require('../prisma/generated/client');
const prisma = new PrismaClient();

// Obter todas as tarefas
exports.getAll = async (req, res) => {
  try {
    const tareas = await prisma.task.findMany();
    return res.send(tareas);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Error al obtener las tareas' });
  }
};

// Obter uma tarefa pelo seu id
exports.getById = async (req, res) => {
  const id = Number(req.params.id);
  if (isNaN(id)) {
    return res.status(400).json({ error: 'ID de tarea no válido' });
  }
   try {
    const tarea = await prisma.task.findUnique({
      where: {
        id: id,
      },
    });

    if (!tarea) {
      return res.status(404).json({ error: 'Tarea no encontrada' });
    }

    return res.send(tarea);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Error al obtener la tarea por ID' });
  }
};

// Obtener tareas por categoría
exports.getByCategory = async (req, res) => {
  const category = req.query.category;

  if (!category) {
    return res.status(400).json({ error: 'Parámetro de categoría no proporcionado' });
  }

  try {
    const tareas = await prisma.task.findMany({
      where: {
        category: {
          equals: category,
          mode: 'insensitive', // Hace la búsqueda insensible a mayúsculas y minúsculas
        },
      },
    });

    return res.send(tareas);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Error al obtener las tareas por categoría' });
  }
};


// Criar uma nova tarefa
exports.create = async (req, res) => {
  console.log(req.body);
  const { title, category, description, dueDate,priority} = req.body;

  try {
    const nuevaTarea = await prisma.task.create({
      data: {
        title,
        category,
        description,
        dueDate,
        completed: false,
        priority
      },
    });

    return res.status(201).send(nuevaTarea);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Error al crear una nueva tarea' });
  }
};

// Actualizar uma tarefa
exports.update = async (req, res) => {
  const { id } = req.params;
  const {title, category, description, dueDate, completed } = req.body;

  try {
    const tareaActualizada = await prisma.task.update({
      where: {
        id: parseInt(id),
      },
      data: {
        title,
        category,
        description,
        dueDate,
        completed
      },
    });

    return res.send(tareaActualizada);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Error al actualizar la tarea' });
  }
};

// Apagar uma tarefa pelo seu id
exports.delete = async (req, res) => {
  const id = req.params.id;

  try {
    await prisma.task.delete({
      where: {
        id: parseInt(id),
      },
    });

    return res.status(200).send('ok');
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Error al eliminar la tarea' });
  }
};

// Partilhar uma tarefa com outro utilizador
exports.shareTask = async (req, res) => {
  // Comentamos o eliminamos la verificación de autenticación
  // const userId = req.user ? req.user.id : null;

  // Eliminamos la verificación de autenticación
  // if (!userId) {
  //   res.status(401).json({ error: 'Usuario no autenticado.' });
  //   return;
  // }

  const { taskId, userIdToShareWith } = req.body;

  try {
    const task = await prisma.task.findUnique({
      where: {
        id: taskId,
      },
    });

    if (!task) {
      return res.status(404).json({ error: 'Tarea no encontrada' });
    }

    // Puedes mantener la verificación de permisos si lo deseas

    // Verifica si el usuario tiene permisos
    // if (task.userId !== userId) {
    //   return res.status(403).json({ error: 'No tienes permisos para compartir esta tarea' });
    // }

    const updatedTask = await prisma.task.update({
      where: {
        id: taskId,
      },
      data: {
        sharedWith: {
          push: userIdToShareWith,
        },
      },
    });

    // Devuelve la respuesta con la tarea actualizada
    res.status(200).json(updatedTask);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};


// Marcar uma tarefa como favorita
exports.markAsFavorite = async (req, res) => {
  const { id } = req.params;

  try {
    const task = await prisma.task.update({
      where: {
        id: parseInt(id),
      },
      data: {
        favorite: true,
      },
    });

    res.json(task);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al marcar la tarea como favorita' });
  }
};

// Categorizar uma tarefa
exports.categorizeTask = async (req, res) => {
  const { id } = req.params;
  const { category } = req.body;

  try {
    const task = await prisma.task.update({
      where: {
        id: parseInt(id),
      },
      data: {
        category,
      },
    });

    res.json(task);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al categorizar la tarea' });
  }
}

// Priorizar una tarea
exports.prioritizeTask = async (req, res) => {
  const { id } = req.params;
  const { priority } = req.body;

  try {
    const task = await prisma.task.update({
      where: {
        id: parseInt(id),
      },
      data: {
        priority,
      },
    });

    res.json(task);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al priorizar la tarea' });
  }
};



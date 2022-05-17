import React, { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';


export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    const taskAlreadyExist = tasks.find(task => task.title === newTaskTitle)

    if (taskAlreadyExist) {
      Alert.alert(
        'Task já Cadastrada',
        'Você não pode cadastrar uma task com o mesmo nome',
      )
      return;
    }

    const task = {
      id: new Date().getTime(),
      title: newTaskTitle,
      done: false
    }   

    setTasks(oldState => [...oldState, task])
  }

  function handleToggleTaskDone(id: number) {
    const tasksDone = tasks
    
    tasksDone.find(task => {
      if (task.id === id) {
        switch(task.done) {
          case false:
            task.done = true
            break;
          case true:
            task.done = false
            break;
        }
      }
    })
      
    setTasks([...tasksDone])
  }

  function handleRemoveTask(id: number) {
    Alert.alert(
      'Remover Item',
      'Tem certeza que deseja remover esse item',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Sim', onPress: () => setTasks(oldState => oldState.filter(task => task.id !== id)) }
      ]
    )
  }

  function handleEditTask(taskId: number, taskNewTitle: string) {
    const tasksEdited = tasks

    tasksEdited.find(task => {
      if (task.id === taskId) {
        task.title = taskNewTitle
      }
    })

    setTasks([...tasksEdited])
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList 
        tasks={tasks} 
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask}
        editTask={handleEditTask}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})
import { useState } from "react";
import { FlatList, Pressable, Text, TextInput, View } from "react-native";

interface Task {
  key: string;
  value: string;
}

export default function Index() {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState<Task[]>([]);
  const [editKey, setEditKey] = useState<string | null>(null);

  const addTask = () => {
    if (task.trim()) {
      if (editKey !== null) {
        setTasks(tasks.map(item => (item.key === editKey ? { key: editKey, value: task } : item)));
        setEditKey(null);
      } else {
        setTasks([...tasks, { key: tasks.length.toString(), value: task }]);
      }
      setTask('');
    }
  }

  const delTask = (key: string) => {
    setTasks(tasks.filter((item: Task) => item.key !== key));
  }

  const editTask = (key: string, value: string) => {
    setTask(value);
    setEditKey(key);
  }

  return (
    <View className="p-3 gap-2">
      <Text className="text-2xl font-bold">Lista de Tarefas</Text>
      <View className="flex-row justify-between items-center gap-2">
        <TextInput 
          onChangeText={setTask} 
          value={task} 
          placeholder="Digite sua tarefa" 
          className="flex-1 p-2 text-lg bg-blue-200 rounded-lg" 
        />
        <Pressable 
        onPress={addTask} 
        className="p-2 rounded-lg  bg-blue-500"
        style={({ pressed }) => ({ opacity: pressed ? 0.5 : 1 })}>
          <Text className="text-lg font-bold text-white">Adicionar</Text>
        </Pressable>
      </View>

      <FlatList 
        data={tasks} 
        renderItem={({ item }: { item: Task }) => (
          <View className="gap-2 mb-2 bg-slate-300 rounded-lg p-2" key={item.key}>
            <Text className="text-lg font-bold">{item.value}</Text>
            <View className="flex-row justify-center items-center gap-2">
              <Pressable 
              onPress={() => editTask(item.key, item.value)} 
              className="flex-1 p-2 bg-blue-500 rounded-lg">
                <Text className="text-lg text-center font-bold text-white">Editar</Text>
              </Pressable>
              <Pressable 
              onPress={() => delTask(item.key)} 
              className="flex-1 p-2 bg-blue-500 rounded-lg">

                <Text className="text-lg text-center font-bold text-white">Apagar</Text>

              </Pressable>
            </View>
          </View>
        )} 
      />
    </View>
  );
}

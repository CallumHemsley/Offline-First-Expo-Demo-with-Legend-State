import { Button, StyleSheet, View, FlatList } from "react-native";
import { StatusBar } from "expo-status-bar";
import { observable } from "@legendapp/state";
import {
  configureObservablePersistence,
  persistObservable,
} from "@legendapp/state/persist";
import { ObservablePersistFirebase } from "@legendapp/state/persist-plugins/firebase";
import { ObservablePersistAsyncStorage } from "@legendapp/state/persist-plugins/async-storage";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { observer } from "@legendapp/state/react";
import { initializeApp } from "firebase/app";
import Expense from "./components/Expense";
import { getRandomPastelColor } from "./utils/getRandomColor";
import Header from "./components/Header";
import { randomExpenseNames } from "./constants/expenses";
import { firebaseConfig } from "./constants/firebase";

// Initialize Firebase
initializeApp(firebaseConfig);

configureObservablePersistence({
  // Use AsyncStorage in React Native
  pluginLocal: ObservablePersistAsyncStorage,
  localOptions: {
    asyncStorage: {
      // The AsyncStorage plugin needs to be given the implementation of AsyncStorage
      AsyncStorage,
    },
  },
});

const state = observable({
  expenses: [
    {
      id: "1",
      title: "Groceries",
      amount: 50.0,
      color: getRandomPastelColor(),
      date: new Date().toLocaleString(),
    },
    {
      id: "2",
      title: "Electric Bill",
      amount: 75.0,
      color: getRandomPastelColor(),
      date: new Date().toLocaleString(),
    },
  ],
});

persistObservable(state, {
  local: "persist-demo",
  pluginRemote: ObservablePersistFirebase,
  remote: {
    onSetError: (err: unknown) => console.error(err),
    firebase: {
      refPath: () => `/expenses/`,
      mode: "realtime",
    },
  },
});

const App = observer(() => {
  const expenses = state.expenses.get();

  const addExpense = () => {
    const expenseIndex = expenses.length % randomExpenseNames.length;
    const newExpense = {
      id: Math.random().toString(),
      title: randomExpenseNames[expenseIndex],
      amount: Math.floor(Math.random() * 100),
      color: getRandomPastelColor(),
      date: new Date().toLocaleString(),
    };
    state.expenses.set((currentExpenses) => [...currentExpenses, newExpense]);
  };

  return (
    <View style={styles.container}>
      <StatusBar />
      <Header />
      <FlatList
        data={expenses}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <Expense item={item} />}
      />
      <Button title="Add Expense" onPress={addExpense} />
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingBottom: 50,
  },
});

export default App;

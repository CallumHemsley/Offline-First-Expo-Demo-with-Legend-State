import { StyleSheet, Text, View } from "react-native";
import Animated, {
  SlideInDown,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import React, { useEffect } from "react";

const Expense = ({ item }) => {
  const opacity = useSharedValue(1);

  // Set up the flashing effect on render
  useEffect(() => {
    // Flash to 0.2 opacity then back to 1
    opacity.value = withTiming(0.2, { duration: 100 }, () => {
      opacity.value = withTiming(1, { duration: 200 });
    });
  }, []);

  // Animated style that uses the shared opacity value
  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
    };
  });

  return (
    <Animated.View
      style={[styles.expenseItem, animatedStyle]}
      entering={SlideInDown}
    >
      <View
        style={[styles.expenseColorBlock, { backgroundColor: item.color }]}
      />
      <View style={styles.expenseDetails}>
        <Text style={styles.expenseTitle}>{item.title}</Text>
        <Text style={styles.expenseDate}>{item.date}</Text>
      </View>
      <Text style={styles.expenseAmount}>${item.amount.toFixed(2)}</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  expenseItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginHorizontal: 20,
    marginVertical: 4, // smaller gap between expenses
    backgroundColor: "#FFFFFF", // light background color
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2, // subtler shadow
    shadowRadius: 2,
    elevation: 2, // for Android shadow
  },
  expenseColorBlock: {
    width: 50,
    height: 50,
    borderRadius: 10,
    marginRight: 15,
  },
  expenseDetails: {
    flex: 1,
    justifyContent: "space-between",
  },
  expenseTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333333",
  },
  expenseDate: {
    marginTop: 5,
    fontSize: 14,
    color: "#555555",
  },
  expenseAmount: {
    fontSize: 16,
    color: "#555555",
    fontWeight: "bold",
  },
});

export default Expense;

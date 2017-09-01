import React, { Component } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  AsyncStorage,
  Switch
} from "react-native";

class Main extends Component {
  constructor() {
    super();
    this.state = {
      textValue: "",
      complete: false,
      id: "",
      tasks: []
    };
    //  this.handleSwitch = this.handleSwitch.bind(this)
  }

  handleTextValueChange(value) {
    console.log("Change text");
    this.setState({
      textValue: value
    });
  }

  handleTextValueSave() {
    const { textValue, complete } = this.state;
    console.log(textValue, complete);
    if (!this.state.textValue) return;
    const tasks = [
      ...this.state.tasks,
      {
        id: Date.now(),
        complete: false,
        textValue: this.state.textValue
      }
    ];

    this.setState({
      tasks
    });
    console.log(tasks);
  }

  handleSwitch(value) {
    const { textValue, complete, id } = value;
    console.log("Switch!", textValue, complete, id);

    const temp = this.state.tasks.map(t => {
      if (id !== t.id) return t;
      const tasks = { ...t, complete: !complete };
      return tasks;
    });
    this.setState({ tasks: temp });
  }

  handleDelete(value) {
    const tasks = this.state.tasks.filter((task, index) => {
      if (value.id !== task.id) {
        return task;
      }
    });
    this.setState({ tasks });
  }

  renderTasks() {
    const listItem = this.state.tasks.map((value, index) => {
      const { id, textValue, complete } = value;
      return (
        <View style={styles.container} key={index}>
          <Switch
            value={complete}
            onValueChange={e => this.handleSwitch(value)}
          />
          <Text key={index} style={complete && styles.complete}>
            {textValue}
          </Text>
          <Button title="Delete" onPress={p => this.handleDelete(value)} />
        </View>
      );
    });
    return listItem;
  }

  render() {
    return (
      <View>
        <View style={styles.container}>
          <TextInput
            style={{ flex: 1 }}
            value={this.state.textValue}
            onChangeText={this.handleTextValueChange.bind(this)}
          />
          <Button title="Add" onPress={this.handleTextValueSave.bind(this)} />
        </View>

        <View>{this.renderTasks()}</View>
      </View>
    );
  }
}

const styles = {
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center"
  },
  complete: {
    textDecorationLine: "line-through"
  }
};
export default Main;

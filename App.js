//jeremy-gottfrieds-tech-blog

import React from 'react';
import {StyleSheet, Text, View, Button, AppRegistry} from 'react-native';
import Voice from 'react-native-google-voice';
export default class VoiceNative extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      started: false,
      results: [],
    };
    Voice.onSpeechPartialResults = this.onSpeechPartialResults.bind(this);
  }
  onSpeechPartialResults(e) {
    this.setState({
      results: e.value,
    });
  }
  async _startRecognition(e) {
    this.setState({
      started: true,
      results: [],
    });
    try {
      await Voice.start('en-US');
    } catch (e) {
      console.error(e);
    }
  }

  render() {
    return (
      <View>
        {this.state.started ? (
          <Text style={styles.transcript}>Start Speaking ...</Text>
        ) : null}
        {this.state.results.map((result, index) => (
          <Text key={index} style={styles.transcript}>
            {' '}
            {result}
          </Text>
        ))}
        <Button
          style={styles.transcript}
          onPress={this._startRecognition.bind(this)}
          title="Start"
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  transcript: {
    textAlign: 'center',
    color: '#B0171F',
    marginBottom: 1,
    top: '150%',
  },
});
AppRegistry.registerComponent('VoiceNative', () => VoiceNative);

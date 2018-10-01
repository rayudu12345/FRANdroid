
import React,{Component} from 'react';
import {
  View,
  StatusBar,
  Platform,
  StyleSheet,
  TextInput
} from 'react-native';

let AliasName = React.createClass({
    propTypes: {
        refName: React.PropTypes.string,
        returnKeyType: React.PropTypes.string,
        onSubmitEditing: React.PropTypes.func
    },

    getDefaultProps: function(){
        return {
            refName: "",
            returnKeyType: "default",
            onSubmitEditing: () => {}
        }
    },

    render: function(){
        return(
            <View>
                <TextInput
                    ref="input"
                    returnKeyType={this.props.returnKeyType}
                    onSubmitEditing={this.props.onSubmitEditing}
                />
            </View>
        )
    }
});

module.exports = AliasName

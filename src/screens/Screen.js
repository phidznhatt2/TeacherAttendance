import React from 'react';
import { StyleSheet, View, SafeAreaView, StatusBar } from 'react-native';
import { Header } from 'react-native-elements';
import { MenuIcon } from '_components/Icon';
import stylesByPlatform from '_utils/font';

const Screen = props => (
  <View style={styles.container}>
    <SafeAreaView style={{ flex: 1 }}>
      <Header
        statusBarProps={{ barStyle: 'light-content' }}
        barStyle="light-content"
        containerStyle={[
          styles.headerContainer,
          {
            marginTop:
              props.marginTop !== undefined
                ? props.marginTop
                : StatusBar.currentHeight,
          },
        ]}
        centerContainerStyle={[styles.headerCenter]}
        leftComponent={
          props.iconLeft ? (
            props.iconLeft
          ) : (
            <MenuIcon navigation={props.navigation} />
          )
        }
        centerComponent={{
          text: props.name,
          style: { color: '#fff', fontSize: 16, ...stylesByPlatform },
        }}
      />
      <View style={styles.containerScreen}>{props.children}</View>
    </SafeAreaView>
  </View>
);
export default Screen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
  },
  containerScreen: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  headerCenter: {
    borderBottomWidth: 0,
  },
  headerContainer: {},
});

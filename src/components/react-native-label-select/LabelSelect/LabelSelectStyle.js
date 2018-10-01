/**
 * Created by TinySymphony on 2017-01-03.
 */

import {Dimensions, StyleSheet} from 'react-native';
const window = Dimensions.get('window');
const {width, height, scale} = window;

export const Color = {
  disableColor: '#eaeaea',
  main: '#40cca2'
};

export const IMG = {
  closeIcon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAABnElEQVRYR8WXy1HDMBCG/734Sjoh6QAqgBKgg/gij29wtC4uAegAKoASXEJKCFfPeMTIYxn5IVmvTHJM4v0+rbS7MuHKH7oyH6NAXde7tm3fpBARvTLGmpRynPM9gD4+gGcVfxTgnH8CeBj+cAZwn0pigH8D2A3xG8bYoV+sWuVMQH6dRGIFLmN/McYe5wJ7IcQPEd1oqY+SWIMLIX6J6G6xBRIqH0gl4QKfZEDbimgJV/iqQGwmfOBGgVAJX7hVwFciBL4p4CoRCncS2JIYDq/eZDAvNVtHdZ4FlhKV8VWH84I7Z2CjRMcF+qxcPeScgS2JELh3BtR5ADDZ85gB5pUBw2DRz5j37HAWMJVan8aIAeYkYKtzKRAzwDYFXJpMzBS1CrjAY6eoUcAHHiOxKhACD5VYCMTAQyQmAingvhL6rVje24On2trEM1VH13WHsixPk1ZcVVVDRLcqUGhvn4sYJJbXcl0gFdy0HUKIj6IoniYZGEzfiUj282OqtyJdAsCLEOKcZdkxz3PJ+X8zst1aLvnbZiu+JFzG/gPiB7Awgm9hrgAAAABJRU5ErkJggg==',
  addIcon: 'data:image/png;base64,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'
};

export default StyleSheet.create({
  selectedView: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexWrap: 'wrap'
  },
  selectedItem: {
    margin: 4,

    borderRadius: 6,
    borderColor: '#aaa',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    backgroundColor: '#f6f6f6'
  },
  addItem: {
    padding: 7
  },
  disableColor: {
    backgroundColor: Color.disableColor
  },
  labelText: {
    padding: 6,
    fontSize: 14,
    lineHeight: 14,
    maxWidth: 300
  },
  closeContainer: {
    padding: 8,
    borderLeftWidth: 2 / scale,
    borderLeftColor: '#c8c8c8'
  },
  closeIcon: {
    width: 10,
    height: 10
  },
  addIcon: {
    width: 20,
    height: 18
  },
  modalMask: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00000077'
  },
  modalContainer: {},
  modal: {
    height: height * 0.6,
    width: width * 0.6,
    overflow: 'hidden',
    //borderRadius: 10,
    backgroundColor: '#fff'
  },
  title: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderBottomWidth: 2 / scale,
    borderBottomColor: '#bbb'
  },
  TitleText:{
    fontSize: 14,
    color:'#000',
    lineHeight: 20
  },
  titleText: {
    fontSize: 18,
    lineHeight: 20
  },
  scrollView: {
    height: height * 0.6 - 80
  },
  buttonView: {
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  modalButton: {
    height: 40,
    width: width * 0.3,
    paddingLeft: 20,
    paddingRight: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Color.main
  },
  modalItem: {
    height: 50,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 2 / scale,
    borderBottomColor: '#bbb'
  },
  modalText: {
    fontSize: 16,
    width: width * 0.6 - 70
  },
  buttonText: {
    color: '#fff',
    fontSize: 16
  },
  confirmButton: {
    borderLeftWidth: 2 / scale,
    borderLeftColor: '#fff'
  },
  outerCircle: {
    borderWidth: 2 / scale,
    borderColor: '#888',
    width: 20,
    height: 20,
    //borderRadius: 10,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center'
  },
  enableCircle: {
    borderColor: Color.main
  },
  innerCircle: {
    backgroundColor: Color.main,
    width: 16,
    height: 16,
    //borderRadius: 8,
    overflow: 'hidden'
  },
  disableText: {
    color: '#999'
  }
});

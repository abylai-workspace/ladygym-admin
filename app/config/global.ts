import { LogBox } from 'react-native'

import DebugConfig from 'config/debug'

const ignoreLogBox = () => {
  if (!__DEV__) {
    return
  }

  //   NOTE: If ReactNative's log box warnings are too much, it is possible to turn it off, but the
  //   healthier approach is to fix the warnings. =)
  if (DebugConfig.logBox) {
    LogBox.ignoreLogs(DebugConfig.logBoxIgnoreLogs)
  } else {
    LogBox.ignoreAllLogs(true)
  }
}

ignoreLogBox()

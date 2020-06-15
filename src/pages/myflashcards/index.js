import { injectReducer } from '../../store/reducers'
import { hashHistory } from 'react-router'

// Sync route definition
export default(store) => ({
  path: 'myflashcards',
  getComponent (nextState, cb) {
    if (!store.getState().core.authenticated) {
      hashHistory.replace('landing')
      return
    }
    /*  Webpack - use 'require.ensure' to create a split point
        and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require) => {
      /*  Webpack - use require callback to define
          dependencies for bundling   */
      const container = require('./container').default
      const reducer = require('./reducer').default
      /*  Add the reducer to the store on key 'counter'  */
      injectReducer(store, { key: 'wordsState', reducer })
      /*  Return getComponent   */
      cb(null, container)
      /* Webpack named bundle   */
    }, 'myflashcards')
  }
})

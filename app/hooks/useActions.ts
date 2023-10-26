import { useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'
import ActionCreators from '../redux/action-creators'

export const useActions = () => {
  const dispatch = useDispatch()
  return bindActionCreators(ActionCreators, dispatch)
}

// example usage in component
// const { getFlightList } = useActions();
// const { flights, error, isLoading } = useTypedSelector(state => state.general);

import { RootState } from 'redux/reducers'
import { TypedUseSelectorHook, useSelector } from 'react-redux'

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector

// example usage in component
// const { getFlightList } = useActions();
// const { flights, error, isLoading } = useTypedSelector(state => state.general);

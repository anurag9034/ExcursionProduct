import axios from 'axios'
import {
  GET_COUNTRIES,
  COUNTRIES_ERROR,
  GET_ITEMS,
  GET_COUNTRIES_WITH,
  GET_LOADING,
} from './types'

export const simpleAction = () => async (dispatch) => {
  try {
    dispatch({ type: GET_LOADING })
    const res = await axios.all([
      axios.get(
        `https://hotelinfoservice.sunwingtravelgroup.com/en/AllHotelDestinationList`
      ),
    ])
    const [req1] = res
    let arr = []
    req1.data.forEach((element) => {
      arr = [...arr, ...element.destinations]
    })

    dispatch({
      type: GET_COUNTRIES,
      payload: arr,
    })
  } catch (e) {
    dispatch({
      type: COUNTRIES_ERROR,
      payload: e,
    })
  }
}

export const getItems = () => (dispatch) => {
  const result = [
    'carrot',
    'apple',
    'grapes',
    'cake',
    'crackers',
    'chips',
    'tv',
    'ham',
    'beef',
  ]
  dispatch({
    type: GET_ITEMS,
    payload: result,
  })
}

export const ageDemographic = (item) => async (dispatch) => {
  try {
    dispatch({ type: GET_LOADING })

    const res = await axios.get(
      'https://hotelinfoservice.sunwingtravelgroup.com/1/en/excursionsCountryDestination/Mexico/Cancun'
    )

    dispatch({
      type: GET_COUNTRIES_WITH,
      payload: res.data,
    })
  } catch (e) {
    dispatch({
      type: COUNTRIES_ERROR,
      payload: e,
    })
  }
}

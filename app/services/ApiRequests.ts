import { VALUES } from '../constants';
import { getStockSymbolePending, getStockSymboleSuccess } from '../redux/actions/StockDetailsActions';



var requestOptions = {
  method: 'GET',
  redirect: 'follow'
};




function get(key, value) {
  return dispatch => {
    // dispatch(getStockSymbolePending());
    fetch(`${VALUES.BASE_API}?${key}=${value}&token=${VALUES.SANDBOX_TOKEN}`, requestOptions)
      .then(res => res.json())
      .then(res => {
        if (res.error) {
          throw (res.error);
        }
        // dispatch(getStockSymboleSuccess(res);
        return res.products;
      })
      .catch(error => {
        dispatch(console.log(error));
      })
  }
}
export default get;

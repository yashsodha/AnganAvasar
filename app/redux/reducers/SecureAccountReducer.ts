import { types } from '../actions';

type initialState = {
  isLoading: Boolean;
  JanoiData: Array<any>;
  SanjiData: Array<any>;
  kankotriData: Array<any>;
  jaanData: Array<any>;
  siteForSYA: SiteForSYA;
  isOpenWebView: Boolean;
  memberCount: String;
};

type SiteForSYA = {
  name: String;
};

const INITIAL_STATE: initialState = {
  isLoading: false,
  memberCount: 0,
  SanjiData: [],
  JanoiData: [],
  kankotriData: [],
  jaanData: [],
  siteForSYA: { name: '' },
  isOpenWebView: false,
  isRefreshData : false
};

export default (state = INITIAL_STATE, action: { type: any; payload: any }) => {
  const { type, payload } = action;
  switch (type) {
    case types.GET_SANJI_DATA:
      return { ...state, SanjiData: payload?.sanjiData, isLoading: false, memberCount: payload?.memberCount };

    case types.GET_JANOI_DATA:
      return { ...state, JanoiData: payload?.janoiData, isLoading: false, memberCount: payload?.memberCount };

    case types.GET_KANKOTRI_DATA:
      return { ...state, kankotriData: payload?.kankotriData, isLoading: false, memberCount: payload?.memberCount };

    case types.GET_JAAN_DATA:
      return { ...state, jaanData: payload?.jaanData, isLoading: false, memberCount: payload?.memberCount };

      case types.REFRESH_DATA:
        return { ...state, isRefreshData: payload };


    case types.CLEAR_MEMBER_LIST:
      return {
        ...state,
        SanjiData: [],
        JanoiData: [],
        kankotriData: [],
        isLoading: true,
        memberCount: 0
      };

    default:
      return state;
  }
};

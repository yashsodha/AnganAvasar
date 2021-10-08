import types from './types';




export const clearMemberDetails = () => ({
  type: types.CLEAR_MEMBER_LIST,
  payload: []
})

export const getSanjiData = (sanjiData, memberCount) => ({
  type: types.GET_SANJI_DATA,
  payload: { sanjiData, memberCount }
})

export const getJanoiData = (janoiData, memberCount) => ({
  type: types.GET_JANOI_DATA,
  payload: { janoiData, memberCount }
})

export const getJaanData = (jaanData, memberCount) => ({
  type: types.GET_JAAN_DATA,
  payload: { jaanData, memberCount }
})

export const getKankotriData = (kankotriData, memberCount) => ({
  type: types.GET_KANKOTRI_DATA,
  payload: { kankotriData, memberCount }
})

export const isRefreshData = (isRefresh) => ({
  type: types.REFRESH_DATA,
  payload: isRefresh
})



/** @format */

import {createSlice, PayloadAction, Store} from '@reduxjs/toolkit'
import {SingerState, IArtist} from '@/interfaces/singer'
import {RootState} from '@/store/index'
const initialState: SingerState = {
    category: '',
    alpha: '',
    type: '',
    artistList: [] as Array<IArtist>,
    enterLoading: true,
    pullUpLoading: false,
    pullDownLoading: false,
    listOffset: 0,
    scrollY: 0,
}

export const SingerSlice = createSlice({
    name: 'singer',
    initialState,
    reducers: {
        changeScrollY(state, action: PayloadAction<number>) {
            state.scrollY = action.payload
        },
        changeEnterLoading: (state, action: PayloadAction<boolean>) => {
            state.enterLoading = action.payload
        },
        changeCategory: (state, action: PayloadAction<string>) => {
            state.category = action.payload
            state.listOffset = 0
            state.enterLoading = true
        },
        changeAlpha: (state, action: PayloadAction<string>) => {
            state.alpha = action.payload
            state.listOffset = 0
            state.enterLoading = true
        },
        changeType: (state, action: PayloadAction<string>) => {
            state.type = action.payload
            state.listOffset = 0
            state.enterLoading = true
        },
        changeListOffset: (state, action: PayloadAction<number>) => {
            state.listOffset = action.payload
        },
        changePullUpLoading: (state, action: PayloadAction<boolean>) => {
            state.pullUpLoading = action.payload
        },
        changePullDownLoading: (state, action: PayloadAction<boolean>) => {
            state.pullDownLoading = action.payload
        },
        changeArtistListAction: () => {
            // state = action.payload;
        },
        changeArtistListSuccess: (state, action: PayloadAction<Array<IArtist>>) => {
            state.artistList = action.payload
        },
        refreshInitSingerList: () => {},
        refreshMoreSingerList: () => {},
    },
    extraReducers: {},
})

export const {
    changeScrollY,
    changeEnterLoading,
    changeAlpha,
    changeArtistListAction,
    changeArtistListSuccess,
    changeCategory,
    changePullDownLoading,
    changePullUpLoading,
    changeType,
    changeListOffset,
    refreshInitSingerList,
    refreshMoreSingerList,
} = SingerSlice.actions

export const singerState = (state: RootState) => state.singer
export default SingerSlice.reducer

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import IPixabayItem from "../../../app/interfaces/IPixabayItem";
import ILikedImages from "../interfaces/ILikedImages";

const initialState: ILikedImages = {
    likedImages: []
}

export const likedImagesSlice = createSlice({
    name: 'likedImages',
    initialState,
    reducers: {
        addImage(state, action: PayloadAction<IPixabayItem>) {
            state.likedImages = [...state.likedImages, action.payload]
        },
        removeImage(state, action: PayloadAction<IPixabayItem>) {
            state.likedImages = state.likedImages.filter(image => image.id !== action.payload.id)
        },
        clearLikedImages() {
            return initialState;
        }
    },
});

export const {
    addImage,
    removeImage,
    clearLikedImages
} = likedImagesSlice.actions;

export default likedImagesSlice.reducer;
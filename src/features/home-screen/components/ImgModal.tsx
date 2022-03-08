import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../../app/hooks";
import IPixabayItem from "../../../app/interfaces/IPixabayItem";
import ImageLoader from "../../../app/utils/ImageLoader";
import useOutsideAlerter from "../../../app/utils/useOutsideAlerter";
import { addImage, removeImage } from "../slices/likedImagesSlice";

interface Props {
    imgData: IPixabayItem;
    handleClose: () => void;
}

const ImgModal = (props: Props) => {
    const { handleClose, imgData } = props;
    const { largeImageURL, id } = props.imgData;

    const dispatch = useDispatch();
    const likedImages = useAppSelector((state) => state.likedImages.likedImages)
    const isExist = likedImages.find(currentId => currentId.id === id);

    const modalRef = useRef<HTMLDivElement>(null);

    //this state is needed for hiding a like button if image is loading
    const [imgLoading, setImgLoading] = useState<boolean>(true);

    //handle click outside of modal window and if that is the case, close the modal
    useOutsideAlerter(modalRef, handleClose);

    const handleLike = (image: IPixabayItem) => {
        if (isExist) {
            //if there is image with same id as clicked image remove it from our state
            dispatch(removeImage(image));
        } else {
            //on the other hand add new image to the state
            dispatch(addImage(image))
        }
    }

    return <>
        <div className="modal__overlay">
            <div className="modal" ref={modalRef}>
                <div className="modal__close" onClick={handleClose}>
                    <i className="icon icon--close icon--base icon--black"></i>
                </div>
                <ImageLoader isLoading={(loading) => setImgLoading(loading)} className="modal__img" src={largeImageURL} alt='modal image' />
                {
                    !imgLoading && <div className="modal__like" onClick={() => handleLike(imgData)}>
                        <i className={`icon icon--base icon--like ${isExist ? 'icon--error' : 'icon--grey'}`}></i>
                        <span className="d--ib ml-1">
                            Like
                        </span>
                    </div>
                }
            </div>
        </div>
    </>
}

export default ImgModal;
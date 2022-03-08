import { useState } from "react";
import MainWrapper from "../../app/components/MainWrapper";
import { useAppSelector } from "../../app/hooks";
import IPixabayItem from "../../app/interfaces/IPixabayItem";
import ImageItem from "../home-screen/components/ImageItem";
import ImgModal from "../home-screen/components/ImgModal";

const LikedImages = () => {

    const likedImages = useAppSelector((state) => state.likedImages.likedImages);

    const [selectedImg, setSelectedImg] = useState<IPixabayItem | null>(null);

    const handleClickedImg = (id: number) => {
        const clickedImg = likedImages.find(img => img.id === id);
        clickedImg && setSelectedImg(clickedImg);

    }

    return <MainWrapper>
        <>
            <div className="type--center mb-6">Liked images: {likedImages.length}</div>
            <div className="grid">
                {
                    likedImages.length > 0
                        ? likedImages.map((image: IPixabayItem) => {
                            return <ImageItem
                                key={image.id}
                                imageData={image}
                                handleClick={handleClickedImg}
                            />
                        })
                        : 'No results'
                }
            </div>
            {
                selectedImg && <ImgModal handleClose={() => setSelectedImg(null)} imgData={selectedImg} />
            }
        </>
    </MainWrapper>
}
export default LikedImages;
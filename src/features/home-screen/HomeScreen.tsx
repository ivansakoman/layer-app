import { useState } from "react";
import Loader from "../../app/components/Loader";
import MainWrapper from "../../app/components/MainWrapper";
import IPixabayItem from "../../app/interfaces/IPixabayItem";
import { useLazyGetflowersQuery } from "../../app/services/imgService";
import toastService from "../../app/services/toastServices";
import ImageItem from "./components/ImageItem";
import ImgModal from "./components/ImgModal";
import SearchInput from "./components/SearchInput";


const HomeScreen = () => {
    const [getFlowers, { data: imagesData, isLoading: imagesLoading, isUninitialized: imagesUninitialized, isFetching: imagesFetching }] = useLazyGetflowersQuery();

    const [selectedImg, setSelectedImg] = useState<IPixabayItem | null>(null);
    const [inputValue, setInputValue] = useState<string>('');
    const loading = imagesLoading || imagesFetching;

    const fetchData = async (searchTerm: string) => {
        await getFlowers(searchTerm).unwrap().then((payload) => { }).catch((error) => {
            console.log('Error message: ', error.data);
            toastService.error('Error occured, for more information contact support at support@layer.hr');
        });
    }

    const handleChange = (value: string) => {
        setInputValue(value)
        fetchData(value)
    }

    const handleClickedImg = (id: number) => {
        if (imagesData) {
            const clickedImg = imagesData.hits.find(img => img.id === id);
            clickedImg && setSelectedImg(clickedImg);
        }
    }

    return <>
        <MainWrapper>
            <>
                <div className="mb-12">
                    <SearchInput onChange={handleChange} />
                </div>
                <div className="grid">
                    {
                        imagesUninitialized
                            //if or imagesData is not initialized 
                            ? <div className="type--center w--100">
                                <div className="type--xl mb-2">You didn't searched for anything yet,</div>
                                <div>Please type something to see result.</div>
                            </div>
                            //when user enter some search term
                            : loading
                                // render default loader on initial load and additional fetching
                                ? <Loader />
                                // render request result but first check if imagesData is undefined
                                : (imagesData && imagesData.hits.length > 0
                                    ? imagesData.hits.map((image: IPixabayItem) => {
                                        return <ImageItem
                                            key={image.id}
                                            imageData={image}
                                            handleClick={handleClickedImg}
                                        />
                                    })
                                    // display messge for no results
                                    : <div className="type--center w--100">
                                        <div className="type--xl mb-2">There is no results for '{inputValue}'</div>
                                        <div>Please try something else.</div>
                                    </div>
                                )
                    }
                </div>
                {
                    //show modal if user is clicked on one of the images
                    selectedImg && <ImgModal handleClose={() => setSelectedImg(null)} imgData={selectedImg} />
                }
            </>
        </MainWrapper>
    </>
}

export default HomeScreen;
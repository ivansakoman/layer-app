/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import Loader from "../components/Loader";

interface Props {
    src: string;
    alt: string;
    className: string;
    isLoading?: (loading: boolean) => void;
}

const ImageLoader = (props: Props) => {
    const { className, src, alt, isLoading } = props;

    const [loaded, setLoaded] = useState(false);

    //if isLoading prop is forwarded handle loading callback
    useEffect(() => {
        if (isLoading) {
            loaded
                ? isLoading(false)
                : isLoading(true)
        }
    }, [loaded])

    return (
        <>
            <img
                style={{ display: loaded ? 'block' : 'none' }}
                onLoad={() => setLoaded(true)}
                src={src}
                alt={alt}
                className={className}
                decoding="async"
            />
            {!loaded && <Loader />}
        </>
    )
}

export default ImageLoader;
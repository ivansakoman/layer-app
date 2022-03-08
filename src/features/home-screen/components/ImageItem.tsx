import IPixabayItem from "../../../app/interfaces/IPixabayItem"

interface Props {
    imageData: IPixabayItem;
    handleClick: (id: number) => void;
}

const ImageItem = (props: Props) => {
    const { previewURL, tags, id } = props.imageData;
    const { handleClick } = props;

    return <img
        onClick={() => handleClick(id)}
        className="grid__item"
        src={previewURL}
        alt={tags}
    />
}

export default ImageItem;
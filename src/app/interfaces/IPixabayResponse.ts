import IPixabayItem from "./IPixabayItem";

interface IPixabayResponse {
    total: number;
    totalHits: number;
    hits: IPixabayItem[];
}

export default IPixabayResponse;
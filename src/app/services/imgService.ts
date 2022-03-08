import { baseService } from "../baseService";
import { HttpMethods } from "../constants/HttpMethods";
import IPixabayResponse from "../interfaces/IPixabayResponse";

const key = '?key=26032813-5eca57a90774446a771ac3a81';

export const imgService = baseService.injectEndpoints({
    endpoints: (builder) => ({
        getflowers: builder.query<IPixabayResponse, string>({
            query: (searchTerm: string) => ({
                url: `${key}&q=${searchTerm}`,
                method: HttpMethods.GET,
            }),
        }),
        addComment: builder.mutation<void, string>({
            query: (body) => ({
                url: ``,
                method: HttpMethods.POST,
                body: body
            }),
        })
    }),
});

export const {
    useLazyGetflowersQuery,
    useAddCommentMutation
} = imgService;


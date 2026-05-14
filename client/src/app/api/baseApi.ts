import { fetchBaseQuery, type BaseQueryApi, type FetchArgs } from '@reduxjs/toolkit/query';
import { toast } from 'react-toastify';
import { startLoading, stopLoading } from '../layout/uiSlice';
import { router } from '../routes/Routes';

type ErrorResponse =
    string
    | { title: string; }
    | { errors: { [key: string]: string[]; }; };

const customBaseQuery = fetchBaseQuery({
    baseUrl: 'https://localhost:5001/api',
});

const sleep = () => new Promise(resolve => setTimeout(resolve, 1000));

export const baseQueryWithErrorHandling = async (
    args: string | FetchArgs,
    api: BaseQueryApi,
    extraOptions: Record<string, unknown>
) => {

    api.dispatch(startLoading());
    await sleep();

    const result = await customBaseQuery(args, api, extraOptions);

    api.dispatch(stopLoading());

    if (result.error) {
        const { status, data } = result.error;
        const responseData = data as ErrorResponse;

        console.error(result.error);

        if (status === 500) {
            router.navigate('/server-error', { state: { error: responseData } });
        } else if (status === 404) {
            router.navigate('/not-found');
        } else if (typeof responseData === 'string') {
            toast.error(responseData);
        } else if ('errors' in responseData) {
            // Object.values(responseData.errors).flat().forEach(error => toast.error(error));
            throw Object.values(responseData.errors).flat().join(', ');
        } else if ('title' in responseData) {
            toast.error(responseData.title);
        }

        // switch (status) {
        //     case 400:
        //         if (typeof responseData === 'string') {
        //             toast.error(responseData);
        //         // } else if ('errors' in responseData) {
        //         //     responseData.errors.forEach(error => toast.error(error));
        //         }
        //         break;

        //     case 401:
        //         if (title in responseData) {
        //             toast.error(responseData.title);
        //         }

        //         break;
        // }
    }

    return result;
};
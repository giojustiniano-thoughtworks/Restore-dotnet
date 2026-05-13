import { fetchBaseQuery, type BaseQueryApi, type FetchArgs } from '@reduxjs/toolkit/query';
import { startLoading, stopLoading } from '../layout/uiSlice';

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

    if (result.error) {
        const { status, data } = result.error;
        console.error('API Error:', { status, data });
    }

    api.dispatch(stopLoading());

    return result;
};
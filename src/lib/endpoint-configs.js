import {QueryClient} from "@tanstack/react-query" 

export const queryClient = new QueryClient()

export const sendQueryRequest = async ({signal , requestConfig}) => {

    const response = await fetch(requestConfig.url, {
        method: requestConfig.method,
        headers: requestConfig.headers,
        body: requestConfig.body,
        signal
      });

    if (!response.ok) {
        const errorData = await response.json();
        const error = new Error(errorData.message || errorData.msg || response.status+": Failed to Fetch");
        error.status = response.code;
        throw error;
    }

    const data = await response.json()

    return data
}

export const sendMutationRequest = async ({requestConfig}) => {

    const response = await fetch(requestConfig.url, {
        method: requestConfig.method,
        headers: requestConfig.headers,
        body: requestConfig.body,
      });

    if (!response.ok) {
        const errorData = await response.json();
        const error = Error(errorData.message || errorData.msg || "Error "+response.code+": Failed to Create/Update");
        error.status = response.code;
        throw error;
    }

    const data = await response.json()

    return data

}
interface BaseProps {
    url: string,
}

type GetProps = {
    method: 'GET' | 'HEAD',
    data?: never
}

type PostProps = {
    method: 'POST' | 'DELETE' | 'PUT',
    data: object
}

type ConditionalProps = GetProps | PostProps

type Props = BaseProps & ConditionalProps

type FetchReturn = {
    data: object | undefined
    statusCode: number
}


// Move to /utils.
function getURL(url: string) {
    //eslint-disable-next-line
    const urlExpression = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;
    const regex = new RegExp(urlExpression);

    if (url.match(regex)) {
        return url;
    }
    var mainURL = process.env.NEXT_PUBLIC_API_ENDPOINT;
    if (mainURL === undefined) return "";
    if (mainURL.charAt(mainURL.length - 1) !== "/") mainURL += "/"

    if (url.length > 0 && url.charAt(0) === "/") url = url.substring(1, url.length);
    return mainURL + url;
}

const fetchData = async ({ url, method, data }: Props): Promise<FetchReturn> => {
    const staticURL = getURL(url);

    try {

        const response = await fetch(staticURL, {
            method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data === undefined ? {} : data)
        });

        const responseData = await response.json();

        return {
            data: responseData,
            statusCode: response.status
        };
    } catch (error) {
        // Handle the error here, you can log it or throw a custom error.
        console.error('An error occurred:', error);
        throw new Error('Failed to fetch data');
    }
}

export function useGet({ url }: BaseProps): Promise<FetchReturn> {
    return fetchData({ url, method: "GET" });
}

export function usePost({ url, data }: BaseProps & PostProps): Promise<FetchReturn> {
    return fetchData({ url, method: "POST", data });
}





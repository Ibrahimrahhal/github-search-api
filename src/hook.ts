import { useCallback, useEffect, useState } from 'react';
import { GithubSearch, ObjectType, TypeName } from './interface';
import type { SearchInput } from './interface';
import { Debounce } from './utils';

export const useGithubSearch = <T extends TypeName>(
    type: T,
    input: SearchInput
) => {
    const [data, setData] = useState<ObjectType<T> | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<{
        status: string;
        message: string;
    } | null>(null);
    const [hasMore, setHasMore] = useState(true);
    const DebouncedGithubSearch = useCallback(
        Debounce((type: T, input: SearchInput) => {
            setLoading(true);
            GithubSearch(type, input)
                .then((data) => {
                    setError(null);
                    setData(data);
                    if (data.items) setHasMore(data.items.length > 0);
                    else setHasMore(true);
                })
                .catch((error) => {
                    setError({
                        status: error.response.status,
                        message: error?.response?.data?.message || error.message
                    });
                    setData(null);
                    setHasMore(true);
                })
                .finally(() => {
                    setLoading(false);
                });
        }, 300),
        []
    );
    useEffect(() => {
        if (!input.query || !type) {
            setData(null);
            setLoading(false);
            return;
        }
        DebouncedGithubSearch(type, input);
    }, [type, input.page, input.per_page, input.query]);

    return { data, loading, error, hasMore };
};

export default useGithubSearch;

import { useEffect, useState } from 'react';
import { GithubSearch, ObjectType, TypeName } from './interface';
import type { SearchInput } from './interface';

export const useGithubSearch = <T extends TypeName>(
    type: T,
    input: SearchInput
) => {
    const [data, setData] = useState<ObjectType<T> | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        GithubSearch(type, input)
            .then((data) => {
                setError('');
                setData(data);
                setLoading(false);
            })
            .catch((error) => {
                setError(error.message);
                setData(null);
                setLoading(false);
            });
    }, [type, input.page, input.per_page, input.query]);

    return { data, loading, error };
};

export default useGithubSearch;

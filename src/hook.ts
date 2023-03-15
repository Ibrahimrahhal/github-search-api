import { useEffect, useState } from 'react';
import {GithubSearch} from './interface';
import type { RepositoriesQueryResponse } from '../types/repository-query';
import type { SearchInput } from './interface';

export const useGithubSearch = (input: SearchInput) => {
    const [data, setData] = useState<RepositoriesQueryResponse | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        GithubSearch(input)
            .then((data) => {
                setError('');
                setData(data);
                setLoading(false);
            }).catch((error) => {
                setError(error.message);
                setData(null);
                setLoading(false);
            });
    }, [input]);

    return { data, loading, error };
};

export default useGithubSearch;

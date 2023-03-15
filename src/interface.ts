import axios from 'axios';
import type { RepositoriesQueryResponse } from '../types/repository-query';

export type SearchInput = {
    type: 'repositories' | 'users';
    query: string;
    page?: number;
    per_page?: number;
};

const searchQuantifiers = {
    name: 'in:name'
};

export const GithubSearch = async ({
    type,
    page = 1,
    per_page = 10,
    query
}: SearchInput) => {
    const baseUrl = `https://api.github.com/search/${type}`;
    const extension = `?q=${query} ${searchQuantifiers.name}&page=${page}&per_page=${per_page}`;
    const url = baseUrl + extension;
    const response = await axios.get<RepositoriesQueryResponse>(url);
    return response.data;
};

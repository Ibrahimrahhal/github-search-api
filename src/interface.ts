import axios from 'axios';
import type { RepositoriesQueryResponse, UsersQueryResponse } from '../types';

export type TypeName = 'repositories' | 'users';

export type ObjectType<T> = T extends 'repositories'
    ? RepositoriesQueryResponse
    : T extends 'users'
    ? UsersQueryResponse
    : never;

export type SearchInput = {
    query: string;
    page?: number;
    per_page?: number;
};

const searchQuantifiers = {
    name: 'in:name'
};

export const GithubSearch = async <T extends TypeName>(
    type: T,
    { page = 1, per_page = 10, query }: SearchInput
): Promise<ObjectType<T>> => {
    const baseUrl = `https://api.github.com/search/${type}`;
    const extension = `?q=${query} ${searchQuantifiers.name}&page=${page}&per_page=${per_page}`;
    const url = baseUrl + extension;
    const response = await axios.get<ObjectType<T>>(url);
    return response.data;
};

# Github Search API

Simple packages that wrap Github Search API, It also provides nice functionality like caching/ debouncing & ready to uses React hook

## Installation


```bash
npm i --save @ibrahim-rahhal/github-search-api
```

## Usage

```javascript
import { useGithubSearch } from '@ibrahim-rahhal/github-search-api';
export const MyComponent = () => {
const { data, loading, error, hasMore } = useGithubSearch(
        'repositories',
        {
            disableCache: false,
            query: query as string,
            page,
            per_page: 20
        }
    );
 return <h1>test</h1>;
}

```
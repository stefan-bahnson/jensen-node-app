import { get } from 'axios';

/*
 *  GET request using the axios library which uses promises.
 */
export const getPostById = (id) => get(`http://localhost:3333/api/v1/posts/${id}`);

export const getPosts = get(`http://localhost:3333/api/v1/posts`);

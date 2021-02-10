
// export interface Blog {
//     id: string;
//     title: string;
//     createdAt: string;
//     message: string;
//     comments: Comment[];
// }

// export declare class Comment {
//    createdAt: string;
//    content: string;
// }

export interface BlogComment {
    time: Date;
    message: string;
}

export interface Blog {
    title: string;
    time: Date;
    message: string;
    comments: BlogComment[];
}

/**
 * An iterface representing a blog and its ID.
 */
export interface BlogContent {
    id: number;
    blog: Blog;
}

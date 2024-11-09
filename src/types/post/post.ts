export interface PostDto {
  _id: string;
  UserId: string;
  Visibility: boolean;
  Date: string;
  Records: {
    _id: string;
    Date: string;
    Rating: number;
    Who: string;
    Where: string;
    What: string;
    How: string;
    Why: string;
    When: string;
    Image: string;
    SelfRating: number | null;
    CommentsNum: number;
  }[];
  Comments: {
    _id: string;
    UserId: string;
    Rating: number;
    Body: string;
  }[];
  Rating: number;
  SelfRating: number;
  comment_count: number;
  CommentsNum: number;
}

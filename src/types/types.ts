export interface LoginType {
  email: string;
  password: string;
}
export interface RegisterType extends LoginType {
  full_name: string;
}

export interface QueryParams {
  thread_id: number;
}

export interface LikeType {
  tweet_id: number;
}

export interface FollowType {
  target_follow: number;
}
export interface UserType {
  id: number;
  username: string;
  name: string;
  profile_picture: string;
}
export interface ReplyType {
  id: number;
  content: string;
  image?: string;
  user: UserType;
  likes?: number;
  replies?: number;
}
export interface ThreadType {
  id: number;
  content: string;
  image?: string;
  media_type?: "image" | "video" | null;
  likes?: number;
  replies?: number;
  user: UserType;
  islike: boolean;
}

export interface likeReturn {
  status: "like" | "unlike";
}

export interface LikeEventData {
  tweet_id: number;
  status: "like" | "unlike";
}

export interface FollowReturn {
  follower_id: number;
  following_id: number;
  isFollowing: boolean;
}

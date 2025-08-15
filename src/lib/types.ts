export interface NavigationItem {
  href: string;
  label: string;
  external?: boolean;
}

export interface ApiStats {
  photos: number;
  videos: number;
  memes: number;
}

export interface Review {
  name: string;
  role: string;
  company: string;
  rating: number;
  review: string;
  avatar: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

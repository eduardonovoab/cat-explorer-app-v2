export interface FavoriteBreed {
  id: number;
  user: number;
  breed_id: string;
  breed_name: string;
  breed_data: Record<string, any>;
  is_available: boolean;
  last_update: string;
  created_at: string;
}

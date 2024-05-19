export interface Profile {
  _id: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  updatedBy: string | null;
  provider: string;
  email: string;
  deleted: boolean;
}

export interface RegisterData {
  email: string;
  password: string;
}

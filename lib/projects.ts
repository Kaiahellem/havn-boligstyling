export interface Project {
  _id: string;
  title: string;
  image: string;
  images?: { url: string; caption?: string }[];
  description?: string;
  service?: string;
}

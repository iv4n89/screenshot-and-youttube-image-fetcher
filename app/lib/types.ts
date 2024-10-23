export interface Resource {
  url: string;
  title: string;
  description: string;
  language: string;
}

export interface Resources {
  [k: string]: Array<Resource>;
}

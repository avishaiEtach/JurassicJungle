import { MyCustomGlobal } from "./classes";

interface Images {
  value: string[];
  type: string;
}

interface KeyWords {
  value: string[];
  type: string;
}

interface SubTitle {
  value: string;
  type: string;
}

interface ThumbnailImage {
  value: string;
  type: string;
}

interface ArticleMainImage {
  value: string;
  type: string;
}

interface Title {
  value: string;
  type: string;
}

interface ArticleId {
  value: string;
  type: string;
}

interface Topic {
  value: string;
  type: string;
}

interface Content {
  value: Value;
  type: string;
}

interface Value {
  paragraphs: Paragraph[];
}

interface Paragraph {
  id: string;
  text: string;
}
declare global {
  interface Article {
    title: string;
    author: string;
    date: Date;
    topic: string;
    content: string;
    images: string[];
    favoriteGrade: number;
    _id: string;
    subTitle: string;
    thumbnailImage: string;
    keyWords: string[];
    articleMainImage: string;
  }
  interface EditArticle {
    images: Images;
    keyWords: KeyWords;
    subTitle: SubTitle;
    thumbnailImage: ThumbnailImage;
    articleMainImage: ArticleMainImage;
    title: Title;
    topic: Topic;
    content: Content;
    articleId: ArticleId;
  }
}

export { Article, Paragraph };

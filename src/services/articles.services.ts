import { http } from "../http";
import { Article } from "../types/ArticlesTypes";

export const articlesServices = {
  getArticles,
  getArticleById,
  getBestArticles,
  getKeywords,
  searchArticles,
  updateArticle,
};

async function getArticles(): Promise<Article[]> {
  const article: Article[] = await http.get(`/getArticles/all`);
  return article;
}

async function getBestArticles(): Promise<Article[]> {
  const article: Article[] = await http.get(`/getBestArticles`);
  return article;
}

async function getArticleById(id: string): Promise<undefined | Article> {
  const article: undefined | Article = await http.get(`/getArticles/${id}`);
  return article;
}

async function getKeywords(): Promise<string[]> {
  const keywords: string[] = await http.get(`/getKeyWords`);
  return keywords;
}

async function searchArticles(
  searchParameters: any = [],
  page = 1,
  limit = 10
): Promise<{ rows: Article[]; amount: number }> {
  const articles: { rows: Article[]; amount: number } = await http.post(
    `/searchArticles?page=${page}&limit=${limit}`,
    { searchParameters }
  );
  return articles;
}

async function updateArticle(article: any, id: string): Promise<Article> {
  const newArticle: Article = await http.put(`/updateArticle/${id}`, {
    fieldsToChange: article,
  });
  return newArticle;
}

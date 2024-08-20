import { http } from "../http";

export const adminServices = {
  getUsersByRole,
  getDinosaursVsArticles,
  getIncomeExpenses,
  updateMail,
};

async function getUsersByRole(): Promise<UsersByRole[]> {
  const usersByRole: UsersByRole[] = await http.get("/getUsersByRole");
  return usersByRole;
}

async function getDinosaursVsArticles(): Promise<DinosaursVsArticles[]> {
  const dinosaursVsArticles: DinosaursVsArticles[] = await http.get(
    "/getDinosaursVsArticles"
  );
  return dinosaursVsArticles;
}

async function getIncomeExpenses(): Promise<IncomeExpenses[]> {
  const incomeExpenses: IncomeExpenses[] = await http.get("/getIncomeExpenses");
  return incomeExpenses;
}

async function updateMail(id = "", fieldsToChange: any): Promise<User> {
  const user: User = await http.post(`/updateMail/${id}`, { fieldsToChange });
  return user;
}

import { MyCustomGlobal } from "./classes";

declare global {
  interface Routes {
    path: string;
    component: () => JSX.Element;
    label: string;
    showInNavBar: boolean;
    icon: JSX.Element;
    permissions: 0 | 1 | 2 | 3 | 4;
  }
  interface Dictionary<T = any> {
    [key: string]: T;
  }

  interface DinosaursSearchBarProps {
    getSearch: (key: string, value: string) => void;
    setPage: React.Dispatch<React.SetStateAction<number>>;
    setSearch: React.Dispatch<any>;
    search: any;
  }

  interface DinosaursCatagoriesProps {
    getSearch: (key: string, value: string) => void;
    search: any;
  }

  interface Categoric {
    title: string;
    items: { label: string; value: string }[];
  }

  interface SmallScreensCategoriesProps {
    categoric: Categoric;
  }

  interface DinosaurCardProps {
    dinosaur: Dinosaur;
    setChosenDinosaur?: (dinosaur: Dinosaur) => void;
    handleOpen?: () => void;
  }

  interface useDinosaursProps {
    setLoading: (value: boolean) => void;
  }

  //---------------------------------------------------------------------------------------------------

  interface ArticlesSearchBarProps {
    setPage: (page: number) => void;
    getSearch: (key: string, value: string) => void;
    search: any;
  }

  interface ArticlesKeyWordsSearchProps {
    setPage: (page: number) => void;
    getSearch: (key: string, value: string) => void;
    search: any;
  }

  interface useArticlesProps {
    setLoading: (value: boolean) => void;
  }

  //---------------------------------------------------------------------------------------------------------

  interface ContactUseSubmitFormProps {
    setLoading: (value: boolean) => void;
  }

  //---------------------------------------------------------------------------------------------------------

  interface LoginProps {
    handleClose: () => void;
  }
  interface SingupProps {
    handleClose: () => void;
  }
}

import { useEffect, useState } from "react";
import { extractSections, makeId } from "../../../../assets/util";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../store/store";
import { dinosaursServices } from "../../../../services/dinosaurs.services";
import { userServices } from "../../../../services/user.services";
import { setUser } from "../../../../store/users.actions";

interface addDinosaurArticle {
  sections: {
    id: string;
    header: string;
    paragraphs: { id: string; text: string }[];
  }[];
  mainHeader: string;
  list: { id: string; text: string }[];
  show: boolean;
}

interface useEditCreateDinosaurFunctionsProps {
  handleOpenSnackbar: () => void;
}

export const useEditCreateDinosaurFunctions = ({
  handleOpenSnackbar,
}: useEditCreateDinosaurFunctionsProps) => {
  const { user } = useSelector((state: RootState) => state.usersModel);

  const dispatch = useDispatch();

  const [isInCreatedMode, setIsInCreatedMode] = useState(false);

  const [modalDinosaur, setModalDinosaur] = useState<Dinosaur | undefined>(
    undefined
  );

  const [chosenDinosaur, setChosenDinosaur] = useState<undefined | Dinosaur>(
    undefined
  );

  const [createDinosaur, setCreateDinosaur] = useState({
    name: {
      value: "",
      type: "string",
      items: [],
    },
    description: {
      value: "",
      type: "textarea",
      items: [],
    },
    continent: {
      value: "",
      type: "select",
      items: ["NA", "AF", "EU", "AS", "SA"],
    },
    diet: {
      value: "",
      type: "select",
      items: ["Carnivore", "Piscivore", "Herbivore"],
    },
    family: {
      value: "",
      type: "string",
      items: [],
    },
    // image: {
    //   value: "",
    //   type: "string",
    //   items: [],
    // },
    weight: {
      value: "",
      type: "number",
      items: [],
    },
    time_on_earth: {
      value: "",
      type: "string",
      items: [],
    },
    period: {
      value: "",
      type: "string",
      items: [],
    },
    // mainArticle: {
    //   value: "",
    //   type: "array",
    // },
    bodyLength: {
      value: "",
      type: "number",
      items: [],
    },
  });

  const [addDinosaurArticle, setAddDinosaurArticle] =
    useState<addDinosaurArticle>({
      show: false,
      mainHeader: "",
      sections: [
        {
          id: makeId(12),
          header: "",
          paragraphs: [{ id: makeId(5), text: "" }],
        },
      ],
      list: [{ id: makeId(12), text: "" }],
    });

  const [dinosaurImage, setDinosaurImage] = useState<any>("");

  const [sendLoading, setSendLoading] = useState(false);

  type CreateDinosaur = typeof createDinosaur;

  function isDinosaurProperty(key: string): key is keyof CreateDinosaur {
    return key in createDinosaur;
  }

  useEffect(() => {
    setChosenDinosaur(user?.memberId.dinosaurs[0]);
  }, []);

  useEffect(() => {
    if (chosenDinosaur) {
      let articel = extractSections(chosenDinosaur.mainArticle);
      const sections = articel.sections.map((section) => {
        const paragraphs = section.paragraphs.map((paragraph) => {
          return { id: makeId(5), text: paragraph };
        });
        return { ...section, id: makeId(12), paragraphs };
      });

      const list = articel.list.map((item) => {
        return { id: makeId(12), text: item };
      });

      const editArticel = {
        ...articel,
        sections,
        list,
        show: false,
      };

      const object: Dictionary = {};
      for (let key in createDinosaur) {
        if (isDinosaurProperty(key)) {
          object[key] = {
            ...createDinosaur[key],
            value: chosenDinosaur[key],
          };
        }
      }

      setCreateDinosaur(object as any);
      setAddDinosaurArticle(editArticel);
    }
  }, [chosenDinosaur]);

  const onSend = async () => {
    setSendLoading(true);
    let newDinosaur: Dictionary = {};
    for (let [key, value] of Object.entries(createDinosaur)) {
      newDinosaur = { ...newDinosaur, [key]: value.value };
    }
    newDinosaur.image = "";

    if (dinosaurImage !== "") {
      newDinosaur.image = await dinosaursServices.uploadDinosaurImage(
        dinosaurImage
      );
    } else {
      newDinosaur.image = chosenDinosaur?.image ?? "";
    }

    let mainArticle = `<article><h1>${addDinosaurArticle.mainHeader}</h1><div><img src=${newDinosaur.image} /></div>`;

    addDinosaurArticle.sections.forEach((section) => {
      mainArticle += `<section><h2>${section.header}</h2>`;
      section.paragraphs.forEach((paragraph) => {
        mainArticle += `<p>${paragraph.text}</p>`;
      });
      mainArticle += `</section>`;
    });

    mainArticle += `<section><h2>Reference</h2><ul>`;

    addDinosaurArticle.list.forEach((reference) => {
      mainArticle += `<li>${reference.text}</li>`;
    });
    mainArticle += `</ul></section></article>`;
    newDinosaur.mainArticle = mainArticle;
    if (!user) {
      return;
    }
    newDinosaur.author = user?._id;
    let dinosaur = null;
    let fieldsToChange = {};
    if (chosenDinosaur) {
      dinosaur = await dinosaursServices.updateDinosaur(
        newDinosaur,
        chosenDinosaur._id
      );
    } else {
      dinosaur = await dinosaursServices.createDinosaur(newDinosaur);
      fieldsToChange = {
        dinosaurs: [...user.memberId.dinosaurs, dinosaur._id],
      };
      setCreateDinosaur({
        name: {
          value: "",
          type: "string",
          items: [],
        },
        description: {
          value: "",
          type: "string",
          items: [],
        },
        continent: {
          value: "",
          type: "select",
          items: ["NA", "AF", "EU", "AS", "SA"],
        },
        diet: {
          value: "",
          type: "select",
          items: ["Carnivore", "Piscivore", "Herbivore"],
        },
        family: {
          value: "",
          type: "string",
          items: [],
        },
        // image: {
        //   value: "",
        //   type: "string",
        //   items: [],
        // },
        weight: {
          value: "",
          type: "number",
          items: [],
        },
        time_on_earth: {
          value: "",
          type: "string",
          items: [],
        },
        period: {
          value: "",
          type: "string",
          items: [],
        },
        // mainArticle: {
        //   value: "",
        //   type: "array",
        // },
        bodyLength: {
          value: "",
          type: "number",
          items: [],
        },
      });
      setAddDinosaurArticle({
        show: false,
        mainHeader: "",
        sections: [
          {
            id: makeId(12),
            header: "",
            paragraphs: [{ id: makeId(5), text: "" }],
          },
        ],
        list: [{ id: makeId(12), text: "" }],
      });
      setDinosaurImage("");
      setChosenDinosaur(undefined);
    }
    await userServices.updateMember(user.memberId._id, fieldsToChange);
    const res: User = await userServices.getLoggedInUser();
    dispatch(setUser(res));
    handleOpenSnackbar();
    setSendLoading(false);
    console.log("dinosaur", dinosaur);
  };

  console.log(chosenDinosaur);

  const isHaveHTMLOrScriptCode = (inputString: string) => {
    // Original regex to match and replace all HTML and script tags except <em>
    // return false if don`t have html or script code beside <em> else return true
    const regex = /<(?!\/?em\b)[^>]*>/gi;
    return regex.test(inputString);
  };

  const uploadDinosaurImage = (ev: any) => {
    const file = ev.target.files[0];
    const reader = new FileReader();
    if (file) {
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setDinosaurImage(reader.result);
      };
    } else {
      setDinosaurImage("");
    }
  };

  const onCreateDinosaur = () => {
    setIsInCreatedMode(true);
    setCreateDinosaur({
      name: {
        value: "",
        type: "string",
        items: [],
      },
      description: {
        value: "",
        type: "textarea",
        items: [],
      },
      continent: {
        value: "",
        type: "select",
        items: ["NA", "AF", "EU", "AS", "SA"],
      },
      diet: {
        value: "",
        type: "select",
        items: ["Carnivore", "Piscivore", "Herbivore"],
      },
      family: {
        value: "",
        type: "string",
        items: [],
      },
      // image: {
      //   value: "",
      //   type: "string",
      //   items: [],
      // },
      weight: {
        value: "",
        type: "number",
        items: [],
      },
      time_on_earth: {
        value: "",
        type: "string",
        items: [],
      },
      period: {
        value: "",
        type: "string",
        items: [],
      },
      // mainArticle: {
      //   value: "",
      //   type: "array",
      // },
      bodyLength: {
        value: "",
        type: "number",
        items: [],
      },
    });
    setAddDinosaurArticle({
      show: false,
      mainHeader: "",
      sections: [
        {
          id: makeId(12),
          header: "",
          paragraphs: [{ id: makeId(5), text: "" }],
        },
      ],
      list: [{ id: makeId(12), text: "" }],
    });
    setDinosaurImage("");
    setChosenDinosaur(undefined);
  };

  const onChangeArticel = (ev: any, type: string) => {
    let { name, value } = ev.target;
    const { sections, list } = addDinosaurArticle;
    if (type === "mainHeader") {
      setAddDinosaurArticle((prev) => {
        return {
          ...prev,
          mainHeader: value,
        };
      });
    }
    if (type === "section") {
      let sectionIndex = sections.findIndex(
        (section: any) => section.id === name
      );
      sections[sectionIndex].header = value;
      setAddDinosaurArticle((prev) => {
        return {
          ...prev,
          sections: [...sections],
        };
      });
    }
    if (type === "paragraph") {
      name = name.split(" ");
      //name[0] - section ID
      //name [1] - paragraph ID
      let sectionIndex = sections.findIndex(
        (section: any) => section.id === name[0]
      );
      let paragraphIndex = sections[sectionIndex].paragraphs.findIndex(
        (paragraph: any) => paragraph.id === name[1]
      );
      sections[sectionIndex].paragraphs[paragraphIndex].text = value;
      setAddDinosaurArticle((prev) => {
        return {
          ...prev,
          sections: [...sections],
        };
      });
    }
    if (type === "reference") {
      let referenceIndex = list.findIndex(
        (section: any) => section.id === name
      );
      list[referenceIndex].text = value;
      setAddDinosaurArticle((prev) => {
        return {
          ...prev,
          list: [...list],
        };
      });
    }
  };

  return {
    onCreateDinosaur,
    setChosenDinosaur,
    chosenDinosaur,
    createDinosaur,
    setCreateDinosaur,
    addDinosaurArticle,
    setAddDinosaurArticle,
    onChangeArticel,
    dinosaurImage,
    uploadDinosaurImage,
    sendLoading,
    onSend,
    isInCreatedMode,
    setIsInCreatedMode,
    modalDinosaur,
    setModalDinosaur,
  };
};

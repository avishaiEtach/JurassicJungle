// import { useEffect, useState } from "react";
// import { extractSections, makeId } from "../../../../assets/util";
// import { useDispatch, useSelector } from "react-redux";
// import { RootState } from "../../../../store/store";
// import { dinosaursServices } from "../../../../services/dinosaurs.services";
// import { userServices } from "../../../../services/user.services";
// import { setUser } from "../../../../store/users.actions";

import { ChangeEvent, MouseEvent, useCallback, useState } from "react";
import { extractSections, makeId } from "../../../../assets/util";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../store/store";
import { dinosaursServices } from "../../../../services/dinosaurs.services";
import { userServices } from "../../../../services/user.services";
import { setUser } from "../../../../store/users.actions";

// interface addDinosaurArticle {
//   sections: {
//     id: string;
//     header: string;
//     paragraphs: { id: string; text: string }[];
//   }[];
//   mainHeader: string;
//   list: { id: string; text: string }[];
//   show: boolean;
// }

// interface useEditCreateDinosaurFunctionsProps {
//   handleOpenSnackbar: () => void;
// }

// export const useEditCreateDinosaurFunctions = ({
//   handleOpenSnackbar,
// }: useEditCreateDinosaurFunctionsProps) => {
//   const { user } = useSelector((state: RootState) => state.usersModel);

//   const dispatch = useDispatch();

//   const [isInCreatedMode, setIsInCreatedMode] = useState(false);

//   const [modalDinosaur, setModalDinosaur] = useState<Dinosaur | undefined>(
//     undefined
//   );

//   const [chosenDinosaur, setChosenDinosaur] = useState<undefined | Dinosaur>(
//     undefined
//   );

//   const [createDinosaur, setCreateDinosaur] = useState({
//     name: {
//       value: "",
//       type: "string",
//       items: [],
//     },
//     description: {
//       value: "",
//       type: "textarea",
//       items: [],
//     },
//     continent: {
//       value: "",
//       type: "select",
//       items: ["NA", "AF", "EU", "AS", "SA"],
//     },
//     diet: {
//       value: "",
//       type: "select",
//       items: ["Carnivore", "Piscivore", "Herbivore"],
//     },
//     family: {
//       value: "",
//       type: "string",
//       items: [],
//     },
//     // image: {
//     //   value: "",
//     //   type: "string",
//     //   items: [],
//     // },
//     weight: {
//       value: "",
//       type: "number",
//       items: [],
//     },
//     time_on_earth: {
//       value: "",
//       type: "string",
//       items: [],
//     },
//     period: {
//       value: "",
//       type: "string",
//       items: [],
//     },
//     // mainArticle: {
//     //   value: "",
//     //   type: "array",
//     // },
//     bodyLength: {
//       value: "",
//       type: "number",
//       items: [],
//     },
//   });

//   const [addDinosaurArticle, setAddDinosaurArticle] =
//     useState<addDinosaurArticle>({
//       show: false,
//       mainHeader: "",
//       sections: [
//         {
//           id: makeId(12),
//           header: "",
//           paragraphs: [{ id: makeId(5), text: "" }],
//         },
//       ],
//       list: [{ id: makeId(12), text: "" }],
//     });

//   const [dinosaurImage, setDinosaurImage] = useState<any>("");

//   const [sendLoading, setSendLoading] = useState(false);

//   type CreateDinosaur = typeof createDinosaur;

//   function isDinosaurProperty(key: string): key is keyof CreateDinosaur {
//     return key in createDinosaur;
//   }

//   useEffect(() => {
//     setChosenDinosaur(user?.memberId.dinosaurs[0]);
//   }, []);

//   useEffect(() => {
//     if (chosenDinosaur) {
//       let articel = extractSections(chosenDinosaur.mainArticle);
//       const sections = articel.sections.map((section) => {
//         const paragraphs = section.paragraphs.map((paragraph) => {
//           return { id: makeId(5), text: paragraph };
//         });
//         return { ...section, id: makeId(12), paragraphs };
//       });

//       const list = articel.list.map((item) => {
//         return { id: makeId(12), text: item };
//       });

//       const editArticel = {
//         ...articel,
//         sections,
//         list,
//         show: false,
//       };

//       const object: Dictionary = {};
//       for (let key in createDinosaur) {
//         if (isDinosaurProperty(key)) {
//           object[key] = {
//             ...createDinosaur[key],
//             value: chosenDinosaur[key],
//           };
//         }
//       }

//       setCreateDinosaur(object as any);
//       setAddDinosaurArticle(editArticel);
//     }
//   }, [chosenDinosaur]);

//   const onSend = async () => {
//     setSendLoading(true);
//     let newDinosaur: Dictionary = {};
//     for (let [key, value] of Object.entries(createDinosaur)) {
//       newDinosaur = { ...newDinosaur, [key]: value.value };
//     }
//     newDinosaur.image = "";

//     if (dinosaurImage !== "") {
//       newDinosaur.image = await dinosaursServices.uploadDinosaurImage(
//         dinosaurImage
//       );
//     } else {
//       newDinosaur.image = chosenDinosaur?.image ?? "";
//     }

//     let mainArticle = `<article><h1>${addDinosaurArticle.mainHeader}</h1><div><img src=${newDinosaur.image} /></div>`;

//     addDinosaurArticle.sections.forEach((section) => {
//       mainArticle += `<section><h2>${section.header}</h2>`;
//       section.paragraphs.forEach((paragraph) => {
//         mainArticle += `<p>${paragraph.text}</p>`;
//       });
//       mainArticle += `</section>`;
//     });

//     mainArticle += `<section><h2>Reference</h2><ul>`;

//     addDinosaurArticle.list.forEach((reference) => {
//       mainArticle += `<li>${reference.text}</li>`;
//     });
//     mainArticle += `</ul></section></article>`;
//     newDinosaur.mainArticle = mainArticle;
//     if (!user) {
//       return;
//     }
//     newDinosaur.author = user?._id;
//     let dinosaur = null;
//     let fieldsToChange = {};
//     if (chosenDinosaur) {
//       dinosaur = await dinosaursServices.updateDinosaur(
//         newDinosaur,
//         chosenDinosaur._id
//       );
//     } else {
//       dinosaur = await dinosaursServices.createDinosaur(newDinosaur);
//       fieldsToChange = {
//         dinosaurs: [...user.memberId.dinosaurs, dinosaur._id],
//       };
//       setCreateDinosaur({
//         name: {
//           value: "",
//           type: "string",
//           items: [],
//         },
//         description: {
//           value: "",
//           type: "string",
//           items: [],
//         },
//         continent: {
//           value: "",
//           type: "select",
//           items: ["NA", "AF", "EU", "AS", "SA"],
//         },
//         diet: {
//           value: "",
//           type: "select",
//           items: ["Carnivore", "Piscivore", "Herbivore"],
//         },
//         family: {
//           value: "",
//           type: "string",
//           items: [],
//         },
//         // image: {
//         //   value: "",
//         //   type: "string",
//         //   items: [],
//         // },
//         weight: {
//           value: "",
//           type: "number",
//           items: [],
//         },
//         time_on_earth: {
//           value: "",
//           type: "string",
//           items: [],
//         },
//         period: {
//           value: "",
//           type: "string",
//           items: [],
//         },
//         // mainArticle: {
//         //   value: "",
//         //   type: "array",
//         // },
//         bodyLength: {
//           value: "",
//           type: "number",
//           items: [],
//         },
//       });
//       setAddDinosaurArticle({
//         show: false,
//         mainHeader: "",
//         sections: [
//           {
//             id: makeId(12),
//             header: "",
//             paragraphs: [{ id: makeId(5), text: "" }],
//           },
//         ],
//         list: [{ id: makeId(12), text: "" }],
//       });
//       setDinosaurImage("");
//       setChosenDinosaur(undefined);
//     }
//     await userServices.updateMember(user.memberId._id, fieldsToChange);
//     const res: User = await userServices.getLoggedInUser();
//     dispatch(setUser(res));
//     handleOpenSnackbar();
//     setSendLoading(false);
//     console.log("dinosaur", dinosaur);
//   };

//   const isHaveHTMLOrScriptCode = (inputString: string) => {
//     // Original regex to match and replace all HTML and script tags except <em>
//     // return false if don`t have html or script code beside <em> else return true
//     const regex = /<(?!\/?em\b)[^>]*>/gi;
//     return regex.test(inputString);
//   };

//   const uploadDinosaurImage = (ev: any) => {
//     const file = ev.target.files[0];
//     const reader = new FileReader();
//     if (file) {
//       reader.readAsDataURL(file);
//       reader.onloadend = () => {
//         setDinosaurImage(reader.result);
//       };
//     } else {
//       setDinosaurImage("");
//     }
//   };

//   const onCreateDinosaur = () => {
//     setIsInCreatedMode(true);
//     setCreateDinosaur({
//       name: {
//         value: "",
//         type: "string",
//         items: [],
//       },
//       description: {
//         value: "",
//         type: "textarea",
//         items: [],
//       },
//       continent: {
//         value: "",
//         type: "select",
//         items: ["NA", "AF", "EU", "AS", "SA"],
//       },
//       diet: {
//         value: "",
//         type: "select",
//         items: ["Carnivore", "Piscivore", "Herbivore"],
//       },
//       family: {
//         value: "",
//         type: "string",
//         items: [],
//       },
//       // image: {
//       //   value: "",
//       //   type: "string",
//       //   items: [],
//       // },
//       weight: {
//         value: "",
//         type: "number",
//         items: [],
//       },
//       time_on_earth: {
//         value: "",
//         type: "string",
//         items: [],
//       },
//       period: {
//         value: "",
//         type: "string",
//         items: [],
//       },
//       // mainArticle: {
//       //   value: "",
//       //   type: "array",
//       // },
//       bodyLength: {
//         value: "",
//         type: "number",
//         items: [],
//       },
//     });
//     setAddDinosaurArticle({
//       show: false,
//       mainHeader: "",
//       sections: [
//         {
//           id: makeId(12),
//           header: "",
//           paragraphs: [{ id: makeId(5), text: "" }],
//         },
//       ],
//       list: [{ id: makeId(12), text: "" }],
//     });
//     setDinosaurImage("");
//     setChosenDinosaur(undefined);
//   };

//   const onChangeArticel = (ev: any, type: string) => {
//     let { name, value } = ev.target;
//     const { sections, list } = addDinosaurArticle;
//     if (type === "mainHeader") {
//       setAddDinosaurArticle((prev) => {
//         return {
//           ...prev,
//           mainHeader: value,
//         };
//       });
//     }
//     if (type === "section") {
//       let sectionIndex = sections.findIndex(
//         (section: any) => section.id === name
//       );
//       sections[sectionIndex].header = value;
//       setAddDinosaurArticle((prev) => {
//         return {
//           ...prev,
//           sections: [...sections],
//         };
//       });
//     }
//     if (type === "paragraph") {
//       name = name.split(" ");
//       //name[0] - section ID
//       //name [1] - paragraph ID
//       let sectionIndex = sections.findIndex(
//         (section: any) => section.id === name[0]
//       );
//       let paragraphIndex = sections[sectionIndex].paragraphs.findIndex(
//         (paragraph: any) => paragraph.id === name[1]
//       );
//       sections[sectionIndex].paragraphs[paragraphIndex].text = value;
//       setAddDinosaurArticle((prev) => {
//         return {
//           ...prev,
//           sections: [...sections],
//         };
//       });
//     }
//     if (type === "reference") {
//       let referenceIndex = list.findIndex(
//         (section: any) => section.id === name
//       );
//       list[referenceIndex].text = value;
//       setAddDinosaurArticle((prev) => {
//         return {
//           ...prev,
//           list: [...list],
//         };
//       });
//     }
//   };

//   return {
//     onCreateDinosaur,
//     setChosenDinosaur,
//     chosenDinosaur,
//     createDinosaur,
//     setCreateDinosaur,
//     addDinosaurArticle,
//     setAddDinosaurArticle,
//     onChangeArticel,
//     dinosaurImage,
//     uploadDinosaurImage,
//     sendLoading,
//     onSend,
//     isInCreatedMode,
//     setIsInCreatedMode,
//     modalDinosaur,
//     setModalDinosaur,
//   };
// };

interface DinosaurMainArticle {
  sections: {
    id: string;
    header: string;
    paragraphs: { id: string; text: string }[];
  }[];
  mainHeader: string;
  list: { id: string; text: string }[];
}

interface useEditCreateDinosaurFunctionsProps {
  handleOpen: () => void;
  handleOpenSnackbar: () => void;
}

export const useEditCreateDinosaurFunctions = ({
  handleOpen,
  handleOpenSnackbar,
}: useEditCreateDinosaurFunctionsProps) => {
  const [editDinosaur, setEditDinosaur] = useState({
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
    bodyLength: {
      value: "",
      type: "number",
      items: [],
    },
    image: {
      value:
        "https://res.cloudinary.com/maindevcloud/image/upload/v1718879505/JurassicJungle/g278npqws0lae6vuwev6.png",
      type: "string",
      items: [],
    },
    mainArticle: {
      value: {
        mainHeader: "",
        sections: [
          {
            id: makeId(12),
            header: "",
            paragraphs: [{ id: makeId(5), text: "" }],
          },
        ],
        list: [{ id: makeId(12), text: "" }],
      },
      type: "object",
      items: [],
    },
  });

  const [dinosaurArticle, setDinosaurArticle] = useState("");

  const [saveDinosaurLoading, setSaveDinosaurLoading] = useState(false);

  const [dinosaurState, setDinosaurState] = useState<{
    state: "edit" | "create";
    dinosaurId: string;
  }>({
    state: "edit",
    dinosaurId: "",
  });

  const { user } = useSelector((state: RootState) => state.usersModel);

  const dispatch = useDispatch();

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const open = Boolean(anchorEl);

  const id = open ? "simple-popover" : undefined;

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  type EditDinosaur = typeof editDinosaur;

  function isDinosaurProperty(key: string): key is keyof EditDinosaur {
    return key in editDinosaur;
  }

  const onShowDinosaurArticle = useCallback(
    (ev: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
      ev.stopPropagation();
      ev.preventDefault();
      const editArticle = editDinosaur.mainArticle.value;
      let mainArticle = `<article><h1>${editArticle.mainHeader}</h1><div><img src=${editDinosaur.image.value} /></div>`;
      editArticle.sections.forEach((section) => {
        mainArticle += `<section><h2>${section.header}</h2>`;
        section.paragraphs.forEach((paragraph) => {
          mainArticle += `<p>${paragraph.text}</p>`;
        });
        mainArticle += `</section>`;
      });
      mainArticle += `<section><h2>Reference</h2><ul>`;
      editArticle.list.forEach((reference) => {
        mainArticle += `<li>${reference.text}</li>`;
      });
      mainArticle += `</ul></section></article>`;
      setDinosaurArticle(mainArticle);
      handleClick(ev);
    },
    [editDinosaur]
  );

  const onChooseDinosaur = (dinosaur: Dinosaur) => {
    setDinosaurState({ state: "edit", dinosaurId: dinosaur._id });
    const dinosaurToInputs: Dictionary = {};
    for (const key in editDinosaur) {
      if (isDinosaurProperty(key) && key !== "mainArticle") {
        dinosaurToInputs[key] = { ...editDinosaur[key], value: dinosaur[key] };
      } else if (key == "mainArticle") {
        let article = extractSections(dinosaur.mainArticle);
        const sections = article.sections.map((section) => {
          const paragraphs = section.paragraphs.map((paragraph) => {
            return { id: makeId(5), text: paragraph };
          });
          return { ...section, id: makeId(12), paragraphs };
        });
        const list = article.list.map((item) => {
          return { id: makeId(12), text: item };
        });
        const editArticle = {
          ...article,
          sections,
          list,
          show: false,
        };
        dinosaurToInputs[key] = {
          value: editArticle,
          type: "object",
          items: [],
        };
      }
    }
    setEditDinosaur(dinosaurToInputs as EditDinosaur);
    handleOpen();
  };

  const onChange = (
    ev: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = ev.target;
    if (isDinosaurProperty(name)) {
      setEditDinosaur((prev) => {
        return {
          ...prev,
          [name]: {
            ...prev[name],
            value,
          },
        };
      });
    }
  };

  const uploadDinosaurImage = (ev: any) => {
    const file = ev.target.files[0];
    const reader = new FileReader();
    if (file) {
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setEditDinosaur((prev) => {
          return {
            ...prev,
            image: { ...prev.image, value: reader.result as string },
          };
        });
      };
    } else {
      setEditDinosaur((prev) => {
        return {
          ...prev,
          image: {
            ...prev.image,
            vale: "https://res.cloudinary.com/maindevcloud/image/upload/v1718879505/JurassicJungle/g278npqws0lae6vuwev6.png",
          },
        };
      });
    }
  };

  const onClickCreateDinosaur = () => {
    setDinosaurState({ state: "create", dinosaurId: "" });
    setEditDinosaur({
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
      bodyLength: {
        value: "",
        type: "number",
        items: [],
      },
      image: {
        value:
          "https://res.cloudinary.com/maindevcloud/image/upload/v1718879505/JurassicJungle/g278npqws0lae6vuwev6.png",
        type: "string",
        items: [],
      },
      mainArticle: {
        value: {
          mainHeader: "",
          sections: [
            {
              id: makeId(12),
              header: "",
              paragraphs: [{ id: makeId(5), text: "" }],
            },
          ],
          list: [{ id: makeId(12), text: "" }],
        },
        type: "object",
        items: [],
      },
    });
    handleOpen();
  };

  const onDelateItem = (
    section:
      | {
          id: string;
          header: string;
          paragraphs: { id: string; text: string }[];
          type: "section" | "paragraph";
        }
      | undefined,
    paragraphId: string | undefined,
    referenceId: string | undefined
  ) => {
    if (section) {
      let sections = editDinosaur.mainArticle.value.sections.slice();
      const sectionIndex = sections.findIndex(
        (sectionToSearch) => sectionToSearch.id === section.id
      );
      if (section.type === "section") {
        if (sections.length === 1) {
          return;
        }
        sections.splice(sectionIndex, 1);
      } else {
        let paragraphs =
          editDinosaur.mainArticle.value.sections[
            sectionIndex
          ].paragraphs.slice();

        if (paragraphs.length === 1) {
          return;
        }
        const paragraphIndex = paragraphs.findIndex(
          (paragraph) => paragraph.id === paragraphId
        );
        paragraphs.splice(paragraphIndex, 1);
        sections[sectionIndex].paragraphs = paragraphs;
      }
      setEditDinosaur((prev) => {
        return {
          ...prev,
          mainArticle: {
            ...prev.mainArticle,
            value: { ...prev.mainArticle.value, sections: sections },
          },
        };
      });
    } else {
      let references = editDinosaur.mainArticle.value.list.slice();
      if (references.length === 1) {
        return;
      }
      const referenceIndex = references.findIndex(
        (reference) => reference.id === referenceId
      );
      references.splice(referenceIndex, 1);
      setEditDinosaur((prev) => {
        return {
          ...prev,
          mainArticle: {
            ...prev.mainArticle,
            value: { ...prev.mainArticle.value, list: references },
          },
        };
      });
    }
  };

  const onAddItem = (
    type: "section" | "paragraph" | "reference",
    sectionId: string | undefined
  ) => {
    let sections = editDinosaur.mainArticle.value.sections.slice();
    let list = editDinosaur.mainArticle.value.list.slice();
    if (type === "section") {
      if (sections.length > 8) {
        return;
      }
      sections.push({
        id: makeId(12),
        header: "",
        paragraphs: [{ id: makeId(5), text: "" }],
      });
    } else if (type === "paragraph" && sectionId) {
      const sectionIndex = sections.findIndex(
        (section) => section.id === sectionId
      );
      let paragraphs =
        editDinosaur.mainArticle.value.sections[
          sectionIndex
        ].paragraphs.slice();
      if (paragraphs.length === 5) {
        return;
      }
      paragraphs.push({ id: makeId(5), text: "" });
      sections[sectionIndex].paragraphs = paragraphs;
    } else {
      if (list.length === 5) {
        return;
      }
      list.push({ id: makeId(12), text: "" });
    }
    setEditDinosaur((prev) => {
      return {
        ...prev,
        mainArticle: {
          ...prev.mainArticle,
          value: { ...prev.mainArticle.value, sections, list },
        },
      };
    });
  };

  const saveDinosaur = async () => {
    setSaveDinosaurLoading(true);
    let savedDinosaur: Dictionary = {};
    for (let [key, value] of Object.entries(editDinosaur)) {
      if (key !== "mainArticle") {
        savedDinosaur = { ...savedDinosaur, [key]: value.value };
      }
    }

    let dinosaurImage = editDinosaur.image.value;

    if (dinosaurImage !== "") {
      dinosaurImage = await dinosaursServices.uploadDinosaurImage(
        dinosaurImage
      );
    }

    const editArticle = editDinosaur.mainArticle.value;
    let mainArticle = `<article><h1>${editArticle.mainHeader}</h1><div><img src=${dinosaurImage} /></div>`;
    editArticle.sections.forEach((section) => {
      mainArticle += `<section><h2>${section.header}</h2>`;
      section.paragraphs.forEach((paragraph) => {
        mainArticle += `<p>${paragraph.text}</p>`;
      });
      mainArticle += `</section>`;
    });
    mainArticle += `<section><h2>Reference</h2><ul>`;
    editArticle.list.forEach((reference) => {
      mainArticle += `<li>${reference.text}</li>`;
    });
    mainArticle += `</ul></section></article>`;
    savedDinosaur.mainArticle = mainArticle;
    if (!user) {
      return;
    }
    savedDinosaur.author = user._id;
    let dinosaur = null;
    let fieldsToChange = {};
    if (dinosaurState.state === "edit") {
      dinosaur = await dinosaursServices.updateDinosaur(
        saveDinosaur,
        dinosaurState.dinosaurId
      );
    } else {
      dinosaur = await dinosaursServices.createDinosaur(savedDinosaur);
      fieldsToChange = {
        dinosaurs: [...user.memberId.dinosaurs, dinosaur._id],
      };
    }
    await userServices.updateMember(user.memberId._id, fieldsToChange);
    const res: User = await userServices.getLoggedInUser();
    dispatch(setUser(res));
    if (dinosaurState.state === "create") {
      setEditDinosaur({
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
        bodyLength: {
          value: "",
          type: "number",
          items: [],
        },
        image: {
          value:
            "https://res.cloudinary.com/maindevcloud/image/upload/v1718879505/JurassicJungle/g278npqws0lae6vuwev6.png",
          type: "string",
          items: [],
        },
        mainArticle: {
          value: {
            mainHeader: "",
            sections: [
              {
                id: makeId(12),
                header: "",
                paragraphs: [{ id: makeId(5), text: "" }],
              },
            ],
            list: [{ id: makeId(12), text: "" }],
          },
          type: "object",
          items: [],
        },
      });
    }
    setSaveDinosaurLoading(false);
    handleOpenSnackbar();
  };

  const onChangeMainArticle = (
    ev: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    type: "mainHeader" | "section" | "paragraph" | "reference",
    sectionId: string | undefined
  ) => {
    const { name, value } = ev.target;
    if (type === "mainHeader") {
      setEditDinosaur((prev) => {
        return {
          ...prev,
          mainArticle: {
            ...prev.mainArticle,
            value: { ...prev.mainArticle.value, mainHeader: value },
          },
        };
      });
    } else if (type === "paragraph") {
      let sections = editDinosaur.mainArticle.value.sections.slice();
      let sectionIndex = sections.findIndex(
        (section) => section.id === sectionId
      );
      if (sectionIndex !== -1) {
        let paragraphs = sections[sectionIndex].paragraphs.slice();
        let paragraphIndex = paragraphs.findIndex(
          (paragraph) => paragraph.id === name
        );
        if (paragraphIndex !== -1) {
          paragraphs[paragraphIndex].text = value;
          sections[sectionIndex].paragraphs = paragraphs;
        }
      }
      setEditDinosaur((prev) => {
        return {
          ...prev,
          mainArticle: {
            ...prev.mainArticle,
            value: { ...prev.mainArticle.value, sections },
          },
        };
      });
    } else if (type === "section") {
      let sections = editDinosaur.mainArticle.value.sections.slice();
      let sectionIndex = sections.findIndex((section) => section.id === name);
      sections[sectionIndex].header = value;
      setEditDinosaur((prev) => {
        return {
          ...prev,
          mainArticle: {
            ...prev.mainArticle,
            value: { ...prev.mainArticle.value, sections },
          },
        };
      });
    } else {
      let list = editDinosaur.mainArticle.value.list.slice();
      let referenceIndex = list.findIndex((reference) => reference.id === name);
      list[referenceIndex].text = value;
      setEditDinosaur((prev) => {
        return {
          ...prev,
          mainArticle: {
            ...prev.mainArticle,
            value: { ...prev.mainArticle.value, list },
          },
        };
      });
    }
  };
  return {
    editDinosaur,
    onChange,
    onChangeMainArticle,
    onDelateItem,
    onAddItem,
    dinosaurState,
    uploadDinosaurImage,
    dinosaurArticle,
    saveDinosaur,
    saveDinosaurLoading,
    onClickCreateDinosaur,
    onChooseDinosaur,
    onShowDinosaurArticle,
    anchorEl,
    id,
    open,
    handleClose,
  };
};

import { Button, IconButton, Paper, TextField } from "@mui/material";
import { makeId } from "../../../../assets/util";
import { AlertMui } from "../../../Alert/AlertMui";
import { MdDelete } from "react-icons/md";

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

interface useMainArticleProps {
  addDinosaurArticle: addDinosaurArticle;
  setAddDinosaurArticle: React.Dispatch<
    React.SetStateAction<addDinosaurArticle>
  >;
  onChangeArticel: (ev: any, type: string) => void;
}

interface DelateIconOnClickProps {
  onClick: any;
  item: any;
  title: string;
  array: any[];
  index: number;
  isMainHeader?: boolean;
}
export const useMainArticle = ({
  addDinosaurArticle,
  setAddDinosaurArticle,
  onChangeArticel,
}: useMainArticleProps) => {
  const DelateIconOnClick = ({
    onClick,
    item,
    title,
    array,
    index,
    isMainHeader = false,
  }: DelateIconOnClickProps) => {
    return (
      <div
        className={`headerLine flex space-between align-center ${
          isMainHeader ? "g10" : ""
        }`}
      >
        {isMainHeader ? (
          <h2>
            {title} {index + 1}
          </h2>
        ) : (
          <h4>
            {title} {index + 1}
          </h4>
        )}
        {array.length > 1 && (
          <IconButton
            onClick={() => {
              onClick(item);
            }}
          >
            <MdDelete />
          </IconButton>
        )}
      </div>
    );
  };

  const onClickList = (reference: any) => {
    let list = addDinosaurArticle.list;
    if (list.length === 1) {
      return;
    }
    let refIndex = list.findIndex((searchRef) => searchRef.id === reference.id);
    list.splice(refIndex, 1);
    setAddDinosaurArticle((prev) => {
      return { ...prev, list: [...list] };
    });
  };

  const onClickParagraph = (paragraph: any, section: any) => {
    let sections = addDinosaurArticle.sections;
    let sectionIndex = sections.findIndex(
      (searchSection) => searchSection.id === section.id
    );
    let pIndex = section.paragraphs.findIndex(
      (searchParagraph: any) => searchParagraph.id === paragraph.id
    );
    sections[sectionIndex].paragraphs.splice(pIndex, 1);
    setAddDinosaurArticle((prev) => {
      return { ...prev, sections: [...sections] };
    });
  };

  const onClickSection = (index: number) => {
    if (addDinosaurArticle.sections.length === 1) {
      return;
    }
    let sections = addDinosaurArticle.sections;
    sections.splice(index, 1);
    setAddDinosaurArticle((prev) => {
      return {
        ...prev,
        sections: [...sections],
      };
    });
  };

  const addSection = () => {
    setAddDinosaurArticle((prev) => {
      return {
        ...prev,
        sections: [
          ...prev.sections,
          {
            id: makeId(12),
            header: "",
            paragraphs: [{ id: makeId(5), text: "" }],
          },
        ],
      };
    });
  };

  const addParagraph = (index: number) => {
    let paragraphs = addDinosaurArticle.sections[index].paragraphs;
    paragraphs.push({ id: makeId(5), text: "" });
    let sections = addDinosaurArticle.sections;
    sections[index].paragraphs = paragraphs;
    setAddDinosaurArticle((prev: addDinosaurArticle) => {
      return { ...prev, sections: [...sections] };
    });
  };

  const addReference = () => {
    setAddDinosaurArticle((prev) => {
      return {
        ...prev,
        list: [...prev.list, { id: makeId(12), text: "" }],
      };
    });
  };

  const MainArticle = (
    <div className="flex column g30 main_article_container">
      <div className="flex align-center space-between">
        <h2>MainArticle</h2>
      </div>
      <div>
        <TextField
          className="text__filed"
          onChange={(ev) => onChangeArticel(ev, "mainHeader")}
          fullWidth
          name="mainHeader"
          value={addDinosaurArticle.mainHeader}
          placeholder="mainHeader"
        />
        <div>
          {addDinosaurArticle.sections.map((section, index) => (
            <>
              <Paper elevation={0} className="sections__paper">
                <div className="flex g20 align-center space-between">
                  <DelateIconOnClick
                    isMainHeader={true}
                    array={addDinosaurArticle.sections}
                    index={index}
                    item={section}
                    title="section"
                    onClick={() => {
                      onClickSection(index);
                    }}
                  />
                  <Button
                    disabled={
                      addDinosaurArticle.sections[index].paragraphs.length === 5
                    }
                    onClick={() => {
                      addParagraph(index);
                    }}
                    className="button"
                    variant="outlined"
                  >
                    add paragraph
                  </Button>
                </div>
                <h3>header</h3>
                <TextField
                  className="text__filed"
                  value={section.header}
                  onChange={(ev) => onChangeArticel(ev, "section")}
                  name={section.id}
                  placeholder="header"
                  fullWidth
                />
                {section.paragraphs.map((paragraph, index) => (
                  <div>
                    <DelateIconOnClick
                      array={section.paragraphs}
                      index={index}
                      item={paragraph}
                      title="paragraph"
                      onClick={() => onClickParagraph(paragraph, section)}
                    />
                    <TextField
                      className="text__filed"
                      onChange={(ev) => onChangeArticel(ev, "paragraph")}
                      name={`${section.id} ${paragraph.id}`}
                      value={paragraph.text}
                      multiline
                      minRows={4}
                      placeholder={`paragraph ${index + 1}`}
                      fullWidth
                    />
                  </div>
                ))}
                {index === addDinosaurArticle.sections.length - 1 && (
                  <Button
                    disabled={addDinosaurArticle.sections.length > 8}
                    onClick={addSection}
                    variant="outlined"
                    className="button add_section"
                  >
                    Add section
                  </Button>
                )}
              </Paper>
            </>
          ))}
        </div>
      </div>
      <div>
        <Paper elevation={0} className="flex column g20 references_paper">
          <div className="flex space-between align-center">
            <h2>References</h2>
            <Button
              variant="outlined"
              disabled={addDinosaurArticle.list.length === 5}
              onClick={addReference}
              className="button"
            >
              Add Reference
            </Button>
          </div>
          <AlertMui
            severity="info"
            alertText={
              <div className="flex column g10">
                <span>
                  If you want that{" "}
                  <em>
                    <b>text to be like that</b>
                  </em>
                  , add
                  <em>&lt;em&gt;&lt;/em&gt;</em> to the text.
                </span>
              </div>
            }
          />
          <div className="flex column g20">
            {addDinosaurArticle.list.map((reference, index) => (
              <div>
                <DelateIconOnClick
                  onClick={onClickList}
                  item={reference}
                  array={addDinosaurArticle.list}
                  index={index}
                  title="reference"
                />
                <TextField
                  className="text__filed"
                  value={reference.text}
                  onChange={(ev) => onChangeArticel(ev, "reference")}
                  name={reference.id}
                  placeholder={`reference ${index + 1}`}
                  fullWidth
                  multiline
                  minRows={2}
                />
              </div>
            ))}
          </div>
        </Paper>
      </div>
    </div>
  );

  return { MainArticle };
};

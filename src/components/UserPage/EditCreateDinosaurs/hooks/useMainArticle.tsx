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

export const useMainArticle = ({
  addDinosaurArticle,
  setAddDinosaurArticle,
  onChangeArticel,
}: useMainArticleProps) => {
  const MainArticle = (
    <div className="flex column g30" style={{ position: "relative" }}>
      <div className="flex align-center space-between">
        <h2 style={{ margin: 0 }}>MainArticle</h2>
      </div>
      <div>
        <TextField
          onChange={(ev) => onChangeArticel(ev, "mainHeader")}
          fullWidth
          name="mainHeader"
          value={addDinosaurArticle.mainHeader}
          placeholder="mainHeader"
        />
        <div>
          {addDinosaurArticle.sections.map((section, index) => (
            <>
              <Paper
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  marginBlock: "30px",
                  gap: "10px",
                  padding: "20px 15px",
                }}
              >
                <div className="flex g20 align-center space-between">
                  <div className="flex g10 align-center">
                    <h2 style={{ margin: 0 }}>section {index + 1}</h2>
                    <IconButton
                      onClick={() => {
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
                      }}
                    >
                      <MdDelete />
                    </IconButton>
                  </div>
                  <Button
                    disabled={
                      addDinosaurArticle.sections[index].paragraphs.length === 5
                    }
                    onClick={() => {
                      let paragraphs =
                        addDinosaurArticle.sections[index].paragraphs;
                      paragraphs.push({ id: makeId(5), text: "" });
                      let sections = addDinosaurArticle.sections;
                      sections[index].paragraphs = paragraphs;
                      setAddDinosaurArticle((prev: addDinosaurArticle) => {
                        return { ...prev, sections: [...sections] };
                      });
                    }}
                    className="login__button singup__modal"
                    variant="outlined"
                  >
                    add paragraph
                  </Button>
                </div>
                <h3>header</h3>
                <TextField
                  value={section.header}
                  onChange={(ev) => onChangeArticel(ev, "section")}
                  name={section.id}
                  placeholder="header"
                  fullWidth
                />
                {section.paragraphs.map((paragraph, index) => (
                  <div>
                    <div className="flex align-center g10">
                      <h4 style={{ margin: "0px" }}>paragraph {index + 1}</h4>
                      <IconButton
                        onClick={() => {
                          let sections = addDinosaurArticle.sections;
                          let sectionIndex = sections.findIndex(
                            (searchSection) => searchSection.id === section.id
                          );
                          let pIndex = section.paragraphs.findIndex(
                            (searchParagraph) =>
                              searchParagraph.id === paragraph.id
                          );
                          sections[sectionIndex].paragraphs.splice(pIndex, 1);
                          setAddDinosaurArticle((prev) => {
                            return { ...prev, sections: [...sections] };
                          });
                        }}
                      >
                        <MdDelete />
                      </IconButton>
                    </div>
                    <TextField
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
                    sx={{ marginTop: "20px" }}
                    disabled={addDinosaurArticle.sections.length > 8}
                    onClick={() => {
                      setAddDinosaurArticle((prev) => {
                        return {
                          ...prev,
                          sections: [
                            ...prev.sections,
                            { id: makeId(12), header: "", paragraphs: [] },
                          ],
                        };
                      });
                    }}
                    variant="outlined"
                    className="login__button singup__modal"
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
        <Paper
          className="flex column g20"
          sx={{ padding: "15px 20px", paddingBottom: "30px" }}
        >
          <div className="flex space-between align-center">
            <h2 style={{ margin: 0 }}>References</h2>
            <Button
              variant="outlined"
              disabled={addDinosaurArticle.list.length === 5}
              onClick={() => {
                setAddDinosaurArticle((prev) => {
                  return {
                    ...prev,
                    list: [...prev.list, { id: makeId(12), text: "" }],
                  };
                });
              }}
              className="login__button singup__modal"
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
              <TextField
                value={reference.text}
                onChange={(ev) => onChangeArticel(ev, "reference")}
                name={reference.id}
                placeholder={`reference ${index + 1}`}
                fullWidth
                multiline
                minRows={2}
              />
            ))}
          </div>
        </Paper>
      </div>
    </div>
  );

  return { MainArticle };
};

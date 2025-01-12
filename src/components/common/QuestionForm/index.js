import { useTheme } from "styled-components";
import MDEditor from "@uiw/react-md-editor";
import Multiselect from "multiselect-react-dropdown";
import rehypeSanitize from "rehype-sanitize";
import Button from "../Button";
import Input from "../Input";
import {
  BtnContainer,
  InputContainer,
  MultiContainerContainer,
} from "./styled";

const QuestionForm = ({
  title,
  setTitle,
  postBody,
  setPostBody,
  tags,
  setTags,
  isLoading,
  mutate,
}) => {
  const theme = useTheme();

  return (
    <form>
      <InputContainer>
        <Input
          type="text"
          name="title"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </InputContainer>
      <MDEditor
        value={postBody}
        onChange={setPostBody}
        height={500}
        previewOptions={{
          rehypePlugins: [[rehypeSanitize]],
        }}
      />
      <MDEditor.Markdown source={postBody} rehypePlugins={[[rehypeSanitize]]} />
      <MultiContainerContainer>
        <Multiselect
          isObject={false}
          selectedValues={tags}
          onSelect={(selectedList) => setTags(selectedList)}
          loading={false}
          options={["Python", "Javascript", "HTML", "CSS", "Typescript"]}
          style={{
            searchBox: {
              padding: "10px",
              marginTop: "20px",
              background: theme.inputContrast,
            },
            chips: {
              background: theme.specialBg,
            },
            optionContainer: {
              background: theme.bg,
            },
            inputField: {
              color: theme.text,
            },
          }}
          closeIcon="cancel"
        />
      </MultiContainerContainer>

      <BtnContainer>
        <Button
          disabled={isLoading || postBody.length === 0 || title.length === 0}
          handleClick={(e) => {
            e.preventDefault();
            mutate();
          }}
        >
          Submit
        </Button>
      </BtnContainer>
    </form>
  );
};

export default QuestionForm;

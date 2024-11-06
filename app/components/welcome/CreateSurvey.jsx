import React, { useState } from "react";
import {
  Layout,
  Card,
  Button,
  FormLayout,
  Select,
  TextField,
} from "@shopify/polaris";
//import { PlusMinor } from '@shopify/polaris-icons';

export default function CreateSurvey({ surveyData, setSurveyData }) {
  const [questions, setQuestions] = useState(surveyData.questions || []);

  const questionTypes = [
    { label: "单选题", value: "radio" },
    { label: "多选题", value: "checkbox" },
    { label: "文本题", value: "text" },
    { label: "图片选择", value: "image" },
  ];

  const addQuestion = () => {
    setQuestions([
      ...questions,
      {
        id: Date.now(),
        type: "radio",
        title: "",
        options: [],
      },
    ]);
  };

  const updateQuestion = (index, data) => {
    const newQuestions = [...questions];
    newQuestions[index] = { ...newQuestions[index], ...data };
    setQuestions(newQuestions);
    setSurveyData({ ...surveyData, questions: newQuestions });
  };

  const removeQuestion = (index) => {
    const newQuestions = questions.filter((_, i) => i !== index);
    setQuestions(newQuestions);
    setSurveyData({ ...surveyData, questions: newQuestions });
  };

  return (
    <Layout>
      <Layout.Section>
        {questions.map((question, index) => (
          <Card key={question.id} sectioned>
            <FormLayout>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <Select
                  label="问题类型"
                  options={questionTypes}
                  value={question.type}
                  onChange={(value) => updateQuestion(index, { type: value })}
                />
                <Button onClick={() => removeQuestion(index)}>删除</Button>
              </div>
              
              <TextField
                label="问题标题"
                value={question.title}
                onChange={(value) => updateQuestion(index, { title: value })}
              />

              {(question.type === "radio" || question.type === "checkbox") && (
                <OptionsEditor
                  options={question.options}
                  onChange={(options) => updateQuestion(index, { options })}
                />
              )}
            </FormLayout>
          </Card>
        ))}

        <div style={{ marginTop: "1rem" }}>
          <Button onClick={addQuestion}>添加</Button>
        </div>
      </Layout.Section>
    </Layout>
  );
}

function OptionsEditor({ options = [], onChange }) {
  const addOption = () => {
    onChange([...options, { id: Date.now(), text: "" }]);
  };

  const updateOption = (index, text) => {
    const newOptions = [...options];
    newOptions[index] = { ...newOptions[index], text };
    onChange(newOptions);
  };

  return (
    <FormLayout>
      {options.map((option, index) => (
        <TextField
          key={option.id}
          label={`选项 ${index + 1}`}
          value={option.text}
          onChange={(value) => updateOption(index, value)}
        />
      ))}
      <Button onClick={addOption} plain>
        添加选项
      </Button>
    </FormLayout>
  );
}

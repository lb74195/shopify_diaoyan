import React, { useState } from "react";
import {
  Layout,
  Card,
  Text,
  Button,
  ButtonGroup,
  Page,
  Box,
} from '@shopify/polaris';

export default function SurveyManager() {
  const [surveyData, setSurveyData] = useState({
    questions: [],
    targeting: { rules: [] },
    thankYouMessage: {
      title: "感谢您的参与！",
      content: "您的反馈对我们非常重要。"
    }
  });
  
  const addQuestion = () => {
    setSurveyData((prevData) => ({
      ...prevData,
      questions: [
        ...prevData.questions,
        { id: Date.now(), type: "radio", title: "", options: ["A", "B", "C", "D"] },
      ],
    }));
  };

  return (
    <Page
      title="问卷管理"
      primaryAction={
        <ButtonGroup>
          <Button onClick={addQuestion}>添加问题</Button>
          <Button primary>实时预览</Button>
        </ButtonGroup>
      }
    >
      <Layout>
        <Layout.Section oneHalf>
          <Box display="flex" flexDirection="column" gap="4">
            {surveyData.questions.map((question, index) => (
              <Card key={index}>
                <Card.Section>
                  <Text variant="headingMd">问题 {index + 1}</Text>
                </Card.Section>
              </Card>
            ))}
          </Box>
        </Layout.Section>

        <Layout.Section oneHalf>
          <Card title="基本设置">
            <Card.Section>
              <Text>右侧设置区域</Text>
            </Card.Section>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
}

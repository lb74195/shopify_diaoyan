import { useState, useCallback } from "react";
import {
  Page,
  Layout,
  LegacyCard,
  Button,
  ProgressBar,
  Text,
  ButtonGroup,
} from "@shopify/polaris";
import CreateSurvey from "../components/welcome/CreateSurvey";
import PreviewSurvey from "../components/welcome/PreviewSurvey";
import ConfigureTargeting from "../components/welcome/ConfigureTargeting";

export default function Welcome() {
  const [currentStep, setCurrentStep] = useState(0);
  const [surveyData, setSurveyData] = useState({
    questions: [],
    settings: {},
    targeting: {}
  });

  const steps = [
    {
      title: "创建调研问卷",
      component: CreateSurvey,
    },
    {
      title: "预览效果",
      component: PreviewSurvey,
    },
    {
      title: "设置触达规则",
      component: ConfigureTargeting,
    },
  ];

  const handleNext = useCallback(() => {
    setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
  }, []);

  const handleBack = useCallback(() => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  }, []);

  const handlePublish = async () => {
    try {
      // 发布逻辑
      console.log("Publishing survey:", surveyData);
    } catch (error) {
      console.error("Failed to publish:", error);
    }
  };

  const CurrentStepComponent = steps[currentStep].component;

  return (
    <Page fullWidth>
      <Layout>
        <Layout.Section>
          <LegacyCard sectioned>
            <div style={{ marginBottom: "2rem" }}>
              <div style={{ marginBottom: "1rem" }}>
                <Text variant="headingMd" as="h2">
                  {steps[currentStep].title}
                </Text>
              </div>
              <ProgressBar
                progress={(currentStep + 1) * (100 / steps.length)}
                size="small"
              />
            </div>

            <CurrentStepComponent
              surveyData={surveyData}
              setSurveyData={setSurveyData}
            />

            <div style={{ 
              marginTop: "2rem",
              display: "flex",
              justifyContent: "space-between"
            }}>
              <ButtonGroup>
                <Button
                  onClick={handleBack}
                  disabled={currentStep === 0}
                >
                  上一步
                </Button>
                {currentStep < steps.length - 1 && (
                  <Button primary onClick={handleNext}>
                    下一步
                  </Button>
                )}
              </ButtonGroup>

              {currentStep === steps.length - 1 && (
                <Button primary onClick={handlePublish}>
                  发布
                </Button>
              )}
            </div>
          </LegacyCard>
        </Layout.Section>
      </Layout>
    </Page>
  );
}

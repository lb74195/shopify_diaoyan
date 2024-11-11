import { Page, Layout, Card, Text, Button, ButtonGroup, TextField, Select, FormLayout, Modal, Checkbox } from "@shopify/polaris";
import { useState } from "react";

// 添加预览组件
function SurveyPreview({ questions, thankYouMessage }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  // 添加复制优惠券功能
  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      alert('优惠券代码已复制到剪贴板！');
    } catch (err) {
      alert('复制失败，请手动复制');
    }
  };

  const renderOptions = (question, type) => {
    const optionsStyle = {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '10px',
      flexDirection: question.layout === 'vertical' ? 'column' : 'row',
    };

    if (question.layout === 'grid') {
      optionsStyle.display = 'grid';
      optionsStyle.gridTemplateColumns = `repeat(${question.columns}, 1fr)`;
    }

    return (
      <div style={optionsStyle}>
        {question.options.map((option, index) => (
          <Button
            key={index}
            pressed={type === 'checkbox' 
              ? answers[currentStep]?.includes(index)
              : answers[currentStep] === index
            }
            onClick={() => type === 'checkbox' 
              ? handleCheckboxChange(index)
              : handleRadioChange(index)
            }
            fullWidth
          >
            {option}
          </Button>
        ))}
      </div>
    );
  };

  if (isSubmitted) {
    return (
      <div style={{ textAlign: 'center', padding: '20px' }}>
        <Text variant="headingLg">{thankYouMessage.title}</Text>
        <br />
        <Text>{thankYouMessage.content}</Text>
        
        {thankYouMessage.showCoupon && thankYouMessage.couponCode && (
          <div style={{ 
            marginTop: '20px',
            padding: '20px',
            border: '1px dashed #ccc',
            borderRadius: '8px',
            background: '#f9f9f9'
          }}>
            <Text variant="headingMd">您的专属优惠券</Text>
            <div style={{ 
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '10px',
              marginTop: '10px'
            }}>
              <Text variant="headingLg" fontWeight="bold">
                {thankYouMessage.couponCode}
              </Text>
              <Button onClick={() => copyToClipboard(thankYouMessage.couponCode)}>
                复制
              </Button>
            </div>
          </div>
        )}
      </div>
    );
  }

  const currentQuestion = questions[currentStep];

  const handleCheckboxChange = (optionIndex) => {
    const currentAnswers = answers[currentStep] || [];
    const newAnswers = currentAnswers.includes(optionIndex)
      ? currentAnswers.filter(i => i !== optionIndex)
      : [...currentAnswers, optionIndex];
    
    setAnswers({
      ...answers,
      [currentStep]: newAnswers
    });
  };

  const handleRadioChange = (optionIndex) => {
    setAnswers({
      ...answers,
      [currentStep]: optionIndex
    });
  };

  return (
    <div style={{ padding: '20px' }}>
      <div style={{ marginBottom: '20px' }}>
        <Text>问题 {currentStep + 1} / {questions.length}</Text>
      </div>

      <Card sectioned>
        <Text variant="headingMd">{currentQuestion?.title}</Text>
        
        {currentQuestion?.type === 'radio' && renderOptions(currentQuestion, 'radio')}
        {currentQuestion?.type === 'checkbox' && renderOptions(currentQuestion, 'checkbox')}
        {currentQuestion?.type === 'text' && (
          <div style={{ marginTop: '10px' }}>
            <TextField
              multiline={4}
              value={answers[currentStep] || ''}
              onChange={(value) => setAnswers({ ...answers, [currentStep]: value })}
            />
          </div>
        )}
      </Card>

      <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'space-between' }}>
        {currentStep > 0 && (
          <Button onClick={() => setCurrentStep(currentStep - 1)}>
            上一题
          </Button>
        )}
        {currentStep < questions.length - 1 ? (
          <Button primary onClick={() => setCurrentStep(currentStep + 1)}>
            下一题
          </Button>
        ) : (
          <Button primary onClick={() => setIsSubmitted(true)}>
            提交
          </Button>
        )}
      </div>
    </div>
  );
}

function SurveyManager() {
  const [surveyData, setSurveyData] = useState({
    questions: [],
    thankYouMessage: {
      title: "感谢您的参与！",
      content: "您的反馈对我们非常重要。",
      showCoupon: false,
      couponCode: ""
    }
  });

  const [showPreview, setShowPreview] = useState(false);

  const addQuestion = () => {
    setSurveyData(prevData => ({
      ...prevData,
      questions: [
        ...prevData.questions,
        {
          id: Date.now(),
          title: "",
          type: "radio",
          options: ["选项A", "选项B", "选项C", "选项D"],
          layout: "horizontal", // 默认垂直布局
          columns: 1 // 默认单列
        }
      ]
    }));
  };

  const updateQuestion = (index, field, value) => {
    setSurveyData(prevData => {
      const newQuestions = [...prevData.questions];
      newQuestions[index] = {
        ...newQuestions[index],
        [field]: value
      };
      return { ...prevData, questions: newQuestions };
    });
  };

  const updateOption = (questionIndex, optionIndex, value) => {
    setSurveyData(prevData => {
      const newQuestions = [...prevData.questions];
      const newOptions = [...newQuestions[questionIndex].options];
      newOptions[optionIndex] = value;
      newQuestions[questionIndex] = {
        ...newQuestions[questionIndex],
        options: newOptions
      };
      return { ...prevData, questions: newQuestions };
    });
  };

  return (
    <Page
      title="问卷管理"
      primaryAction={
        <ButtonGroup>
          <Button onClick={addQuestion}>添加问题</Button>
          <Button primary onClick={() => setShowPreview(true)}>预览</Button>
        </ButtonGroup>
      }
    >
      <Layout>
        <Layout.Section oneHalf>
          {surveyData.questions.map((question, index) => (
            <Card key={question.id} sectioned>
              <FormLayout>
                <TextField
                  label="问题标题"
                  value={question.title}
                  onChange={(value) => updateQuestion(index, 'title', value)}
                />
                <Select
                  label="问题类型"
                  options={[
                    {label: '单选', value: 'radio'},
                    {label: '多选', value: 'checkbox'},
                    {label: '文本', value: 'text'}
                  ]}
                  value={question.type}
                  onChange={(value) => updateQuestion(index, 'type', value)}
                />
                
                {/* 添加布局设置 */}
                {(question.type === 'radio' || question.type === 'checkbox') && (
                  <>
                    <Select
                      label="选项布局"
                      options={[
                        {label: '垂直排列', value: 'vertical'},
                        {label: '水平排列', value: 'horizontal'},
                        {label: '网格排列', value: 'grid'}
                      ]}
                      value={question.layout}
                      onChange={(value) => updateQuestion(index, 'layout', value)}
                    />
                    
                    {question.layout === 'grid' && (
                      <Select
                        label="每行列数"
                        options={[
                          {label: '2列', value: 2},
                          {label: '3列', value: 3},
                          {label: '4列', value: 4}
                        ]}
                        value={question.columns}
                        onChange={(value) => updateQuestion(index, 'columns', value)}
                      />
                    )}
                    
                    <FormLayout.Group>
                      {question.options.map((option, optionIndex) => (
                        <TextField
                          key={optionIndex}
                          label={`选项 ${String.fromCharCode(65 + optionIndex)}`}
                          value={option}
                          onChange={(value) => updateOption(index, optionIndex, value)}
                        />
                      ))}
                    </FormLayout.Group>
                  </>
                )}
              </FormLayout>
            </Card>
          ))}
        </Layout.Section>

        <Layout.Section oneHalf>
          <Card title="完成页面设置" sectioned>
            <FormLayout>
              <TextField
                label="感谢标题"
                value={surveyData.thankYouMessage.title}
                onChange={(value) => setSurveyData(prev => ({
                  ...prev,
                  thankYouMessage: { ...prev.thankYouMessage, title: value }
                }))}
              />
              <TextField
                label="感谢内容"
                value={surveyData.thankYouMessage.content}
                multiline={4}
                onChange={(value) => setSurveyData(prev => ({
                  ...prev,
                  thankYouMessage: { ...prev.thankYouMessage, content: value }
                }))}
              />
              <Checkbox
                label="显示优惠券"
                checked={surveyData.thankYouMessage.showCoupon}
                onChange={(checked) => setSurveyData(prev => ({
                  ...prev,
                  thankYouMessage: { ...prev.thankYouMessage, showCoupon: checked }
                }))}
              />
              {surveyData.thankYouMessage.showCoupon && (
                <TextField
                  label="优惠券代码"
                  value={surveyData.thankYouMessage.couponCode}
                  onChange={(value) => setSurveyData(prev => ({
                    ...prev,
                    thankYouMessage: { ...prev.thankYouMessage, couponCode: value }
                  }))}
                  helpText="填写优惠券代码，将在问卷完成后显示"
                />
              )}
            </FormLayout>
          </Card>
        </Layout.Section>
      </Layout>

      <Modal
        open={showPreview}
        onClose={() => setShowPreview(false)}
        title="问卷预览"
        large
      >
        <Modal.Section>
          <SurveyPreview 
            questions={surveyData.questions}
            thankYouMessage={surveyData.thankYouMessage}
          />
        </Modal.Section>
      </Modal>
    </Page>
  );
}

export default function Welcome() {
  return (
    <Page fullWidth>
      <Layout>
        <Layout.Section>
          <Card sectioned>
            <SurveyManager />
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
}

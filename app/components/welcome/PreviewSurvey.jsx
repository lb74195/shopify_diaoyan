import { Layout, Card, Text } from "@shopify/polaris";

export default function PreviewSurvey({ surveyData }) {
  return (
    <Layout>
      <Layout.Section>
        <Card sectioned>
          <div style={{ 
            border: '1px solid #ddd',
            borderRadius: '8px',
            padding: '20px',
            backgroundColor: '#f9fafb'
          }}>
            <Text variant="headingMd" as="h3">
              预览效果
            </Text>
            
            {surveyData.questions.map((question, index) => (
              <div key={index} style={{ marginTop: '20px' }}>
                <Text variant="bodyMd" as="p">
                  {index + 1}. {question.title}
                </Text>
                
                {/* 根据不同问题类型显示不同的预览内容 */}
                {question.type === 'radio' && (
                  <div style={{ marginLeft: '20px' }}>
                    {question.options.map((option, i) => (
                      <div key={i} style={{ marginTop: '8px' }}>
                        <input type="radio" disabled /> {option.text}
                      </div>
                    ))}
                  </div>
                )}
                
                {/* 添加其他类型的预览... */}
              </div>
            ))}
          </div>
        </Card>
      </Layout.Section>
    </Layout>
  );
}

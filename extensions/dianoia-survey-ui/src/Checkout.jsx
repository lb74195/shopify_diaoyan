import {
  reactExtension,
  BlockStack,
  Button,
  ChoiceList,
  Text,
} from '@shopify/ui-extensions-react/checkout';

export function Survey({ questions }) {
  return (
    <BlockStack gap="4">
      <Text variant="headingLg">问卷调查</Text>
      {questions.map((question, index) => (
        <BlockStack key={index} gap="2">
          <Text variant="headingMd">{question.title}</Text>
          {question.type === 'radio' && (
            <ChoiceList
              name={`question-${index}`}
              value=""
              onChange={() => {}}
            >
              <BlockStack gap="2">
                {question.options.map((option, i) => (
                  <Choice key={i} id={`${index}-${i}`}>{option}</Choice>
                ))}
              </BlockStack>
            </ChoiceList>
          )}
          {/* 添加其他问题类型的渲染逻辑 */}
        </BlockStack>
      ))}
      <Button variant="primary">提交问卷</Button>
    </BlockStack>
  );
}

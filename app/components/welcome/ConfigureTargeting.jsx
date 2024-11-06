import {
    Layout,
    Card,
    Select,
    TextField,
    FormLayout,
  } from "@shopify/polaris";
  
  export default function ConfigureTargeting({ surveyData, setSurveyData }) {
    const handleRuleChange = (index, field, value) => {
      const newTargeting = { ...surveyData.targeting };
      newTargeting.rules = newTargeting.rules || [];
      newTargeting.rules[index] = {
        ...newTargeting.rules[index],
        [field]: value,
      };
      
      setSurveyData({
        ...surveyData,
        targeting: newTargeting,
      });
    };
  
    return (
      <Layout>
        <Layout.Section>
          <Card sectioned>
            <FormLayout>
              <Select
                label="触发条件"
                options={[
                  { label: "首次购买", value: "first_purchase" },
                  { label: "重复购买", value: "repeat_purchase" },
                  { label: "特定商品", value: "specific_product" },
                ]}
                onChange={(value) => handleRuleChange(0, "type", value)}
                value={surveyData.targeting?.rules?.[0]?.type || ""}
              />
  
              <TextField
                label="延迟时间（分钟）"
                type="number"
                onChange={(value) => handleRuleChange(0, "delay", value)}
                value={surveyData.targeting?.rules?.[0]?.delay || ""}
              />
            </FormLayout>
          </Card>
        </Layout.Section>
      </Layout>
    );
  }
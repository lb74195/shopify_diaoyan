import React, { useState } from "react";

export default function SurveyPreview({ questions, thankYouMessage }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleNext = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    console.log('提交的答案:', answers);
    setIsSubmitted(true);
  };

  const currentQuestion = questions[currentStep];

  // 显示感谢页面
  if (isSubmitted) {
    return (
      <div style={{ 
        border: '1px solid #ddd',
        borderRadius: '8px',
        padding: '40px 20px',
        maxWidth: '600px',
        margin: '0 auto',
        textAlign: 'center'
      }}>
        <h2 style={{ 
          fontSize: '24px',
          marginBottom: '16px',
          color: '#333'
        }}>
          {thankYouMessage?.title || "感谢您的参与！"}
        </h2>
        <p style={{ 
          fontSize: '16px',
          color: '#666',
          lineHeight: '1.5'
        }}>
          {thankYouMessage?.content || "您的反馈对我们非常重要。"}
        </p>
      </div>
    );
  }

  return (
    <div style={{ 
      border: '1px solid #ddd',
      borderRadius: '8px',
      padding: '20px',
      maxWidth: '600px',
      margin: '0 auto'
    }}>
      {/* 进度指示器 */}
      <div style={{ 
        marginBottom: '20px', 
        color: '#666',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <span>问题 {currentStep + 1} / {questions.length}</span>
        <div style={{ 
          width: '200px', 
          height: '4px', 
          backgroundColor: '#eee',
          borderRadius: '2px'
        }}>
          <div style={{
            width: `${((currentStep + 1) / questions.length) * 100}%`,
            height: '100%',
            backgroundColor: '#008060',
            borderRadius: '2px',
            transition: 'width 0.3s ease'
          }} />
        </div>
      </div>

      {/* 问题内容 */}
      <div style={{ marginBottom: '30px' }}>
        <h3 style={{ marginBottom: '15px' }}>{currentQuestion.title}</h3>
        
        {currentQuestion.type === 'radio' && (
          <div style={{ marginLeft: '20px' }}>
            {currentQuestion.options.map((option, i) => (
              <div key={i} style={{ marginBottom: '10px' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <input
                    type="radio"
                    name={`question-${currentStep}`}
                    checked={answers[currentStep] === i}
                    onChange={() => setAnswers({
                      ...answers,
                      [currentStep]: i
                    })}
                  />
                  {option}
                </label>
              </div>
            ))}
          </div>
        )}

        {currentQuestion.type === 'checkbox' && (
          <div style={{ marginLeft: '20px' }}>
            {currentQuestion.options.map((option, i) => (
              <div key={i} style={{ marginBottom: '10px' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <input
                    type="checkbox"
                    checked={answers[currentStep]?.includes(i)}
                    onChange={(e) => {
                      const currentAnswers = answers[currentStep] || [];
                      setAnswers({
                        ...answers,
                        [currentStep]: e.target.checked
                          ? [...currentAnswers, i]
                          : currentAnswers.filter(val => val !== i)
                      });
                    }}
                  />
                  {option}
                </label>
              </div>
            ))}
          </div>
        )}

        {currentQuestion.type === 'text' && (
          <div style={{ marginLeft: '20px' }}>
            <textarea
              value={answers[currentStep] || ''}
              onChange={(e) => setAnswers({
                ...answers,
                [currentStep]: e.target.value
              })}
              style={{
                width: '100%',
                minHeight: '100px',
                padding: '8px',
                borderRadius: '4px',
                border: '1px solid #ddd'
              }}
              placeholder="请输入您的答案..."
            />
          </div>
        )}
      </div>

      {/* 导航按钮 */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between',
        gap: '10px',
        marginTop: '20px'
      }}>
        {currentStep > 0 && (
          <button
            onClick={handlePrevious}
            style={{
              padding: '8px 16px',
              border: '1px solid #ddd',
              borderRadius: '4px',
              background: '#fff',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
            onMouseOver={(e) => e.target.style.backgroundColor = '#f5f5f5'}
            onMouseOut={(e) => e.target.style.backgroundColor = '#fff'}
          >
            上一题
          </button>
        )}
        {currentStep < questions.length - 1 ? (
          <button
            onClick={handleNext}
            style={{
              padding: '8px 16px',
              border: 'none',
              borderRadius: '4px',
              background: '#008060',
              color: '#fff',
              cursor: 'pointer',
              marginLeft: 'auto',
              transition: 'all 0.2s ease'
            }}
            onMouseOver={(e) => e.target.style.backgroundColor = '#006e52'}
            onMouseOut={(e) => e.target.style.backgroundColor = '#008060'}
          >
            下一题
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            style={{
              padding: '8px 16px',
              border: 'none',
              borderRadius: '4px',
              background: '#008060',
              color: '#fff',
              cursor: 'pointer',
              marginLeft: 'auto',
              transition: 'all 0.2s ease'
            }}
            onMouseOver={(e) => e.target.style.backgroundColor = '#006e52'}
            onMouseOut={(e) => e.target.style.backgroundColor = '#008060'}
          >
            提交问卷
          </button>
        )}
      </div>
    </div>
  );
}

import { Bubble, Prompts, Welcome, useXAgent, useXChat } from '@ant-design/x';
import { createStyles } from 'antd-style';
import React from 'react';
import useLocale from '../../../../hooks/useLocale';
import CustomizationProvider, { LOCALES } from '../../common/CustomizationProvider';
import CustomizationSender from '../../common/CustomizationSender';

import { BubbleDataType } from '@ant-design/x/es/bubble/BubbleList';
import { Flex, type GetProp, Skeleton } from 'antd';

const sleep = () => new Promise((resolve) => setTimeout(resolve, 1000));

const roles: GetProp<typeof Bubble.List, 'roles'> = {
  ai: {
    placement: 'start',
    typing: { step: 5, interval: 20 },
    style: {
      maxWidth: 600,
    },
    styles: {
      content: {
        borderRadius: 16,
      },
    },
  },
  local: {
    placement: 'end',
    styles: {
      content: {
        borderRadius: 16,
        background: '#3877FF',
      },
    },
  },
};

let mockSuccess = false;

const useStyle = createStyles(({ token, css }) => {
  return {
    container: css`
      display: flex;
      padding: ${token.paddingXL}px ${token.paddingMD}px;
      box-sizing: border-box;
      flex-direction: column;
      gap: ${token.paddingSM}px;
      height: 100%;
      width: 350px;
      background: #0000001a;
   `,
    content: css`
      padding: ${token.paddingXL}px;
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: ${token.padding}px;
    `,
    bubble_list: css`
      flex: 1;
    `,
    placeholder_bubble: css`
      .ant-welcome {
        padding: 0;
      }

      .ant-welcome-title {
        font-size: 16px !important;
        font-weight: 500 !important;
        opacity: 0.9;
      }

      .ant-welcome-description {
        font-size: 12px;
        opacity: 0.65;
      }

      .ant-welcome-icon {
        img {
          transform: scale(1.2);
          margin-inline-end: 10px;
        }
      }

      .ant-bubble-content {
        overflow: hidden;
        background: linear-gradient(135deg, #ffffff26 14%, #ffffff0d 59%) !important;
        width: 100%;
        border-radius: 16px;
        padding: 24px;
      }

      .ant-prompts {
        padding: 0;
      }

      .ant-prompts-item {
        background: rgba(255, 255, 255, 0.05);
        box-sizing: border-box;
        padding: 8px 16px;
        font-size: 12px;
        height: 36px;
        line-height: 36px;
        border: none;
        flex: 1;

        
      }
    `,
  };
});

const AssistantScene: React.FC = () => {
  const { styles } = useStyle();
  const [locale] = useLocale(LOCALES);

  const [content, setContent] = React.useState('');

  const [agent] = useXAgent<string, { message: string }, string>({
    request: async ({ message }, { onSuccess, onError }) => {
      await sleep();

      mockSuccess = !mockSuccess;

      if (mockSuccess) {
        onSuccess([`Mock success return. You said: ${message}`]);
      }

      onError(new Error('Mock request failed'));
    },
  });

  // Chat messages
  const { onRequest, messages } = useXChat({
    agent,
    requestPlaceholder: 'Waiting...',
    requestFallback: 'Mock failed return. Please try again later.',
  });

  const placeholderMessage: BubbleDataType = {
    key: 'placeholder',
    variant: 'borderless',
    className: styles.placeholder_bubble,
    content: (
      <Welcome
        icon={
          <img
            src="https://mdn.alipayobjects.com/huamei_iwk9zp/afts/img/A*s5sNRo5LjfQAAAAAAAAAAAAADgCCAQ/fmt.webp"
            alt="Ant Design X"
          />
        }
        variant="borderless"
        title={locale.greeting_short}
        description={locale.description_short}
      />
    ),
    footer: (
      <Prompts
        title={locale.help_text}
        onItemClick={(item) => {
          onRequest(item.data.description as string);
        }}
        vertical
        items={[
          {
            key: '1-1',
            description: locale.question1,
          },
          {
            key: '1-2',
            description: locale.question2,
          },
          {
            key: '1-3',
            description: locale.question3,
          },
          {
            key: '1-4',
            description: locale.question4,
          },
        ]}
      />
    ),
  };

  return (
    <CustomizationProvider>
      <Flex justify="space-between" style={{ height: '100%' }}>
        <div className={styles.content}>
          <Skeleton />
          <Skeleton />
          <Skeleton />
        </div>
        <div className={styles.container}>
          <Bubble.List
            className={styles.bubble_list}
            roles={roles}
            items={[
              placeholderMessage,
              ...messages.map(({ id, message, status }) => ({
                key: id,
                loading: status === 'loading',
                role: status === 'local' ? 'local' : 'ai',
                content: message,
              })),
            ]}
          />
          <CustomizationSender
            loading={agent.isRequesting()}
            value={content}
            onChange={setContent}
            placeholder={locale.send_placeholder}
            onSubmit={(nextContent) => {
              if (!nextContent) return;
              onRequest(nextContent);
              setContent('');
            }}
          />
        </div>
      </Flex>
    </CustomizationProvider>
  );
};

export default AssistantScene;

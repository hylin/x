import { EllipsisOutlined } from '@ant-design/icons';
import { Dropdown, Typography } from 'antd';
import type { MenuProps } from 'antd';
import classnames from 'classnames';
import React from 'react';

import type { DirectionType } from 'antd/es/config-provider';
import pickAttrs from 'rc-util/lib/pickAttrs';
import type { Conversation } from './interface';

export interface ConversationsItemProps
  extends Omit<React.HTMLAttributes<HTMLLIElement>, 'onClick'> {
  info: Conversation;
  prefixCls?: string;
  direction?: DirectionType;
  menu?: MenuProps & {
    trigger?:
      | React.ReactNode
      | ((conversation: Conversation, info: { originNode: React.ReactNode }) => React.ReactNode);
    getPopupContainer?: (triggerNode: HTMLElement) => HTMLElement;
  };
  active?: boolean;
  onClick?: (info: Conversation) => void;
}

const stopPropagation: React.MouseEventHandler<HTMLSpanElement> = (e) => {
  e.stopPropagation();
};

const ConversationsItem: React.FC<ConversationsItemProps> = (props) => {
  const { prefixCls, info, className, direction, onClick, active, menu, ...restProps } = props;

  const domProps = pickAttrs(restProps, {
    aria: true,
    data: true,
    attr: true,
  });

  // ============================= MISC =============================
  const { disabled } = info;

  // ============================ Style =============================
  const mergedCls = classnames(
    className,
    `${prefixCls}-item`,
    { [`${prefixCls}-item-active`]: active && !disabled },
    { [`${prefixCls}-item-disabled`]: disabled },
  );

  // ============================ Events ============================
  const onInternalClick: React.MouseEventHandler<HTMLLIElement> = () => {
    if (!disabled && onClick) {
      onClick(info);
    }
  };

  // ============================ Menu ============================

  const { trigger, ...dropdownMenu } = menu || {};

  const getPopupContainer = dropdownMenu?.getPopupContainer;

  const renderMenuTrigger = (conversation: Conversation) => {
    const originTriggerNode = (
      <EllipsisOutlined onClick={stopPropagation} className={`${prefixCls}-menu-icon`} />
    );
    if (trigger) {
      return typeof trigger === 'function'
        ? trigger(conversation, { originNode: originTriggerNode })
        : trigger;
    }
    return originTriggerNode;
  };

  // ============================ Render ============================
  return (
    <li {...domProps} className={mergedCls} onClick={onInternalClick} title={`${info.label}`}>
      {info.icon && <div className={`${prefixCls}-icon`}>{info.icon}</div>}
      <Typography.Text className={`${prefixCls}-label`}>{info.label}</Typography.Text>
      {!disabled && menu && (
        <Dropdown
          menu={dropdownMenu}
          placement={direction === 'rtl' ? 'bottomLeft' : 'bottomRight'}
          trigger={['click']}
          disabled={disabled}
          getPopupContainer={getPopupContainer}
        >
          {renderMenuTrigger(info)}
        </Dropdown>
      )}
    </li>
  );
};

export default ConversationsItem;

import ContributorsList from '@qixian.cs/github-contributors-list';
import { createStyles } from 'antd-style';
import classNames from 'classnames';
import { useIntl } from 'dumi';
import React from 'react';

import SiteContext from '../SiteContext';
import ContributorAvatar from './ContributorAvatar';

const useStyle = createStyles(({ token, css }) => ({
  listMobile: css`
    margin: 1em 0 !important;
  `,
  title: css`
    font-size: ${token.fontSizeSM}px;
    opacity: 0.5;
    margin-bottom: ${token.marginXS}px;
  `,
  list: css`
    display: flex;
    flex-wrap: wrap;
    clear: both;
    li {
      height: 24px;
      transition: all ${token.motionDurationSlow};
      margin-inline-end: -${token.marginXS}px;
    }
    &:hover {
      li {
        margin-inline-end: 0;
      }
    }
  `,
}));

interface ContributorsProps {
  filename?: string;
}

const Contributors: React.FC<ContributorsProps> = ({ filename }) => {
  const { formatMessage } = useIntl();
  const { styles } = useStyle();
  const { isMobile } = React.use(SiteContext);

  if (!filename) {
    return null;
  }

  return (
    <div className={classNames({ [styles.listMobile]: isMobile })}>
      <div className={styles.title}>{formatMessage({ id: 'app.content.contributors' })}</div>
      <ContributorsList
        cache
        repo="x"
        owner="ant-design"
        branch="main"
        fileName={filename}
        className={styles.list}
        renderItem={(item, loading) => (
          <ContributorAvatar item={item} loading={loading} key={item?.url} />
        )}
      />
    </div>
  );
};

export default Contributors;

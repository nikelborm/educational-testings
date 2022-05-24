import { Tag } from 'antd';

export default function renderKeywords(keywords: string | string[]) {
  const stringArray = Array.isArray(keywords)
    ? keywords
    : [...new Set(keywords?.split(','))];

  return stringArray.map((keyword) => <Tag key={keyword}>{keyword}</Tag>);
}

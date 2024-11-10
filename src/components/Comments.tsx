import React from 'react';
import Giscus from '@giscus/react';

export default function Comments() {
  return (
    <Giscus
      repo="[REPLACE-WITH-YOUR-REPO]"
      repoId="[REPLACE-WITH-YOUR-REPO-ID]"
      category="Comments"
      categoryId="[REPLACE-WITH-CATEGORY-ID]"
      mapping="pathname"
      reactionsEnabled="1"
      emitMetadata="0"
      theme="light"
    />
  );
}
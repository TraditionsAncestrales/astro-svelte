import {qEntries, qEntry, qEntryProps, qItemProps, qLayout, qPaths, qRefs, qSlugProp} from './queries';
import {zGeneralKnowledgeInput, zKnowledgePaths, zKnowledgeSlugInput, zPaths, zSlugInput} from './schemas.api';
import {procedure} from './utils';

// ARTICLE ===============================================================================================================================
export const getArticleData = procedure('ARTICLE PAGE', {
  input: zSlugInput,
  //output: zOutput.extend({entry: zArticle.pick({description: true, image: true, title: true})}),
  query: `${qEntry('article')}{
    'entry': {${qEntryProps}},
    'layout': ${qLayout('article')}
  }`,
});

export const getArticlePaths = procedure('ARTICLE PATHS', {output: zPaths, query: qPaths('article')});

// CONSULTATION ============================================================================================================================
export const getConsultationData = procedure('CONSULTATION PAGE', {
  input: zSlugInput,
  //output: zOutput.extend({entry: zConsultation.pick({description: true, image: true, title: true})}),
  query: `${qEntry('consultation')}{
    'entry': {${qEntryProps}}, 
    'layout': ${qLayout('consultation')},
  }`,
});

export const getConsultationPaths = procedure('CONSULTATION PATHS', {output: zPaths, query: qPaths('consultation')});

// KNOWLEDGE ===============================================================================================================================
export const getGeneralKnowledgeData = procedure('GENERAL KNOWLEDGE PAGE', {
  input: zGeneralKnowledgeInput,
  // output: zOutput.extend({
  //   article: zArticleItem,
  //   events: zEvent.array(),
  //   testimonies: zTestimony.array(),
  // }),
  query: `${qEntry('knowledge', '$knowledge')}{
    'article': ${qEntry('article', "'la-fondatrice'")}{${qItemProps('article')}},
    'events': ${qEntries('event')}{},
    'layout': ${qLayout('knowledge')},
    'testimonies': ${qEntries('testimony')},
  }`,
});

export const getKnowledgeData = procedure('KNOWLEDGE PAGE', {
  input: zKnowledgeSlugInput,
  // output: zOutput.extend({
  //   article: zArticleItem,
  //   consultations: zConsultationItem.array(),
  //   events: zEvent.array(),
  //   trainings: zTrainingItem.array(),
  //   workshops: zWorkshopItem.array(),
  // }),
  query: `${qEntry('knowledge', '$knowledge')}{
    'article': ${qRefs('article')}[0]{${qItemProps('article')}},
    'consultations': ${qRefs('consultation')}{${qItemProps('consultation')}, duration, places[]->{${qSlugProp}, title}, price},
    'events': ${qRefs('event')},
    'layout': ${qLayout('knowledge')},
    'trainings': ${qRefs('training')}{${qItemProps('training')}, duration, places[]->{${qSlugProp}, title}, price},
    'workshops': ${qRefs('workshop')}{${qItemProps('workshop')}, duration, places[]->{${qSlugProp}, title}, price},
  }`,
});

export const getKnowledgePaths = procedure('KNOWLEDGE PATHS', {output: zKnowledgePaths, query: `${qPaths('knowledge')}`});

// SHOP ====================================================================================================================================
export const getShopData = procedure('SHOP PAGE', {
  // output: zOutput.extend({items: zProductItem.array()}),
  query: `{
    'items': ${qEntries('product')}{${qItemProps('product')}, price}, 
    'layout': ${qLayout('product')},
  }`,
});

// TRAINING ================================================================================================================================
export const getTrainingData = procedure('TRAINING PAGE', {
  input: zSlugInput,
  //output: zOutput.extend({entry: zTraining.pick({description: true, image: true, title: true})}),
  query: `${qEntry('training')}{
    'entry': {${qEntryProps}}, 
    'layout': ${qLayout('training')},
  }`,
});

export const getTrainingPaths = procedure('TRAINING PATHS', {output: zPaths, query: qPaths('training')});

// WORKSHOP ================================================================================================================================
export const getWorkshopData = procedure('WORKSHOP PAGE', {
  input: zSlugInput,
  //output: zOutput.extend({entry: zWorkshop.pick({description: true, image: true, title: true})}),
  query: `${qEntry('workshop')}{
    'entry': {${qEntryProps}}, 
    'layout': ${qLayout('workshop')},
  }`,
});

export const getWorkshopPaths = procedure('WORKSHOP PATHS', {output: zPaths, query: qPaths('workshop')});

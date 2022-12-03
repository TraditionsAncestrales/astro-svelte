import {PageType, URL_DIRS} from './schemas';

// CORE ====================================================================================================================================
export const qSlug = `slug.current`;
export const qKnowledgeSlug = `knowledge->${qSlug}`;

export const qUri = (type: PageType) => {
  if (type === 'knowledge') return `'/' + ${qSlug}`;
  if (type === 'product') return `'/'`;
  return `'/' + ${qKnowledgeSlug} + '/${URL_DIRS[type]}/' + ${qSlug}`;
};

export const qImageProp = `'image': image.asset->{url}`;
export const qKnowledgeSlugProp = `'knowledge': ${qKnowledgeSlug}`;
export const qSlugProp = `'slug': ${qSlug}`;
export const qUriProp = (type: PageType) => `'uri': ${qUri(type)}`;

export const qEntryProps = `description, ${qImageProp}, title`;
export const qItemProps = (type: PageType) => `excerpt, ${qImageProp}, ${qSlugProp}, title, ${qUriProp(type)}`;

export const qIs = (slug = '$slug') => `${qSlug} == ${slug}`;
export const qIsnt = (slug = '$slug') => `${qSlug} != ${slug}`;

export const qEntries = (type: string) => `*[_type == '${type}']`;
export const qEntry = (type: string, slug = '$slug') => `*[_type == '${type}' && ${qIs(slug)}][0]`;
export const qOtherEntries = (type: string, slug = '$slug') => `*[_type == '${type}' && ${qIsnt(slug)}]`;
export const qRefs = (type: string) => `*[_type == '${type}' && references(^._id)]`;

// PATHS ===================================================================================================================================
export const qPaths = (type: PageType) =>
  type === 'knowledge'
    ? `${qOtherEntries('knowledge', "'general'")}{'params': {'knowledge': ${qSlug}}}`
    : `${qEntries(type)}{'params': {${qSlugProp}, ${qKnowledgeSlug} != 'general' => {${qKnowledgeSlugProp}}}}`;

// LAYOUT ==================================================================================================================================
export const qLayout = (type: PageType) => {
  const prefix = type === 'knowledge' ? '' : 'knowledge->';

  return `${qEntries('config')}[0]{
		'footer': {city, email, fb, instagram, phone, street, zipcode},
		'hero': {
			${qImageProp}, subtitle, title, 
			^.${prefix}${qIsnt("'general'")} => ^${type === 'knowledge' ? '' : '.knowledge->'}{${qImageProp}, title}
		},
		menu->{
			label,
			${qSlugProp}, 
			items[]->{
				'children': ${qRefs('nav')}{label, 'to': '/' + ^.${qSlug} + '/' + ${qSlug}},
				label,
				'to': '/' + coalesce(${qSlug}, ''),
			}
		},
		'organization': ${qEntry('article', "'l-association'")}{${qItemProps('article')}},
		'others': ${qOtherEntries('knowledge', type === 'knowledge' ? '$knowledge' : 'knowledge._ref')}{${qItemProps('knowledge')}},
		'pageType': '${type}',
		'theme': ${type === 'product' ? "'general'" : `^.${prefix}${qSlug}`},
	}`;
};

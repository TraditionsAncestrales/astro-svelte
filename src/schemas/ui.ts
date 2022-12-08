import type {createForm} from 'felte';
import {z} from 'zod';
import {fill} from '~/data/utils';
import {fillString} from '~/server/utils';
import {
  zArticleItem,
  zConfig,
  zConsultationItem,
  zImage,
  zKnowledge,
  zMenu,
  zPageType,
  zProductItem,
  zTestimony,
  zTrainingItem,
  zWorkshopItem
} from '.';

// CORE ====================================================================================================================================
export const zClass = z.string().optional();
export const fillClass = fill(zClass);

export const zIntent = z.enum(['dark', 'light', 'primary', 'secondary', 'white']);

// COMPONENTS ==============================================================================================================================
export const zComponentStyles = z.object({
  class: zClass,
  'class:list': z.any().optional(),
});

export const zSvelteComponentStyles = zComponentStyles.omit({'class:list': true});

// FORM CONTROL ============================================================================================================================
export const zFormControlData = z.object({
  ...fill(z.string().optional())('label', 'placeholder'),
  name: z.string(),
});
export const zFormControlP = zFormControlData.merge(zSvelteComponentStyles);

// FORM AREA ===============================================================================================================================
export const zFormAreaData = zFormControlData.extend({});
export const zFormAreaP = zFormAreaData.merge(zSvelteComponentStyles);

// FORM EMAIL ==============================================================================================================================
export const zFormEmailData = zFormControlData.extend({});
export const zFormEmailP = zFormEmailData.merge(zSvelteComponentStyles);

// FORM SUBMIT =============================================================================================================================
export const zFormSubmitData = zFormControlData.extend({intent: zIntent});
export const zFormSubmitP = zFormSubmitData.merge(zSvelteComponentStyles);

// FORM TEXT ===============================================================================================================================
export const zFormTextData = zFormControlData.extend({});
export const zFormTextP = zFormTextData.merge(zSvelteComponentStyles);

// THE FOOTER ==============================================================================================================================
export const zTheFooterData = zConfig.pick({city: true, email: true, fb: true, instagram: true, phone: true, street: true, zipcode: true});
export const zTheFooterP = zTheFooterData.merge(zComponentStyles);

// THE HEADER ==============================================================================================================================
export const zTheHeaderData = z.object({menu: zMenu});
export const zTheHeaderP = zTheHeaderData.merge(zComponentStyles);

// THE HERO ================================================================================================================================
export const zTheHeroData = z.object({
  ...fillString('subtitle', 'title'),
  image: zImage,
});
export const zTheHeroP = zTheHeroData.merge(zComponentStyles);

// LAYOUT ==================================================================================================================================
export const zLayoutData = z.object({
  footer: zTheFooterData,
  hero: zTheHeroData,
  menu: zMenu,
  organization: zArticleItem,
  others: zKnowledge.array(),
  pageType: zPageType,
  theme: z.string(),
});
export const zLayoutP = zLayoutData;

// UI FEATURES =============================================================================================================================
export const zUiFeaturesData = z.object({
  intent: zIntent.optional(),
  items: z.object({key: z.string(), value: z.string()}).array(),
});
export const zUiFeaturesP = zUiFeaturesData.merge(zComponentStyles);

// UI IMG ==================================================================================================================================
export const zUiImgData = z.object({
  image: zImage,
  loading: z.enum(['eager', 'lazy']).optional(),
});
export const zUiImgP = zUiImgData.merge(zComponentStyles);

// UI IMAGE ================================================================================================================================
export const zUiImageData = z.object({
  border: z.number().optional(),
  image: zImage,
  right: z.boolean().optional(),
});
export const zUiImageStyles = zComponentStyles.extend(fillClass('cBorder', 'cImg'));
export const zUiImageP = zUiImageData.merge(zUiImageStyles);

// UI TITLE ================================================================================================================================
export const zUiTitleData = z.object({title: z.string().optional()});
export const zUiTitleStyles = zComponentStyles.extend(fillClass('cImageImg', 'cStain', 'cTitle'));
export const zUiTitleP = zUiTitleData.merge(zUiTitleStyles);

// UI SECTION ==============================================================================================================================
export const zUiSectionData = z.object({
  border: z.enum(['all', 'bottom', 'none', 'top']).optional(),
  expanded: z.boolean().optional(),
  image: zImage.optional(),
  imageRight: z.boolean().optional(),
  intent: zIntent.optional(),
  title: z.string().optional(),
  uri: z.string().optional(),
});
export const zUiSectionStyles = zComponentStyles.extend(fillClass('cBorder', 'cImage', 'cImageImg'));
export const zUiSectionP = zUiSectionData.merge(zUiSectionStyles);

// ARTICLE ITEMS ===========================================================================================================================
export const zArticleItemsData = z.object({items: zArticleItem.array()});
export const zArticleItemsP = zArticleItemsData.merge(zUiSectionP);

// CONSULTATION ITEMS ======================================================================================================================
export const zConsultationItemsData = z.object({items: zConsultationItem.array()});
export const zConsultationItemsP = zConsultationItemsData.merge(zUiSectionP);

// KNOWLEDGE ITEMS =========================================================================================================================
export const zKnowledgeItemsData = z.object({items: zKnowledge.array()});
export const zKnowledgeItemsP = zKnowledgeItemsData.merge(zUiSectionP);

// PRODUCT ITEMS ===========================================================================================================================
export const zProductItemsData = z.object({items: zProductItem.array()});
export const zProductItemsP = zProductItemsData.merge(zUiSectionP);

// TESTIMONY ITEMS =========================================================================================================================
export const zTestimonyItemsData = z.object({items: zTestimony.array()});
export const ztestimonyItemsP = zTestimonyItemsData.merge(zUiSectionP);

// TRAINING ITEMS ==========================================================================================================================
export const zTrainingItemsData = z.object({items: zTrainingItem.array()});
export const zTrainingItemsP = zTrainingItemsData.merge(zUiSectionP);

// WORKSHOP ITEMS ==========================================================================================================================
export const zWorkshopItemsData = z.object({items: zWorkshopItem.array()});
export const zWorkshopItemsP = zWorkshopItemsData.merge(zUiSectionP);

// TYPES ===================================================================================================================================
export type FormProp = {
  form: Pick<ReturnType<typeof createForm>, 'errors' | 'isSubmitting' | 'isValid' | 'touched'>;
};
export type FormControlP = z.infer<typeof zFormControlP> & FormProp;
export type FormSubmitP = z.infer<typeof zFormSubmitP> & FormProp;
export type Intent = z.infer<typeof zIntent>;

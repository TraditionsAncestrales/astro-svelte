import {z} from 'zod';
import {zArticleItem, zConfig, zConsultationItem, zImage, zKnowledge, zMenu, zPageType, zProductItem, zTestimony, zTrainingItem, zWorkshopItem} from './schemas';
import {fill, fillString} from './utils';

// CORE ====================================================================================================================================
export const zClass = z.string().optional();
export const fillClass = fill(zClass);

export const zIntent = z.enum(['dark', 'light', 'primary', 'secondary', 'white']);

// COMPONENTS ==============================================================================================================================
export const zComponentStyles = z.object({
  class: zClass,
  'class:list': z.any().optional(),
});

// FORM CONTROL ============================================================================================================================
export const zFormControlData = z.object({
  errors: z.string().array(),
  label: z.string().optional(),
  name: z.string(),
});
export const zFormControlP = zFormControlData.merge(zComponentStyles);

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

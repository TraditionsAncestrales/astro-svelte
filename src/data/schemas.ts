import {z} from 'zod';
import {fillString} from './schema.utils';
import {zSanityBlock, zSanityImage, zSanityReference} from './schemas.sanity';
import {fill, parseFormDataValue} from './utils';

// ENUMS ===================================================================================================================================
export const formTypes = ['fail', 'success', 'unnormalized', 'unsanitized'] as const;
export const zFormType = z.enum(formTypes);
export const FORM_TYPE = zFormType.enum;

export const pageTypes = ['article', 'consultation', 'knowledge', 'product', 'training', 'workshop'] as const;
export const zPageType = z.enum(pageTypes);
export const PAGE_TYPE = zPageType.enum;

// CONST ===================================================================================================================================
export const URL_DIRS = {
  article: 'articles',
  consultation: 'consultations',
  training: 'formations',
  workshop: 'ateliers',
} as const;

// FORMS ===================================================================================================================================
export const zForm = z.object({data: z.any(), type: zFormType, values: z.any()});

// IMAGE ===================================================================================================================================
export const zImage = zSanityImage.extend({asset: zSanityReference});

// ITEM ====================================================================================================================================
export const zItem = z.object({
  ...fillString('slug', 'title', 'uri'),
  excerpt: zSanityBlock.array(),
  image: zImage,
});

export const zEntry = zItem.extend({knowledge: z.string(), description: zSanityBlock.array()});

// ARTICLE =================================================================================================================================
export const zArticle = zEntry.extend({});
export const zArticleItem = zItem.extend({});

// CONTACT =================================================================================================================================
export const zContactDto = z.object(fill(z.string().transform(parseFormDataValue))('email', 'forename', 'surname'));

export const zContact = z.object({
  email: z.string().email(),
  ...fill(z.string())('forename', 'surname'),
});

export const zContactForm = zForm.extend({values: zContactDto.optional()});

// NAV =====================================================================================================================================
const zChildlessNav = z.object(fillString('label', 'to'));
export const zNav = zChildlessNav.extend({children: zChildlessNav.array()});

// NEWSLETTER ==============================================================================================================================
export const zNewsletterDto = z.object(fill(z.string().transform(parseFormDataValue))('email', 'forename', 'surname'));

export const zNewsletter = z.object({
  email: z.string().email(),
  ...fill(z.string())('forename', 'surname'),
});

export const zNewsletterForm = zForm.extend({values: zNewsletterDto.optional()});

// MENU ====================================================================================================================================
export const zMenu = z.object({...fillString('label', 'slug'), items: zNav.array()});

// PLACE ===================================================================================================================================
export const zPlace = z.object({...fillString('slug', 'title')});

// TESTIMONY ===============================================================================================================================
export const zTestimony = z.object(fillString('author', 'content', 'title'));

// CONFIG ==================================================================================================================================
export const zConfig = z.object({
  ...fillString('city', 'fb', 'email', 'instagram', 'phone', 'street', 'subtitle', 'title', 'url'),
  image: zImage,
  menu: zMenu,
  zipcode: z.number(),
});

// CONSULTATION ============================================================================================================================
const zConsultationExtra = z.object({...fillString('duration', 'price'), places: zPlace.array()});
export const zConsultation = zEntry.merge(zConsultationExtra);
export const zConsultationItem = zItem.merge(zConsultationExtra);

// EVENT ===================================================================================================================================
export const zEvent = z.object({...fillString('slug', 'title')});

// KNOWLEDGE ===============================================================================================================================
export const zKnowledge = zItem;

// PRODUCT =================================================================================================================================
const zProductExtra = z.object({price: z.string()});
export const zProduct = zEntry.omit({knowledge: true}).merge(zProductExtra);
export const zProductItem = zItem.merge(zProductExtra);

// TRAINING ================================================================================================================================
const zTrainingExtra = z.object({...fillString('duration', 'price'), places: zPlace.array()});
export const zTraining = zEntry.merge(zTrainingExtra);
export const zTrainingItem = zItem.merge(zTrainingExtra);

// WORKSHOP ================================================================================================================================
const zWorkshopExtra = z.object({...fillString('duration', 'price'), places: zPlace.array()});
export const zWorkshop = zEntry.merge(zWorkshopExtra);
export const zWorkshopItem = zItem.merge(zWorkshopExtra);

// TYPES ===================================================================================================================================
export type Article = z.infer<typeof zArticle>;
export type Config = z.infer<typeof zConfig>;
export type Consultation = z.infer<typeof zConsultation>;
export type Contact = z.infer<typeof zContact>;
export type ContactForm = z.infer<typeof zContactForm>;
export type Event = z.infer<typeof zEvent>;
export type FormType = z.infer<typeof zFormType>;
export type Image = z.infer<typeof zImage>;
export type Knowledge = z.infer<typeof zKnowledge>;
export type Menu = z.infer<typeof zMenu>;
export type Nav = z.infer<typeof zNav>;
export type Newsletter = z.infer<typeof zNewsletter>;
export type NewsletterForm = z.infer<typeof zNewsletterForm>;
export type PageType = z.infer<typeof zPageType>;
export type Place = z.infer<typeof zPlace>;
export type Product = z.infer<typeof zProduct>;
export type Testimony = z.infer<typeof zTestimony>;
export type Training = z.infer<typeof zTraining>;
export type Workshop = z.infer<typeof zWorkshop>;
